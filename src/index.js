const ANALYTICS = `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","w0vhf9r9mx");</script><script async src="https://www.googletagmanager.com/gtag/js?id=G-FXR34MEGL6"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-FXR34MEGL6");</script>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect .html URLs to clean URLs with 301
    if (url.pathname.endsWith('.html')) {
      const cleanPath = url.pathname.slice(0, -5) || '/';
      url.pathname = cleanPath;
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);

    // Inject analytics into HTML pages
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      let html = await response.text();

      // Inject only if not already present (avoid double injection)
      if (!html.includes('G-FXR34MEGL6')) {
        html = html.replace('</head>', ANALYTICS + '</head>');
      }

      return new Response(html, {
        status: response.status,
        headers: response.headers,
      });
    }

    return response;
  }
}
