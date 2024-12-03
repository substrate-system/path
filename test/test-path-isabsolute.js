import { test as tape } from '@substrate-system/tapzero'
import { path } from '../src/index.js'

tape.skip('path.win32.isAbsolute', function (t) {
  t.equal(path.win32.isAbsolute('/'), true);
  t.equal(path.win32.isAbsolute('//'), true);
  t.equal(path.win32.isAbsolute('//server'), true);
  t.equal(path.win32.isAbsolute('//server/file'), true);
  t.equal(path.win32.isAbsolute('\\\\server\\file'), true);
  t.equal(path.win32.isAbsolute('\\\\server'), true);
  t.equal(path.win32.isAbsolute('\\\\'), true);
  t.equal(path.win32.isAbsolute('c'), false);
  t.equal(path.win32.isAbsolute('c:'), false);
  t.equal(path.win32.isAbsolute('c:\\'), true);
  t.equal(path.win32.isAbsolute('c:/'), true);
  t.equal(path.win32.isAbsolute('c://'), true);
  t.equal(path.win32.isAbsolute('C:/Users/'), true);
  t.equal(path.win32.isAbsolute('C:\\Users\\'), true);
  t.equal(path.win32.isAbsolute('C:cwd/another'), false);
  t.equal(path.win32.isAbsolute('C:cwd\\another'), false);
  t.equal(path.win32.isAbsolute('directory/directory'), false);
  t.equal(path.win32.isAbsolute('directory\\directory'), false);
});

tape('path.posix.isAbsolute', function (t) {
  t.equal(path.posix.isAbsolute('/home/foo'), true);
  t.equal(path.posix.isAbsolute('/home/foo/..'), true);
  t.equal(path.posix.isAbsolute('bar/'), false);
  t.equal(path.posix.isAbsolute('./baz'), false);
});
