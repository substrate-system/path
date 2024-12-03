import { test as tape } from '@substrate-system/tapzero'
import path from '../src/index.js'

tape('path.posix.dirname', function (t) {
  t.equal(path.posix.dirname('/a/b/'), '/a');
  t.equal(path.posix.dirname('/a/b'), '/a');
  t.equal(path.posix.dirname('/a'), '/');
  t.equal(path.posix.dirname(''), '.');
  t.equal(path.posix.dirname('/'), '/');
  t.equal(path.posix.dirname('////'), '/');
  t.equal(path.posix.dirname('//a'), '//');
  t.equal(path.posix.dirname('foo'), '.');
});

tape.skip('path.win32.dirname', function (t) {
  t.equal(path.win32.dirname('c:\\'), 'c:\\');
  t.equal(path.win32.dirname('c:\\foo'), 'c:\\');
  t.equal(path.win32.dirname('c:\\foo\\'), 'c:\\');
  t.equal(path.win32.dirname('c:\\foo\\bar'), 'c:\\foo');
  t.equal(path.win32.dirname('c:\\foo\\bar\\'), 'c:\\foo');
  t.equal(path.win32.dirname('c:\\foo\\bar\\baz'), 'c:\\foo\\bar');
  t.equal(path.win32.dirname('\\'), '\\');
  t.equal(path.win32.dirname('\\foo'), '\\');
  t.equal(path.win32.dirname('\\foo\\'), '\\');
  t.equal(path.win32.dirname('\\foo\\bar'), '\\foo');
  t.equal(path.win32.dirname('\\foo\\bar\\'), '\\foo');
  t.equal(path.win32.dirname('\\foo\\bar\\baz'), '\\foo\\bar');
  t.equal(path.win32.dirname('c:'), 'c:');
  t.equal(path.win32.dirname('c:foo'), 'c:');
  t.equal(path.win32.dirname('c:foo\\'), 'c:');
  t.equal(path.win32.dirname('c:foo\\bar'), 'c:foo');
  t.equal(path.win32.dirname('c:foo\\bar\\'), 'c:foo');
  t.equal(path.win32.dirname('c:foo\\bar\\baz'), 'c:foo\\bar');
  t.equal(path.win32.dirname('file:stream'), '.');
  t.equal(path.win32.dirname('dir\\file:stream'), 'dir');
  t.equal(path.win32.dirname('\\\\unc\\share'),
                '\\\\unc\\share');
  t.equal(path.win32.dirname('\\\\unc\\share\\foo'),
                '\\\\unc\\share\\');
  t.equal(path.win32.dirname('\\\\unc\\share\\foo\\'),
                '\\\\unc\\share\\');
  t.equal(path.win32.dirname('\\\\unc\\share\\foo\\bar'),
                '\\\\unc\\share\\foo');
  t.equal(path.win32.dirname('\\\\unc\\share\\foo\\bar\\'),
                '\\\\unc\\share\\foo');
  t.equal(path.win32.dirname('\\\\unc\\share\\foo\\bar\\baz'),
                '\\\\unc\\share\\foo\\bar');
  t.equal(path.win32.dirname('/a/b/'), '/a');
  t.equal(path.win32.dirname('/a/b'), '/a');
  t.equal(path.win32.dirname('/a'), '/');
  t.equal(path.win32.dirname(''), '.');
  t.equal(path.win32.dirname('/'), '/');
  t.equal(path.win32.dirname('////'), '/');
  t.equal(path.win32.dirname('foo'), '.');
});
