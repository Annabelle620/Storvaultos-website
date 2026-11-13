'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const publicFiles = require('./public-files');

function check(directory) {
  const root = fs.realpathSync(directory);
  for (const name of publicFiles) {
    const file = path.join(root, name);
    assert(fs.lstatSync(file).isFile(), `Public asset must be an ordinary file: ${name}`);
    assert(!fs.lstatSync(file).isSymbolicLink(), `Public asset must not be a symbolic link: ${name}`);
    const relative = path.relative(root, fs.realpathSync(file));
    assert(!relative.startsWith('..') && !path.isAbsolute(relative), `Public asset must stay in the site: ${name}`);
    if (/\.(html|css|js)$/.test(name)) {
      const text = fs.readFileSync(file, 'utf8');
      assert(!/sleepingbearselfstorage\.com|-----BEGIN (?:ENCRYPTED |RSA |EC )?PRIVATE KEY-----|(?:postgres(?:ql)?:\/\/)/i.test(text), `Private application destination or credential in ${name}`);
      if (name.endsWith('.js')) new vm.Script(text, {filename: name});
    }
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith('#')) assert(ids.includes(value.slice(1)), `Missing anchor: ${value}`);
    else if (!value.startsWith('https://')) assert(publicFiles.includes(value), `Unapproved or missing public link: ${value}`);
  }
  for (const oldAnchor of ['features', 'purchase', 'faq']) assert(ids.includes(oldAnchor), `Existing anchor must remain: ${oldAnchor}`);
  const context = {window: {}};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'site-config.js'), 'utf8'), context);
  for (const [key, value] of Object.entries(context.window.STORVAULT_SITE)) {
    if (!value) continue;
    const url = new URL(value);
    assert.equal(url.protocol, 'https:', `${key} must use HTTPS`);
    assert(!url.username && !url.password, `${key} must not contain credentials`);
    if (key === 'payhipProductUrl') assert.equal(url.hostname, 'payhip.com', 'Use the verified Payhip product host');
  }
  return publicFiles.length;
}

if (require.main === module) {
  const root = path.resolve(__dirname, '..');
  console.log(`Website checks passed: ${check(root)} public files, working anchors, valid scripts, and no management-app destinations.`);
}
module.exports = {check};
