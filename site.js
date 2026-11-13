'use strict';
(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const config = window.STORVAULT_SITE || {};
  function publicHttps(value, requiredHost) {
    if (!value) return null;
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) return null;
      if (requiredHost && url.hostname !== requiredHost) return null;
      return url.href;
    } catch { return null; }
  }
  const payhip = publicHttps(config.payhipProductUrl, 'payhip.com');
  if (payhip) {
    const link = document.getElementById('payhip-purchase');
    link.href = payhip;
    link.hidden = false;
    document.getElementById('payhip-placeholder').hidden = true;
    document.getElementById('purchase-note').textContent = 'Purchase securely through Payhip.';
    document.getElementById('purchase-detail').textContent = 'Review the current price, included download, and activation instructions on the product page before you purchase.';
    const answer = document.getElementById('purchase-faq');
    answer.textContent = 'Use the verified Payhip product page to review the price, download details, and activation process. ';
    const faqLink = document.createElement('a');
    faqLink.href = payhip;
    faqLink.textContent = 'View StorVaultOS on Payhip.';
    answer.append(faqLink);
  }
  const download = publicHttps(config.demoDownloadUrl);
  if (download) {
    const link = document.getElementById('demo-download');
    link.href = download;
    link.hidden = false;
    document.getElementById('demo-availability').textContent = 'Download for Windows 10 or 11, 64-bit. Choose the fictional demo before activation.';
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
