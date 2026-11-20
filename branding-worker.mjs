// Preserve the current assets and public address while updating the product name.
export default {
 async fetch(request,env) {
  const response=await env.ASSETS.fetch(request);
  if(!response.headers.get('content-type')?.includes('text/html'))return response;
  const html=(await response.text()).replace(/\bStorVaultOS\b/g,'StorVault').replaceAll('StorVault<span>OS</span>','StorVault');
  const headers=new Headers(response.headers);
  headers.delete('content-length');headers.delete('etag');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
 }
};
