import { getDb, initDb } from './lib/db.js';

let isDbInitialized = false;

export default async function handler(req, res) {
  // 1. Enforce Authentication with ADMIN_SECRET_KEY
  const adminSecret = process.env.ADMIN_SECRET_KEY;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const customHeaderToken = req.headers['x-admin-key'];

  if (!adminSecret) {
    return res.status(500).json({
      error: 'ADMIN_SECRET_KEY is not configured on the server. Please set it in Vercel environment variables.'
    });
  }

  if (token !== adminSecret && customHeaderToken !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin credentials' });
  }

  // 2. Fetch Visitor Logs
  try {
    const sql = getDb();
    if (!sql) {
      return res.status(200).json({
        logs: [],
        warning: 'DATABASE_URL or POSTGRES_URL is not set yet in Vercel.'
      });
    }

    if (!isDbInitialized) {
      await initDb();
      isDbInitialized = true;
    }

    const {
      page = 1,
      limit = 50,
      country = '',
      referrer = '',
      startDate = '',
      endDate = ''
    } = req.query;

    const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 200);
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const offset = (parsedPage - 1) * parsedLimit;

    // Build dynamic filters safely
    let logs;
    let totalCount = 0;

    // Use parameterized queries
    const countryFilter = country ? `%${country.trim()}%` : null;
    const referrerFilter = referrer ? `%${referrer.trim()}%` : null;
    const startFilter = startDate ? new Date(startDate) : null;
    const endFilter = endDate ? new Date(endDate) : null;

    logs = await sql`
      SELECT
        id,
        timestamp,
        ip,
        country,
        region,
        city,
        browser,
        os,
        device,
        referrer,
        page
      FROM visitor_logs
      WHERE
        (${countryFilter}::text IS NULL OR country ILIKE ${countryFilter} OR city ILIKE ${countryFilter})
        AND (${referrerFilter}::text IS NULL OR referrer ILIKE ${referrerFilter})
        AND (${startFilter}::timestamptz IS NULL OR timestamp >= ${startFilter})
        AND (${endFilter}::timestamptz IS NULL OR timestamp <= ${endFilter})
      ORDER BY timestamp DESC
      LIMIT ${parsedLimit}
      OFFSET ${offset};
    `;

    const countResult = await sql`
      SELECT COUNT(*)::int as count
      FROM visitor_logs
      WHERE
        (${countryFilter}::text IS NULL OR country ILIKE ${countryFilter} OR city ILIKE ${countryFilter})
        AND (${referrerFilter}::text IS NULL OR referrer ILIKE ${referrerFilter})
        AND (${startFilter}::timestamptz IS NULL OR timestamp >= ${startFilter})
        AND (${endFilter}::timestamptz IS NULL OR timestamp <= ${endFilter});
    `;

    totalCount = countResult[0]?.count || 0;

    return res.status(200).json({
      logs,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit)
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({ error: 'Failed to query visitor records' });
  }
}
