'use strict';
(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const config = window.STORARMOR_SITE || {};
  function publicHttps(value) {
    if (!value) return null;
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) return null;
      return url.href;
    } catch { return null; }
  }
  const download = publicHttps(config.demoDownloadUrl);
  if (download) {
    const link = document.getElementById('demo-download');
    link.href = download;
    link.hidden = false;
    document.getElementById('demo-availability').textContent = 'Free for Windows 10 or 11, 64-bit. No purchase required to explore the demo.';
    document.getElementById('demo-faq').textContent = 'Yes. Use the free demo download on this page. The Windows program includes fictional records, separate from real company data. Demo changes do not transfer into your licensed company.';
  }
  const dialog = document.getElementById('image-dialog');
  const large = document.getElementById('large-preview');
  document.querySelectorAll('[data-image-preview]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || !dialog.showModal) return;
      event.preventDefault();
      large.src = link.href;
      large.alt = link.querySelector('img').alt;
      dialog.showModal();
    });
  });
  document.getElementById('close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
})();
