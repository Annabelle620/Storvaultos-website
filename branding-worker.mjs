export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if ((request.method === 'GET' || request.method === 'HEAD') && url.pathname === '/index.html') {
      url.pathname = '/';
      return Response.redirect(url, 301);
    }
    return env.ASSETS.fetch(request);
  }
};
