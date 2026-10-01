import { getDb, initDb } from './lib/db.js';
import { parseUserAgent } from './lib/userAgent.js';

let isDbInitialized = false;

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = getDb();
    if (!sql) {
      // If DATABASE_URL is not set yet, acknowledge without error so client doesn't break
      return res.status(200).json({ status: 'ok', warning: 'Database connection not configured' });
    }

    if (!isDbInitialized) {
      await initDb();
      isDbInitialized = true;
    }

    let body = {};
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch {
        body = {};
      }
    } else if (req.body) {
      body = req.body;
    }

    const { page = '/', referrer: clientReferrer = '', sessionId = '' } = body;

    // 1. Obtain Real Public IP from Vercel headers
    // Vercel populates 'x-forwarded-for' (comma separated if multiple) and 'x-real-ip'
    const rawIp =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      '';
    const ip = rawIp.split(',')[0].trim() || 'Unknown IP';

    // 2. Obtain Vercel Server-Side Geolocation Headers
    // Note: IP geolocation is approximate; VPNs, proxies, and mobile cellular networks can shift reported locations.
    const country = req.headers['x-vercel-ip-country'] || 'Unknown';
    const region = req.headers['x-vercel-ip-country-region'] || '';
    const rawCity = req.headers['x-vercel-ip-city'];
    const city = rawCity ? decodeURIComponent(rawCity) : '';

    // 3. User-Agent and Referrer
    const userAgentHeader = req.headers['user-agent'] || '';
    const { browser, os, device } = parseUserAgent(userAgentHeader);

    // Prefer client document.referrer if available (cross-origin), fallback to request referer header
    const referrer = (clientReferrer || req.headers['referer'] || '').slice(0, 500);
    const sanitizedPage = (page || '/').slice(0, 255);
    const sanitizedSessionId = (sessionId || '').slice(0, 100);

    // 4. Session / Rapid Duplicate Suppression:
    // If the same session logs the exact same page within the last 15 seconds, skip duplicate insertion
    if (sanitizedSessionId) {
      const existing = await sql`
        SELECT id FROM visitor_logs
        WHERE session_id = ${sanitizedSessionId}
          AND page = ${sanitizedPage}
          AND timestamp > NOW() - INTERVAL '15 seconds'
        LIMIT 1;
      `;
      if (existing.length > 0) {
        return res.status(200).json({ status: 'ignored_duplicate' });
      }
    }

    // 5. Insert Record
    await sql`
      INSERT INTO visitor_logs (
        ip,
        country,
        region,
        city,
        browser,
        os,
        device,
        referrer,
        page,
        session_id
      ) VALUES (
        ${ip},
        ${country},
        ${region},
        ${city},
        ${browser},
        ${os},
        ${device},
        ${referrer},
        ${sanitizedPage},
        ${sanitizedSessionId}
      );
    `;

    // Never return sensitive visitor logs or IP back to the unauthenticated client
    return res.status(200).json({ status: 'recorded' });
  } catch (err) {
    console.error('Error tracking visit:', err);
    // Return standard OK or internal error without leaking stack trace
    return res.status(500).json({ error: 'Failed to record visit' });
  }
}
