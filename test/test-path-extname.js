'use strict';
import { test as tape } from '@substrate-system/tapzero'
import { path } from '../src/index.js'
const __filename = '/abc/123/bundle.js'

var slashRE = /\//g;

var pairs = [
  [__filename, '.js'],
  ['', ''],
  ['/path/to/file', ''],
  ['/path/to/file.ext', '.ext'],
  ['/path.to/file.ext', '.ext'],
  ['/path.to/file', ''],
  ['/path.to/.file', ''],
  ['/path.to/.file.ext', '.ext'],
  ['/path/to/f.ext', '.ext'],
  ['/path/to/..ext', '.ext'],
  ['/path/to/..', ''],
  ['file', ''],
  ['file.ext', '.ext'],
  ['.file', ''],
  ['.file.ext', '.ext'],
  ['/file', ''],
  ['/file.ext', '.ext'],
  ['/.file', ''],
  ['/.file.ext', '.ext'],
  ['.path/file.ext', '.ext'],
  ['file.ext.ext', '.ext'],
  ['file.', '.'],
  ['.', ''],
  ['./', ''],
  ['.file.ext', '.ext'],
  ['.file', ''],
  ['.file.', '.'],
  ['.file..', '.'],
  ['..', ''],
  ['../', ''],
  ['..file.ext', '.ext'],
  ['..file', '.file'],
  ['..file.', '.'],
  ['..file..', '.'],
  ['...', '.'],
  ['...ext', '.ext'],
  ['....', '.'],
  ['file.ext/', '.ext'],
  ['file.ext//', '.ext'],
  ['file/', ''],
  ['file//', ''],
  ['file./', '.'],
  ['file.//', '.'] ];

tape('path.posix.extname', function (t) {
  pairs.forEach(function (p) {
    var input = p[0];
    var expected = p[1];
    t.equal(expected, path.posix.extname(input));
  });
});

tape.skip('path.win32.extname', function (t) {
  pairs.forEach(function (p) {
    var input = p[0].replace(slashRE, '\\');
    var expected = p[1];
    t.equal(expected, path.win32.extname(input));
    t.equal(expected, path.win32.extname("C:" + input));
  });
});

tape.skip('path.win32.extname backslash', function (t) {
  // On Windows, backslash is a path separator.
  t.equal(path.win32.extname('.\\'), '');
  t.equal(path.win32.extname('..\\'), '');
  t.equal(path.win32.extname('file.ext\\'), '.ext');
  t.equal(path.win32.extname('file.ext\\\\'), '.ext');
  t.equal(path.win32.extname('file\\'), '');
  t.equal(path.win32.extname('file\\\\'), '');
  t.equal(path.win32.extname('file.\\'), '.');
  t.equal(path.win32.extname('file.\\\\'), '.');
});

tape('path.posix.extname backslash', function (t) {
  // On *nix, backslash is a valid name component like any other character.
  t.equal(path.posix.extname('.\\'), '');
  t.equal(path.posix.extname('..\\'), '.\\');
  t.equal(path.posix.extname('file.ext\\'), '.ext\\');
  t.equal(path.posix.extname('file.ext\\\\'), '.ext\\\\');
  t.equal(path.posix.extname('file\\'), '');
  t.equal(path.posix.extname('file\\\\'), '');
  t.equal(path.posix.extname('file.\\'), '.\\');
  t.equal(path.posix.extname('file.\\\\'), '.\\\\');
});

