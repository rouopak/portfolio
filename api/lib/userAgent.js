/**
 * Lightweight User-Agent parser to extract Browser, OS, and Device
 * without bloating bundles with large dependencies.
 */
export function parseUserAgent(uaString = '') {
  const ua = uaString.toLowerCase();

  // 1. Device Type
  let device = 'Desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    device = 'Mobile';
  } else if (/ipad|tablet|playbook|silk/i.test(ua)) {
    device = 'Tablet';
  } else if (/bot|crawler|spider|crawling/i.test(ua)) {
    device = 'Bot/Crawler';
  }

  // 2. Operating System
  let os = 'Unknown OS';
  if (ua.includes('windows nt 10.0')) os = 'Windows 10/11';
  else if (ua.includes('windows nt 6.3')) os = 'Windows 8.1';
  else if (ua.includes('windows nt 6.2')) os = 'Windows 8';
  else if (ua.includes('windows nt 6.1')) os = 'Windows 7';
  else if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) os = 'iOS';
  else if (ua.includes('mac os x') || ua.includes('macintosh')) os = 'macOS';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('cros')) os = 'Chrome OS';

  // 3. Browser
  let browser = 'Unknown Browser';
  if (ua.includes('edg/')) browser = 'Edge';
  else if (ua.includes('opr/') || ua.includes('opera/')) browser = 'Opera';
  else if (ua.includes('chrome/') && !ua.includes('edg/')) browser = 'Chrome';
  else if (ua.includes('safari/') && !ua.includes('chrome/')) browser = 'Safari';
  else if (ua.includes('firefox/')) browser = 'Firefox';
  else if (ua.includes('msie') || ua.includes('trident/')) browser = 'Internet Explorer';
  else if (device === 'Bot/Crawler') browser = 'Bot/Spider';

  return { browser, os, device };
}
