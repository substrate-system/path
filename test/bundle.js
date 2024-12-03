"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // node_modules/@substrate-system/tapzero/dist/index.js
  var __defProp2 = Object.defineProperty;
  var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
  function equal(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor)
        return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!equal(a[i], b[i]))
            return false;
        return true;
      }
      if (a.constructor === RegExp)
        return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf)
        return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString)
        return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  }
  __name(equal, "equal");
  __name2(equal, "equal");
  var NEW_LINE_REGEX = /\n/g;
  var OBJ_TO_STRING = Object.prototype.toString;
  var AT_REGEX = new RegExp(
    // non-capturing group for 'at '
    "^(?:[^\\s]*\\s*\\bat\\s+)(?:(.*)\\s+\\()?((?:\\/|[a-zA-Z]:\\\\)[^:\\)]+:(\\d+)(?::(\\d+))?)\\)$"
  );
  var CACHED_FILE;
  var _a;
  var Test = (_a = class {
    /**
     * @constructor
     * @param {string} name
     * @param {TestFn} fn
     * @param {TestRunner} runner
     */
    constructor(name, fn, runner) {
      this.name = name;
      this._planned = null;
      this._actual = null;
      this.fn = fn;
      this.runner = runner;
      this._result = {
        pass: 0,
        fail: 0
      };
      this.done = false;
      this.strict = runner.strict;
    }
    /**
     * @param {string} msg
     * @returns {void}
     */
    comment(msg) {
      this.runner.report("# " + msg);
    }
    /**
     * Plan the number of assertions.
     *
     * @param {number} n
     * @returns {void}
     */
    plan(n) {
      this._planned = n;
    }
    /**
     * @template T
     * @param {T} actual
     * @param {T} expected
     * @param {string} [msg]
     * @returns {void}
     */
    deepEqual(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        equal(actual, expected),
        actual,
        expected,
        msg || "should be equivalent",
        "deepEqual"
      );
    }
    /**
     * @template T
     * @param {T} actual
     * @param {T} expected
     * @param {string} [msg]
     * @returns {void}
     */
    notDeepEqual(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        !equal(actual, expected),
        actual,
        expected,
        msg || "should not be equivalent",
        "notDeepEqual"
      );
    }
    /**
     * @template T
     * @param {T} actual
     * @param {T} expected
     * @param {string} [msg]
     * @returns {void}
     */
    equal(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        // eslint-disable-next-line eqeqeq
        actual == expected,
        actual,
        expected,
        msg || "should be equal",
        "equal"
      );
    }
    /**
     * @param {unknown} actual
     * @param {unknown} expected
     * @param {string} [msg]
     * @returns {void}
     */
    notEqual(actual, expected, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        // eslint-disable-next-line eqeqeq
        actual != expected,
        actual,
        expected,
        msg || "should not be equal",
        "notEqual"
      );
    }
    /**
     * @param {string} [msg]
     * @returns {void}
     */
    fail(msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        false,
        "fail called",
        "fail not called",
        msg || "fail called",
        "fail"
      );
    }
    /**
     * @param {unknown} actual
     * @param {string} [msg]
     * @returns {void}
     */
    ok(actual, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        !!actual,
        actual,
        "truthy value",
        msg || "should be truthy",
        "ok"
      );
    }
    /**
     * @param {Error | null | undefined} err
     * @param {string} [msg]
     * @returns {void}
     */
    ifError(err, msg) {
      if (this.strict && !msg)
        throw new Error("tapzero msg required");
      this._assert(
        !err,
        err,
        "no error",
        msg || String(err),
        "ifError"
      );
    }
    /**
     * @param {Function} fn
     * @param {RegExp | any} [expected]
     * @param {string} [message]
     * @returns {Promise<void>}
     */
    async throws(fn, expected, message) {
      if (typeof expected === "string") {
        message = expected;
        expected = void 0;
      }
      if (this.strict && !message)
        throw new Error("tapzero msg required");
      let caught = void 0;
      try {
        await fn();
      } catch (err) {
        caught = /** @type {Error} */
        err;
      }
      let pass = !!caught;
      if (expected instanceof RegExp) {
        pass = !!(caught && expected.test(caught.message));
      } else if (expected) {
        throw new Error(`t.throws() not implemented for expected: ${typeof expected}`);
      }
      this._assert(pass, caught, expected, message || "should throw", "throws");
    }
    /**
     * @param {boolean} pass
     * @param {unknown} actual
     * @param {unknown} expected
     * @param {string} description
     * @param {string} operator
     * @returns {void}
     */
    _assert(pass, actual, expected, description, operator) {
      if (this.done) {
        throw new Error(
          "assertion occurred after test was finished: " + this.name
        );
      }
      if (this._planned !== null) {
        this._actual = (this._actual || 0) + 1;
        if (this._actual > this._planned) {
          throw new Error(`More tests than planned in TEST *${this.name}*`);
        }
      }
      const report = this.runner.report;
      const prefix = pass ? "ok" : "not ok";
      const id = this.runner.nextId();
      report(`${prefix} ${id} ${description}`);
      if (pass) {
        this._result.pass++;
        return;
      }
      const atErr = new Error(description);
      let err = atErr;
      if (actual && OBJ_TO_STRING.call(actual) === "[object Error]") {
        err = /** @type {Error} */
        actual;
        actual = err.message;
      }
      this._result.fail++;
      report("  ---");
      report(`    operator: ${operator}`);
      let ex = toJSON(expected);
      let ac = toJSON(actual);
      if (Math.max(ex.length, ac.length) > 65) {
        ex = ex.replace(NEW_LINE_REGEX, "\n      ");
        ac = ac.replace(NEW_LINE_REGEX, "\n      ");
        report(`    expected: |-
      ${ex}`);
        report(`    actual:   |-
      ${ac}`);
      } else {
        report(`    expected: ${ex}`);
        report(`    actual:   ${ac}`);
      }
      const at = findAtLineFromError(atErr);
      if (at) {
        report(`    at:       ${at}`);
      }
      report("    stack:    |-");
      const st = (err.stack || "").split("\n");
      for (const line of st) {
        report(`      ${line}`);
      }
      report("  ...");
    }
    /**
     * @returns {Promise<{
     *   pass: number,
     *   fail: number
     * }>}
     */
    async run() {
      this.runner.report("# " + this.name);
      const maybeP = this.fn(this);
      if (maybeP && typeof maybeP.then === "function") {
        await maybeP;
      }
      this.done = true;
      if (this._planned !== null) {
        if (this._planned > (this._actual || 0)) {
          throw new Error(
            `Test ended before the planned number
          planned: ${this._planned}
          actual: ${this._actual || 0}
          `
          );
        }
      }
      return this._result;
    }
  }, __name(_a, "Test"), __name2(_a, "Test"), _a);
  function getTapZeroFileName() {
    if (CACHED_FILE)
      return CACHED_FILE;
    const e = new Error("temp");
    const lines = (e.stack || "").split("\n");
    for (const line of lines) {
      const m = AT_REGEX.exec(line);
      if (!m) {
        continue;
      }
      let fileName = m[2];
      if (m[4] && fileName.endsWith(`:${m[4]}`)) {
        fileName = fileName.slice(0, fileName.length - m[4].length - 1);
      }
      if (m[3] && fileName.endsWith(`:${m[3]}`)) {
        fileName = fileName.slice(0, fileName.length - m[3].length - 1);
      }
      CACHED_FILE = fileName;
      break;
    }
    return CACHED_FILE || "";
  }
  __name(getTapZeroFileName, "getTapZeroFileName");
  __name2(getTapZeroFileName, "getTapZeroFileName");
  function findAtLineFromError(e) {
    const lines = (e.stack || "").split("\n");
    const dir = getTapZeroFileName();
    for (const line of lines) {
      const m = AT_REGEX.exec(line);
      if (!m) {
        continue;
      }
      if (m[2].slice(0, dir.length) === dir) {
        continue;
      }
      return `${m[1] || "<anonymous>"} (${m[2]})`;
    }
    return "";
  }
  __name(findAtLineFromError, "findAtLineFromError");
  __name2(findAtLineFromError, "findAtLineFromError");
  var _a2;
  var TestRunner = (_a2 = class {
    /**
     * @constructor
     * @param {(lines: string) => void} [report]
     */
    constructor(report) {
      this.report = report || printLine;
      this.tests = [];
      this.onlyTests = [];
      this.scheduled = false;
      this._id = 0;
      this.completed = false;
      this.rethrowExceptions = true;
      this.strict = false;
      this._onFinishCallback = void 0;
    }
    /**
     * @returns {string}
     */
    nextId() {
      return String(++this._id);
    }
    /**
     * @param {string} name
     * @param {TestFn} fn
     * @param {boolean} only
     * @returns {void}
     */
    add(name, fn, only2) {
      if (this.completed) {
        throw new Error("Cannot add() a test case after tests completed.");
      }
      const t = new Test(name, fn, this);
      const arr = only2 ? this.onlyTests : this.tests;
      arr.push(t);
      if (!this.scheduled) {
        this.scheduled = true;
        setTimeout(() => {
          const promise = this.run();
          if (this.rethrowExceptions) {
            promise.then(null, rethrowImmediate);
          }
        }, 0);
      }
    }
    /**
     * @returns {Promise<void>}
     */
    async run() {
      const ts = this.onlyTests.length > 0 ? this.onlyTests : this.tests;
      this.report("TAP version 13");
      let total = 0;
      let success = 0;
      let fail2 = 0;
      for (const test2 of ts) {
        const result = await test2.run();
        total += result.fail + result.pass;
        success += result.pass;
        fail2 += result.fail;
      }
      this.completed = true;
      this.report("");
      this.report(`1..${total}`);
      this.report(`# tests ${total}`);
      this.report(`# pass  ${success}`);
      if (fail2) {
        this.report(`# fail  ${fail2}`);
      } else {
        this.report("");
        this.report("# ok");
      }
      if (this._onFinishCallback) {
        this._onFinishCallback({ total, success, fail: fail2 });
      } else {
        if (typeof process !== "undefined" && typeof process.exit === "function" && typeof process.on === "function" && Reflect.get(process, "browser") !== true) {
          process.on("exit", function(code) {
            if (typeof code === "number" && code !== 0) {
              return;
            }
            if (fail2) {
              process.exit(1);
            }
          });
        }
      }
    }
    /**
     * @param {(result: { total: number, success: number, fail: number }) => void} callback
     * @returns {void}
     */
    onFinish(callback) {
      if (typeof callback === "function") {
        this._onFinishCallback = callback;
      } else
        throw new Error("onFinish() expects a function");
    }
  }, __name(_a2, "TestRunner"), __name2(_a2, "TestRunner"), _a2);
  function printLine(line) {
    console.log(line);
  }
  __name(printLine, "printLine");
  __name2(printLine, "printLine");
  var GLOBAL_TEST_RUNNER = new TestRunner();
  function only(name, fn) {
    if (!fn)
      return;
    GLOBAL_TEST_RUNNER.add(name, fn, true);
  }
  __name(only, "only");
  __name2(only, "only");
  function skip(_name, _fn) {
  }
  __name(skip, "skip");
  __name2(skip, "skip");
  function setStrict(strict) {
    GLOBAL_TEST_RUNNER.strict = strict;
  }
  __name(setStrict, "setStrict");
  __name2(setStrict, "setStrict");
  function test(name, fn) {
    if (!fn)
      return;
    GLOBAL_TEST_RUNNER.add(name, fn, false);
  }
  __name(test, "test");
  __name2(test, "test");
  test.only = only;
  test.skip = skip;
  function rethrowImmediate(err) {
    setTimeout(rethrow, 0);
    function rethrow() {
      throw err;
    }
    __name(rethrow, "rethrow");
    __name2(rethrow, "rethrow");
  }
  __name(rethrowImmediate, "rethrowImmediate");
  __name2(rethrowImmediate, "rethrowImmediate");
  function toJSON(thing) {
    const replacer = /* @__PURE__ */ __name2((_k, v) => v === void 0 ? "_tz_undefined_tz_" : v, "replacer");
    const json = JSON.stringify(thing, replacer, "  ") || "undefined";
    return json.replace(/"_tz_undefined_tz_"/g, "undefined");
  }
  __name(toJSON, "toJSON");
  __name2(toJSON, "toJSON");

  // src/index.ts
  var path = {
    // path.resolve([from ...], to)
    resolve: /* @__PURE__ */ __name(function resolve(...args) {
      let resolvedPath = "";
      let resolvedAbsolute = false;
      let cwd;
      for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        let path2;
        if (i >= 0) {
          path2 = args[i];
        } else {
          if (cwd === void 0) {
            cwd = process?.cwd() || "/";
          }
          path2 = cwd;
        }
        assertPath(path2);
        if (path2.length === 0) {
          continue;
        }
        resolvedPath = path2 + "/" + resolvedPath;
        resolvedAbsolute = path2.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) {
          return "/" + resolvedPath;
        } else {
          return "/";
        }
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    }, "resolve"),
    normalize: /* @__PURE__ */ __name(function normalize(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      const isAbsolute2 = path2.charCodeAt(0) === 47;
      const trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
      path2 = normalizeStringPosix(path2, !isAbsolute2);
      if (path2.length === 0 && !isAbsolute2) path2 = ".";
      if (path2.length > 0 && trailingSeparator) path2 += "/";
      if (isAbsolute2) return "/" + path2;
      return path2;
    }, "normalize"),
    isAbsolute: /* @__PURE__ */ __name(function isAbsolute(path2) {
      assertPath(path2);
      return path2.length > 0 && path2.charCodeAt(0) === 47;
    }, "isAbsolute"),
    join: /* @__PURE__ */ __name(function join(...args) {
      if (arguments.length === 0) {
        return ".";
      }
      let joined;
      for (let i = 0; i < arguments.length; ++i) {
        const arg = args[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0) {
            joined = arg;
          } else {
            joined += "/" + arg;
          }
        }
      }
      if (joined === void 0) {
        return ".";
      }
      return path.normalize(joined);
    }, "join"),
    relative: /* @__PURE__ */ __name(function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = path.resolve(from);
      to = path.resolve(to);
      if (from === to) return "";
      let fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47) {
          break;
        }
      }
      const fromEnd = from.length;
      const fromLen = fromEnd - fromStart;
      let toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47) {
          break;
        }
      }
      const toEnd = to.length;
      const toLen = toEnd - toStart;
      const length = fromLen < toLen ? fromLen : toLen;
      let lastCommonSep = -1;
      let i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) {
          break;
        } else if (fromCode === 47) {
          lastCommonSep = i;
        }
      }
      let out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) {
            out += "..";
          } else {
            out += "/..";
          }
        }
      }
      if (out.length > 0) {
        return out + to.slice(toStart + lastCommonSep);
      } else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) {
          ++toStart;
        }
        return to.slice(toStart);
      }
    }, "relative"),
    _makeLong: /* @__PURE__ */ __name(function _makeLong(path2) {
      return path2;
    }, "_makeLong"),
    dirname: /* @__PURE__ */ __name(function dirname(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      let code = path2.charCodeAt(0);
      const hasRoot = code === 47;
      let end = -1;
      let matchedSlash = true;
      for (let i = path2.length - 1; i >= 1; --i) {
        code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path2.slice(0, end);
    }, "dirname"),
    basename: /* @__PURE__ */ __name(function basename(path2, ext) {
      if (ext !== void 0 && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
      }
      assertPath(path2);
      let start = 0;
      let end = -1;
      let matchedSlash = true;
      let i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
        if (ext.length === path2.length && ext === path2) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (i = path2.length - 1; i >= 0; --i) {
          const code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path2.length;
        return path2.slice(start, end);
      } else {
        for (i = path2.length - 1; i >= 0; --i) {
          if (path2.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path2.slice(start, end);
      }
    }, "basename"),
    extname: /* @__PURE__ */ __name(function extname(path2) {
      assertPath(path2);
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let preDotState = 0;
      for (let i = path2.length - 1; i >= 0; --i) {
        const code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path2.slice(startDot, end);
    }, "extname"),
    format: /* @__PURE__ */ __name(function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
      }
      return _format("/", pathObject);
    }, "format"),
    parse: /* @__PURE__ */ __name(function parse(path2) {
      assertPath(path2);
      const ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path2.length === 0) return ret;
      let code = path2.charCodeAt(0);
      const isAbsolute2 = code === 47;
      let start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let i = path2.length - 1;
      let preDotState = 0;
      for (; i >= start; --i) {
        code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2) {
            ret.base = ret.name = path2.slice(1, end);
          } else {
            ret.base = ret.name = path2.slice(startPart, end);
          }
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path2.slice(1, startDot);
          ret.base = path2.slice(1, end);
        } else {
          ret.name = path2.slice(startPart, startDot);
          ret.base = path2.slice(startPart, end);
        }
        ret.ext = path2.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path2.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    }, "parse"),
    sep: "/",
    delimiter: ":",
    // @ts-expect-error skip this
    win32: null,
    // @ts-expect-error skip this
    posix: null
  };
  path.posix = path;
  function assertPath(path2) {
    if (typeof path2 !== "string") {
      throw new TypeError(
        "Path must be a string. Received " + JSON.stringify(path2)
      );
    }
  }
  __name(assertPath, "assertPath");
  function normalizeStringPosix(path2, allowAboveRoot) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for (let i = 0; i <= path2.length; ++i) {
      if (i < path2.length) {
        code = path2.charCodeAt(i);
      } else if (code === 47) {
        break;
      } else {
        code = 47;
      }
      if (code === 47) {
        if (lastSlash === i - 1 || dots === 1) {
        } else if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
            if (res.length > 2) {
              const lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i;
                dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            if (res.length > 0) {
              res += "/..";
            } else {
              res = "..";
            }
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0) {
            res += "/" + path2.slice(lastSlash + 1, i);
          } else {
            res = path2.slice(lastSlash + 1, i);
          }
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === 46 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  __name(normalizeStringPosix, "normalizeStringPosix");
  function _format(sep, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    if (dir === pathObject.root) {
      return dir + base;
    }
    return dir + sep + base;
  }
  __name(_format, "_format");
  var src_default = path;

  // test/test-path.js
  var typeErrorTests = [true, false, 7, null, {}, void 0, [], NaN];
  function fail(t, fn) {
    var args = [].slice.call(arguments, 1);
    try {
      fn.apply(null, args);
    } catch (err) {
      t.ok(err, TypeError);
    }
  }
  __name(fail, "fail");
  test.skip("path.posix TypeErrors", function(t) {
    typeErrorTests.forEach(function(test2) {
      fail(t, path.posix.join, test2);
      fail(t, path.posix.resolve, test2);
      fail(t, path.posix.normalize, test2);
      fail(t, path.posix.isAbsolute, test2);
      fail(t, path.posix.relative, test2, "foo");
      fail(t, path.posix.relative, "foo", test2);
      fail(t, path.posix.parse, test2);
      fail(t, path.posix.dirname, test2);
      fail(t, path.posix.basename, test2);
      fail(t, path.posix.extname, test2);
      if (test2 !== void 0) {
        fail(t, path.posix.basename, "foo", test2);
      }
    });
  });
  test.skip("path.win32 TypeErrors", function(t) {
    typeErrorTests.forEach(function(test2) {
      fail(t, path.win32.join, test2);
      fail(t, path.win32.resolve, test2);
      fail(t, path.win32.normalize, test2);
      fail(t, path.win32.isAbsolute, test2);
      fail(t, path.win32.relative, test2, "foo");
      fail(t, path.win32.relative, "foo", test2);
      fail(t, path.win32.parse, test2);
      fail(t, path.win32.dirname, test2);
      fail(t, path.win32.basename, test2);
      fail(t, path.win32.extname, test2);
      if (test2 !== void 0) {
        fail(t, path.win32.basename, "foo", test2);
      }
    });
  });
  test.skip("path.win32.sep", function(t) {
    t.equal(path.win32.sep, "\\");
  });
  test.skip("path.posix.sep", function(t) {
    t.equal(path.posix.sep, "/");
  });
  test.skip("path.win32.delimiter", function(t) {
    t.equal(path.win32.delimiter, ";");
  });
  test.skip("path.posix.delimiter", function(t) {
    t.equal(path.posix.delimiter, ":");
  });
  test("path", function(t) {
    t.equal(path, path.posix);
  });

  // test/test-path-basename.js
  var __filename = "/abc/123/bundle.js";
  test("path.basename", function(t) {
    t.equal(path.basename(__filename), "bundle.js");
    t.equal(path.basename(__filename, ".js"), "bundle");
    t.equal(path.basename(".js", ".js"), "");
    t.equal(path.basename(""), "");
    t.equal(path.basename("/dir/basename.ext"), "basename.ext");
    t.equal(path.basename("/basename.ext"), "basename.ext");
    t.equal(path.basename("basename.ext"), "basename.ext");
    t.equal(path.basename("basename.ext/"), "basename.ext");
    t.equal(path.basename("basename.ext//"), "basename.ext");
    t.equal(path.basename("aaa/bbb", "/bbb"), "bbb");
    t.equal(path.basename("aaa/bbb", "a/bbb"), "bbb");
    t.equal(path.basename("aaa/bbb", "bbb"), "bbb");
    t.equal(path.basename("aaa/bbb//", "bbb"), "bbb");
    t.equal(path.basename("aaa/bbb", "bb"), "b");
    t.equal(path.basename("aaa/bbb", "b"), "bb");
    t.equal(path.basename("/aaa/bbb", "/bbb"), "bbb");
    t.equal(path.basename("/aaa/bbb", "a/bbb"), "bbb");
    t.equal(path.basename("/aaa/bbb", "bbb"), "bbb");
    t.equal(path.basename("/aaa/bbb//", "bbb"), "bbb");
    t.equal(path.basename("/aaa/bbb", "bb"), "b");
    t.equal(path.basename("/aaa/bbb", "b"), "bb");
    t.equal(path.basename("/aaa/bbb"), "bbb");
    t.equal(path.basename("/aaa/"), "aaa");
    t.equal(path.basename("/aaa/b"), "b");
    t.equal(path.basename("/a/b"), "b");
    t.equal(path.basename("//a"), "a");
  });
  test.skip("path.win32.basename", function(t) {
    t.equal(path.win32.basename("\\dir\\basename.ext"), "basename.ext");
    t.equal(path.win32.basename("\\basename.ext"), "basename.ext");
    t.equal(path.win32.basename("basename.ext"), "basename.ext");
    t.equal(path.win32.basename("basename.ext\\"), "basename.ext");
    t.equal(path.win32.basename("basename.ext\\\\"), "basename.ext");
    t.equal(path.win32.basename("foo"), "foo");
    t.equal(path.win32.basename("aaa\\bbb", "\\bbb"), "bbb");
    t.equal(path.win32.basename("aaa\\bbb", "a\\bbb"), "bbb");
    t.equal(path.win32.basename("aaa\\bbb", "bbb"), "bbb");
    t.equal(path.win32.basename("aaa\\bbb\\\\\\\\", "bbb"), "bbb");
    t.equal(path.win32.basename("aaa\\bbb", "bb"), "b");
    t.equal(path.win32.basename("aaa\\bbb", "b"), "bb");
    t.equal(path.win32.basename("C:"), "");
    t.equal(path.win32.basename("C:."), ".");
    t.equal(path.win32.basename("C:\\"), "");
    t.equal(path.win32.basename("C:\\dir\\base.ext"), "base.ext");
    t.equal(path.win32.basename("C:\\basename.ext"), "basename.ext");
    t.equal(path.win32.basename("C:basename.ext"), "basename.ext");
    t.equal(path.win32.basename("C:basename.ext\\"), "basename.ext");
    t.equal(path.win32.basename("C:basename.ext\\\\"), "basename.ext");
    t.equal(path.win32.basename("C:foo"), "foo");
    t.equal(path.win32.basename("file:stream"), "file:stream");
  });
  test("On unix a backslash is just treated as any other character.", function(t) {
    t.equal(
      path.posix.basename("\\dir\\basename.ext"),
      "\\dir\\basename.ext"
    );
    t.equal(path.posix.basename("\\basename.ext"), "\\basename.ext");
    t.equal(path.posix.basename("basename.ext"), "basename.ext");
    t.equal(path.posix.basename("basename.ext\\"), "basename.ext\\");
    t.equal(path.posix.basename("basename.ext\\\\"), "basename.ext\\\\");
    t.equal(path.posix.basename("foo"), "foo");
  });
  test("POSIX filenames may include control characters", function(t) {
    var controlCharFilename = "Icon" + String.fromCharCode(13);
    t.equal(
      path.posix.basename("/a/b/" + controlCharFilename),
      controlCharFilename
    );
  });

  // test/test-path-dirname.js
  test("path.posix.dirname", function(t) {
    t.equal(src_default.posix.dirname("/a/b/"), "/a");
    t.equal(src_default.posix.dirname("/a/b"), "/a");
    t.equal(src_default.posix.dirname("/a"), "/");
    t.equal(src_default.posix.dirname(""), ".");
    t.equal(src_default.posix.dirname("/"), "/");
    t.equal(src_default.posix.dirname("////"), "/");
    t.equal(src_default.posix.dirname("//a"), "//");
    t.equal(src_default.posix.dirname("foo"), ".");
  });
  test.skip("path.win32.dirname", function(t) {
    t.equal(src_default.win32.dirname("c:\\"), "c:\\");
    t.equal(src_default.win32.dirname("c:\\foo"), "c:\\");
    t.equal(src_default.win32.dirname("c:\\foo\\"), "c:\\");
    t.equal(src_default.win32.dirname("c:\\foo\\bar"), "c:\\foo");
    t.equal(src_default.win32.dirname("c:\\foo\\bar\\"), "c:\\foo");
    t.equal(src_default.win32.dirname("c:\\foo\\bar\\baz"), "c:\\foo\\bar");
    t.equal(src_default.win32.dirname("\\"), "\\");
    t.equal(src_default.win32.dirname("\\foo"), "\\");
    t.equal(src_default.win32.dirname("\\foo\\"), "\\");
    t.equal(src_default.win32.dirname("\\foo\\bar"), "\\foo");
    t.equal(src_default.win32.dirname("\\foo\\bar\\"), "\\foo");
    t.equal(src_default.win32.dirname("\\foo\\bar\\baz"), "\\foo\\bar");
    t.equal(src_default.win32.dirname("c:"), "c:");
    t.equal(src_default.win32.dirname("c:foo"), "c:");
    t.equal(src_default.win32.dirname("c:foo\\"), "c:");
    t.equal(src_default.win32.dirname("c:foo\\bar"), "c:foo");
    t.equal(src_default.win32.dirname("c:foo\\bar\\"), "c:foo");
    t.equal(src_default.win32.dirname("c:foo\\bar\\baz"), "c:foo\\bar");
    t.equal(src_default.win32.dirname("file:stream"), ".");
    t.equal(src_default.win32.dirname("dir\\file:stream"), "dir");
    t.equal(
      src_default.win32.dirname("\\\\unc\\share"),
      "\\\\unc\\share"
    );
    t.equal(
      src_default.win32.dirname("\\\\unc\\share\\foo"),
      "\\\\unc\\share\\"
    );
    t.equal(
      src_default.win32.dirname("\\\\unc\\share\\foo\\"),
      "\\\\unc\\share\\"
    );
    t.equal(
      src_default.win32.dirname("\\\\unc\\share\\foo\\bar"),
      "\\\\unc\\share\\foo"
    );
    t.equal(
      src_default.win32.dirname("\\\\unc\\share\\foo\\bar\\"),
      "\\\\unc\\share\\foo"
    );
    t.equal(
      src_default.win32.dirname("\\\\unc\\share\\foo\\bar\\baz"),
      "\\\\unc\\share\\foo\\bar"
    );
    t.equal(src_default.win32.dirname("/a/b/"), "/a");
    t.equal(src_default.win32.dirname("/a/b"), "/a");
    t.equal(src_default.win32.dirname("/a"), "/");
    t.equal(src_default.win32.dirname(""), ".");
    t.equal(src_default.win32.dirname("/"), "/");
    t.equal(src_default.win32.dirname("////"), "/");
    t.equal(src_default.win32.dirname("foo"), ".");
  });

  // test/test-path-extname.js
  var __filename2 = "/abc/123/bundle.js";
  var slashRE = /\//g;
  var pairs = [
    [__filename2, ".js"],
    ["", ""],
    ["/path/to/file", ""],
    ["/path/to/file.ext", ".ext"],
    ["/path.to/file.ext", ".ext"],
    ["/path.to/file", ""],
    ["/path.to/.file", ""],
    ["/path.to/.file.ext", ".ext"],
    ["/path/to/f.ext", ".ext"],
    ["/path/to/..ext", ".ext"],
    ["/path/to/..", ""],
    ["file", ""],
    ["file.ext", ".ext"],
    [".file", ""],
    [".file.ext", ".ext"],
    ["/file", ""],
    ["/file.ext", ".ext"],
    ["/.file", ""],
    ["/.file.ext", ".ext"],
    [".path/file.ext", ".ext"],
    ["file.ext.ext", ".ext"],
    ["file.", "."],
    [".", ""],
    ["./", ""],
    [".file.ext", ".ext"],
    [".file", ""],
    [".file.", "."],
    [".file..", "."],
    ["..", ""],
    ["../", ""],
    ["..file.ext", ".ext"],
    ["..file", ".file"],
    ["..file.", "."],
    ["..file..", "."],
    ["...", "."],
    ["...ext", ".ext"],
    ["....", "."],
    ["file.ext/", ".ext"],
    ["file.ext//", ".ext"],
    ["file/", ""],
    ["file//", ""],
    ["file./", "."],
    ["file.//", "."]
  ];
  test("path.posix.extname", function(t) {
    pairs.forEach(function(p) {
      var input = p[0];
      var expected = p[1];
      t.equal(expected, path.posix.extname(input));
    });
  });
  test.skip("path.win32.extname", function(t) {
    pairs.forEach(function(p) {
      var input = p[0].replace(slashRE, "\\");
      var expected = p[1];
      t.equal(expected, path.win32.extname(input));
      t.equal(expected, path.win32.extname("C:" + input));
    });
  });
  test.skip("path.win32.extname backslash", function(t) {
    t.equal(path.win32.extname(".\\"), "");
    t.equal(path.win32.extname("..\\"), "");
    t.equal(path.win32.extname("file.ext\\"), ".ext");
    t.equal(path.win32.extname("file.ext\\\\"), ".ext");
    t.equal(path.win32.extname("file\\"), "");
    t.equal(path.win32.extname("file\\\\"), "");
    t.equal(path.win32.extname("file.\\"), ".");
    t.equal(path.win32.extname("file.\\\\"), ".");
  });
  test("path.posix.extname backslash", function(t) {
    t.equal(path.posix.extname(".\\"), "");
    t.equal(path.posix.extname("..\\"), ".\\");
    t.equal(path.posix.extname("file.ext\\"), ".ext\\");
    t.equal(path.posix.extname("file.ext\\\\"), ".ext\\\\");
    t.equal(path.posix.extname("file\\"), "");
    t.equal(path.posix.extname("file\\\\"), "");
    t.equal(path.posix.extname("file.\\"), ".\\");
    t.equal(path.posix.extname("file.\\\\"), ".\\\\");
  });

  // test/test-path-isabsolute.js
  test.skip("path.win32.isAbsolute", function(t) {
    t.equal(path.win32.isAbsolute("/"), true);
    t.equal(path.win32.isAbsolute("//"), true);
    t.equal(path.win32.isAbsolute("//server"), true);
    t.equal(path.win32.isAbsolute("//server/file"), true);
    t.equal(path.win32.isAbsolute("\\\\server\\file"), true);
    t.equal(path.win32.isAbsolute("\\\\server"), true);
    t.equal(path.win32.isAbsolute("\\\\"), true);
    t.equal(path.win32.isAbsolute("c"), false);
    t.equal(path.win32.isAbsolute("c:"), false);
    t.equal(path.win32.isAbsolute("c:\\"), true);
    t.equal(path.win32.isAbsolute("c:/"), true);
    t.equal(path.win32.isAbsolute("c://"), true);
    t.equal(path.win32.isAbsolute("C:/Users/"), true);
    t.equal(path.win32.isAbsolute("C:\\Users\\"), true);
    t.equal(path.win32.isAbsolute("C:cwd/another"), false);
    t.equal(path.win32.isAbsolute("C:cwd\\another"), false);
    t.equal(path.win32.isAbsolute("directory/directory"), false);
    t.equal(path.win32.isAbsolute("directory\\directory"), false);
  });
  test("path.posix.isAbsolute", function(t) {
    t.equal(path.posix.isAbsolute("/home/foo"), true);
    t.equal(path.posix.isAbsolute("/home/foo/.."), true);
    t.equal(path.posix.isAbsolute("bar/"), false);
    t.equal(path.posix.isAbsolute("./baz"), false);
  });

  // test/test-path-join.js
  var backslashRE = /\\/g;
  var joinTests = (
    // arguments                     result
    [
      [[".", "x/b", "..", "/b/c.js"], "x/b/c.js"],
      [[], "."],
      [["/.", "x/b", "..", "/b/c.js"], "/x/b/c.js"],
      [["/foo", "../../../bar"], "/bar"],
      [["foo", "../../../bar"], "../../bar"],
      [["foo/", "../../../bar"], "../../bar"],
      [["foo/x", "../../../bar"], "../bar"],
      [["foo/x", "./bar"], "foo/x/bar"],
      [["foo/x/", "./bar"], "foo/x/bar"],
      [["foo/x/", ".", "bar"], "foo/x/bar"],
      [["./"], "./"],
      [[".", "./"], "./"],
      [[".", ".", "."], "."],
      [[".", "./", "."], "."],
      [[".", "/./", "."], "."],
      [[".", "/////./", "."], "."],
      [["."], "."],
      [["", "."], "."],
      [["", "foo"], "foo"],
      [["foo", "/bar"], "foo/bar"],
      [["", "/foo"], "/foo"],
      [["", "", "/foo"], "/foo"],
      [["", "", "foo"], "foo"],
      [["foo", ""], "foo"],
      [["foo/", ""], "foo/"],
      [["foo", "", "/bar"], "foo/bar"],
      [["./", "..", "/foo"], "../foo"],
      [["./", "..", "..", "/foo"], "../../foo"],
      [[".", "..", "..", "/foo"], "../../foo"],
      [["", "..", "..", "/foo"], "../../foo"],
      [["/"], "/"],
      [["/", "."], "/"],
      [["/", ".."], "/"],
      [["/", "..", ".."], "/"],
      [[""], "."],
      [["", ""], "."],
      [[" /foo"], " /foo"],
      [[" ", "foo"], " /foo"],
      [[" ", "."], " "],
      [[" ", "/"], " /"],
      [[" ", ""], " "],
      [["/", "foo"], "/foo"],
      [["/", "/foo"], "/foo"],
      [["/", "//foo"], "/foo"],
      [["/", "", "/foo"], "/foo"],
      [["", "/", "foo"], "/foo"],
      [["", "/", "/foo"], "/foo"]
    ]
  );
  var windowsJoinTests = [
    // arguments                     result
    // UNC path expected
    [["//foo/bar"], "\\\\foo\\bar\\"],
    [["\\/foo/bar"], "\\\\foo\\bar\\"],
    [["\\\\foo/bar"], "\\\\foo\\bar\\"],
    // UNC path expected - server and share separate
    [["//foo", "bar"], "\\\\foo\\bar\\"],
    [["//foo/", "bar"], "\\\\foo\\bar\\"],
    [["//foo", "/bar"], "\\\\foo\\bar\\"],
    // UNC path expected - questionable
    [["//foo", "", "bar"], "\\\\foo\\bar\\"],
    [["//foo/", "", "bar"], "\\\\foo\\bar\\"],
    [["//foo/", "", "/bar"], "\\\\foo\\bar\\"],
    // UNC path expected - even more questionable
    [["", "//foo", "bar"], "\\\\foo\\bar\\"],
    [["", "//foo/", "bar"], "\\\\foo\\bar\\"],
    [["", "//foo/", "/bar"], "\\\\foo\\bar\\"],
    // No UNC path expected (no double slash in first component)
    [["\\", "foo/bar"], "\\foo\\bar"],
    [["\\", "/foo/bar"], "\\foo\\bar"],
    [["", "/", "/foo/bar"], "\\foo\\bar"],
    // No UNC path expected (no non-slashes in first component -
    // questionable)
    [["//", "foo/bar"], "\\foo\\bar"],
    [["//", "/foo/bar"], "\\foo\\bar"],
    [["\\\\", "/", "/foo/bar"], "\\foo\\bar"],
    [["//"], "/"],
    // No UNC path expected (share name missing - questionable).
    [["//foo"], "\\foo"],
    [["//foo/"], "\\foo\\"],
    [["//foo", "/"], "\\foo\\"],
    [["//foo", "", "/"], "\\foo\\"],
    // No UNC path expected (too many leading slashes - questionable)
    [["///foo/bar"], "\\foo\\bar"],
    [["////foo", "bar"], "\\foo\\bar"],
    [["\\\\\\/foo/bar"], "\\foo\\bar"],
    // Drive-relative vs drive-absolute paths. This merely describes the
    // status quo, rather than being obviously right
    [["c:"], "c:."],
    [["c:."], "c:."],
    [["c:", ""], "c:."],
    [["", "c:"], "c:."],
    [["c:.", "/"], "c:.\\"],
    [["c:.", "file"], "c:file"],
    [["c:", "/"], "c:\\"],
    [["c:", "file"], "c:\\file"]
  ];
  test("path.posix.join", function(t) {
    joinTests.forEach(function(p) {
      var actual = path.posix.join.apply(null, p[0]);
      t.equal(actual, p[1]);
    });
  });
  test.skip("path.win32.join", function(t) {
    joinTests.forEach(function(p) {
      var actual = path.win32.join.apply(null, p[0]).replace(backslashRE, "/");
      t.equal(actual, p[1]);
    });
    windowsJoinTests.forEach(function(p) {
      var actual = path.win32.join.apply(null, p[0]);
      t.equal(actual, p[1]);
    });
  });

  // test/test-path-parse-format.js
  var winPaths = [
    // [path, root]
    ["C:\\path\\dir\\index.html", "C:\\"],
    ["C:\\another_path\\DIR\\1\\2\\33\\\\index", "C:\\"],
    ["another_path\\DIR with spaces\\1\\2\\33\\index", ""],
    ["\\", "\\"],
    ["\\foo\\C:", "\\"],
    ["file", ""],
    ["file:stream", ""],
    [".\\file", ""],
    ["C:", "C:"],
    ["C:.", "C:"],
    ["C:..", "C:"],
    ["C:abc", "C:"],
    ["C:\\", "C:\\"],
    ["C:\\abc", "C:\\"],
    ["", ""],
    // unc
    ["\\\\server\\share\\file_path", "\\\\server\\share\\"],
    [
      "\\\\server two\\shared folder\\file path.zip",
      "\\\\server two\\shared folder\\"
    ],
    ["\\\\teela\\admin$\\system32", "\\\\teela\\admin$\\"],
    ["\\\\?\\UNC\\server\\share", "\\\\?\\UNC\\"]
  ];
  var winSpecialCaseParseTests = [
    ["/foo/bar", { root: "/" }]
  ];
  var winSpecialCaseFormatTests = [
    [{ dir: "some\\dir" }, "some\\dir\\"],
    [{ base: "index.html" }, "index.html"],
    [{ root: "C:\\" }, "C:\\"],
    [{ name: "index", ext: ".html" }, "index.html"],
    [{ dir: "some\\dir", name: "index", ext: ".html" }, "some\\dir\\index.html"],
    [{ root: "C:\\", name: "index", ext: ".html" }, "C:\\index.html"],
    [{}, ""]
  ];
  var unixPaths = [
    // [path, root]
    ["/home/user/dir/file.txt", "/"],
    ["/home/user/a dir/another File.zip", "/"],
    ["/home/user/a dir//another&File.", "/"],
    ["/home/user/a$$$dir//another File.zip", "/"],
    ["user/dir/another File.zip", ""],
    ["file", ""],
    [".\\file", ""],
    ["./file", ""],
    ["C:\\foo", ""],
    ["/", "/"],
    ["", ""],
    [".", ""],
    ["..", ""],
    ["/foo", "/"],
    ["/foo.", "/"],
    ["/foo.bar", "/"],
    ["/.", "/"],
    ["/.foo", "/"],
    ["/.foo.bar", "/"],
    ["/foo/bar.baz", "/"]
  ];
  var unixSpecialCaseFormatTests = [
    [{ dir: "some/dir" }, "some/dir/"],
    [{ base: "index.html" }, "index.html"],
    [{ root: "/" }, "/"],
    [{ name: "index", ext: ".html" }, "index.html"],
    [{ dir: "some/dir", name: "index", ext: ".html" }, "some/dir/index.html"],
    [{ root: "/", name: "index", ext: ".html" }, "/index.html"],
    [{}, ""]
  ];
  var errors = [
    { method: "parse", input: [null], message: TypeError },
    { method: "parse", input: [{}], message: TypeError },
    { method: "parse", input: [true], message: TypeError },
    { method: "parse", input: [1], message: TypeError },
    { method: "parse", input: [], message: TypeError },
    { method: "format", input: [null], message: TypeError },
    { method: "format", input: [""], message: TypeError },
    { method: "format", input: [true], message: TypeError },
    { method: "format", input: [1], message: TypeError }
  ];
  test.skip("path.win32.parse", function(t) {
    checkParseFormat(t, path.win32, winPaths);
    checkSpecialCaseParseFormat(t, path.win32, winSpecialCaseParseTests);
  });
  test("path.posix.parse", function(t) {
    checkParseFormat(t, path.posix, unixPaths);
  });
  test.skip("path.win32.parse errors", function(t) {
    checkErrors(t, path.win32);
  });
  test("path.posix.parse errors", function(t) {
    checkErrors(t, path.posix);
  });
  test.skip("path.win32.format", function(t) {
    checkFormat(t, path.win32, winSpecialCaseFormatTests);
  });
  test("path.posix.format", function(t) {
    checkFormat(t, path.posix, unixSpecialCaseFormatTests);
  });
  var windowsTrailingTests = [
    [".\\", { root: "", dir: "", base: ".", ext: "", name: "." }],
    ["\\\\", { root: "\\", dir: "\\", base: "", ext: "", name: "" }],
    ["\\\\", { root: "\\", dir: "\\", base: "", ext: "", name: "" }],
    [
      "c:\\foo\\\\\\",
      { root: "c:\\", dir: "c:\\", base: "foo", ext: "", name: "foo" }
    ],
    [
      "D:\\foo\\\\\\bar.baz",
      {
        root: "D:\\",
        dir: "D:\\foo\\\\",
        base: "bar.baz",
        ext: ".baz",
        name: "bar"
      }
    ]
  ];
  var posixTrailingTests = [
    ["./", { root: "", dir: "", base: ".", ext: "", name: "." }],
    ["//", { root: "/", dir: "/", base: "", ext: "", name: "" }],
    ["///", { root: "/", dir: "/", base: "", ext: "", name: "" }],
    ["/foo///", { root: "/", dir: "/", base: "foo", ext: "", name: "foo" }],
    [
      "/foo///bar.baz",
      { root: "/", dir: "/foo//", base: "bar.baz", ext: ".baz", name: "bar" }
    ]
  ];
  test.skip("path.win32.parse trailing", function(t) {
    windowsTrailingTests.forEach(function(p) {
      var actual = path.win32.parse(p[0]);
      var expected = p[1];
      t.deepEqual(actual, expected);
    });
  });
  test("path.posix.parse trailing", function(t) {
    posixTrailingTests.forEach(function(p) {
      var actual = path.posix.parse(p[0]);
      var expected = p[1];
      t.deepEqual(actual, expected);
    });
  });
  function checkErrors(t, path2) {
    errors.forEach(function(errorCase) {
      try {
        path2[errorCase.method].apply(path2, errorCase.input);
      } catch (err) {
        t.ok(err, errorCase.message);
      }
    });
  }
  __name(checkErrors, "checkErrors");
  function checkParseFormat(t, path2, paths) {
    paths.forEach(function(p) {
      var element = p[0];
      var root = p[1];
      var output = path2.parse(element);
      t.equal(typeof output.root, "string");
      t.equal(typeof output.dir, "string");
      t.equal(typeof output.base, "string");
      t.equal(typeof output.ext, "string");
      t.equal(typeof output.name, "string");
      t.equal(path2.format(output), element);
      t.equal(output.root, root);
      t.ok(output.dir.startsWith(output.root));
      t.equal(output.dir, output.dir ? path2.dirname(element) : "");
      t.equal(output.base, path2.basename(element));
      t.equal(output.ext, path2.extname(element));
    });
  }
  __name(checkParseFormat, "checkParseFormat");
  function checkSpecialCaseParseFormat(t, path2, testCases) {
    testCases.forEach(function(testCase) {
      var element = testCase[0];
      var expect = testCase[1];
      var output = path2.parse(element);
      Object.keys(expect).forEach(function(key) {
        t.equal(output[key], expect[key]);
      });
    });
  }
  __name(checkSpecialCaseParseFormat, "checkSpecialCaseParseFormat");
  function checkFormat(t, path2, testCases) {
    testCases.forEach(function(testCase) {
      t.equal(path2.format(testCase[0]), testCase[1]);
    });
    [null, void 0, 1, true, false, "string"].forEach((pathObject) => {
      try {
        path2.format(pathObject);
      } catch (err) {
        t.ok(err, /The "pathObject" argument must be of type Object. Received type (\w+)/);
      }
    });
  }
  __name(checkFormat, "checkFormat");

  // test/test-path-relative.js
  var relativeTests = {
    win32: (
      // arguments                     result
      [
        ["c:/blah\\blah", "d:/games", "d:\\games"],
        ["c:/aaaa/bbbb", "c:/aaaa", ".."],
        ["c:/aaaa/bbbb", "c:/cccc", "..\\..\\cccc"],
        ["c:/aaaa/bbbb", "c:/aaaa/bbbb", ""],
        ["c:/aaaa/bbbb", "c:/aaaa/cccc", "..\\cccc"],
        ["c:/aaaa/", "c:/aaaa/cccc", "cccc"],
        ["c:/", "c:\\aaaa\\bbbb", "aaaa\\bbbb"],
        ["c:/aaaa/bbbb", "d:\\", "d:\\"],
        ["c:/AaAa/bbbb", "c:/aaaa/bbbb", ""],
        ["c:/aaaaa/", "c:/aaaa/cccc", "..\\aaaa\\cccc"],
        ["C:\\foo\\bar\\baz\\quux", "C:\\", "..\\..\\..\\.."],
        ["C:\\foo\\test", "C:\\foo\\test\\bar\\package.json", "bar\\package.json"],
        ["C:\\foo\\bar\\baz-quux", "C:\\foo\\bar\\baz", "..\\baz"],
        ["C:\\foo\\bar\\baz", "C:\\foo\\bar\\baz-quux", "..\\baz-quux"],
        ["\\\\foo\\bar", "\\\\foo\\bar\\baz", "baz"],
        ["\\\\foo\\bar\\baz", "\\\\foo\\bar", ".."],
        ["\\\\foo\\bar\\baz-quux", "\\\\foo\\bar\\baz", "..\\baz"],
        ["\\\\foo\\bar\\baz", "\\\\foo\\bar\\baz-quux", "..\\baz-quux"],
        ["C:\\baz-quux", "C:\\baz", "..\\baz"],
        ["C:\\baz", "C:\\baz-quux", "..\\baz-quux"],
        ["\\\\foo\\baz-quux", "\\\\foo\\baz", "..\\baz"],
        ["\\\\foo\\baz", "\\\\foo\\baz-quux", "..\\baz-quux"],
        ["C:\\baz", "\\\\foo\\bar\\baz", "\\\\foo\\bar\\baz"],
        ["\\\\foo\\bar\\baz", "C:\\baz", "C:\\baz"]
      ]
    ),
    posix: (
      // arguments          result
      [
        ["/var/lib", "/var", ".."],
        ["/var/lib", "/bin", "../../bin"],
        ["/var/lib", "/var/lib", ""],
        ["/var/lib", "/var/apache", "../apache"],
        ["/var/", "/var/lib", "lib"],
        ["/", "/var/lib", "var/lib"],
        ["/foo/test", "/foo/test/bar/package.json", "bar/package.json"],
        ["/Users/a/web/b/test/mails", "/Users/a/web/b", "../.."],
        ["/foo/bar/baz-quux", "/foo/bar/baz", "../baz"],
        ["/foo/bar/baz", "/foo/bar/baz-quux", "../baz-quux"],
        ["/baz-quux", "/baz", "../baz"],
        ["/baz", "/baz-quux", "../baz-quux"]
      ]
    )
  };
  test("path.posix.relative", function(t) {
    relativeTests.posix.forEach(function(p) {
      var expected = p[2];
      var actual = path.posix.relative(p[0], p[1]);
      t.equal(actual, expected);
    });
  });
  test.skip("path.win32.relative", function(t) {
    relativeTests.win32.forEach(function(p) {
      var expected = p[2];
      var actual = path.win32.relative(p[0], p[1]);
      t.equal(actual, expected);
    });
  });

  // test/test-path-resolve.js
  var windowsTests = (
    // arguments                               result
    [
      [["c:/blah\\blah", "d:/games", "c:../a"], "c:\\blah\\a"],
      [["c:/ignore", "d:\\a/b\\c/d", "\\e.exe"], "d:\\e.exe"],
      [["c:/ignore", "c:/some/file"], "c:\\some\\file"],
      [["d:/ignore", "d:some/dir//"], "d:\\ignore\\some\\dir"],
      [["."], process.cwd()],
      [["//server/share", "..", "relative\\"], "\\\\server\\share\\relative"],
      [["c:/", "//"], "c:\\"],
      [["c:/", "//dir"], "c:\\dir"],
      [["c:/", "//server/share"], "\\\\server\\share\\"],
      [["c:/", "//server//share"], "\\\\server\\share\\"],
      [["c:/", "///some//dir"], "c:\\some\\dir"],
      [
        ["C:\\foo\\tmp.3\\", "..\\tmp.3\\cycles\\root.js"],
        "C:\\foo\\tmp.3\\cycles\\root.js"
      ]
    ]
  );
  var posixTests = (
    // arguments                    result
    [
      [["/var/lib", "../", "file/"], "/var/file"],
      [["/var/lib", "/../", "file/"], "/file"],
      [["a/b/c/", "../../.."], process.cwd()],
      [["."], process.cwd()],
      [["/some/dir", ".", "/absolute/"], "/absolute"],
      [["/foo/tmp.3/", "../tmp.3/cycles/root.js"], "/foo/tmp.3/cycles/root.js"]
    ]
  );
  test("path.posix.resolve", function(t) {
    posixTests.forEach(function(testCase) {
      var actual = path.posix.resolve.apply(null, testCase[0]);
      t.equal(actual, testCase[1]);
    });
  });
  test.skip("path.win32.resolve", function(t) {
    windowsTests.forEach(function(p) {
      var actual = path.win32.resolve.apply(null, p[0]);
      t.equal(actual, p[1]);
    });
  });

  // test/test-path-zero-length-strings.js
  var pwd = process.cwd();
  test("path.join zero-length", function(t) {
    t.equal(path.posix.join(""), ".");
    t.equal(path.posix.join("", ""), ".");
    if (path.win32) t.equal(path.win32.join(""), ".");
    if (path.win32) t.equal(path.win32.join("", ""), ".");
    t.equal(path.join(pwd), pwd);
    t.equal(path.join(pwd, ""), pwd);
  });
  test("path.normalize zero-length", function(t) {
    t.equal(path.posix.normalize(""), ".");
    if (path.win32) t.equal(path.win32.normalize(""), ".");
    t.equal(path.normalize(pwd), pwd);
  });
  test("path.isAbsolute zero-length", function(t) {
    t.equal(path.posix.isAbsolute(""), false);
    if (path.win32) t.equal(path.win32.isAbsolute(""), false);
  });
  test("path.resolve zero-length", function(t) {
    t.equal(path.resolve(""), pwd);
    t.equal(path.resolve("", ""), pwd);
  });
  test("path.relative zero-length", function(t) {
    t.equal(path.relative("", pwd), "");
    t.equal(path.relative(pwd, ""), "");
    t.equal(path.relative(pwd, pwd), "");
  });
})();
