'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const publicFiles = require('./public-files');
const {check} = require('./check');

const root = fs.realpathSync(path.resolve(__dirname, '..'));
const output = path.resolve(root, 'dist');
check(root);
// Verify the exact generated directory before removing a previous build.
assert.equal(path.dirname(output), root);
assert.equal(path.basename(output), 'dist');
if (fs.existsSync(output)) {
  assert(!fs.lstatSync(output).isSymbolicLink(), 'Refusing to replace a linked build directory');
  assert.equal(fs.realpathSync(output), output, 'Build directory must resolve inside this checkout');
  fs.rmSync(output, {recursive: true});
}
fs.mkdirSync(output);
for (const name of publicFiles) {
  const destination = path.join(output, name);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.copyFileSync(path.join(root, name), destination);
}
check(output);
console.log(`Built ${publicFiles.length} reviewed public files in dist. Source, configuration, and repository metadata are excluded.`);
