import { test as tape } from '@substrate-system/tapzero'
import { path } from '../src/index.js'

// Test thrown TypeErrors
var typeErrorTests = [true, false, 7, null, {}, undefined, [], NaN];

function fail(t, fn) {
  var args = [].slice.call(arguments, 1);

  try {
    fn.apply(null, args);
  } catch (err) {
    t.ok(err, TypeError)
  }
}

tape.skip('path.posix TypeErrors', function (t) {
  typeErrorTests.forEach(function (test) {
    fail(t, path.posix.join, test);
    fail(t, path.posix.resolve, test);
    fail(t, path.posix.normalize, test);
    fail(t, path.posix.isAbsolute, test);
    fail(t, path.posix.relative, test, 'foo');
    fail(t, path.posix.relative, 'foo', test);
    fail(t, path.posix.parse, test);
    fail(t, path.posix.dirname, test);
    fail(t, path.posix.basename, test);
    fail(t, path.posix.extname, test);

    // undefined is a valid value as the second argument to basename
    if (test !== undefined) {
      fail(t, path.posix.basename, 'foo', test);
    }
  });
});

tape.skip('path.win32 TypeErrors', function (t) {
  typeErrorTests.forEach(function (test) {
    fail(t, path.win32.join, test);
    fail(t, path.win32.resolve, test);
    fail(t, path.win32.normalize, test);
    fail(t, path.win32.isAbsolute, test);
    fail(t, path.win32.relative, test, 'foo');
    fail(t, path.win32.relative, 'foo', test);
    fail(t, path.win32.parse, test);
    fail(t, path.win32.dirname, test);
    fail(t, path.win32.basename, test);
    fail(t, path.win32.extname, test);

    // undefined is a valid value as the second argument to basename
    if (test !== undefined) {
      fail(t, path.win32.basename, 'foo', test);
    }
  });
});

// path.sep tests
tape.skip('path.win32.sep', function (t) {
  // windows
  t.equal(path.win32.sep, '\\');
});

tape.skip('path.posix.sep', function (t) {
  // posix
  t.equal(path.posix.sep, '/');
});

// path.delimiter tests
tape.skip('path.win32.delimiter', function (t) {
  // windows
  t.equal(path.win32.delimiter, ';');
});
tape.skip('path.posix.delimiter', function (t) {
  // posix
  t.equal(path.posix.delimiter, ':');
});

tape('path', function (t) {
  t.equal(path, path.posix);
});

