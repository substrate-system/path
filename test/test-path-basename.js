import { test as tape} from '@substrate-system/tapzero'
import { path } from '../src/index.js'
const __filename = '/abc/123/bundle.js'

tape('path.basename', function (t) {
  t.equal(path.basename(__filename), 'bundle.js');
  t.equal(path.basename(__filename, '.js'), 'bundle');
  t.equal(path.basename('.js', '.js'), '');
  t.equal(path.basename(''), '');
  t.equal(path.basename('/dir/basename.ext'), 'basename.ext');
  t.equal(path.basename('/basename.ext'), 'basename.ext');
  t.equal(path.basename('basename.ext'), 'basename.ext');
  t.equal(path.basename('basename.ext/'), 'basename.ext');
  t.equal(path.basename('basename.ext//'), 'basename.ext');
  t.equal(path.basename('aaa/bbb', '/bbb'), 'bbb');
  t.equal(path.basename('aaa/bbb', 'a/bbb'), 'bbb');
  t.equal(path.basename('aaa/bbb', 'bbb'), 'bbb');
  t.equal(path.basename('aaa/bbb//', 'bbb'), 'bbb');
  t.equal(path.basename('aaa/bbb', 'bb'), 'b');
  t.equal(path.basename('aaa/bbb', 'b'), 'bb');
  t.equal(path.basename('/aaa/bbb', '/bbb'), 'bbb');
  t.equal(path.basename('/aaa/bbb', 'a/bbb'), 'bbb');
  t.equal(path.basename('/aaa/bbb', 'bbb'), 'bbb');
  t.equal(path.basename('/aaa/bbb//', 'bbb'), 'bbb');
  t.equal(path.basename('/aaa/bbb', 'bb'), 'b');
  t.equal(path.basename('/aaa/bbb', 'b'), 'bb');
  t.equal(path.basename('/aaa/bbb'), 'bbb');
  t.equal(path.basename('/aaa/'), 'aaa');
  t.equal(path.basename('/aaa/b'), 'b');
  t.equal(path.basename('/a/b'), 'b');
  t.equal(path.basename('//a'), 'a');
})

tape.skip('path.win32.basename', function (t) {
  // On Windows a backslash acts as a path separator.
  t.equal(path.win32.basename('\\dir\\basename.ext'), 'basename.ext');
  t.equal(path.win32.basename('\\basename.ext'), 'basename.ext');
  t.equal(path.win32.basename('basename.ext'), 'basename.ext');
  t.equal(path.win32.basename('basename.ext\\'), 'basename.ext');
  t.equal(path.win32.basename('basename.ext\\\\'), 'basename.ext');
  t.equal(path.win32.basename('foo'), 'foo');
  t.equal(path.win32.basename('aaa\\bbb', '\\bbb'), 'bbb');
  t.equal(path.win32.basename('aaa\\bbb', 'a\\bbb'), 'bbb');
  t.equal(path.win32.basename('aaa\\bbb', 'bbb'), 'bbb');
  t.equal(path.win32.basename('aaa\\bbb\\\\\\\\', 'bbb'), 'bbb');
  t.equal(path.win32.basename('aaa\\bbb', 'bb'), 'b');
  t.equal(path.win32.basename('aaa\\bbb', 'b'), 'bb');
  t.equal(path.win32.basename('C:'), '');
  t.equal(path.win32.basename('C:.'), '.');
  t.equal(path.win32.basename('C:\\'), '');
  t.equal(path.win32.basename('C:\\dir\\base.ext'), 'base.ext');
  t.equal(path.win32.basename('C:\\basename.ext'), 'basename.ext');
  t.equal(path.win32.basename('C:basename.ext'), 'basename.ext');
  t.equal(path.win32.basename('C:basename.ext\\'), 'basename.ext');
  t.equal(path.win32.basename('C:basename.ext\\\\'), 'basename.ext');
  t.equal(path.win32.basename('C:foo'), 'foo');
  t.equal(path.win32.basename('file:stream'), 'file:stream');
});

tape('On unix a backslash is just treated as any other character.', function (t) {
  t.equal(path.posix.basename('\\dir\\basename.ext'),
                     '\\dir\\basename.ext');
  t.equal(path.posix.basename('\\basename.ext'), '\\basename.ext');
  t.equal(path.posix.basename('basename.ext'), 'basename.ext');
  t.equal(path.posix.basename('basename.ext\\'), 'basename.ext\\');
  t.equal(path.posix.basename('basename.ext\\\\'), 'basename.ext\\\\');
  t.equal(path.posix.basename('foo'), 'foo');
});

tape('POSIX filenames may include control characters', function (t) {
  // c.f. http://www.dwheeler.com/essays/fixing-unix-linux-filenames.html
  var controlCharFilename = "Icon" + (String.fromCharCode(13));
  t.equal(path.posix.basename(("/a/b/" + controlCharFilename)),
                     controlCharFilename);
});
