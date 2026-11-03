import { handleEnquiry } from './enquiries.mjs';
import { redirects } from '../site/src/data/redirects.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/enquiries' || url.pathname === '/api/enquiries/') return handleEnquiry(request, env);
    const destination = redirects[url.pathname.replace(/\/$/, '') + '/'];
    if (destination) {
      const target = new URL(destination, url.origin);
      target.search = url.search;
      return Response.redirect(target.href, 301);
    }
    const response = await env.ASSETS.fetch(request);
    // This configuration is for the test deployment only.
    const result = new Response(response.body, response);
    result.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return result;
  },
};
