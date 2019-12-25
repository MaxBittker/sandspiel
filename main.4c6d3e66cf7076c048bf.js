!(function(e) {
  function n(n) {
    for (var t, o, i = n[0], u = n[1], a = 0, f = []; a < i.length; a++)
      (o = i[a]), r[o] && f.push(r[o][0]), (r[o] = 0);
    for (t in u) Object.prototype.hasOwnProperty.call(u, t) && (e[t] = u[t]);
    for (s && s(n); f.length; ) f.shift()();
  }
  var t = {},
    r = { 0: 0 };
  var o = {};
  var i = {
    8: function() {
      return {
        "./sandtable.js": {
          __wbg_random_09364f2d8647f133: function() {
            return t[3].exports.c();
          },
          __wbindgen_throw: function(e, n) {
            return t[3].exports.d(e, n);
          }
        }
      };
    }
  };
  function u(n) {
    if (t[n]) return t[n].exports;
    var r = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, u), (r.l = !0), r.exports;
  }
  (u.e = function(e) {
    var n = [],
      t = r[e];
    if (0 !== t)
      if (t) n.push(t[2]);
      else {
        var a = new Promise(function(n, o) {
          t = r[e] = [n, o];
        });
        n.push((t[2] = a));
        var f,
          c = document.createElement("script");
        (c.charset = "utf-8"),
          (c.timeout = 120),
          u.nc && c.setAttribute("nonce", u.nc),
          (c.src = (function(e) {
            return (
              u.p +
              "" +
              ({}[e] || e) +
              "." +
              { 1: "ff6acf5ba628effc9c16", 2: "0aa5d089fe63201a6fa8" }[e] +
              ".js"
            );
          })(e)),
          (f = function(n) {
            (c.onerror = c.onload = null), clearTimeout(s);
            var t = r[e];
            if (0 !== t) {
              if (t) {
                var o = n && ("load" === n.type ? "missing" : n.type),
                  i = n && n.target && n.target.src,
                  u = new Error(
                    "Loading chunk " + e + " failed.\n(" + o + ": " + i + ")"
                  );
                (u.type = o), (u.request = i), t[1](u);
              }
              r[e] = void 0;
            }
          });
        var s = setTimeout(function() {
          f({ type: "timeout", target: c });
        }, 12e4);
        (c.onerror = c.onload = f), document.head.appendChild(c);
      }
    return (
      ({ 2: [8] }[e] || []).forEach(function(e) {
        var t = o[e];
        if (t) n.push(t);
        else {
          var r,
            a = i[e](),
            f = fetch(
              u.p + "" + { 8: "f463695acf7787f8bedc" }[e] + ".module.wasm"
            );
          if (
            a instanceof Promise &&
            "function" == typeof WebAssembly.compileStreaming
          )
            r = Promise.all([WebAssembly.compileStreaming(f), a]).then(function(
              e
            ) {
              return WebAssembly.instantiate(e[0], e[1]);
            });
          else if ("function" == typeof WebAssembly.instantiateStreaming)
            r = WebAssembly.instantiateStreaming(f, a);
          else {
            r = f
              .then(function(e) {
                return e.arrayBuffer();
              })
              .then(function(e) {
                return WebAssembly.instantiate(e, a);
              });
          }
          n.push(
            (o[e] = r.then(function(n) {
              return (u.w[e] = (n.instance || n).exports);
            }))
          );
        }
      }),
      Promise.all(n)
    );
  }),
    (u.m = e),
    (u.c = t),
    (u.d = function(e, n, t) {
      u.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: t });
    }),
    (u.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (u.t = function(e, n) {
      if ((1 & n && (e = u(e)), 8 & n)) return e;
      if (4 & n && "object" == typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (u.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: e }),
        2 & n && "string" != typeof e)
      )
        for (var r in e)
          u.d(
            t,
            r,
            function(n) {
              return e[n];
            }.bind(null, r)
          );
      return t;
    }),
    (u.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return u.d(n, "a", n), n;
    }),
    (u.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (u.p = ""),
    (u.oe = function(e) {
      throw (console.error(e), e);
    }),
    (u.w = {});
  var a = (window.webpackJsonp = window.webpackJsonp || []),
    f = a.push.bind(a);
  (a.push = n), (a = a.slice());
  for (var c = 0; c < a.length; c++) n(a[c]);
  var s = f;
  u((u.s = 0));
})([
  function(e, n, t) {
    Promise.all([t.e(1), t.e(2)])
      .then(t.bind(null, 1))
      .catch(function(e) {
        return console.error("Error importing `index.js`:", e);
      });
  }
]);
//# sourceMappingURL=main.4c6d3e66cf7076c048bf.js.map
