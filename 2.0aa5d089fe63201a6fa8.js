(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  [
    ,
    function(e, t, n) {
      "use strict";
      n.r(t);
      var r = n(14);
      n(15), n(63), n(26);
      (window.firebase = r),
        r.initializeApp({
          apiKey: "AIzaSyD2APPEyxCi9vB2olvUgzSsbgH1Pyz-as0",
          storageBucket: "sandtable-8d0f7.appspot.com",
          authDomain: "sandspiel.club",
          projectId: "sandtable-8d0f7",
          appId: "1:239719651525:web:80d3674408670521",
          messagingSenderId: "239719651525"
        });
      var i = r.storage(),
        a = r.functions(),
        o = n(3),
        u = n(8);
      function s(e) {
        return (
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = new Array(e.length); t < e.length; t++)
                n[t] = e[t];
              return n;
            }
          })(e) ||
          (function(e) {
            if (
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance"
            );
          })()
        );
      }
      var c = n(28),
        l = n(29),
        f = n(30),
        m = function(e) {
          var t = e.canvas,
            n = e.universe,
            r = e.isSnapshot,
            i = void 0 !== r && r,
            a = c({ canvas: t, attributes: { preserveDrawingBuffer: i } }),
            o = n.width(),
            s = n.height(),
            m = n.cells(),
            d = new Uint8Array(u.d.buffer, m, o * s * 4),
            p = a.texture({ width: o, height: s, data: d }),
            v = a({
              frag: l,
              uniforms: {
                t: function(e) {
                  return e.tick;
                },
                data: function() {
                  return (
                    (m = n.cells()),
                    (d = new Uint8Array(u.d.buffer, m, o * s * 4)),
                    p({ width: o, height: s, data: d })
                  );
                },
                resolution: function(e) {
                  return [e.viewportWidth, e.viewportHeight];
                },
                dpi: 2 * window.devicePixelRatio,
                isSnapshot: i
              },
              vert: f,
              attributes: { position: [[-1, 4], [-1, -1], [4, -1]] },
              count: 3
            });
          return function() {
            a.poll(), v();
          };
        };
      function d(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      var p = new ((function() {
          function e() {
            !(function(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.fps = document.getElementById("fps")),
              (this.frames = []),
              (this.lastFrameTimeStamp = performance.now());
          }
          var t, n, r;
          return (
            (t = e),
            (n = [
              {
                key: "render",
                value: function() {
                  var e = performance.now(),
                    t = e - this.lastFrameTimeStamp;
                  this.lastFrameTimeStamp = e;
                  var n = (1 / t) * 1e3;
                  this.frames.push(n),
                    this.frames.length > 30 && this.frames.shift();
                  for (
                    var r = 1 / 0, i = -1 / 0, a = 0, o = 0;
                    o < this.frames.length;
                    o++
                  )
                    (a += this.frames[o]),
                      (r = Math.min(this.frames[o], r)),
                      (i = Math.max(this.frames[o], i));
                  var u = a / this.frames.length;
                  this.fps.textContent = "FPS:".concat(Math.round(u));
                }
              }
            ]) && d(t.prototype, n),
            r && d(t, r),
            e
          );
        })())(),
        v = n(2),
        h = n.n(v),
        y = n(4),
        g = function(e) {
          var t = e.close,
            n = e.children;
          return h.a.createElement(
            "div",
            { className: "menu-scrim" },
            h.a.createElement(
              "div",
              { className: "menu" },
              n,
              h.a.createElement(
                y.b,
                { to: "/", className: "x", onClick: t },
                h.a.createElement("button", null, " x")
              )
            )
          );
        };
      function b(e) {
        return (b =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function E(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function(t) {
              x(e, t, n[t]);
            });
        }
        return e;
      }
      function x(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      function w(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function T(e) {
        return (T = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function S(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function _(e, t) {
        return (_ =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      window.species = o.a;
      var R = (function() {
          var e = document.createElement("canvas"),
            t = Object.values(o.a),
            n = Math.max.apply(Math, s(t)) + 1,
            r = o.b.new(n, 1);
          (e.width = n),
            (e.height = 3),
            r.reset(),
            t.forEach(function(e) {
              return r.paint(e, 0, 2, e);
            }),
            m({ universe: r, canvas: e, isSnapshot: !0 })();
          var i = e.getContext("webgl"),
            a = new Uint8Array(4 * n);
          i.readPixels(0, 0, n, 1, i.RGBA, i.UNSIGNED_BYTE, a);
          var u = {};
          return (
            t.forEach(function(e) {
              var t = 4 * e,
                n = "rgba("
                  .concat(a[t], ",")
                  .concat(a[t + 1], ", ")
                  .concat(a[t + 2], ", 0.25)");
              u[e] = n;
            }),
            u
          );
        })(),
        D = [2, 5, 10, 18, 30, 45],
        U = (function(e) {
          function t(e) {
            var n, r, i;
            return (
              (function(e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
              (r = this),
              (i = T(t).call(this, e)),
              ((n =
                !i || ("object" !== b(i) && "function" != typeof i)
                  ? S(r)
                  : i).state = {
                submissionMenuOpen: !1,
                paused: !1,
                submitting: !1,
                size: 2,
                dataURL: {},
                currentSubmission: null,
                selectedElement: o.a.Water
              }),
              (window.UI = S(n)),
              "/" == n.props.location.pathname &&
                window.setTimeout(function() {
                  return n.pause();
                }, 50),
              n.load(),
              n
            );
          }
          var n, r, s;
          return (
            (function(e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && _(e, t);
            })(t, h.a.Component),
            (n = t),
            (r = [
              {
                key: "componentDidUpdate",
                value: function(e) {
                  "/" === this.props.location.pathname &&
                  "/" !== e.location.pathname &&
                  this.state.currentSubmission
                    ? (window.location = "#".concat(
                        this.state.currentSubmission.id
                      ))
                    : ("/" !== this.props.location.pathname &&
                        "/" == e.location.pathname &&
                        this.pause(),
                      ("" !== e.location.hash &&
                        e.location.hash == this.props.location.hash) ||
                        this.load());
                }
              },
              {
                key: "togglePause",
                value: function() {
                  (window.paused = !this.state.paused),
                    this.setState({ paused: !this.state.paused });
                }
              },
              {
                key: "play",
                value: function() {
                  (window.paused = !1), this.setState({ paused: !1 });
                }
              },
              {
                key: "pause",
                value: function() {
                  (window.paused = !0), this.setState({ paused: !0 });
                }
              },
              {
                key: "setSize",
                value: function(e, t) {
                  e.preventDefault(), this.setState({ size: t });
                }
              },
              {
                key: "reset",
                value: function() {
                  window.confirm("Reset?") &&
                    (this.play(),
                    (window.location = "#"),
                    this.setState({ currentSubmission: null }),
                    lt());
                }
              },
              {
                key: "menu",
                value: function() {
                  this.pause(), this.setState({ submissionMenuOpen: !0 });
                }
              },
              {
                key: "closeMenu",
                value: function() {
                  this.play(), this.setState({ submissionMenuOpen: !1 });
                }
              },
              {
                key: "upload",
                value: function() {
                  var e = (function(e) {
                      var t = document.createElement("canvas");
                      return (
                        (t.width = e.width() / 2),
                        (t.height = e.height() / 2),
                        m({ universe: e, canvas: t, isSnapshot: !0 })(),
                        t.toDataURL("image/png")
                      );
                    })(tt),
                    t = new Uint8Array(u.d.buffer, tt.cells(), nt * rt * 4),
                    n = document.createElement("canvas"),
                    r = n.getContext("2d"),
                    i = r.createImageData(nt, rt);
                  (n.height = rt), (n.width = nt);
                  for (var a = 0; a < nt * rt * 4; a++)
                    i.data[a] = a % 4 == 3 ? 255 : t[a];
                  r.putImageData(i, 0, 0);
                  var o = n.toDataURL("image/png");
                  this.pause(),
                    this.setState({
                      data: { dataURL: e, cells: o },
                      submissionMenuOpen: !0
                    });
                }
              },
              {
                key: "submit",
                value: function() {
                  var e = this,
                    t = this.state,
                    n = t.title,
                    r = t.data,
                    i = { title: n, image: r.dataURL, cells: r.cells };
                  this.setState({ submitting: !0 }),
                    fetch(a._url("api/creations"), {
                      method: "POST",
                      body: JSON.stringify(i),
                      headers: { "Content-Type": "application/json" }
                    })
                      .then(function(e) {
                        return e.json();
                      })
                      .then(function(t) {
                        console.log("Success:", JSON.stringify(t)), e.play();
                      })
                      .catch(function(e) {
                        return console.error("Error:", e);
                      })
                      .then(function() {
                        e.setState({ submissionMenuOpen: !1, submitting: !1 });
                      });
                }
              },
              {
                key: "load",
                value: function() {
                  var e = this,
                    t = this.props.location.hash.replace(/#/, "");
                  "" !== t &&
                    ((this.state.currentSubmission &&
                      this.state.currentSubmission.id == t) ||
                      fetch(a._url("api/creations/".concat(t)), {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                      })
                        .then(function(e) {
                          return e.json();
                        })
                        .then(function(n) {
                          i.refFromURL(
                            "gs://sandtable-8d0f7.appspot.com/creations/".concat(
                              n.id,
                              ".data.png"
                            )
                          )
                            .getDownloadURL()
                            .then(function(r) {
                              fetch(r, { method: "GET" })
                                .then(function(e) {
                                  return e.blob();
                                })
                                .then(function(r) {
                                  e.setState({
                                    currentSubmission: { id: t, data: n }
                                  });
                                  var i = URL.createObjectURL(r),
                                    a = new Image();
                                  (a.src = i),
                                    (a.onload = function() {
                                      var t = document.createElement("canvas");
                                      (t.width = nt), (t.height = rt);
                                      var n = t.getContext("2d");
                                      n.drawImage(a, 0, 0);
                                      var r = n.getImageData(
                                          0,
                                          0,
                                          t.width,
                                          t.height
                                        ),
                                        i = new Uint8Array(
                                          u.d.buffer,
                                          tt.cells(),
                                          nt * rt * 4
                                        );
                                      lt();
                                      for (var o = 0; o < nt * rt * 4; o++)
                                        i[o] = r.data[o];
                                      tt.flush_undos(),
                                        tt.push_undo(),
                                        e.pause();
                                    });
                                })
                                .catch(function(e) {
                                  return console.error("Error:", e);
                                });
                            });
                        })
                        .catch(function(e) {
                          console.error("Error:", e);
                        }));
                }
              },
              {
                key: "incScore",
                value: function() {
                  var e = this,
                    t = this.state.currentSubmission,
                    n = t.id;
                  firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then(function(r) {
                      fetch(a._url("api/creations/".concat(n, "/vote")), {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + r
                        }
                      })
                        .then(function(e) {
                          return e.json();
                        })
                        .then(function(n) {
                          null != t &&
                            (console.log(n),
                            e.setState({
                              currentSubmission: E({}, t, { data: n })
                            }));
                        })
                        .catch(function(e) {
                          console.log(e);
                        });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    n = t.size,
                    r = t.paused,
                    i = t.selectedElement,
                    a = t.currentSubmission,
                    u = a && a.id ? "#".concat(a.id) : "";
                  return h.a.createElement(
                    h.a.Fragment,
                    null,
                    h.a.createElement(
                      "button",
                      {
                        onClick: function() {
                          return e.togglePause();
                        },
                        className: r ? "selected" : ""
                      },
                      r
                        ? h.a.createElement(
                            "svg",
                            {
                              height: "20",
                              width: "20",
                              id: "d",
                              viewBox: "0 0 300 300"
                            },
                            h.a.createElement("polygon", {
                              id: "play",
                              points: "0,0 , 300,150 0,300"
                            })
                          )
                        : h.a.createElement(
                            "svg",
                            {
                              height: "20",
                              width: "20",
                              id: "d",
                              viewBox: "0 0 300 300"
                            },
                            h.a.createElement("polygon", {
                              id: "bar2",
                              points: "0,0 110,0 110,300 0,300"
                            }),
                            h.a.createElement("polygon", {
                              id: "bar1",
                              points: "190,0 300,0 300,300 190,300"
                            })
                          )
                    ),
                    h.a.createElement(
                      "button",
                      {
                        onClick: function() {
                          return e.upload();
                        }
                      },
                      "Upload"
                    ),
                    h.a.createElement(
                      y.b,
                      { to: { pathname: "/browse/", hash: u } },
                      h.a.createElement("button", null, "Browse")
                    ),
                    h.a.createElement(
                      "button",
                      {
                        onClick: function() {
                          return e.reset();
                        }
                      },
                      "Reset"
                    ),
                    h.a.createElement(
                      y.b,
                      { to: { pathname: "/info/", hash: u } },
                      h.a.createElement("button", null, "Info")
                    ),
                    h.a.createElement(
                      "span",
                      { className: "sizes" },
                      D.map(function(t, r) {
                        return h.a.createElement(
                          "button",
                          {
                            key: r,
                            className: r == n ? "selected" : "",
                            onClick: function(t) {
                              return e.setSize(t, r);
                            },
                            style: { padding: "0px" }
                          },
                          h.a.createElement(
                            "svg",
                            {
                              height: "23",
                              width: "23",
                              id: "d",
                              viewBox: "0 0 100 100"
                            },
                            h.a.createElement("circle", {
                              cx: "50",
                              cy: "50",
                              r: 2 + t
                            })
                          )
                        );
                      })
                    ),
                    h.a.createElement(
                      "button",
                      {
                        onClick: function() {
                          lt(), tt.pop_undo();
                        },
                        style: { fontSize: 35 }
                      },
                      "↜"
                    ),
                    h.a.createElement(
                      "button",
                      {
                        className: -1 == i ? "selected" : "",
                        key: name,
                        onClick: function() {
                          e.setState({ selectedElement: -1 });
                        }
                      },
                      "Wind"
                    ),
                    Object.keys(o.a).map(function(t) {
                      return (function(e, t, n) {
                        var r = o.a[e],
                          i = R[r],
                          a = r == t,
                          u = "inherit";
                        return (
                          14 == r &&
                            ((u =
                              "linear-gradient(45deg, \n    rgba(202, 121, 125, 0.25), \n    rgba(169, 120, 200, 0.25), \n    rgba(117, 118, 195, 0.25), \n    rgba(117, 196, 193, 0.25), \n    rgba(122, 203, 168, 0.25), \n    rgba(185, 195, 117, 0.25), \n    rgba(204, 186, 122, 0.25))"),
                            a && (u = u.replace(/0.25/g, "1.0"))),
                          h.a.createElement(
                            "button",
                            {
                              className: a ? "selected" : "",
                              key: e,
                              onClick: function() {
                                n(r);
                              },
                              style: {
                                background: u,
                                backgroundColor: a
                                  ? i.replace("0.25", "1.5")
                                  : i
                              }
                            },
                            "  ",
                            e,
                            "  "
                          )
                        );
                      })(t, i, function(t) {
                        return e.setState({ selectedElement: t });
                      });
                    }),
                    this.state.currentSubmission &&
                      h.a.createElement(
                        "div",
                        { className: "submission-title" },
                        h.a.createElement(
                          "button",
                          {
                            onClick: function() {
                              return e.incScore();
                            }
                          },
                          "+♡",
                          this.state.currentSubmission.data.score,
                          " "
                        ),
                        this.state.currentSubmission.data.title
                      ),
                    this.state.submissionMenuOpen &&
                      h.a.createElement(
                        g,
                        {
                          close: function() {
                            return e.closeMenu();
                          }
                        },
                        h.a.createElement(
                          "h4",
                          null,
                          "Share your creation with the people!"
                        ),
                        h.a.createElement("img", {
                          src: this.state.data.dataURL,
                          className: "submissionImg"
                        }),
                        h.a.createElement(
                          "div",
                          { style: { display: "flex" } },
                          h.a.createElement("input", {
                            placeholder: "title",
                            onChange: function(t) {
                              return e.setState({ title: t.target.value });
                            }
                          }),
                          h.a.createElement(
                            "button",
                            {
                              disabled: this.state.submitting,
                              onClick: function() {
                                return e.submit();
                              }
                            },
                            "Submit"
                          )
                        )
                      )
                  );
                }
              }
            ]) && w(n.prototype, r),
            s && w(n, s),
            t
          );
        })(),
        A = document.getElementById("sand-canvas"),
        I = function(e, t) {
          return Math.sqrt(
            Math.pow(e.clientX - t.clientX, 2) +
              Math.pow(e.clientY - t.clientY, 2),
            2
          );
        },
        k = function(e) {
          var t = (function(e) {
            return Math.sqrt(
              Math.pow(e.clientX, 2) + Math.pow(e.clientY, 2),
              2
            );
          })(e);
          return { clientX: e.clientX / t, clientY: e.clientY / t };
        },
        F = function(e, t) {
          return { clientX: e.clientX * t, clientY: e.clientY * t };
        },
        C = function(e, t) {
          return {
            clientX: e.clientX + t.clientX,
            clientY: e.clientY + t.clientY
          };
        },
        L = function(e, t) {
          return {
            clientX: e.clientX - t.clientX,
            clientY: e.clientY - t.clientY
          };
        },
        P = !1,
        O = null,
        X = null;
      function j(e) {
        clearInterval(X),
          (X = window.setInterval(function() {
            return N(e);
          }, 100));
        var t = { clientX: e.clientX, clientY: e.clientY };
        if (P) {
          var n = D[window.UI.state.size],
            r = 0;
          if ((N(t), O))
            for (; I(t, O) > n / 3; ) {
              var i = I(t, O);
              if (((t = C(t, F(k(L(O, e)), Math.min(n / 3, i)))), ++r > 1e3))
                break;
              N(t);
            }
          O = e;
        }
      }
      A.addEventListener("mousedown", function(e) {
        e.preventDefault(),
          tt.push_undo(),
          (P = !0),
          clearInterval(X),
          (X = window.setInterval(function() {
            return N(e);
          }, 100)),
          N(e),
          (O = e);
      }),
        document.body.addEventListener("mouseup", function(e) {
          clearInterval(X), P && (e.preventDefault(), (O = null), (P = !1));
        }),
        A.addEventListener("mousemove", function(e) {
          clearInterval(X), j(e);
        }),
        A.addEventListener("mouseleave", function(e) {
          clearInterval(X), (O = null);
        }),
        A.addEventListener("touchstart", function(e) {
          tt.push_undo(),
            e.cancelable && e.preventDefault(),
            (P = !0),
            (O = e),
            B(e);
        }),
        A.addEventListener("touchend", function(e) {
          e.cancelable && e.preventDefault(),
            (O = null),
            (P = !1),
            clearInterval(X);
        }),
        A.addEventListener("touchmove", function(e) {
          window.paused || (e.cancelable && e.preventDefault()),
            clearInterval(X),
            B(e);
        });
      var B = function(e) {
          var t = Array.from(e.touches);
          1 == t.length ? j(t[0]) : t.forEach(N);
        },
        N = function(e) {
          if (P) {
            var t = A.getBoundingClientRect(),
              n = A.width / Math.ceil(window.devicePixelRatio) / t.width,
              r = A.height / Math.ceil(window.devicePixelRatio) / t.height,
              i = (e.clientX - t.left) * n,
              a = (e.clientY - t.top) * r,
              o = Math.min(Math.floor(i), nt - 1),
              u = Math.min(Math.floor(a), rt - 1);
            window.UI.state.selectedElement < 0 ||
              tt.paint(
                o,
                u,
                D[window.UI.state.size],
                window.UI.state.selectedElement
              );
          }
        },
        z = n(43),
        M = n.n(z),
        G = n(12),
        W = function() {
          return h.a.createElement(
            "div",
            { className: "Info" },
            h.a.createElement("h1", null, "Sandspiel "),
            h.a.createElement(
              "p",
              null,
              "Created by ",
              h.a.createElement(
                "a",
                { href: "https://maxbittker.com" },
                "max bittker"
              )
            ),
            h.a.createElement("hr", null),
            h.a.createElement("br", null),
            h.a.createElement(
              "p",
              null,
              "Welcome, and thanks for coming by! I hope that you enjoy exploring this small game, and it brings you some calm.",
              " "
            ),
            h.a.createElement(
              "p",
              null,
              'Growing up, "falling sand" games like this one provided me hours of entertainment and imagination. I want to particularly thank ha55ii\'s',
              " ",
              h.a.createElement(
                "a",
                { href: "https://dan-ball.jp/en/javagame/dust/" },
                "Powder Game"
              ),
              " as the primary inspiration for sandspiel."
            ),
            h.a.createElement("br", null),
            h.a.createElement(
              "p",
              null,
              "If you want to read more the inspiration, architecture, and history of the game, I wrote a blog post (it gets technical in the middle): ",
              h.a.createElement(
                "a",
                { href: "https://maxbittker.com/making-sandspiel" },
                "Making Sandspiel"
              )
            ),
            h.a.createElement("br", null),
            h.a.createElement(
              "p",
              null,
              "You can follow sandspiel on twitter for updates and new uploads:",
              h.a.createElement(
                "a",
                { href: "https://twitter.com/sandspiel_feed" },
                "@sandspiel_feed"
              )
            ),
            h.a.createElement("br", null),
            h.a.createElement(
              "p",
              null,
              "If you'd like, you can view the",
              " ",
              h.a.createElement(
                "a",
                { href: "https://github.com/maxbittker/sandspiel" },
                "source code"
              ),
              " or",
              " ",
              h.a.createElement(
                "a",
                { href: "https://github.com/maxbittker/sandspiel/issues" },
                "report bugs"
              ),
              " ",
              "on github or feel free to reach out on twitter and I'll try to answer!"
            ),
            h.a.createElement("br", null),
            h.a.createElement(
              "p",
              null,
              "Lastly, I want to say that if you enjoy this game or share your artwork on it, your opinion is important to me and I want to do my best to ensure sandspiel is a friendly and kind place to play, without bullying, racism, or homophobia. If something is wrong or there's some way I can help, feel free to contact me at [FirstnameLastname]@gmail.com"
            ),
            h.a.createElement("br", null),
            h.a.createElement("hr", null),
            h.a.createElement("br", null),
            h.a.createElement("h2", null, "Element Information:"),
            h.a.createElement("h4", null, "Wall "),
            "Indestructible",
            h.a.createElement("h4", null, "Sand "),
            "Sinks in water",
            h.a.createElement("h4", null, "Water "),
            "Puts out fire",
            h.a.createElement("h4", null, "Stone "),
            "Forms arches, folds under pressure",
            h.a.createElement("h4", null, "Ice "),
            "Freezes Water, slippery!",
            h.a.createElement("h4", null, "Gas "),
            "Highly Flammable!",
            h.a.createElement("h4", null, "Cloner "),
            "Copies the first element it touches",
            h.a.createElement("h4", null, "Mite "),
            "Eats wood and plant, but loves dust! Slides on ice",
            h.a.createElement("h4", null, "Wood "),
            "Sturdy, but biodegradable",
            h.a.createElement("h4", null, "Plant "),
            "Thrives in wet enviroments",
            h.a.createElement("h4", null, "Fungus "),
            "Spreads over everything",
            h.a.createElement("h4", null, "Seed "),
            "Grows in sand",
            h.a.createElement("h4", null, "Fire "),
            "Hot!",
            h.a.createElement("h4", null, "Lava "),
            "Flammable and heavy",
            h.a.createElement("h4", null, "Acid "),
            "Corrodes other elements",
            h.a.createElement("h4", null, "Dust "),
            "Pretty, but dangerously explosive",
            h.a.createElement("h4", null, "Oil "),
            "Produces smoke",
            h.a.createElement("h4", null, "Rocket "),
            "Explodes into copies of the first element it touches",
            h.a.createElement("hr", null),
            h.a.createElement("hr", null),
            h.a.createElement("hr", null),
            h.a.createElement("hr", null)
          );
        },
        V = n(20),
        Y = n.n(V),
        H = function(e) {
          var t = e.text.split(" ").map(function(e, t) {
            return e.startsWith("#") && e.length > 1
              ? h.a.createElement(
                  h.a.Fragment,
                  { key: t },
                  h.a.createElement(
                    y.b,
                    {
                      to: {
                        pathname: "/browse/search/",
                        search: "?title=".concat(e.slice(1))
                      }
                    },
                    e
                  ),
                  " "
                )
              : e + " ";
          });
          return h.a.createElement(h.a.Fragment, null, t);
        },
        q = n(47),
        K = n.n(q);
      function J(e) {
        return (J =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function Q(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function Z(e) {
        return (Z = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function $(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function ee(e, t) {
        return (ee =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function te(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      var ne = (function(e) {
        function t() {
          var e, n, r, i;
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          for (var a = arguments.length, o = new Array(a), u = 0; u < a; u++)
            o[u] = arguments[u];
          return (
            (r = this),
            (n =
              !(i = (e = Z(t)).call.apply(e, [this].concat(o))) ||
              ("object" !== J(i) && "function" != typeof i)
                ? $(r)
                : i),
            te($(n), "state", { isSignedIn: !1, expanded: !0 }),
            te($(n), "uiConfig", {
              signInFlow: "redirect",
              signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                {
                  provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                  requireDisplayName: !1
                }
              ],
              callbacks: {
                signInSuccessWithAuthResult: function() {
                  return !1;
                }
              }
            }),
            n
          );
        }
        var n, r, i;
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && ee(e, t);
          })(t, h.a.Component),
          (n = t),
          (r = [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                this.setState({ isSignedIn: !!firebase.auth().currentUser }),
                  (this.unregisterAuthObserver = firebase
                    .auth()
                    .onAuthStateChanged(function(t) {
                      return e.setState({ isSignedIn: !!t });
                    }));
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.unregisterAuthObserver();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                if (!this.state.isSignedIn)
                  return this.state.expanded
                    ? h.a.createElement(
                        "div",
                        null,
                        h.a.createElement("p", null, "Sign-in to vote:"),
                        h.a.createElement(K.a, {
                          uiConfig: this.uiConfig,
                          firebaseAuth: firebase.auth()
                        })
                      )
                    : h.a.createElement(
                        "span",
                        null,
                        h.a.createElement(
                          "p",
                          null,
                          "Please",
                          " ",
                          h.a.createElement(
                            "button",
                            {
                              onClick: function() {
                                return e.setState({ expanded: !0 });
                              }
                            },
                            "Sign in"
                          ),
                          " ",
                          "to vote!",
                          " "
                        ),
                        h.a.createElement(
                          "span",
                          { style: { display: "none" } },
                          h.a.createElement(K.a, {
                            uiConfig: this.uiConfig,
                            firebaseAuth: firebase.auth()
                          })
                        )
                      );
                var t = firebase.auth().currentUser;
                return h.a.createElement(
                  "div",
                  null,
                  h.a.createElement(
                    "div",
                    { style: { display: "flex", alignItems: "center" } },
                    h.a.createElement("img", {
                      style: {
                        height: "35px",
                        width: "35px",
                        borderRadius: 50
                      },
                      src: t.photoURL
                    }),
                    !t.emailVerified &&
                      "Please Verify your email ".concat(t.email, " to vote!"),
                    h.a.createElement(
                      "button",
                      {
                        onClick: function() {
                          return firebase.auth().signOut();
                        }
                      },
                      "Sign-out"
                    )
                  )
                );
              }
            }
          ]) && Q(n.prototype, r),
          i && Q(n, i),
          t
        );
      })();
      function re(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function(t) {
              ie(e, t, n[t]);
            });
        }
        return e;
      }
      function ie(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      function ae(e) {
        return (ae =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function oe(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function ue(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function se(e, t, n) {
        return t && ue(e.prototype, t), n && ue(e, n), e;
      }
      function ce(e, t) {
        return !t || ("object" !== ae(t) && "function" != typeof t)
          ? (function(e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e)
          : t;
      }
      function le(e) {
        return (le = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function fe(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 }
        })),
          t && me(e, t);
      }
      function me(e, t) {
        return (me =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      var de = Y()(),
        pe = (function(e) {
          function t() {
            return oe(this, t), ce(this, le(t).apply(this, arguments));
          }
          return (
            fe(t, h.a.Component),
            se(t, [
              {
                key: "shouldComponentUpdate",
                value: function(e) {
                  var t = this.props,
                    n = t.submissions,
                    r = t.browseVotes;
                  return (
                    e.submissions !== n ||
                    Object.keys(e.browseVotes).length !== Object.keys(r).length
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.submissions,
                    n = e.voteFromBrowse,
                    r = e.browseVotes,
                    i = e.report;
                  return t
                    ? 0 == t.length
                      ? h.a.createElement(
                          "div",
                          { style: { height: "90vh" } },
                          "Didn't find anything!"
                        )
                      : h.a.createElement(
                          "div",
                          { className: "submissions" },
                          t.map(function(e) {
                            var t = new Date(
                              e.data.timestamp
                            ).toLocaleDateString();
                            return (
                              new Date().getTime() -
                                new Date(e.data.timestamp).getTime() <
                                864e5 && (t = de.format(e.data.timestamp)),
                              h.a.createElement(
                                "div",
                                { key: e.id, className: "submission" },
                                h.a.createElement(
                                  y.b,
                                  {
                                    className: "img-link",
                                    to: {
                                      pathname: "/",
                                      hash: "#".concat(e.id)
                                    },
                                    onClick: function() {
                                      window.UI.setState(function() {
                                        return { currentSubmission: null };
                                      }, window.UI.load);
                                    }
                                  },
                                  h.a.createElement("img", {
                                    src: ""
                                      .concat(
                                        "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F"
                                      )
                                      .concat(e.data.id, ".png?alt=media")
                                  })
                                ),
                                h.a.createElement(
                                  "div",
                                  { style: { width: "50%" } },
                                  h.a.createElement(
                                    "h3",
                                    {
                                      style: {
                                        flexGrow: 1,
                                        wordWrap: "break-word"
                                      }
                                    },
                                    h.a.createElement(H, { text: e.data.title })
                                  ),
                                  h.a.createElement(
                                    "button",
                                    {
                                      className: "heart",
                                      onClick: function() {
                                        return n(e);
                                      }
                                    },
                                    r[e.id] ? "🖤" : "♡",
                                    r[e.id] || e.data.score
                                  ),
                                  h.a.createElement("h4", null, t),
                                  h.a.createElement(
                                    "button",
                                    {
                                      className: "report",
                                      title: "report",
                                      onClick: function() {
                                        return i(e.id);
                                      }
                                    },
                                    "!"
                                  )
                                )
                              )
                            );
                          })
                        )
                    : h.a.createElement(
                        "div",
                        { style: { height: "90vh" } },
                        "Loading Submissions..."
                      );
                }
              }
            ]),
            t
          );
        })(),
        ve = (function(e) {
          function t(e) {
            var n;
            return (
              oe(this, t),
              ((n = ce(this, le(t).call(this, e))).state = {
                paused: !1,
                submitting: !1,
                dataURL: {},
                submissions: null,
                browseVotes: {},
                search: ""
              }),
              n
            );
          }
          return (
            fe(t, h.a.Component),
            se(t, [
              {
                key: "componentWillMount",
                value: function() {
                  console.log("mounted"), this.loadSubmissions();
                }
              },
              {
                key: "componentDidUpdate",
                value: function(e) {
                  (e.location.pathname == this.props.location.pathname &&
                    e.location.search == this.props.location.search) ||
                    this.loadSubmissions();
                }
              },
              {
                key: "togglePause",
                value: function() {
                  (window.paused = !this.state.paused),
                    this.setState({ paused: !this.state.paused });
                }
              },
              {
                key: "setSize",
                value: function(e, t) {
                  e.preventDefault(), this.setState({ size: t });
                }
              },
              {
                key: "loadSubmissions",
                value: function() {
                  var e = this,
                    t = this.props.location;
                  t.search.startsWith("?title=") &&
                    this.setState({
                      search: this.props.location.search.slice(7)
                    });
                  var n = "";
                  t.pathname.startsWith("/browse/top/") && (n = "?q=score"),
                    t.pathname.startsWith("/browse/top/day") &&
                      (n = "?q=score&d=1"),
                    t.pathname.startsWith("/browse/top/week") &&
                      (n = "?q=score&d=7"),
                    t.pathname.startsWith("/browse/top/month") &&
                      (n = "?q=score&d=30"),
                    t.pathname.startsWith("/browse/search/") && (n = t.search),
                    this.setState({ submissions: null }),
                    fetch(a._url("api/creations") + n, {
                      method: "GET",
                      headers: { "Content-Type": "application/json" }
                    })
                      .then(function(e) {
                        return e.json();
                      })
                      .then(function(t) {
                        e.setState({ submissions: t });
                      })
                      .catch(function(t) {
                        e.setState({ submissions: !1 }),
                          console.error("Error:", t);
                      });
                }
              },
              {
                key: "voteFromBrowse",
                value: function(e) {
                  var t = this;
                  firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then(function(n) {
                      fetch(a._url("api/creations/".concat(e.id, "/vote")), {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + n
                        }
                      })
                        .then(function(e) {
                          return e.json();
                        })
                        .then(function(n) {
                          t.setState(function(t) {
                            var r = t.browseVotes;
                            return {
                              browseVotes: re(ie({}, e.id, n.score), r)
                            };
                          });
                        })
                        .catch(function(e) {
                          console.log(e);
                        });
                    });
                }
              },
              {
                key: "report",
                value: function(e) {
                  fetch(a._url("api/creations/".concat(e, "/report")), {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" }
                  })
                    .then(function(e) {
                      return e.json();
                    })
                    .then(function(e) {})
                    .catch(function(e) {
                      console.log(e);
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    n = t.search,
                    r = t.submissions,
                    i = t.browseVotes;
                  return h.a.createElement(
                    h.a.Fragment,
                    null,
                    h.a.createElement(ne, null),
                    h.a.createElement(
                      y.c,
                      { exact: !0, to: "/browse/" },
                      h.a.createElement("button", null, "New")
                    ),
                    h.a.createElement(
                      y.c,
                      { to: "/browse/top/day/" },
                      h.a.createElement("button", null, "Day")
                    ),
                    h.a.createElement(
                      y.c,
                      { to: "/browse/top/week/" },
                      h.a.createElement("button", null, "Week")
                    ),
                    h.a.createElement(
                      y.c,
                      { to: "/browse/top/month/" },
                      h.a.createElement("button", null, "Month")
                    ),
                    h.a.createElement(
                      y.c,
                      { exact: !0, to: "/browse/top/" },
                      h.a.createElement("button", null, "All ")
                    ),
                    h.a.createElement(
                      "span",
                      { style: { display: "inline-block" } },
                      h.a.createElement("input", {
                        value: n,
                        onChange: function(t) {
                          return e.setState({ search: t.target.value });
                        },
                        onKeyDown: function(t) {
                          return (
                            13 == t.keyCode &&
                            e.props.history.push(
                              "/browse/search/?title=".concat(n)
                            )
                          );
                        },
                        placeholder: "search"
                      }),
                      n &&
                        h.a.createElement(
                          y.c,
                          {
                            to: {
                              pathname: "/browse/search/",
                              search: "?title=".concat(n)
                            }
                          },
                          h.a.createElement("button", null, "Search")
                        )
                    ),
                    h.a.createElement(pe, {
                      submissions: r,
                      voteFromBrowse: function(t) {
                        return e.voteFromBrowse(t);
                      },
                      browseVotes: i,
                      report: function(t) {
                        return e.report(t);
                      }
                    })
                  );
                }
              }
            ]),
            t
          );
        })(),
        he = Object(G.d)(ve);
      function ye(e) {
        return (
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = new Array(e.length); t < e.length; t++)
                n[t] = e[t];
              return n;
            }
          })(e) ||
          (function(e) {
            if (
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance"
            );
          })()
        );
      }
      function ge(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function(t) {
              be(e, t, n[t]);
            });
        }
        return e;
      }
      function be(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      function Ee(e) {
        return (Ee =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function xe(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function we(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function Te(e, t, n) {
        return t && we(e.prototype, t), n && we(e, n), e;
      }
      function Se(e, t) {
        return !t || ("object" !== Ee(t) && "function" != typeof t)
          ? (function(e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e)
          : t;
      }
      function _e(e) {
        return (_e = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function Re(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 }
        })),
          t && De(e, t);
      }
      function De(e, t) {
        return (De =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      var Ue = Y()(),
        Ae = (function(e) {
          function t() {
            return xe(this, t), Se(this, _e(t).apply(this, arguments));
          }
          return (
            Re(t, h.a.Component),
            Te(t, [
              {
                key: "shouldComponentUpdate",
                value: function(e) {
                  var t = this.props,
                    n = t.submissions,
                    r = t.browseVotes;
                  return (
                    e.submissions !== n ||
                    Object.keys(e.browseVotes).length !== Object.keys(r).length
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.submissions,
                    n = e.voteFromBrowse,
                    r = e.browseVotes,
                    i = e.judge;
                  return t
                    ? 0 == t.length
                      ? h.a.createElement(
                          "div",
                          { style: { height: "90vh" } },
                          "No actionable reports! Thanks ♡♡♡"
                        )
                      : h.a.createElement(
                          "div",
                          { className: "submissions" },
                          t.map(function(e) {
                            var t = new Date(
                              e.data.timestamp
                            ).toLocaleDateString();
                            return (
                              new Date().getTime() -
                                new Date(e.data.timestamp).getTime() <
                                864e5 && (t = Ue.format(e.data.timestamp)),
                              h.a.createElement(
                                "div",
                                { key: e.id, className: "submission" },
                                h.a.createElement(
                                  y.b,
                                  {
                                    className: "img-link",
                                    to: {
                                      pathname: "/",
                                      hash: "#".concat(e.id)
                                    },
                                    onClick: function() {
                                      window.UI.setState(function() {
                                        return { currentSubmission: null };
                                      }, window.UI.load);
                                    }
                                  },
                                  h.a.createElement("img", {
                                    src: ""
                                      .concat(
                                        "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F"
                                      )
                                      .concat(e.data.id, ".png?alt=media")
                                  })
                                ),
                                h.a.createElement(
                                  "div",
                                  { style: { width: "50%" } },
                                  h.a.createElement(
                                    "h3",
                                    {
                                      style: {
                                        flexGrow: 1,
                                        wordWrap: "break-word"
                                      }
                                    },
                                    h.a.createElement(H, { text: e.data.title })
                                  ),
                                  h.a.createElement(
                                    "button",
                                    {
                                      className: "heart",
                                      onClick: function() {
                                        return n(e);
                                      }
                                    },
                                    h.a.createElement(
                                      "h3",
                                      null,
                                      r[e.id] ? "🖤" : "♡",
                                      r[e.id] || e.data.score
                                    )
                                  ),
                                  h.a.createElement("h4", null, t),
                                  h.a.createElement(
                                    "h3",
                                    null,
                                    e.data.reports,
                                    " reports"
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "adminButtons" },
                                    h.a.createElement(
                                      "button",
                                      {
                                        className: "delete",
                                        title: "delete",
                                        onClick: function() {
                                          return i(e.id, !0);
                                        }
                                      },
                                      "delete 💥"
                                    ),
                                    h.a.createElement(
                                      "button",
                                      {
                                        className: "pardon",
                                        title: "pardon",
                                        onClick: function() {
                                          return i(e.id, !1);
                                        }
                                      },
                                      "pardon 🐣"
                                    )
                                  )
                                )
                              )
                            );
                          })
                        )
                    : h.a.createElement(
                        "div",
                        { style: { height: "90vh" } },
                        "Loading Submissions..."
                      );
                }
              }
            ]),
            t
          );
        })(),
        Ie = (function(e) {
          function t(e) {
            var n;
            return (
              xe(this, t),
              ((n = Se(this, _e(t).call(this, e))).state = {
                paused: !1,
                submissions: null,
                decidedIds: [],
                browseVotes: {},
                search: "",
                currentUser: firebase.auth().currentUser
              }),
              n
            );
          }
          return (
            Re(t, h.a.Component),
            Te(t, [
              {
                key: "componentWillMount",
                value: function() {
                  this.loadSubmissions();
                }
              },
              {
                key: "componentDidUpdate",
                value: function(e) {
                  e.location.pathname != this.props.location.pathname &&
                    this.loadSubmissions();
                }
              },
              {
                key: "voteFromBrowse",
                value: function(e) {
                  var t = this;
                  firebase
                    .auth()
                    .currentUser.getIdToken(!0)
                    .then(function(n) {
                      fetch(a._url("api/creations/".concat(e.id, "/vote")), {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + n
                        }
                      })
                        .then(function(e) {
                          return e.json();
                        })
                        .then(function(n) {
                          t.setState(function(t) {
                            var r = t.browseVotes;
                            return {
                              browseVotes: ge(be({}, e.id, n.score), r)
                            };
                          });
                        })
                        .catch(function(e) {
                          console.log(e);
                        });
                    });
                }
              },
              {
                key: "loadSubmissions",
                value: function() {
                  var e = this;
                  fetch(a._url("api/reports"), {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                  })
                    .then(function(e) {
                      return e.json();
                    })
                    .then(function(t) {
                      e.setState({ submissions: t });
                    })
                    .catch(function(t) {
                      e.setState({ submissions: !1 }),
                        console.error("Error:", t);
                    });
                }
              },
              {
                key: "judge",
                value: function(e, t) {
                  var n = this;
                  this.setState(function(t) {
                    var n = t.decidedIds;
                    return { decidedIds: [].concat(ye(n), [e]) };
                  }),
                    firebase
                      .auth()
                      .currentUser.getIdToken(!0)
                      .then(function(r) {
                        fetch(
                          a._url("api/creations/".concat(e, "/judge")) +
                            "?ruling=".concat(t),
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + r
                            }
                          }
                        )
                          .then(function(e) {
                            return e.json();
                          })
                          .then(function(e) {
                            n.loadSubmissions();
                          })
                          .catch(function(e) {
                            console.log(e);
                          });
                      });
                }
              },
              {
                key: "doSignInWithGoogle",
                value: function() {
                  var e = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithRedirect(e);
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    n = t.submissions,
                    r = t.browseVotes,
                    i = (t.currentUser, t.decidedIds);
                  return (
                    (n =
                      n &&
                      n.filter(function(e) {
                        return !i.includes(e.id);
                      })),
                    h.a.createElement(
                      h.a.Fragment,
                      null,
                      h.a.createElement(ne, null),
                      h.a.createElement(
                        "h2",
                        { style: { display: "inline-block" } },
                        "do it for doona "
                      ),
                      n &&
                        h.a.createElement(
                          "h3",
                          null,
                          n.length,
                          " actionable reports:"
                        ),
                      h.a.createElement(
                        y.c,
                        { to: "/browse/" },
                        h.a.createElement("button", null, "Browse new")
                      ),
                      h.a.createElement(Ae, {
                        submissions: n,
                        voteFromBrowse: function(t) {
                          return e.voteFromBrowse(t);
                        },
                        browseVotes: r,
                        judge: function(t, n) {
                          return e.judge(t, n);
                        }
                      })
                    )
                  );
                }
              }
            ]),
            t
          );
        })(),
        ke = Object(G.d)(Ie);
      function Fe(e) {
        e.match;
        var t = e.location;
        return h.a.createElement(
          g,
          null,
          h.a.createElement(he, { location: t })
        );
      }
      function Ce(e) {
        e.match;
        var t = e.location;
        return h.a.createElement(
          g,
          null,
          h.a.createElement(ke, { location: t })
        );
      }
      function Le(e) {
        e.match;
        var t = e.location;
        return h.a.createElement(
          g,
          null,
          h.a.createElement(ne, { location: t })
        );
      }
      M.a.render(
        h.a.createElement(function() {
          return h.a.createElement(
            y.a,
            null,
            h.a.createElement(G.a, { path: "/", component: U }),
            h.a.createElement(G.a, {
              exact: !0,
              path: "/info/",
              component: function() {
                return h.a.createElement(g, null, h.a.createElement(W, null));
              }
            }),
            h.a.createElement(G.a, { path: "/browse", component: Fe }),
            h.a.createElement(G.a, { path: "/admin", component: Ce }),
            h.a.createElement(G.a, { path: "/login", component: Le }),
            h.a.createElement(G.a, { path: "/__/auth/handler", component: Le })
          );
        }, null),
        document.getElementById("ui")
      );
      var Pe = n(50),
        Oe = n(51),
        Xe = n(52),
        je = n(53),
        Be = n(54),
        Ne = n(55),
        ze = n(56),
        Me = n(57),
        Ge = n(58),
        We = n(59),
        Ve = n(60),
        Ye = n(61),
        He = n(62);
      function qe(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      var Ke,
        Je,
        Qe = document.getElementById("fluid-canvas"),
        Ze = document.getElementById("sand-canvas"),
        $e = [1, 1, 0.8];
      n.d(t, "canvas", function() {
        return it;
      }),
        n.d(t, "width", function() {
          return nt;
        }),
        n.d(t, "height", function() {
          return rt;
        }),
        n.d(t, "universe", function() {
          return tt;
        }),
        n.d(t, "reset", function() {
          return lt;
        }),
        window.safari &&
          (history.pushState(null, null, location.href),
          (window.onpopstate = function(e) {
            history.go(1);
          })),
        (Je = !1),
        (Ke = navigator.userAgent || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          Ke
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            Ke.substr(0, 4)
          )) &&
          (Je = !0),
        Je &&
          (window.onbeforeunload = function() {
            return !0;
          }),
        "serviceWorker" in navigator &&
          window.addEventListener("load", function() {
            navigator.serviceWorker
              .register("/service-worker.js")
              .then(function(e) {
                console.log("SW registered: ", e);
              })
              .catch(function(e) {
                console.log("SW registration failed: ", e);
              });
          });
      var et = 300,
        tt = o.b.new(et, et),
        nt = et,
        rt = et,
        it = document.getElementById("sand-canvas"),
        at = document.getElementById("fluid-canvas");
      (it.height = et * Math.ceil(window.devicePixelRatio)),
        (it.width = et * Math.ceil(window.devicePixelRatio)),
        document
          .getElementById("background")
          .addEventListener("touchmove", function(e) {
            window.paused || (e.cancelable && e.preventDefault());
          });
      var ot = document.getElementById("ui"),
        ut = function() {
          var e = window.innerWidth,
            t = "",
            n = "",
            r = "display:none;";
          e > window.innerHeight - 50
            ? e - window.innerHeight < 400
              ? ((t = "height: ".concat(window.innerHeight, "px; margin:3px")),
                (n = "width: ".concat(
                  e - window.innerHeight - 12,
                  "px; margin: 2px;"
                )))
              : ((t = "\n       height: "
                  .concat(window.innerHeight, "px;\n       width:")
                  .concat(
                    window.innerHeight,
                    "px;\n       margin:0;\n       left: auto;\n       right: 206px"
                  )),
                (n = "width: 200px; margin: 2px;"),
                (r = "width: ".concat(
                  e - window.innerHeight - 356,
                  "px; margin: 1px;"
                )))
            : ((t = "width: ".concat(e, "px; bottom:3px;")), (n = "")),
            (ot.style = n),
            (it.style = t),
            (at.style = t),
            (document.getElementsByClassName("adslot_1")[0].style = r);
        };
      ut(),
        window.addEventListener("deviceorientation", ut, !0),
        window.addEventListener("resize", ut);
      var st = (function(e) {
          var t = e.universe;
          (Qe.width = t.width()), (Qe.height = t.height());
          var n,
            r = {
              TEXTURE_DOWNSAMPLE: 0,
              DENSITY_DISSIPATION: 0.98,
              VELOCITY_DISSIPATION: 0.99,
              PRESSURE_DISSIPATION: 0.8,
              PRESSURE_ITERATIONS: 25,
              CURL: 30,
              SPLAT_RADIUS: 0.005
            },
            i = [],
            a = [],
            o = (function(e) {
              var t,
                n,
                r = {
                  alpha: !1,
                  depth: !1,
                  stencil: !1,
                  antialias: !1,
                  preserveDrawingBuffer: !1
                },
                i = e.getContext("webgl2", r),
                a = !!i;
              a ||
                (i =
                  e.getContext("webgl", r) ||
                  e.getContext("experimental-webgl", r)),
                a
                  ? (i.getExtension("EXT_color_buffer_float"),
                    (n = i.getExtension("OES_texture_float_linear")))
                  : ((t = i.getExtension("OES_texture_half_float")),
                    (n = i.getExtension("OES_texture_half_float_linear"))),
                i.clearColor(0, 0, 0, 0);
              var o,
                u,
                s,
                c = a ? i.HALF_FLOAT : t.HALF_FLOAT_OES;
              return (
                a
                  ? ((o = T(i, i.RGBA16F, i.RGBA, c)),
                    (u = T(i, i.RG16F, i.RG, c)),
                    (s = T(i, i.R16F, i.RED, c)))
                  : ((o = T(i, i.RGBA, i.RGBA, c)),
                    (u = T(i, i.RGBA, i.RGBA, c)),
                    (s = T(i, i.RGBA, i.RGBA, c))),
                {
                  gl: i,
                  ext: {
                    formatRGBA: o,
                    formatRG: u,
                    formatR: s,
                    halfFloatTexType: c,
                    supportLinearFiltering: n
                  }
                }
              );
            })(Qe),
            s = o.gl,
            c = o.ext,
            l = (function(e) {
              function t(t, n) {
                var r = e.createShader(t);
                if (
                  (e.shaderSource(r, n),
                  e.compileShader(r),
                  !e.getShaderParameter(r, e.COMPILE_STATUS))
                )
                  throw e.getShaderInfoLog(r);
                return r;
              }
              return {
                baseVertexShader: t(e.VERTEX_SHADER, Oe),
                clearShader: t(e.FRAGMENT_SHADER, Xe),
                displayShader: t(e.FRAGMENT_SHADER, je),
                splatShader: t(e.FRAGMENT_SHADER, Be),
                advectionManualFilteringShader: t(e.FRAGMENT_SHADER, Ne),
                advectionShader: t(e.FRAGMENT_SHADER, ze),
                divergenceShader: t(e.FRAGMENT_SHADER, Me),
                curlShader: t(e.FRAGMENT_SHADER, Ge),
                vorticityShader: t(e.FRAGMENT_SHADER, We),
                pressureShader: t(e.FRAGMENT_SHADER, Ve),
                gradientSubtractShader: t(e.FRAGMENT_SHADER, Ye),
                velocityOutShader: t(e.FRAGMENT_SHADER, He)
              };
            })(s),
            f = l.baseVertexShader,
            m = l.clearShader,
            d = l.displayShader,
            p = l.splatShader,
            v = l.advectionManualFilteringShader,
            h = l.advectionShader,
            y = l.divergenceShader,
            g = l.curlShader,
            b = l.vorticityShader,
            E = l.pressureShader,
            x = l.gradientSubtractShader,
            w = l.velocityOutShader;
          function T(e, t, n, r) {
            if (
              !(function(e, t, n, r) {
                var i = e.createTexture();
                e.bindTexture(e.TEXTURE_2D, i),
                  e.texParameteri(
                    e.TEXTURE_2D,
                    e.TEXTURE_MIN_FILTER,
                    e.NEAREST
                  ),
                  e.texParameteri(
                    e.TEXTURE_2D,
                    e.TEXTURE_MAG_FILTER,
                    e.NEAREST
                  ),
                  e.texParameteri(
                    e.TEXTURE_2D,
                    e.TEXTURE_WRAP_S,
                    e.CLAMP_TO_EDGE
                  ),
                  e.texParameteri(
                    e.TEXTURE_2D,
                    e.TEXTURE_WRAP_T,
                    e.CLAMP_TO_EDGE
                  ),
                  e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, n, r, null);
                var a = e.createFramebuffer();
                return (
                  e.bindFramebuffer(e.FRAMEBUFFER, a),
                  e.framebufferTexture2D(
                    e.FRAMEBUFFER,
                    e.COLOR_ATTACHMENT0,
                    e.TEXTURE_2D,
                    i,
                    0
                  ),
                  e.checkFramebufferStatus(e.FRAMEBUFFER) ==
                    e.FRAMEBUFFER_COMPLETE
                );
              })(e, t, n, r)
            )
              switch (t) {
                case e.R16F:
                  return T(e, e.RG16F, e.RG, r);
                case e.RG16F:
                  return T(e, e.RGBA16F, e.RGBA, r);
                default:
                  return null;
              }
            return { internalFormat: t, format: n };
          }
          function S() {
            (this.id = -1),
              (this.x = 0),
              (this.y = 0),
              (this.dx = 0),
              (this.dy = 0),
              (this.down = !1),
              (this.moved = !1),
              (this.color = [30, 300, 30]);
          }
          (n = new Pe.a({ width: 300 }))
            .add(r, "TEXTURE_DOWNSAMPLE", { Full: 0, Half: 1, Quarter: 2 })
            .name("resolution")
            .onFinishChange(Y),
            n.add(r, "DENSITY_DISSIPATION", 0.9, 1).name("density diffusion"),
            n.add(r, "VELOCITY_DISSIPATION", 0.9, 1).name("velocity diffusion"),
            n.add(r, "PRESSURE_DISSIPATION", 0, 1).name("pressure diffusion"),
            n.add(r, "PRESSURE_ITERATIONS", 1, 60).name("iterations"),
            n
              .add(r, "CURL", 0, 50)
              .name("vorticity")
              .step(1),
            n.add(r, "SPLAT_RADIUS", 1e-4, 0.01).name("splat radius"),
            n
              .add(
                {
                  fun: function() {
                    a.push(parseInt(20 * Math.random()) + 5);
                  }
                },
                "fun"
              )
              .name("Random splats"),
            n.close(),
            i.push(new S());
          var _,
            R,
            D,
            U,
            A,
            I,
            k,
            F,
            C,
            L,
            P = (function() {
              function e(t, n) {
                if (
                  ((function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, e),
                  (this.uniforms = {}),
                  (this.program = s.createProgram()),
                  s.attachShader(this.program, t),
                  s.attachShader(this.program, n),
                  s.linkProgram(this.program),
                  !s.getProgramParameter(this.program, s.LINK_STATUS))
                )
                  throw s.getProgramInfoLog(this.program);
                for (
                  var r = s.getProgramParameter(
                      this.program,
                      s.ACTIVE_UNIFORMS
                    ),
                    i = 0;
                  i < r;
                  i++
                ) {
                  var a = s.getActiveUniform(this.program, i).name;
                  this.uniforms[a] = s.getUniformLocation(this.program, a);
                }
              }
              var t, n, r;
              return (
                (t = e),
                (n = [
                  {
                    key: "bind",
                    value: function() {
                      s.useProgram(this.program);
                    }
                  }
                ]) && qe(t.prototype, n),
                r && qe(t, r),
                e
              );
            })();
          Y();
          var O = new P(f, m),
            X = new P(f, d),
            j = new P(f, w),
            B = new P(f, p),
            N = new P(f, c.supportLinearFiltering ? h : v),
            z = new P(f, y),
            M = new P(f, g),
            G = new P(f, b),
            W = new P(f, E),
            V = new P(f, x);
          function Y() {
            (_ = s.drawingBufferWidth >> r.TEXTURE_DOWNSAMPLE),
              (R = s.drawingBufferHeight >> r.TEXTURE_DOWNSAMPLE);
            var e = c.halfFloatTexType,
              t = c.formatRGBA,
              n = c.formatRG,
              i = c.formatR;
            (U = q(
              0,
              _,
              R,
              n.internalFormat,
              n.format,
              e,
              c.supportLinearFiltering ? s.LINEAR : s.NEAREST
            )),
              (D = q(
                2,
                _,
                R,
                t.internalFormat,
                t.format,
                e,
                c.supportLinearFiltering ? s.LINEAR : s.NEAREST
              )),
              (F = H(4, _, R, i.internalFormat, i.format, e, s.NEAREST)),
              (C = H(5, _, R, i.internalFormat, i.format, e, s.NEAREST)),
              (L = q(6, _, R, i.internalFormat, i.format, e, s.NEAREST)),
              (I = H(
                8,
                _,
                R,
                n.internalFormat,
                n.format,
                e,
                c.supportLinearFiltering ? s.LINEAR : s.NEAREST
              )),
              (k = H(
                10,
                _,
                R,
                n.internalFormat,
                n.format,
                e,
                c.supportLinearFiltering ? s.LINEAR : s.NEAREST
              )),
              (A = H(
                9,
                _,
                R,
                s.RGBA,
                s.RGBA,
                s.UNSIGNED_BYTE,
                c.supportLinearFiltering ? s.LINEAR : s.NEAREST
              ));
          }
          function H(e, t, n, r, i, a, o) {
            s.activeTexture(s.TEXTURE0 + e);
            var u = s.createTexture();
            s.bindTexture(s.TEXTURE_2D, u),
              s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, o),
              s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, o),
              s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE),
              s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE),
              s.texImage2D(s.TEXTURE_2D, 0, r, t, n, 0, i, a, null);
            var c = s.createFramebuffer();
            return (
              s.bindFramebuffer(s.FRAMEBUFFER, c),
              s.framebufferTexture2D(
                s.FRAMEBUFFER,
                s.COLOR_ATTACHMENT0,
                s.TEXTURE_2D,
                u,
                0
              ),
              s.viewport(0, 0, t, n),
              s.clear(s.COLOR_BUFFER_BIT),
              [u, c, e]
            );
          }
          function q(e, t, n, r, i, a, o) {
            var u = H(e, t, n, r, i, a, o),
              s = H(e + 1, t, n, r, i, a, o);
            return {
              get read() {
                return u;
              },
              get write() {
                return s;
              },
              swap: function() {
                var e = u;
                (u = s), (s = e);
              }
            };
          }
          var K,
            J,
            Q,
            Z =
              (s.bindBuffer(s.ARRAY_BUFFER, s.createBuffer()),
              s.bufferData(
                s.ARRAY_BUFFER,
                new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
                s.STATIC_DRAW
              ),
              s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, s.createBuffer()),
              s.bufferData(
                s.ELEMENT_ARRAY_BUFFER,
                new Uint16Array([0, 1, 2, 0, 2, 3]),
                s.STATIC_DRAW
              ),
              s.vertexAttribPointer(0, 2, s.FLOAT, !1, 0, 0),
              s.enableVertexAttribArray(0),
              function(e) {
                s.bindFramebuffer(s.FRAMEBUFFER, e),
                  s.drawElements(s.TRIANGLES, 6, s.UNSIGNED_SHORT, 0);
              }),
            $ = Date.now(),
            ee = t.width(),
            te = t.height(),
            ne = new Uint8Array(u.d.buffer, t.winds(), ee * te * 4),
            re = new Uint8Array(u.d.buffer, t.burns(), ee * te * 4),
            ie = new Uint8Array(u.d.buffer, t.cells(), ee * te * 4);
          function ae(e, t, n, r, i) {
            B.bind();
            var a = 0;
            s.activeTexture(s.TEXTURE0 + a),
              s.bindTexture(s.TEXTURE_2D, U.read[0]),
              s.uniform1i(B.uniforms.uTarget, a++),
              s.uniform1f(B.uniforms.aspectRatio, Qe.width / Qe.height),
              s.uniform2f(B.uniforms.point, e / Qe.width, 1 - t / Qe.height),
              s.uniform3f(B.uniforms.color, n, -r, 1),
              s.uniform1f(B.uniforms.radius, (window.UI.state.size + 1) / 600),
              Z(U.write[1]),
              U.swap(),
              s.activeTexture(s.TEXTURE0 + a),
              s.bindTexture(s.TEXTURE_2D, D.read[0]),
              s.uniform1i(B.uniforms.uTarget, a++),
              s.uniform3f(B.uniforms.color, i[0], i[1], i[2]),
              Z(D.write[1]),
              D.swap();
          }
          var oe = function() {
            (K = Ze.getBoundingClientRect()),
              (J = Ze.width / Math.ceil(window.devicePixelRatio) / K.width),
              (Q = Ze.height / Math.ceil(window.devicePixelRatio) / K.height);
          };
          return (
            oe(),
            window.addEventListener("resize", oe),
            window.addEventListener("deviceorientation", oe, !0),
            Ze.addEventListener("mousemove", function(e) {
              var t = (e.clientX - K.left) * J,
                n = (e.clientY - K.top) * Q;
              (i[0].moved = i[0].down),
                (i[0].dx = 10 * (t - i[0].x)),
                (i[0].dy = 10 * (n - i[0].y)),
                (i[0].x = t),
                (i[0].y = n);
            }),
            Ze.addEventListener(
              "touchmove",
              function(e) {
                window.paused || (e.cancelable && e.preventDefault());
                for (var t = e.targetTouches, n = 0; n < t.length; n++) {
                  var r = i[n];
                  r.moved = r.down;
                  var a = (t[n].clientX - K.left) * J,
                    o = (t[n].clientY - K.top) * Q;
                  (r.dx = 10 * (a - r.x)),
                    (r.dy = 10 * (o - r.y)),
                    (r.x = a),
                    (r.y = o);
                }
              },
              !1
            ),
            Ze.addEventListener("mousedown", function() {
              (i[0].down = !0), (i[0].color = $e);
            }),
            Ze.addEventListener("touchstart", function(e) {
              e.cancelable && e.preventDefault();
              for (var t = e.targetTouches, n = 0; n < t.length; n++) {
                n >= i.length && i.push(new S());
                var r = (t[n].clientX - K.left) * J,
                  a = (t[n].clientY - K.top) * Q;
                (i[n].id = t[n].identifier),
                  (i[n].down = !0),
                  (i[n].x = r),
                  (i[n].y = a),
                  (i[n].color = $e);
              }
            }),
            window.addEventListener("mouseup", function() {
              i[0].down = !1;
            }),
            window.addEventListener("touchend", function(e) {
              for (var t = e.changedTouches, n = 0; n < t.length; n++)
                for (var r = 0; r < i.length; r++)
                  t[n].identifier == i[r].id && (i[r].down = !1);
            }),
            {
              update: function() {
                (ne = new Uint8Array(u.d.buffer, t.winds(), ee * te * 4)),
                  (re = new Uint8Array(u.d.buffer, t.burns(), ee * te * 4));
                var e = t.cells();
                ie = new Uint8Array(u.d.buffer, e, ee * te * 4);
                var n = Math.min((Date.now() - $) / 1e3, 0.016);
                ($ = Date.now()),
                  s.viewport(0, 0, _, R),
                  a.length > 0 &&
                    (function(e) {
                      for (var t = 0; t < e; t++) {
                        var n = $e,
                          r = Qe.width * Math.random(),
                          i = Qe.height * Math.random(),
                          a = 1e3 * (Math.random() - 0.5),
                          o = 1e3 * (Math.random() - 0.5);
                        ae(r, i, a, o, n);
                      }
                    })(a),
                  N.bind();
                var o,
                  c = 0;
                s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(N.uniforms.uVelocity, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(N.uniforms.uSource, c++),
                  s.uniform2f(N.uniforms.texelSize, 1 / _, 1 / R),
                  s.uniform1f(N.uniforms.dt, n),
                  s.uniform1f(N.uniforms.dissipation, r.VELOCITY_DISSIPATION),
                  Z(U.write[1]),
                  U.swap(),
                  s.bindTexture(s.TEXTURE_2D, I[0]),
                  s.texImage2D(
                    s.TEXTURE_2D,
                    0,
                    s.RGBA,
                    ee,
                    te,
                    0,
                    s.RGBA,
                    s.UNSIGNED_BYTE,
                    re
                  ),
                  s.bindTexture(s.TEXTURE_2D, k[0]),
                  s.texImage2D(
                    s.TEXTURE_2D,
                    0,
                    s.RGBA,
                    ee,
                    te,
                    0,
                    s.RGBA,
                    s.UNSIGNED_BYTE,
                    ie
                  ),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, I[0]),
                  s.uniform1i(N.uniforms.uWind, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(N.uniforms.uVelocity, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, D.read[0]),
                  s.uniform1i(N.uniforms.uSource, c++),
                  s.uniform1f(N.uniforms.dissipation, r.DENSITY_DISSIPATION),
                  Z(D.write[1]),
                  D.swap();
                for (var l = 0; l < i.length; l++) {
                  var f = i[l];
                  f.moved &&
                    window.UI.state.selectedElement < 0 &&
                    (ae(f.x, f.y, f.dx, f.dy, f.color), (f.moved = !1));
                }
                M.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(M.uniforms.uVelocity, c++),
                  s.uniform2f(M.uniforms.texelSize, 1 / _, 1 / R),
                  Z(C[1]),
                  G.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(G.uniforms.uVelocity, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, C[0]),
                  s.uniform1i(G.uniforms.uCurl, c++),
                  s.uniform2f(G.uniforms.texelSize, 1 / _, 1 / R),
                  s.uniform1f(G.uniforms.curl, r.CURL),
                  s.uniform1f(G.uniforms.dt, n),
                  Z(U.write[1]),
                  U.swap(),
                  z.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(z.uniforms.uVelocity, c++),
                  s.uniform2f(z.uniforms.texelSize, 1 / _, 1 / R),
                  Z(F[1]),
                  O.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, I[0]),
                  s.uniform1i(O.uniforms.uWind, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, L.read[0]),
                  s.uniform1i(O.uniforms.uTexture, c++),
                  s.uniform1f(O.uniforms.value, r.PRESSURE_DISSIPATION),
                  Z(L.write[1]),
                  L.swap(),
                  W.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, F[0]),
                  s.uniform1i(W.uniforms.uDivergence, c++),
                  s.uniform2f(W.uniforms.texelSize, 1 / _, 1 / R),
                  (o = L.read[2]),
                  s.uniform1i(W.uniforms.uPressure, o),
                  s.activeTexture(s.TEXTURE0 + o);
                for (var m = 0; m < r.PRESSURE_ITERATIONS; m++)
                  s.bindTexture(s.TEXTURE_2D, L.read[0]),
                    Z(L.write[1]),
                    L.swap();
                j.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(j.uniforms.uTexture, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, L.read[0]),
                  s.uniform1i(j.uniforms.uPressure, c++),
                  Z(A[1]),
                  s.readPixels(0, 0, ee, te, s.RGBA, s.UNSIGNED_BYTE, ne),
                  V.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, I[0]),
                  s.uniform1i(V.uniforms.uWind, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, L.read[0]),
                  s.uniform1i(V.uniforms.uPressure, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(V.uniforms.uVelocity, c++),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, k[0]),
                  s.uniform1i(V.uniforms.uCells, c++),
                  s.uniform2f(V.uniforms.texelSize, 1 / _, 1 / R),
                  Z(U.write[1]),
                  U.swap(),
                  s.viewport(0, 0, s.drawingBufferWidth, s.drawingBufferHeight),
                  X.bind(),
                  (c = 0),
                  s.activeTexture(s.TEXTURE0 + c),
                  s.bindTexture(s.TEXTURE_2D, D.read[0]),
                  s.uniform1i(X.uniforms.uTexture, c++),
                  Z(null);
              },
              reset: function() {
                O.bind();
                var e = 0;
                s.activeTexture(s.TEXTURE0 + e),
                  s.bindTexture(s.TEXTURE_2D, I[0]),
                  s.uniform1i(O.uniforms.uWind, e++),
                  s.activeTexture(s.TEXTURE0 + e),
                  s.bindTexture(s.TEXTURE_2D, D.read[0]),
                  s.uniform1i(O.uniforms.uTexture, e++),
                  s.uniform1f(O.uniforms.value, 0),
                  Z(D.write[1]),
                  D.swap(),
                  (e = 0),
                  s.activeTexture(s.TEXTURE0 + e),
                  s.bindTexture(s.TEXTURE_2D, I[0]),
                  s.uniform1i(O.uniforms.uWind, e++),
                  s.activeTexture(s.TEXTURE0 + e),
                  s.bindTexture(s.TEXTURE_2D, L.read[0]),
                  s.uniform1i(O.uniforms.uTexture, e++),
                  s.uniform1f(O.uniforms.value, 0),
                  Z(L.write[1]),
                  L.swap(),
                  (e = 0),
                  s.activeTexture(s.TEXTURE0 + e),
                  s.bindTexture(s.TEXTURE_2D, I[0]),
                  s.uniform1i(O.uniforms.uWind, e++),
                  s.activeTexture(s.TEXTURE0 + e),
                  s.bindTexture(s.TEXTURE_2D, U.read[0]),
                  s.uniform1i(O.uniforms.uTexture, e++),
                  s.uniform1f(O.uniforms.value, 0),
                  Z(U.write[1]),
                  U.swap();
              }
            }
          );
        })({ universe: tt }),
        ct = m({ canvas: it, universe: tt });
      function lt() {
        st.reset(), st.update(), st.reset(), st.update(), tt.reset();
      }
      !(function e() {
        window.paused || (p.render(), tt.tick(), st.update()),
          ct(),
          (window.animationId = requestAnimationFrame(e));
      })(),
        (window.u = tt),
        (adsbygoogle = window.adsbygoogle || []).push({});
    },
    ,
    function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
        return f;
      }),
        n.d(t, "b", function() {
          return m;
        }),
        n.d(t, "c", function() {
          return d;
        }),
        n.d(t, "d", function() {
          return p;
        });
      var r = n(8);
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function o(e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), e;
      }
      var u = new TextDecoder("utf-8"),
        s = null;
      function c(e, t) {
        return u.decode(
          ((null !== s && s.buffer === r.d.buffer) ||
            (s = new Uint8Array(r.d.buffer)),
          s).subarray(e, e + t)
        );
      }
      var l,
        f = Object.freeze({
          Empty: 0,
          Wall: 1,
          Sand: 2,
          Water: 3,
          Stone: 13,
          Ice: 9,
          Gas: 4,
          Cloner: 5,
          Mite: 15,
          Wood: 7,
          Plant: 11,
          Fungus: 18,
          Seed: 19,
          Fire: 6,
          Lava: 8,
          Acid: 12,
          Dust: 14,
          Oil: 16,
          Rocket: 17
        }),
        m = (function() {
          function e() {
            i(this, e);
          }
          return (
            o(
              e,
              [
                {
                  key: "free",
                  value: function() {
                    var e = this.ptr;
                    (this.ptr = 0), r.b(e);
                  }
                },
                {
                  key: "reset",
                  value: function() {
                    r.m(this.ptr);
                  }
                },
                {
                  key: "tick",
                  value: function() {
                    r.n(this.ptr);
                  }
                },
                {
                  key: "width",
                  value: function() {
                    return r.o(this.ptr);
                  }
                },
                {
                  key: "height",
                  value: function() {
                    return r.h(this.ptr);
                  }
                },
                {
                  key: "cells",
                  value: function() {
                    return r.f(this.ptr);
                  }
                },
                {
                  key: "winds",
                  value: function() {
                    return r.p(this.ptr);
                  }
                },
                {
                  key: "burns",
                  value: function() {
                    return r.e(this.ptr);
                  }
                },
                {
                  key: "paint",
                  value: function(e, t, n, i) {
                    r.j(this.ptr, e, t, n, i);
                  }
                },
                {
                  key: "push_undo",
                  value: function() {
                    r.l(this.ptr);
                  }
                },
                {
                  key: "pop_undo",
                  value: function() {
                    r.k(this.ptr);
                  }
                },
                {
                  key: "flush_undos",
                  value: function() {
                    r.g(this.ptr);
                  }
                }
              ],
              [
                {
                  key: "__wrap",
                  value: function(t) {
                    var n = Object.create(e.prototype);
                    return (n.ptr = t), n;
                  }
                },
                {
                  key: "new",
                  value: function(t, n) {
                    var i = r.i(t, n);
                    return e.__wrap(i);
                  }
                }
              ]
            ),
            e
          );
        })(),
        d =
          "function" == typeof Math.random
            ? Math.random
            : ((l = "Math.random"),
              function() {
                throw new Error("".concat(l, " is not defined"));
              }),
        p = function(e, t) {
          throw new Error(c(e, t));
        };
    },
    ,
    ,
    ,
    ,
    function(e, t, n) {
      "use strict";
      var r = n.w[e.i];
      e.exports = r;
      n(3);
      r.q();
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(e, t) {
      e.exports =
        "precision highp float;\n#define GLSLIFY 1\nuniform float t;\nuniform float dpi;\nuniform vec2 resolution;\nuniform bool isSnapshot;\nuniform sampler2D backBuffer;\nuniform sampler2D data;\n\nvarying vec2 uv;\n\n// clang-format off\nvec3 hsv2rgb_4_0(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_2_1(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_2_2(vec4 x) {\n     return mod289_2_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_2_3(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_2_4(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_2_5 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_2_6 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_2_6;\n  vec3 i1 = min( g_2_6.xyz, l.zxy );\n  vec3 i2 = max( g_2_6.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_2_5.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_2_1(i);\n  vec4 p = permute_2_2( permute_2_2( permute_2_2(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_2_5.wyz - D_2_5.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_2_7 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_2_8 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_2_7.xy,h.z);\n  vec3 p3 = vec3(a1_2_7.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_2_3(vec4(dot(p0_2_8,p0_2_8), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_2_8 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_2_8,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_9(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1_9(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1_10(vec3 x) {\n  return mod289_1_9(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1_11(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1_9(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1_10( permute_1_10( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\nhighp float random_3_12(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n// clang-format on\n\nvoid main() {\n  vec3 color;\n  //   float r = abs(sin(t / 25.));\n  //   if (length(uv) < r && length(uv) > r - 0.1) {\n  // color = hsv2rgb(vec3(sin(t * 0.01), 0.5, 0.5));\n\n  vec2 textCoord = (uv * vec2(0.5, -0.5)) + vec2(0.5);\n  // vec3 bb = texture2D(backBuffer, (uv * 0.5) + vec2(0.5)).rgb;\n\n  vec4 data = texture2D(data, textCoord);\n  int type = int((data.r * 255.) + 0.1);\n  float hue = 0.0;\n  float saturation = 0.6;\n  float lightness = 0.3 + data.g * 0.5;\n  float noise = snoise_2_4(vec3(floor(uv * resolution / dpi), t * 0.05));\n  float a = 1.0;\n\n  if (type == 0) {\n    hue = 0.0;\n    saturation = 0.1;\n    lightness = 0.1;\n    a = 0.1;\n    if (isSnapshot) {\n      saturation = 0.05;\n      lightness = 1.01;\n      a = 1.0;\n    }\n  } else if (type == 1) {\n    hue = 0.1;\n    saturation = 0.1;\n    lightness = 0.4;\n  } else if (type == 2) {\n    hue = 0.1;\n    saturation = 0.5;\n    lightness += 0.3;\n  } else if (type == 3) { // water\n    hue = 0.6;\n    lightness = 0.7 + data.g * 0.25 + noise * 0.1;\n  } else if (type == 4) { // gas\n    hue = 0.0;\n    lightness += 0.4;\n    saturation = 0.2 + (data.b * 1.5);\n  } else if (type == 5) { // clone\n    hue = 0.9;\n    saturation = 0.3;\n  } else if (type == 6) { // fire\n    hue = (data.g * 0.1);\n    saturation = 0.7;\n\n    lightness = 0.7 + (data.g * 0.3) + ((noise + 0.8) * 0.5);\n  } else if (type == 7) { // wood\n    hue = (data.g * 0.1);\n    saturation = 0.3;\n    lightness = 0.3 + data.g * 0.3;\n  } else if (type == 8) { // lava\n    hue = (data.g * 0.1);\n    lightness = 0.7 + data.g * 0.25 + noise * 0.1;\n  } else if (type == 9) { // ice\n    hue = 0.6;\n    saturation = 0.4;\n    lightness = 0.7 + data.g * 0.5;\n  } else if (type == 10) { // sink\n    hue = 0.9;\n    saturation = 0.4;\n    lightness = 1.0;\n  } else if (type == 11) { // plant\n    hue = 0.4;\n    saturation = 0.4;\n  } else if (type == 12) { // acid\n    hue = 0.18;\n    saturation = 0.9;\n    lightness = 0.8 + data.g * 0.2 + noise * 0.05;\n  } else if (type == 13) { // stone\n    hue = -0.4 + (data.g * 0.5);\n    saturation = 0.1;\n    // lightness = 0.2 + data.g * 0.5;\n  } else if (type == 14) { // dust\n    hue = (data.g * 2.0) + t * .0008;\n    saturation = 0.4;\n    lightness = 0.8;\n  } else if (type == 15) { // mite\n    hue = 0.8;\n    saturation = 0.9;\n    lightness = 0.8;\n  } else if (type == 16) { // oil\n    hue = (data.g * 5.0) + t * .008;\n\n    saturation = 0.2;\n    lightness = 0.3;\n  } else if (type == 17) { // Rocket\n    hue = 0.0;\n    saturation = 0.4 + data.b;\n    lightness = 0.9;\n  } else if (type == 18) { // fungus\n    hue = (data.g * 0.15) - 0.1;\n    saturation = (data.g * 0.8) - 0.05;\n\n    // (data.g * 0.00);\n    lightness = 1.5 - (data.g * 0.2);\n  } else if (type == 19) { // seed/flower\n\n    hue = fract(fract(data.b * 2.) * 0.5) - 0.3;\n    saturation = 0.7 * (data.g + 0.4) + data.b * 0.2;\n    lightness = 0.9 * (data.g + 0.9);\n  }\n  if (isSnapshot == false) {\n    lightness *= (0.975 + snoise_1_11(floor(uv * resolution / dpi)) * 0.025);\n  }\n  color = hsv2rgb_4_0(vec3(hue, saturation, lightness));\n  gl_FragColor = vec4(color, a);\n}";
    },
    function(e, t) {
      e.exports =
        '\n// boring "pass-through" vertex shader\nprecision mediump float;\n#define GLSLIFY 1\nattribute vec2 position;\nvarying vec2 uv;\nvoid main() {\n  uv = position;\n  gl_Position = vec4(position, 0, 1);\n}';
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nattribute vec2 aPosition;\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform vec2 texelSize;\nvoid main() {\n  vUv = aPosition * 0.5 + 0.5;\n  vL = vUv - vec2(texelSize.x, 0.0);\n  vR = vUv + vec2(texelSize.x, 0.0);\n  vT = vUv + vec2(0.0, texelSize.y);\n  vB = vUv - vec2(0.0, texelSize.y);\n  gl_Position = vec4(aPosition, 0.0, 1.0);\n}\n";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTexture;\nuniform sampler2D uWind;\nuniform float value;\nvoid main() {\n  float pressure = texture2D(uWind, vUv).z;\n  pressure *= 512.;\n  pressure *= pressure;\n  gl_FragColor = value * (texture2D(uTexture, vUv) + vec4(pressure));\n}";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTexture;\nvoid main() {\n  vec3 color = texture2D(uTexture, vUv).rgb * 0.1;\n  color *= 0.5;\n  color = min(color, 0.9);\n  color = vec3(1.0) - color;\n  color *= vec3(0.95, 0.9, 0.9);\n  // color *= 0.5;\n  gl_FragColor = vec4(color, 1.0);\n}\n";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTarget;\nuniform float aspectRatio;\nuniform vec3 color;\nuniform vec2 point;\nuniform float radius;\nvoid main() {\n  vec2 p = vUv - point.xy;\n  p.x *= aspectRatio;\n  vec3 splat = exp(-dot(p, p) / radius) * color;\n  vec3 base = texture2D(uTarget, vUv).xyz;\n  gl_FragColor = vec4(base + splat, 1.0);\n}";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uVelocity;\nuniform sampler2D uSource;\nuniform sampler2D uWind;\nuniform vec2 texelSize;\nuniform float dt;\nuniform float dissipation;\nvec4 bilerp(in sampler2D sam, in vec2 p) {\n  vec4 st;\n  st.xy = floor(p - 0.5) + 0.5;\n  st.zw = st.xy + 1.0;\n  vec4 uv = st * texelSize.xyxy;\n  vec4 a = texture2D(sam, uv.xy);\n  vec4 b = texture2D(sam, uv.zy);\n  vec4 c = texture2D(sam, uv.xw);\n  vec4 d = texture2D(sam, uv.zw);\n  vec2 f = p - st.xy;\n  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);\n}\nvoid main() {\n  vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;\n  float density = texture2D(uWind, vUv).w;\n  if (density > 0.99) {\n    density = 0.;\n  }\n  gl_FragColor = dissipation * (bilerp(uSource, coord) + vec4(density));\n  gl_FragColor.a = 1.0;\n}";
    },
    function(e, t) {
      e.exports =
        "\nprecision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uVelocity;\nuniform sampler2D uSource;\nuniform sampler2D uWind;\nuniform vec2 texelSize;\nuniform float dt;\nuniform float dissipation;\nvoid main() {\n  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n  float density = texture2D(uWind, vUv).w * 1.;\n  if (density > 0.99) {\n    density = 0.;\n  }\n\n  gl_FragColor = dissipation * (texture2D(uSource, coord) + vec4(density));\n  gl_FragColor.a = 1.0;\n}\n";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nvec2 sampleVelocity(in vec2 uv) {\n  vec2 multiplier = vec2(1.0, 1.0);\n  if (uv.x < 0.0) {\n    uv.x = 0.0;\n    multiplier.x = -1.0;\n  }\n  if (uv.x > 1.0) {\n    uv.x = 1.0;\n    multiplier.x = -1.0;\n  }\n  if (uv.y < 0.0) {\n    uv.y = 0.0;\n    multiplier.y = -1.0;\n  }\n  if (uv.y > 1.0) {\n    uv.y = 1.0;\n    multiplier.y = -1.0;\n  }\n  return multiplier * texture2D(uVelocity, uv).xy;\n}\nvoid main() {\n  float L = sampleVelocity(vL).x;\n  float R = sampleVelocity(vR).x;\n  float T = sampleVelocity(vT).y;\n  float B = sampleVelocity(vB).y;\n  float div = 0.5 * (R - L + T - B);\n  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n}\n";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nvoid main() {\n  float L = texture2D(uVelocity, vL).y;\n  float R = texture2D(uVelocity, vR).y;\n  float T = texture2D(uVelocity, vT).x;\n  float B = texture2D(uVelocity, vB).x;\n  float vorticity = R - L - T + B;\n  gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);\n}";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nuniform sampler2D uCurl;\nuniform float curl;\nuniform float dt;\nvoid main() {\n  float T = texture2D(uCurl, vT).x;\n  float B = texture2D(uCurl, vB).x;\n  float C = texture2D(uCurl, vUv).x;\n  vec2 force = vec2(abs(T) - abs(B), 0.0);\n  force *= 1.0 / length(force + 0.00001) * curl * C;\n  vec2 vel = texture2D(uVelocity, vUv).xy;\n  gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n}";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uDivergence;\nvec2 boundary(in vec2 uv) {\n  uv = min(max(uv, 0.0), 1.0);\n  return uv;\n}\nvoid main() {\n  float L = texture2D(uPressure, boundary(vL)).x;\n  float R = texture2D(uPressure, boundary(vR)).x;\n  float T = texture2D(uPressure, boundary(vT)).x;\n  float B = texture2D(uPressure, boundary(vB)).x;\n  float C = texture2D(uPressure, vUv).x;\n  float divergence = texture2D(uDivergence, vUv).x;\n  float pressure = (L + R + B + T - divergence) * 0.25;\n  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n}";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uVelocity;\nuniform sampler2D uWind;\nuniform sampler2D uCells;\n\nvec2 boundary(in vec2 uv) {\n  uv = min(max(uv, 0.0), 1.0);\n  return uv;\n}\nvoid main() {\n  float L = texture2D(uPressure, boundary(vL)).x;\n  float R = texture2D(uPressure, boundary(vR)).x;\n  float T = texture2D(uPressure, boundary(vT)).x;\n  float B = texture2D(uPressure, boundary(vB)).x;\n  vec2 velocity = texture2D(uVelocity, vUv).xy;\n  vec2 wind = texture2D(uWind, vUv).xy;\n  vec2 cell = texture2D(uCells, vec2(vUv.x, 1.0 - (vUv.y + (1.0 / 300.)))).xy;\n  velocity.xy -= vec2(R - L, T - B);\n  velocity.xy += wind * 25.;\n\n  int type = int((cell.r * 255.) + 0.1);\n\n  // || type == 7 || type == 9\n  if (type == 1 || type == 5) {\n    velocity = vec2(0.);\n  }\n  if (type == 0 || type == 4 || type == 6) {\n\n  } else {\n    velocity = velocity * 0.95;\n  }\n  // velocity = cell.rg * 100.;\n  gl_FragColor = vec4(velocity, 0.0, 1.0);\n}";
    },
    function(e, t) {
      e.exports =
        "precision highp float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uTexture;\nuniform sampler2D uPressure;\nvoid main() {\n  vec2 v = texture2D(uTexture, vUv).rg;\n  float p = texture2D(uPressure, vUv).r;\n  vec3 vp = vec3(v, p);\n  vp = max(vp, vec3(-250.));\n  vp = min(vp, vec3(250.));\n  vp /= 500.;\n  vp += vec3(0.5, 0.5, 0.);\n  // v = vec2(0.5);\n  gl_FragColor = vec4(vp, 0.0);\n}\n";
    }
  ]
]);
//# sourceMappingURL=2.0aa5d089fe63201a6fa8.js.map
