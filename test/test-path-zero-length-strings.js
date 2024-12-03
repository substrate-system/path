import { test as tape } from '@substrate-system/tapzero'
import { path } from '../src/index.js'

// These testcases are specific to one uncommon behavior in path module. Few
// of the functions in path module, treat '' strings as current working
// directory. This test makes sure that the behavior is intact between commits.
// See: https://github.com/nodejs/node/pull/2106

var pwd = process.cwd();

tape('path.join zero-length', function (t) {
  // join will internally ignore all the zero-length strings and it will return
  // '.' if the joined string is a zero-length string.
  t.equal(path.posix.join(''), '.');
  t.equal(path.posix.join('', ''), '.');
  if (path.win32) t.equal(path.win32.join(''), '.');
  if (path.win32) t.equal(path.win32.join('', ''), '.');
  t.equal(path.join(pwd), pwd);
  t.equal(path.join(pwd, ''), pwd);
});

tape('path.normalize zero-length', function (t) {
  // normalize will return '.' if the input is a zero-length string
  t.equal(path.posix.normalize(''), '.');
  if (path.win32) t.equal(path.win32.normalize(''), '.');
  t.equal(path.normalize(pwd), pwd);
});

tape('path.isAbsolute zero-length', function (t) {
  // Since '' is not a valid path in any of the common environments, return false
  t.equal(path.posix.isAbsolute(''), false);
  if (path.win32) t.equal(path.win32.isAbsolute(''), false);
});

tape('path.resolve zero-length', function (t) {
  // resolve, internally ignores all the zero-length strings and returns the
  // current working directory
  t.equal(path.resolve(''), pwd);
  t.equal(path.resolve('', ''), pwd);
});

tape('path.relative zero-length', function (t) {
  // relative, internally calls resolve. So, '' is actually the current directory
  t.equal(path.relative('', pwd), '');
  t.equal(path.relative(pwd, ''), '');
  t.equal(path.relative(pwd, pwd), '');
});
