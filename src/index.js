export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect .html URLs to clean URLs with 301
    if (url.pathname.endsWith('.html')) {
      const cleanPath = url.pathname.slice(0, -5) || '/';
      url.pathname = cleanPath;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
}
