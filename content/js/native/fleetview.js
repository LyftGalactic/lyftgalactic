var l, aa = function(a) {
    var b = 0;
    return function() {
      return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
    };
  }, p = function(a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : {next:aa(a)};
  }, ba = function(a) {
    for (var b, c = []; !(b = a.next()).done;) {
      c.push(b.value);
    }
    return c;
  }, ca = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this, da = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  }, ea = function(a, b) {
    if (b) {
      var c = ca;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && da(c, a, {configurable:!0, writable:!0, value:b});
    }
  };
  ea("Promise", function(a) {
    function b() {
      this.F = null;
    }
    function c(g) {
      return g instanceof e ? g : new e(function(h) {
        h(g);
      });
    }
    if (a) {
      return a;
    }
    b.prototype.Ca = function(g) {
      if (null == this.F) {
        this.F = [];
        var h = this;
        this.Da(function() {
          h.Wa();
        });
      }
      this.F.push(g);
    };
    var d = ca.setTimeout;
    b.prototype.Da = function(g) {
      d(g, 0);
    };
    b.prototype.Wa = function() {
      for (; this.F && this.F.length;) {
        var g = this.F;
        this.F = [];
        for (var h = 0; h < g.length; ++h) {
          var k = g[h];
          g[h] = null;
          try {
            k();
          } catch (m) {
            this.Va(m);
          }
        }
      }
      this.F = null;
    };
    b.prototype.Va = function(g) {
      this.Da(function() {
        throw g;
      });
    };
    var e = function(g) {
      this.V = 0;
      this.xa = void 0;
      this.P = [];
      var h = this.ma();
      try {
        g(h.resolve, h.reject);
      } catch (k) {
        h.reject(k);
      }
    };
    e.prototype.ma = function() {
      function g(m) {
        return function(n) {
          k || (k = !0, m.call(h, n));
        };
      }
      var h = this, k = !1;
      return {resolve:g(this.bb), reject:g(this.wa)};
    };
    e.prototype.bb = function(g) {
      if (g === this) {
        this.wa(new TypeError("A Promise cannot resolve to itself"));
      } else {
        if (g instanceof e) {
          this.eb(g);
        } else {
          a: {
            switch(typeof g) {
              case "object":
                var h = null != g;
                break a;
              case "function":
                h = !0;
                break a;
              default:
                h = !1;
            }
          }
          h ? this.ab(g) : this.Fa(g);
        }
      }
    };
    e.prototype.ab = function(g) {
      var h = void 0;
      try {
        h = g.then;
      } catch (k) {
        this.wa(k);
        return;
      }
      "function" == typeof h ? this.fb(h, g) : this.Fa(g);
    };
    e.prototype.wa = function(g) {
      this.Ka(2, g);
    };
    e.prototype.Fa = function(g) {
      this.Ka(1, g);
    };
    e.prototype.Ka = function(g, h) {
      if (0 != this.V) {
        throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.V);
      }
      this.V = g;
      this.xa = h;
      this.Xa();
    };
    e.prototype.Xa = function() {
      if (null != this.P) {
        for (var g = 0; g < this.P.length; ++g) {
          f.Ca(this.P[g]);
        }
        this.P = null;
      }
    };
    var f = new b;
    e.prototype.eb = function(g) {
      var h = this.ma();
      g.Z(h.resolve, h.reject);
    };
    e.prototype.fb = function(g, h) {
      var k = this.ma();
      try {
        g.call(h, k.resolve, k.reject);
      } catch (m) {
        k.reject(m);
      }
    };
    e.prototype.then = function(g, h) {
      function k(C, K) {
        return "function" == typeof C ? function(Ba) {
          try {
            m(C(Ba));
          } catch (Ca) {
            n(Ca);
          }
        } : K;
      }
      var m, n, D = new e(function(C, K) {
        m = C;
        n = K;
      });
      this.Z(k(g, m), k(h, n));
      return D;
    };
    e.prototype["catch"] = function(g) {
      return this.then(void 0, g);
    };
    e.prototype.Z = function(g, h) {
      function k() {
        switch(m.V) {
          case 1:
            g(m.xa);
            break;
          case 2:
            h(m.xa);
            break;
          default:
            throw Error("Unexpected state: " + m.V);
        }
      }
      var m = this;
      null == this.P ? f.Ca(k) : this.P.push(k);
    };
    e.resolve = c;
    e.reject = function(g) {
      return new e(function(h, k) {
        k(g);
      });
    };
    e.race = function(g) {
      return new e(function(h, k) {
        for (var m = p(g), n = m.next(); !n.done; n = m.next()) {
          c(n.value).Z(h, k);
        }
      });
    };
    e.all = function(g) {
      var h = p(g), k = h.next();
      return k.done ? c([]) : new e(function(m, n) {
        function D(Ba) {
          return function(Ca) {
            C[Ba] = Ca;
            K--;
            0 == K && m(C);
          };
        }
        var C = [], K = 0;
        do {
          C.push(void 0), K++, c(k.value).Z(D(C.length - 1), n), k = h.next();
        } while (!k.done);
      });
    };
    return e;
  });
  var q = this || self, r = function(a) {
    return "string" == typeof a;
  }, ia = function(a) {
    if (a && a != q) {
      return fa(a.document);
    }
    null === ha && (ha = fa(q.document));
    return ha;
  }, ja = /^[\w+/_-]+[=]{0,2}$/, ha = null, fa = function(a) {
    return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && ja.test(a) ? a : "";
  }, ka = function(a, b) {
    a = a.split(".");
    b = b || q;
    for (var c = 0; c < a.length; c++) {
      if (b = b[a[c]], null == b) {
        return null;
      }
    }
    return b;
  }, la = function() {
  }, t = function(a) {
    var b = typeof a;
    if ("object" == b) {
      if (a) {
        if (a instanceof Array) {
          return "array";
        }
        if (a instanceof Object) {
          return b;
        }
        var c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) {
          return "object";
        }
        if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
          return "array";
        }
        if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
          return "function";
        }
      } else {
        return "null";
      }
    } else {
      if ("function" == b && "undefined" == typeof a.call) {
        return "object";
      }
    }
    return b;
  }, ma = function(a) {
    var b = t(a);
    return "array" == b || "object" == b && "number" == typeof a.length;
  }, u = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b;
  }, v = function(a, b) {
    a = a.split(".");
    var c = q;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) {
      a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b;
    }
  }, na = function(a, b) {
    function c() {
    }
    c.prototype = b.prototype;
    a.La = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.hb = function(d, e, f) {
      for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) {
        g[h - 2] = arguments[h];
      }
      return b.prototype[e].apply(d, g);
    };
  };
  var oa = function(a) {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, oa);
    } else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  };
  na(oa, Error);
  oa.prototype.name = "CustomError";
  var pa;
  var qa = function(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) {
      c += a[e] + (e < b.length ? b[e] : "%s");
    }
    oa.call(this, c + a[d]);
  };
  na(qa, oa);
  qa.prototype.name = "AssertionError";
  var ra = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
      e += ": " + c;
      var f = d;
    } else {
      a && (e += ": " + a, f = b);
    }
    throw new qa("" + e, f || []);
  }, w = function(a, b, c) {
    a || ra("", null, b, Array.prototype.slice.call(arguments, 2));
    return a;
  }, x = function(a, b) {
    throw new qa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }, sa = function(a, b, c) {
    "number" == typeof a || ra("Expected number but got %s: %s.", [t(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
  }, ta = function(a, b, c) {
    r(a) || ra("Expected string but got %s: %s.", [t(a), a], b, Array.prototype.slice.call(arguments, 2));
  };
  var ua = Array.prototype.indexOf ? function(a, b) {
    w(null != a.length);
    return Array.prototype.indexOf.call(a, b, void 0);
  } : function(a, b) {
    if (r(a)) {
      return r(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
    }
    for (var c = 0; c < a.length; c++) {
      if (c in a && a[c] === b) {
        return c;
      }
    }
    return -1;
  }, va = Array.prototype.forEach ? function(a, b, c) {
    w(null != a.length);
    Array.prototype.forEach.call(a, b, c);
  } : function(a, b, c) {
    for (var d = a.length, e = r(a) ? a.split("") : a, f = 0; f < d; f++) {
      f in e && b.call(c, e[f], f, a);
    }
  }, wa = Array.prototype.map ? function(a, b) {
    w(null != a.length);
    return Array.prototype.map.call(a, b, void 0);
  } : function(a, b) {
    for (var c = a.length, d = Array(c), e = r(a) ? a.split("") : a, f = 0; f < c; f++) {
      f in e && (d[f] = b.call(void 0, e[f], f, a));
    }
    return d;
  }, xa = function(a) {
    return Array.prototype.concat.apply([], arguments);
  }, ya = function(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) {
        c[d] = a[d];
      }
      return c;
    }
    return [];
  };
  var za = String.prototype.trim ? function(a) {
    return a.trim();
  } : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
  }, Ja = function(a) {
    if (!Aa.test(a)) {
      return a;
    }
    -1 != a.indexOf("&") && (a = a.replace(Da, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(Ea, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(Fa, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(Ga, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(Ha, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(Ia, "&#0;"));
    return a;
  }, Da = /&/g, Ea = /</g, Fa = />/g, Ga = /"/g, Ha = /'/g, Ia = /\x00/g, Aa = /[\x00&<>"']/, y = function(a, b) {
    return -1 != a.indexOf(b);
  }, Ka = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  };
  var z;
  a: {
    var La = q.navigator;
    if (La) {
      var Ma = La.userAgent;
      if (Ma) {
        z = Ma;
        break a;
      }
    }
    z = "";
  }
  ;var Na = function(a, b) {
    for (var c in a) {
      if (b.call(void 0, a[c], c, a)) {
        return !0;
      }
    }
    return !1;
  };
  var Qa = function(a, b) {
    var c = Oa(a);
    "undefined" != typeof c[b] && "undefined" != typeof c.Location && "undefined" != typeof c.Element && (a && (a instanceof c[b] || !(a instanceof c.Location || a instanceof c.Element)) || x("Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, Pa(a)));
  }, Pa = function(a) {
    if (u(a)) {
      try {
        return a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a);
      } catch (b) {
        return "<object could not be stringified>";
      }
    } else {
      return void 0 === a ? "undefined" : null === a ? "null" : typeof a;
    }
  }, Oa = function(a) {
    return (a = a && a.ownerDocument) && (a.defaultView || a.parentWindow) || q;
  };
  var Ra = {area:!0, base:!0, br:!0, col:!0, command:!0, embed:!0, hr:!0, img:!0, input:!0, keygen:!0, link:!0, meta:!0, param:!0, source:!0, track:!0, wbr:!0};
  var A = function(a, b) {
    this.za = a === Sa && b || "";
    this.Sa = Ta;
  };
  A.prototype.w = !0;
  A.prototype.u = function() {
    return this.za;
  };
  A.prototype.toString = function() {
    return "Const{" + this.za + "}";
  };
  var Ua = function(a) {
    if (a instanceof A && a.constructor === A && a.Sa === Ta) {
      return a.za;
    }
    x("expected object of type Const, got '" + a + "'");
    return "type_error:Const";
  }, Ta = {}, Sa = {};
  var B = function() {
    this.da = "";
    this.Pa = Va;
  };
  B.prototype.w = !0;
  var Va = {}, Wa = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; d++) {
      c.push(JSON.stringify(arguments[d]).replace(/</g, "\\x3c"));
    }
    return (new B).D("(" + Ua(a) + ")(" + c.join(", ") + ");");
  };
  B.prototype.u = function() {
    return this.da.toString();
  };
  B.prototype.toString = function() {
    return "SafeScript{" + this.da + "}";
  };
  var Xa = function(a) {
    if (a instanceof B && a.constructor === B && a.Pa === Va) {
      return a.da;
    }
    x("expected object of type SafeScript, got '" + a + "' of type " + t(a));
    return "type_error:SafeScript";
  };
  B.prototype.D = function(a) {
    this.da = a;
    return this;
  };
  (new B).D("");
  var E = function() {
    this.ga = "";
    this.Na = null;
    this.Ta = Ya;
  };
  l = E.prototype;
  l.w = !0;
  l.u = function() {
    return this.ga.toString();
  };
  l.ra = !0;
  l.N = function() {
    return 1;
  };
  l.toString = function() {
    return "TrustedResourceUrl{" + this.ga + "}";
  };
  var F = function(a) {
    if (a instanceof E && a.constructor === E && a.Ta === Ya) {
      return a.ga;
    }
    x("expected object of type TrustedResourceUrl, got '" + a + "' of type " + t(a));
    return "type_error:TrustedResourceUrl";
  }, Ya = {}, Za = function(a) {
    var b = new E;
    b.ga = a;
    return b;
  };
  var G = function() {
    this.fa = "";
    this.Ra = $a;
  };
  l = G.prototype;
  l.w = !0;
  l.u = function() {
    return this.fa.toString();
  };
  l.ra = !0;
  l.N = function() {
    return 1;
  };
  l.toString = function() {
    return "SafeUrl{" + this.fa + "}";
  };
  var ab = function(a) {
    if (a instanceof G && a.constructor === G && a.Ra === $a) {
      return a.fa;
    }
    x("expected object of type SafeUrl, got '" + a + "' of type " + t(a));
    return "type_error:SafeUrl";
  }, bb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i, db = function(a) {
    if (a instanceof G) {
      return a;
    }
    a = "object" == typeof a && a.w ? a.u() : String(a);
    bb.test(a) || (a = "about:invalid#zClosurez");
    return cb(a);
  }, $a = {}, cb = function(a) {
    var b = new G;
    b.fa = a;
    return b;
  };
  cb("about:blank");
  var H = function() {
    this.ea = "";
    this.Qa = eb;
  };
  H.prototype.w = !0;
  var eb = {};
  H.prototype.u = function() {
    return this.ea;
  };
  H.prototype.toString = function() {
    return "SafeStyle{" + this.ea + "}";
  };
  var fb = function(a) {
    if (a instanceof H && a.constructor === H && a.Qa === eb) {
      return a.ea;
    }
    x("expected object of type SafeStyle, got '" + a + "' of type " + t(a));
    return "type_error:SafeStyle";
  };
  H.prototype.D = function(a) {
    this.ea = a;
    return this;
  };
  var gb = (new H).D(""), ib = function(a) {
    if (a instanceof G) {
      return 'url("' + ab(a).toString().replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
    }
    a = a instanceof A ? Ua(a) : hb(String(a));
    if (/[{;}]/.test(a)) {
      throw new qa("Value does not allow [{;}], got: %s.", [a]);
    }
    return a;
  }, hb = function(a) {
    var b = a.replace(jb, "$1").replace(jb, "$1").replace(kb, "url");
    if (lb.test(b)) {
      if (mb.test(a)) {
        return x("String value disallows comments, got: " + a), "zClosurez";
      }
      for (var c = b = !0, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        "'" == e && c ? b = !b : '"' == e && b && (c = !c);
      }
      if (!b || !c) {
        return x("String value requires balanced quotes, got: " + a), "zClosurez";
      }
      if (!nb(a)) {
        return x("String value requires balanced square brackets and one identifier per pair of brackets, got: " + a), "zClosurez";
      }
    } else {
      return x("String value allows only [-,.\"'%_!# a-zA-Z0-9\\[\\]] and simple functions, got: " + a), "zClosurez";
    }
    return ob(a);
  }, nb = function(a) {
    for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
      var e = a.charAt(d);
      if ("]" == e) {
        if (b) {
          return !1;
        }
        b = !0;
      } else {
        if ("[" == e) {
          if (!b) {
            return !1;
          }
          b = !1;
        } else {
          if (!b && !c.test(e)) {
            return !1;
          }
        }
      }
    }
    return b;
  }, lb = /^[-,."'%_!# a-zA-Z0-9\[\]]+$/, kb = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g, jb = /\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g, mb = /\/\*/, ob = function(a) {
    return a.replace(kb, function(b, c, d, e) {
      var f = "";
      d = d.replace(/^(['"])(.*)\1$/, function(g, h, k) {
        f = h;
        return k;
      });
      b = db(d).u();
      return c + f + b + f + e;
    });
  };
  var pb = function() {
    this.ta = "";
  };
  pb.prototype.w = !0;
  pb.prototype.u = function() {
    return this.ta;
  };
  pb.prototype.toString = function() {
    return "SafeStyleSheet{" + this.ta + "}";
  };
  pb.prototype.D = function(a) {
    this.ta = a;
    return this;
  };
  (new pb).D("");
  var I = function() {
    this.ca = "";
    this.Oa = qb;
    this.Ea = null;
  };
  l = I.prototype;
  l.ra = !0;
  l.N = function() {
    return this.Ea;
  };
  l.w = !0;
  l.u = function() {
    return this.ca.toString();
  };
  l.toString = function() {
    return "SafeHtml{" + this.ca + "}";
  };
  var J = function(a) {
    if (a instanceof I && a.constructor === I && a.Oa === qb) {
      return a.ca;
    }
    x("expected object of type SafeHtml, got '" + a + "' of type " + t(a));
    return "type_error:SafeHtml";
  }, rb = function(a) {
    if (a instanceof I) {
      return a;
    }
    var b = "object" == typeof a, c = null;
    b && a.ra && (c = a.N());
    return L(Ja(b && a.w ? a.u() : String(a)), c);
  }, sb = /^[a-zA-Z0-9-]+$/, tb = {action:!0, cite:!0, data:!0, formaction:!0, href:!0, manifest:!0, poster:!0, src:!0}, ub = {APPLET:!0, BASE:!0, EMBED:!0, IFRAME:!0, LINK:!0, MATH:!0, META:!0, OBJECT:!0, SCRIPT:!0, STYLE:!0, SVG:!0, TEMPLATE:!0}, wb = function(a) {
    var b = rb(vb), c = b.N(), d = [], e = function(f) {
      "array" == t(f) ? va(f, e) : (f = rb(f), d.push(J(f).toString()), f = f.N(), 0 == c ? c = f : 0 != f && c != f && (c = null));
    };
    va(a, e);
    return L(d.join(J(b).toString()), c);
  }, xb = function(a) {
    return wb(Array.prototype.slice.call(arguments));
  }, qb = {}, L = function(a, b) {
    return (new I).D(a, b);
  };
  I.prototype.D = function(a, b) {
    this.ca = a;
    this.Ea = b;
    return this;
  };
  var yb = function(a, b, c) {
    var d = null, e = "";
    if (b) {
      for (n in b) {
        if (!sb.test(n)) {
          throw Error('Invalid attribute name "' + n + '".');
        }
        var f = b[n];
        if (null != f) {
          var g = a;
          var h = n;
          var k = f;
          if (k instanceof A) {
            k = Ua(k);
          } else {
            if ("style" == h.toLowerCase()) {
              f = void 0;
              g = k;
              if (!u(g)) {
                throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof g + " given: " + g);
              }
              if (!(g instanceof H)) {
                k = "";
                for (f in g) {
                  if (!/^[-_a-zA-Z0-9]+$/.test(f)) {
                    throw Error("Name allows only [-_a-zA-Z0-9], got: " + f);
                  }
                  var m = g[f];
                  null != m && (m = "array" == t(m) ? wa(m, ib).join(" ") : ib(m), k += f + ":" + m + ";");
                }
                g = k ? (new H).D(k) : gb;
              }
              k = fb(g);
            } else {
              if (/^on/i.test(h)) {
                throw Error('Attribute "' + h + '" requires goog.string.Const value, "' + k + '" given.');
              }
              if (h.toLowerCase() in tb) {
                if (k instanceof E) {
                  k = F(k).toString();
                } else {
                  if (k instanceof G) {
                    k = ab(k).toString();
                  } else {
                    if (r(k)) {
                      k = db(k).u();
                    } else {
                      throw Error('Attribute "' + h + '" on tag "' + g + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + k + '" given.');
                    }
                  }
                }
              }
            }
          }
          k.w && (k = k.u());
          w(r(k) || "number" == typeof k, "String or number value expected, got " + typeof k + " with value: " + k);
          h = h + '="' + Ja(String(k)) + '"';
          e += " " + h;
        }
      }
    }
    var n = "<" + a + e;
    null != c ? "array" == t(c) || (c = [c]) : c = [];
    !0 === Ra[a.toLowerCase()] ? (w(!c.length, "Void tag <" + a + "> does not allow content."), n += ">") : (d = xb(c), n += ">" + J(d).toString() + "</" + a + ">", d = d.N());
    (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? 0 : null);
    return L(n, d);
  }, zb = L("<!DOCTYPE html>", 0), vb = L("", 0);
  L("<br>", 0);
  var Ab = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
  }, Bb = function(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
      var e = 1 == c ? b : b.charAt(d);
      if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
        return a.substring(1, a.length - 1);
      }
    }
    return a;
  };
  var Cb = function(a) {
    Cb[" "](a);
    return a;
  };
  Cb[" "] = la;
  var Db = y(z, "Opera"), Eb = y(z, "Trident") || y(z, "MSIE"), Fb = y(z, "Edge"), Gb = y(z, "Gecko") && !(y(z.toLowerCase(), "webkit") && !y(z, "Edge")) && !(y(z, "Trident") || y(z, "MSIE")) && !y(z, "Edge"), Hb = y(z.toLowerCase(), "webkit") && !y(z, "Edge"), Ib = function() {
    var a = q.document;
    return a ? a.documentMode : void 0;
  }, Jb;
  a: {
    var Kb = "", Lb = function() {
      var a = z;
      if (Gb) {
        return /rv:([^\);]+)(\)|;)/.exec(a);
      }
      if (Fb) {
        return /Edge\/([\d\.]+)/.exec(a);
      }
      if (Eb) {
        return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      }
      if (Hb) {
        return /WebKit\/(\S+)/.exec(a);
      }
      if (Db) {
        return /(?:Version)[ \/]?(\S+)/.exec(a);
      }
    }();
    Lb && (Kb = Lb ? Lb[1] : "");
    if (Eb) {
      var Mb = Ib();
      if (null != Mb && Mb > parseFloat(Kb)) {
        Jb = String(Mb);
        break a;
      }
    }
    Jb = Kb;
  }
  var Nb = Jb, Ob = {}, Pb;
  var Qb = q.document;
  Pb = Qb && Eb ? Ib() || ("CSS1Compat" == Qb.compatMode ? parseInt(Nb, 10) : 5) : void 0;
  var Rb = Object.freeze || function(a) {
    return a;
  };
  var Tb = function(a, b, c) {
    function d(g) {
      g && b.appendChild(r(g) ? a.createTextNode(g) : g);
    }
    for (var e = 1; e < c.length; e++) {
      var f = c[e];
      !ma(f) || u(f) && 0 < f.nodeType ? d(f) : va(Sb(f) ? ya(f) : f, d);
    }
  }, Ub = function(a) {
    w(a, "Node cannot be null or undefined.");
    return 9 == a.nodeType ? a : a.ownerDocument || a.document;
  }, Sb = function(a) {
    if (a && "number" == typeof a.length) {
      if (u(a)) {
        return "function" == typeof a.item || "string" == typeof a.item;
      }
      if ("function" == t(a)) {
        return "function" == typeof a.item;
      }
    }
    return !1;
  }, Vb = function(a) {
    this.pa = a || q.document || document;
  };
  l = Vb.prototype;
  l.getElementsByTagName = function(a, b) {
    return (b || this.pa).getElementsByTagName(String(a));
  };
  l.createElement = function(a) {
    return this.pa.createElement(String(a));
  };
  l.createTextNode = function(a) {
    return this.pa.createTextNode(String(a));
  };
  l.appendChild = function(a, b) {
    w(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
    a.appendChild(b);
  };
  l.append = function(a, b) {
    Tb(Ub(a), a, arguments);
  };
  l.canHaveChildren = function(a) {
    if (1 != a.nodeType) {
      return !1;
    }
    switch(a.tagName) {
      case "APPLET":
      case "AREA":
      case "BASE":
      case "BR":
      case "COL":
      case "COMMAND":
      case "EMBED":
      case "FRAME":
      case "HR":
      case "IMG":
      case "INPUT":
      case "IFRAME":
      case "ISINDEX":
      case "KEYGEN":
      case "LINK":
      case "NOFRAMES":
      case "NOSCRIPT":
      case "META":
      case "OBJECT":
      case "PARAM":
      case "SCRIPT":
      case "SOURCE":
      case "STYLE":
      case "TRACK":
      case "WBR":
        return !1;
    }
    return !0;
  };
  l.removeNode = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null;
  };
  l.isElement = function(a) {
    return u(a) && 1 == a.nodeType;
  };
  l.contains = function(a, b) {
    if (!a || !b) {
      return !1;
    }
    if (a.contains && 1 == b.nodeType) {
      return a == b || a.contains(b);
    }
    if ("undefined" != typeof a.compareDocumentPosition) {
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    }
    for (; b && a != b;) {
      b = b.parentNode;
    }
    return b == a;
  };
  var Wb;
  (Wb = !Eb) || (Wb = 9 <= Number(Pb));
  var Xb = Wb, Yb;
  if (Yb = Eb) {
    var Zb;
    if (Object.prototype.hasOwnProperty.call(Ob, "9")) {
      Zb = Ob["9"];
    } else {
      for (var $b = 0, ac = za(String(Nb)).split("."), bc = za("9").split("."), cc = Math.max(ac.length, bc.length), dc = 0; 0 == $b && dc < cc; dc++) {
        var ec = ac[dc] || "", fc = bc[dc] || "";
        do {
          var M = /(\d*)(\D*)(.*)/.exec(ec) || ["", "", "", ""], N = /(\d*)(\D*)(.*)/.exec(fc) || ["", "", "", ""];
          if (0 == M[0].length && 0 == N[0].length) {
            break;
          }
          $b = Ka(0 == M[1].length ? 0 : parseInt(M[1], 10), 0 == N[1].length ? 0 : parseInt(N[1], 10)) || Ka(0 == M[2].length, 0 == N[2].length) || Ka(M[2], N[2]);
          ec = M[3];
          fc = N[3];
        } while (0 == $b);
      }
      Zb = Ob["9"] = 0 <= $b;
    }
    Yb = !Zb;
  }
  var gc = Yb, hc = function() {
    if (!q.addEventListener || !Object.defineProperty) {
      return !1;
    }
    var a = !1, b = Object.defineProperty({}, "passive", {get:function() {
      a = !0;
    }});
    try {
      q.addEventListener("test", la, b), q.removeEventListener("test", la, b);
    } catch (c) {
    }
    return a;
  }();
  var ic = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.va = !1;
  };
  ic.prototype.stopPropagation = function() {
    this.va = !0;
  };
  ic.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
  };
  var O = function(a, b) {
    ic.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.T = null;
    a && this.sa(a, b);
  };
  na(O, ic);
  var jc = Rb({2:"touch", 3:"pen", 4:"mouse"});
  O.prototype.sa = function(a, b) {
    var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    if (b = a.relatedTarget) {
      if (Gb) {
        a: {
          try {
            Cb(b.nodeName);
            var e = !0;
            break a;
          } catch (f) {
          }
          e = !1;
        }
        e || (b = null);
      }
    } else {
      "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    }
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.offsetX = Hb || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = Hb || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = r(a.pointerType) ? a.pointerType : jc[a.pointerType] || "";
    this.state = a.state;
    this.T = a;
    a.defaultPrevented && this.preventDefault();
  };
  O.prototype.stopPropagation = function() {
    O.La.stopPropagation.call(this);
    this.T.stopPropagation ? this.T.stopPropagation() : this.T.cancelBubble = !0;
  };
  O.prototype.preventDefault = function() {
    O.La.preventDefault.call(this);
    var a = this.T;
    if (a.preventDefault) {
      a.preventDefault();
    } else {
      if (a.returnValue = !1, gc) {
        try {
          if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
            a.keyCode = -1;
          }
        } catch (b) {
        }
      }
    }
  };
  var kc = "closure_listenable_" + (1e6 * Math.random() | 0), lc = 0;
  var mc = function(a, b, c, d, e) {
    this.listener = a;
    this.ha = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.qa = e;
    this.key = ++lc;
    this.U = this.la = !1;
  }, nc = function(a) {
    a.U = !0;
    a.listener = null;
    a.ha = null;
    a.src = null;
    a.qa = null;
  };
  var P = function(a) {
    this.src = a;
    this.o = {};
    this.W = 0;
  };
  P.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.o[f];
    a || (a = this.o[f] = [], this.W++);
    var g = oc(a, b, d, e);
    -1 < g ? (b = a[g], c || (b.la = !1)) : (b = new mc(b, this.src, f, !!d, e), b.la = c, a.push(b));
    return b;
  };
  P.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.o)) {
      return !1;
    }
    var e = this.o[a];
    b = oc(e, b, c, d);
    return -1 < b ? (nc(e[b]), w(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.o[a], this.W--), !0) : !1;
  };
  P.prototype.removeAll = function(a) {
    a = a && a.toString();
    var b = 0, c;
    for (c in this.o) {
      if (!a || c == a) {
        for (var d = this.o[c], e = 0; e < d.length; e++) {
          ++b, nc(d[e]);
        }
        delete this.o[c];
        this.W--;
      }
    }
    return b;
  };
  P.prototype.hasListener = function(a, b) {
    var c = void 0 !== a, d = c ? a.toString() : "", e = void 0 !== b;
    return Na(this.o, function(f) {
      for (var g = 0; g < f.length; ++g) {
        if (!(c && f[g].type != d || e && f[g].capture != b)) {
          return !0;
        }
      }
      return !1;
    });
  };
  var oc = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.U && f.listener == b && f.capture == !!c && f.qa == d) {
        return e;
      }
    }
    return -1;
  };
  var pc = "closure_lm_" + (1e6 * Math.random() | 0), qc = {}, rc = 0, tc = function() {
    var a = sc, b = Xb ? function(c) {
      return a.call(b.src, b.listener, c);
    } : function(c) {
      c = a.call(b.src, b.listener, c);
      if (!c) {
        return c;
      }
    };
    return b;
  }, uc = function(a, b, c, d, e) {
    if ("array" == t(b)) {
      for (var f = 0; f < b.length; f++) {
        uc(a, b[f], c, d, e);
      }
    } else {
      if (c = vc(c), a && a[kc]) {
        a.ib(b, c, u(d) ? !!d.capture : !!d, e);
      } else {
        if (!b) {
          throw Error("Invalid event type");
        }
        f = u(d) ? !!d.capture : !!d;
        var g = wc(a);
        g || (a[pc] = g = new P(a));
        c = g.add(b, c, !0, f, e);
        if (!c.ha) {
          e = tc();
          c.ha = e;
          e.src = a;
          e.listener = c;
          if (a.addEventListener) {
            hc || (d = f), void 0 === d && (d = !1), a.addEventListener(b.toString(), e, d);
          } else {
            if (a.attachEvent) {
              a.attachEvent(xc(b.toString()), e);
            } else {
              if (a.addListener && a.removeListener) {
                w("change" === b, "MediaQueryList only has a change event"), a.addListener(e);
              } else {
                throw Error("addEventListener and attachEvent are unavailable.");
              }
            }
          }
          rc++;
        }
      }
    }
  }, xc = function(a) {
    return a in qc ? qc[a] : qc[a] = "on" + a;
  }, zc = function(a, b, c, d) {
    var e = !0;
    if (a = wc(a)) {
      if (b = a.o[b.toString()]) {
        for (b = b.concat(), a = 0; a < b.length; a++) {
          var f = b[a];
          f && f.capture == c && !f.U && (f = yc(f, d), e = e && !1 !== f);
        }
      }
    }
    return e;
  }, yc = function(a, b) {
    var c = a.listener, d = a.qa || a.src;
    if (a.la && "number" != typeof a && a && !a.U) {
      var e = a.src;
      if (e && e[kc]) {
        e.jb(a);
      } else {
        var f = a.type, g = a.ha;
        e.removeEventListener ? e.removeEventListener(f, g, a.capture) : e.detachEvent ? e.detachEvent(xc(f), g) : e.addListener && e.removeListener && e.removeListener(g);
        rc--;
        if (f = wc(e)) {
          g = a.type;
          var h;
          if (h = g in f.o) {
            h = f.o[g];
            var k = ua(h, a), m;
            if (m = 0 <= k) {
              w(null != h.length), Array.prototype.splice.call(h, k, 1);
            }
            h = m;
          }
          h && (nc(a), 0 == f.o[g].length && (delete f.o[g], f.W--));
          0 == f.W && (f.src = null, e[pc] = null);
        } else {
          nc(a);
        }
      }
    }
    return c.call(d, b);
  }, sc = function(a, b) {
    if (a.U) {
      return !0;
    }
    if (!Xb) {
      var c = b || ka("window.event");
      b = new O(c, this);
      var d = !0;
      if (!(0 > c.keyCode || void 0 != c.returnValue)) {
        a: {
          var e = !1;
          if (0 == c.keyCode) {
            try {
              c.keyCode = -1;
              break a;
            } catch (g) {
              e = !0;
            }
          }
          if (e || void 0 == c.returnValue) {
            c.returnValue = !0;
          }
        }
        c = [];
        for (e = b.currentTarget; e; e = e.parentNode) {
          c.push(e);
        }
        a = a.type;
        for (e = c.length - 1; !b.va && 0 <= e; e--) {
          b.currentTarget = c[e];
          var f = zc(c[e], a, !0, b);
          d = d && f;
        }
        for (e = 0; !b.va && e < c.length; e++) {
          b.currentTarget = c[e], f = zc(c[e], a, !1, b), d = d && f;
        }
      }
      return d;
    }
    return yc(a, new O(b, this));
  }, wc = function(a) {
    a = a[pc];
    return a instanceof P ? a : null;
  }, Ac = "__closure_events_fn_" + (1e9 * Math.random() >>> 0), vc = function(a) {
    w(a, "Listener can not be null.");
    if ("function" == t(a)) {
      return a;
    }
    w(a.handleEvent, "An object listener must have handleEvent method.");
    a[Ac] || (a[Ac] = function(b) {
      return a.handleEvent(b);
    });
    return a[Ac];
  };
  var Bc = function(a, b) {
    this.Za = b || "";
    this.Y = a || "";
  }, Cc = /"/g, Dc = /\\"/g, Ec = /\\/g, Fc = /\\\\/g, Gc = /^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;
  Bc.prototype.getName = function() {
    return this.Za;
  };
  Bc.prototype.toString = function() {
    var a = this.getName();
    a = a.replace(Cc, "");
    var b;
    a: {
      for (b = 0; 13 > b; b++) {
        if (y(a, '()<>@:\\".[],;'[b])) {
          b = !0;
          break a;
        }
      }
      b = !1;
    }
    b && (a = '"' + a.replace(Ec, "\\\\") + '"');
    return "" == a ? this.Y : "" == this.Y ? a : a + " <" + this.Y + ">";
  };
  var Hc = function(a, b) {
    if ('"' != a.charAt(b)) {
      return !1;
    }
    var c = 0;
    for (--b; 0 <= b && "\\" == a.charAt(b); b--) {
      c++;
    }
    return 0 != c % 2;
  };
  var Ic = "StopIteration" in q ? q.StopIteration : {message:"StopIteration", stack:""}, Jc = function() {
  };
  Jc.prototype.next = function() {
    throw Ic;
  };
  Jc.prototype.Ua = function() {
    return this;
  };
  var Q = function(a, b) {
    this.A = {};
    this.l = [];
    this.X = this.f = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) {
        throw Error("Uneven number of arguments");
      }
      for (var d = 0; d < c; d += 2) {
        this.set(arguments[d], arguments[d + 1]);
      }
    } else {
      a && this.addAll(a);
    }
  };
  l = Q.prototype;
  l.Ga = function() {
    return this.f;
  };
  l.C = function() {
    Kc(this);
    for (var a = [], b = 0; b < this.l.length; b++) {
      a.push(this.A[this.l[b]]);
    }
    return a;
  };
  l.G = function() {
    Kc(this);
    return this.l.concat();
  };
  l.S = function(a) {
    return R(this.A, a);
  };
  l.equals = function(a, b) {
    if (this === a) {
      return !0;
    }
    if (this.f != a.Ga()) {
      return !1;
    }
    b = b || Lc;
    Kc(this);
    for (var c, d = 0; c = this.l[d]; d++) {
      if (!b(this.get(c), a.get(c))) {
        return !1;
      }
    }
    return !0;
  };
  var Lc = function(a, b) {
    return a === b;
  };
  Q.prototype.clear = function() {
    this.A = {};
    this.X = this.f = this.l.length = 0;
  };
  Q.prototype.remove = function(a) {
    return R(this.A, a) ? (delete this.A[a], this.f--, this.X++, this.l.length > 2 * this.f && Kc(this), !0) : !1;
  };
  var Kc = function(a) {
    if (a.f != a.l.length) {
      for (var b = 0, c = 0; b < a.l.length;) {
        var d = a.l[b];
        R(a.A, d) && (a.l[c++] = d);
        b++;
      }
      a.l.length = c;
    }
    if (a.f != a.l.length) {
      var e = {};
      for (c = b = 0; b < a.l.length;) {
        d = a.l[b], R(e, d) || (a.l[c++] = d, e[d] = 1), b++;
      }
      a.l.length = c;
    }
  };
  l = Q.prototype;
  l.get = function(a, b) {
    return R(this.A, a) ? this.A[a] : b;
  };
  l.set = function(a, b) {
    R(this.A, a) || (this.f++, this.l.push(a), this.X++);
    this.A[a] = b;
  };
  l.addAll = function(a) {
    if (a instanceof Q) {
      for (var b = a.G(), c = 0; c < b.length; c++) {
        this.set(b[c], a.get(b[c]));
      }
    } else {
      for (b in a) {
        this.set(b, a[b]);
      }
    }
  };
  l.forEach = function(a, b) {
    for (var c = this.G(), d = 0; d < c.length; d++) {
      var e = c[d], f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  l.clone = function() {
    return new Q(this);
  };
  l.Ua = function(a) {
    Kc(this);
    var b = 0, c = this.X, d = this, e = new Jc;
    e.next = function() {
      if (c != d.X) {
        throw Error("The map has changed since the iterator was created");
      }
      if (b >= d.l.length) {
        throw Ic;
      }
      var f = d.l[b++];
      return a ? f : d.A[f];
    };
    return e;
  };
  var R = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };
  var Mc = function(a) {
    if (a.C && "function" == typeof a.C) {
      return a.C();
    }
    if (r(a)) {
      return a.split("");
    }
    if (ma(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) {
        b.push(a[d]);
      }
      return b;
    }
    b = [];
    c = 0;
    for (d in a) {
      b[c++] = a[d];
    }
    return b;
  }, Nc = function(a, b, c) {
    if (a.forEach && "function" == typeof a.forEach) {
      a.forEach(b, c);
    } else {
      if (ma(a) || r(a)) {
        va(a, b, c);
      } else {
        if (a.G && "function" == typeof a.G) {
          var d = a.G();
        } else {
          if (a.C && "function" == typeof a.C) {
            d = void 0;
          } else {
            if (ma(a) || r(a)) {
              d = [];
              for (var e = a.length, f = 0; f < e; f++) {
                d.push(f);
              }
            } else {
              for (f in d = [], e = 0, a) {
                d[e++] = f;
              }
            }
          }
        }
        e = Mc(a);
        f = e.length;
        for (var g = 0; g < f; g++) {
          b.call(c, e[g], d && d[g], a);
        }
      }
    }
  };
  var Oc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/, Pc = function(a, b) {
    if (a) {
      a = a.split("&");
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="), e = null;
        if (0 <= d) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else {
          f = a[c];
        }
        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
      }
    }
  };
  var S = function(a) {
    this.J = this.M = this.I = "";
    this.R = null;
    this.K = this.H = "";
    this.v = this.Ya = !1;
    if (a instanceof S) {
      this.v = a.v;
      Qc(this, a.I);
      var b = a.M;
      T(this);
      this.M = b;
      Rc(this, a.J);
      Sc(this, a.R);
      Tc(this, a.H);
      Uc(this, a.B.clone());
      a = a.K;
      T(this);
      this.K = a;
    } else {
      a && (b = String(a).match(Oc)) ? (this.v = !1, Qc(this, b[1] || "", !0), a = b[2] || "", T(this), this.M = Vc(a), Rc(this, b[3] || "", !0), Sc(this, b[4]), Tc(this, b[5] || "", !0), Uc(this, b[6] || "", !0), a = b[7] || "", T(this), this.K = Vc(a)) : (this.v = !1, this.B = new U(null, this.v));
    }
  };
  S.prototype.toString = function() {
    var a = [], b = this.I;
    b && a.push(Wc(b, Xc, !0), ":");
    var c = this.J;
    if (c || "file" == b) {
      a.push("//"), (b = this.M) && a.push(Wc(b, Xc, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.R, null != c && a.push(":", String(c));
    }
    if (c = this.H) {
      this.J && "/" != c.charAt(0) && a.push("/"), a.push(Wc(c, "/" == c.charAt(0) ? Yc : Zc, !0));
    }
    (c = this.B.toString()) && a.push("?", c);
    (c = this.K) && a.push("#", Wc(c, $c));
    return a.join("");
  };
  S.prototype.resolve = function(a) {
    var b = this.clone(), c = !!a.I;
    c ? Qc(b, a.I) : c = !!a.M;
    if (c) {
      var d = a.M;
      T(b);
      b.M = d;
    } else {
      c = !!a.J;
    }
    c ? Rc(b, a.J) : c = null != a.R;
    d = a.H;
    if (c) {
      Sc(b, a.R);
    } else {
      if (c = !!a.H) {
        if ("/" != d.charAt(0)) {
          if (this.J && !this.H) {
            d = "/" + d;
          } else {
            var e = b.H.lastIndexOf("/");
            -1 != e && (d = b.H.substr(0, e + 1) + d);
          }
        }
        e = d;
        if (".." == e || "." == e) {
          d = "";
        } else {
          if (y(e, "./") || y(e, "/.")) {
            d = 0 == e.lastIndexOf("/", 0);
            e = e.split("/");
            for (var f = [], g = 0; g < e.length;) {
              var h = e[g++];
              "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d && g == e.length && f.push("")) : (f.push(h), d = !0);
            }
            d = f.join("/");
          } else {
            d = e;
          }
        }
      }
    }
    c ? Tc(b, d) : c = "" !== a.B.toString();
    c ? Uc(b, a.B.clone()) : c = !!a.K;
    c && (a = a.K, T(b), b.K = a);
    return b;
  };
  S.prototype.clone = function() {
    return new S(this);
  };
  var Qc = function(a, b, c) {
    T(a);
    a.I = c ? Vc(b, !0) : b;
    a.I && (a.I = a.I.replace(/:$/, ""));
    return a;
  }, Rc = function(a, b, c) {
    T(a);
    a.J = c ? Vc(b, !0) : b;
    return a;
  }, Sc = function(a, b) {
    T(a);
    if (b) {
      b = Number(b);
      if (isNaN(b) || 0 > b) {
        throw Error("Bad port number " + b);
      }
      a.R = b;
    } else {
      a.R = null;
    }
    return a;
  }, Tc = function(a, b, c) {
    T(a);
    a.H = c ? Vc(b, !0) : b;
    return a;
  }, Uc = function(a, b, c) {
    T(a);
    b instanceof U ? (a.B = b, a.B.ya(a.v)) : (c || (b = Wc(b, ad)), a.B = new U(b, a.v));
  };
  S.prototype.getQuery = function() {
    return this.B.toString();
  };
  S.prototype.removeParameter = function(a) {
    T(this);
    this.B.remove(a);
    return this;
  };
  var T = function(a) {
    if (a.Ya) {
      throw Error("Tried to modify a read-only Uri");
    }
  };
  S.prototype.ya = function(a) {
    this.v = a;
    this.B && this.B.ya(a);
  };
  var Vc = function(a, b) {
    return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
  }, Wc = function(a, b, c) {
    return r(a) ? (a = encodeURI(a).replace(b, bd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
  }, bd = function(a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
  }, Xc = /[#\/\?@]/g, Zc = /[#\?:]/g, Yc = /[#\?]/g, ad = /[#\?@]/g, $c = /#/g, U = function(a, b) {
    this.f = this.j = null;
    this.s = a || null;
    this.v = !!b;
  }, V = function(a) {
    a.j || (a.j = new Q, a.f = 0, a.s && Pc(a.s, function(b, c) {
      a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
    }));
  };
  l = U.prototype;
  l.Ga = function() {
    V(this);
    return this.f;
  };
  l.add = function(a, b) {
    V(this);
    this.s = null;
    a = W(this, a);
    var c = this.j.get(a);
    c || this.j.set(a, c = []);
    c.push(b);
    this.f = sa(this.f) + 1;
    return this;
  };
  l.remove = function(a) {
    V(this);
    a = W(this, a);
    return this.j.S(a) ? (this.s = null, this.f = sa(this.f) - this.j.get(a).length, this.j.remove(a)) : !1;
  };
  l.clear = function() {
    this.j = this.s = null;
    this.f = 0;
  };
  l.S = function(a) {
    V(this);
    a = W(this, a);
    return this.j.S(a);
  };
  l.forEach = function(a, b) {
    V(this);
    this.j.forEach(function(c, d) {
      va(c, function(e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };
  l.G = function() {
    V(this);
    for (var a = this.j.C(), b = this.j.G(), c = [], d = 0; d < b.length; d++) {
      for (var e = a[d], f = 0; f < e.length; f++) {
        c.push(b[d]);
      }
    }
    return c;
  };
  l.C = function(a) {
    V(this);
    var b = [];
    if (r(a)) {
      this.S(a) && (b = xa(b, this.j.get(W(this, a))));
    } else {
      a = this.j.C();
      for (var c = 0; c < a.length; c++) {
        b = xa(b, a[c]);
      }
    }
    return b;
  };
  l.set = function(a, b) {
    V(this);
    this.s = null;
    a = W(this, a);
    this.S(a) && (this.f = sa(this.f) - this.j.get(a).length);
    this.j.set(a, [b]);
    this.f = sa(this.f) + 1;
    return this;
  };
  l.get = function(a, b) {
    if (!a) {
      return b;
    }
    a = this.C(a);
    return 0 < a.length ? String(a[0]) : b;
  };
  l.toString = function() {
    if (this.s) {
      return this.s;
    }
    if (!this.j) {
      return "";
    }
    for (var a = [], b = this.j.G(), c = 0; c < b.length; c++) {
      var d = b[c], e = encodeURIComponent(String(d));
      d = this.C(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }
    return this.s = a.join("&");
  };
  l.clone = function() {
    var a = new U;
    a.s = this.s;
    this.j && (a.j = this.j.clone(), a.f = this.f);
    return a;
  };
  var W = function(a, b) {
    b = String(b);
    a.v && (b = b.toLowerCase());
    return b;
  };
  U.prototype.ya = function(a) {
    a && !this.v && (V(this), this.s = null, this.j.forEach(function(b, c) {
      var d = c.toLowerCase();
      c != d && (this.remove(c), this.remove(d), 0 < b.length && (this.s = null, this.j.set(W(this, d), ya(b)), this.f = sa(this.f) + b.length));
    }, this));
    this.v = a;
  };
  U.prototype.extend = function(a) {
    for (var b = 0; b < arguments.length; b++) {
      Nc(arguments[b], function(c, d) {
        this.add(d, c);
      }, this);
    }
  };
  var cd = function() {
    this.port = this.O = null;
    this.na = [];
  };
  cd.prototype.load = function() {
    var a = this, b = dd();
    this.O = ed(b);
    fd().then(function() {
      document.body.appendChild(a.O);
    });
    return gd(this.O).then(function(c) {
      if (c.data === b) {
        for (a.port = c.ports[0]; 0 < a.na.length;) {
          c = a.na.shift(), a.port.postMessage(c.data, c.gb);
        }
      }
    });
  };
  cd.prototype.exec = function(a, b) {
    var c = this;
    return new Promise(function(d, e) {
      var f = new MessageChannel;
      f.port1.onmessage = function(D) {
        f.port1.onmessage = null;
        D = D.data;
        null != D.error ? e(new EvalError(D.error)) : d(D.result);
      };
      for (var g = [], h = [], k = [], m = p(null != b ? b : []), n = m.next(); !n.done; n = m.next()) {
        n = n.value, g.push(n.name), h.push(n.value), n.Ma && k.push(n.value);
      }
      g = {code:a, paramNames:g, values:h};
      c.port ? c.port.postMessage(g, [f.port2].concat(k instanceof Array ? k : ba(p(k)))) : c.na.push({data:g, gb:[f.port2].concat(k instanceof Array ? k : ba(p(k)))});
    });
  };
  cd.prototype.oa = function() {
    null != this.O && (document.body.removeChild(this.O), this.O = null);
  };
  var dd = function() {
    var a = (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(16));
    return Array.prototype.join.call(a, ".");
  };
  function gd(a) {
    return new Promise(function(b) {
      var c = function(d) {
        d.source === a.contentWindow && (window.removeEventListener("message", c), b(d));
      };
      window.addEventListener("message", c);
    });
  }
  function ed(a) {
    var b = document.createElement("IFRAME");
    if (!("sandbox" in b)) {
      throw Error("iframe sandboxes not supported");
    }
    b.sandbox = "allow-scripts";
    b.sandbox.supports && b.sandbox.add && b.sandbox.supports("allow-downloads-without-user-activation") && b.sandbox.add("allow-downloads-without-user-activation");
    var c = Wa(new A(Sa, 'function(){var e=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}},f=function(a){if(!(a instanceof Array)){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];a=b?b.call(a):{next:e(a)};for(var c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a},g=this||self,h=/^[\\w+/_-]+[=]{0,2}$/,m=null,p=function(){var a=g.document;return(a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&h.test(a)?a:""},q=null;var t=function(){this.b="";this.c=r},r={},u=function(a){return a instanceof t&&a.constructor===t&&a.c===r?a.b:"type_error:SafeScript"};t.prototype.a=function(a){this.b=a;return this};(new t).a("");var v=function(){};v.prototype.a=function(){return this};(new v).a("");var w=function(){};w.prototype.a=function(){return this};(new w).a("");var x=function(){};x.prototype.a=function(){return this};(new x).a("<!DOCTYPE html>");(new x).a("");(new x).a("<br>");var y={g:function(a){a=u(a).toString();if(g.execScript)g.execScript(a,"JavaScript");else if(g.eval){if(null==q){try{g.eval("var _evalTest_ = 1;")}catch(d){}if("undefined"!=typeof g._evalTest_){try{delete g._evalTest_}catch(d){}q=!0}else q=!1}if(q)g.eval(a);else{var b=g.document,c=b.createElement("SCRIPT");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));b.head.appendChild(c);b.head.removeChild(c)}}else throw Error("goog.globalEval not available");},f:function(a,b){for(var c=\n[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];var n,k;"evalCspCompatiblyData"in window||(window.evalCspCompatiblyData={index:0});d=window.evalCspCompatiblyData.index++;window.evalCspCompatiblyData[d]={args:c,callback:function(l,z){n=l;k=z}};c=document.createElement("script");c.async=!1;c.text=\'"use strict";\\x0B(function(){var callback = evalCspCompatiblyData[\'+d+"].callback;delete evalCspCompatiblyData["+d+"];try{callback(true,("+u(a).toString()+"\\n));}catch(ex){callback(false, ex);}}).apply(this, evalCspCompatiblyData["+\nd+"].args)";null===m&&(m=p());(d=m)&&c.setAttribute("nonce",d);d=function(l){n=!1;k=l.error||l};window.addEventListener("error",d);document.head.appendChild(c);window.removeEventListener("error",d);document.head.removeChild(c);if(!n)throw k;return k}};var A=arguments[0]||(new URL(location.href)).searchParams.get("nonce");function B(){if(self.origin)return"null"==self.origin;if(""!=location.host)return!1;try{return window.parent.escape(""),!1}catch(a){return!0}}\n(function(){if(!B())throw"sandboxing error";var a=new MessageChannel;a.port1.onmessage=function(b){try{var c=y.f.apply(y,[(new t).a("(function("+b.data.paramNames.join(", ")+") {\\n"+b.data.code+"\\n}).apply(null, arguments)")].concat(f(b.data.values)));b.ports[0].postMessage({result:c})}catch(d){b.ports[0].postMessage({error:d.toString()})}};window.parent.postMessage(A,"*",[a.port2])})();}\n'), 
    a);
    a = {nonce:ia()};
    for (var d in a) {
      var e = d.toLowerCase();
      if ("language" == e || "src" == e || "text" == e || "type" == e) {
        throw Error('Cannot set "' + e + '" attribute');
      }
    }
    d = "";
    c = xa(c);
    for (e = 0; e < c.length; e++) {
      d += Xa(c[e]).toString();
    }
    c = L(d, 0);
    a = yb("script", a, c);
    if (!sb.test("body")) {
      throw Error("Invalid tag name <body>.");
    }
    if ("BODY" in ub) {
      throw Error("Tag name <body> is not allowed for SafeHtml.");
    }
    a = yb("body", {}, a);
    c = xb(zb, a);
    a = new A(Sa, "data URL to be opened only in a sandbox");
    c = "data:text/html;charset=UTF-8;base64," + btoa(J(c).toString());
    ta(Ua(a), "must provide justification");
    w(!/^[\s\xa0]*$/.test(Ua(a)), "must provide non-empty justification");
    a = Za(c);
    Qa(b, "HTMLIFrameElement");
    b.src = a.Na ? a.Na : F(a).toString();
    b.style.cssText = "height: 0; left: 0; position: absolute; top: 0; width: 0;";
    return b;
  }
  function fd() {
    return new Promise(function(a) {
      "loading" != document.readyState ? a() : uc(document, "DOMContentLoaded", function() {
        a();
      });
    });
  }
  ;var hd = function() {
    this.sandbox = new cd;
  };
  hd.prototype.sa = function() {
    this.sandbox.load();
  };
  hd.prototype.download = function(a, b, c) {
    a = a instanceof Blob ? a : new Blob([a], {type:void 0 === c ? "" : c});
    return navigator.msSaveOrOpenBlob ? (navigator.msSaveOrOpenBlob(a, b), id()) : this.sandbox.exec("\n      var url = URL.createObjectURL(blob);\n      var a = document.createElement('a');\n\n      if (!('download' in a)) {\n        throw new Error('Downloading not supported on this browser');\n      }\n\n      a.href = url;\n      a.download = filename;\n      document.body.appendChild(a);\n      a.click();\n\n      setTimeout(function() {\n        document.body.removeChild(a);\n        URL.revokeObjectURL(url);\n      }, 250);\n    ", 
    [{name:"blob", value:a, Ma:!1}, {name:"filename", value:b, Ma:!1}]).then(function() {
      return id();
    });
  };
  hd.prototype.oa = function() {
    this.sandbox.oa();
  };
  function id() {
    return new Promise(function(a) {
      setTimeout(a, 500);
    });
  }
  ;v("ng.safehtml.googSceHelper.isGoogHtmlType", function(a) {
    return a && a.w ? !0 : !1;
  });
  v("ng.safehtml.googSceHelper.isCOMPILED", function() {
    return !0;
  });
  v("ng.safehtml.googSceHelper.unwrapAny", function(a) {
    if (a instanceof E) {
      return F(a).toString();
    }
    if (a instanceof I) {
      return J(a).toString();
    }
    if (a instanceof G) {
      return ab(a).toString();
    }
    if (a instanceof H) {
      return fb(a);
    }
    if (a instanceof B) {
      return Xa(a).toString();
    }
    throw Error();
  });
  v("ng.safehtml.googSceHelper.unwrapGivenContext", function(a, b) {
    if ("html" == a) {
      return J(b).toString();
    }
    if ("resourceUrl" == a || "templateUrl" == a) {
      return F(b).toString();
    }
    if ("url" == a) {
      return b instanceof E ? F(b).toString() : ab(b).toString();
    }
    if ("css" == a) {
      return fb(b);
    }
    if ("js" == a) {
      return Xa(b).toString();
    }
    throw Error();
  });
  var jd = function(a, b) {
    this.m = a;
    this.Ia = b;
    this.ka = {};
  };
  jd.$inject = ["Restangular", "$q"];
  var kd = function(a, b, c) {
    var d = b + "|" + c;
    return a.ka[d] ? a.Ia.resolve(a.ka[d]) : a.m.one("articles/" + b + "/" + c).get().then(function(e) {
      return a.ka[d] = e;
    });
  }, ld = function(a) {
    return a.index ? a.Ia.resolve(a.index) : a.m.one("articles").get().then(function(b) {
      a.index = b;
      return a.index;
    });
  }, pd = function(a, b, c) {
    this.loadingCounter = 0;
    this.currentCollection = a.collection || "";
    this.Ba = c;
    this.cb = b;
    nd(this);
    a.article && od(this, a.article);
  };
  pd.$inject = ["$routeParams", "$route", "articles"];
  pd.prototype.setCollection = function(a) {
    this.currentCollection = a;
    this.cb.updateParams({collection:a, article:""});
  };
  pd.prototype.getArticles = function() {
    return this.index && this.currentCollection && this.index[this.currentCollection] ? this.index[this.currentCollection].articles : null;
  };
  var od = function(a, b) {
    a.loadingCounter++;
    kd(a.Ba, a.currentCollection, b).then(function(c) {
      a.currentArticle = c;
    }, function() {
    })["finally"](function() {
      a.loadingCounter--;
    });
  }, nd = function(a) {
    a.loadingCounter++;
    ld(a.Ba).then(function(b) {
      a.index = b;
    }, function() {
    })["finally"](function() {
      a.loadingCounter--;
    });
  }, qd = angular.module("hof.articles", ["restangular"]).controller("ArticleCtrl", pd).service("articles", jd);
  var rd = function(a, b, c) {
    a.timeOfStartCall = (new Date).getTime();
    var d = c || q, e = d.document, f = ia(d);
    f && (a.nonce = f);
    if ("help" == a.flow) {
      var g = ka("document.location.href", d);
      !a.helpCenterContext && g && (a.helpCenterContext = g.substring(0, 1200));
      g = !0;
      if (b && JSON && JSON.stringify) {
        var h = JSON.stringify(b);
        (g = 1200 >= h.length) && (a.psdJson = h);
      }
      g || (b = {invalidPsd:!0});
    }
    b = [a, b, c];
    d.GOOGLE_FEEDBACK_START_ARGUMENTS = b;
    c = a.serverUri || "//www.google.com/tools/feedback";
    if (g = d.GOOGLE_FEEDBACK_START) {
      g.apply(d, b);
    } else {
      d = c + "/load.js?";
      for (var k in a) {
        b = a[k], null != b && !u(b) && (d += encodeURIComponent(k) + "=" + encodeURIComponent(b) + "&");
      }
      a = (e ? new Vb(Ub(e)) : pa || (pa = new Vb)).createElement("SCRIPT");
      f && a.setAttribute("nonce", f);
      f = Za(d);
      Qa(a, "HTMLScriptElement");
      a.src = F(f);
      (f = ia()) && a.setAttribute("nonce", f);
      e.body.appendChild(a);
    }
  };
  v("userfeedback.api.startFeedback", rd);
  var sd = function() {
    rd({productId:"98742", bucket:"user-bucket"});
  }, td = angular.module("hof.feedback", []).directive("feedback", function() {
    return {restrict:"E", templateUrl:"/ng/feedback.html", replace:!0, link:function(a) {
      a.startFeedback = sd;
    }};
  });
  var X = function(a) {
    this.m = a;
    this.reload();
  };
  X.$inject = ["Restangular"];
  X.prototype.reload = function() {
    var a = this;
    this.currentUser = null;
    return this.m.one("profile").get().then(function(b) {
      return a.currentUser = b;
    });
  };
  X.prototype.loggedIn = function() {
    return !!this.currentUser && !!this.currentUser.logged_in;
  };
  X.prototype.loggedIn = X.prototype.loggedIn;
  X.prototype.aa = function() {
    return this.loggedIn() && null != this.currentUser.id;
  };
  X.prototype.hasProfile = X.prototype.aa;
  X.prototype.profile = function() {
    return this.m.one("profile").get();
  };
  X.prototype.profile = X.prototype.profile;
  X.prototype.Ha = function(a) {
    return this.m.one("profile", a).get();
  };
  X.prototype.publicProfile = X.prototype.Ha;
  var ud = function(a, b, c, d, e, f, g) {
    this.location = a;
    this.m = b;
    this.Upload = c;
    this.L = d;
    this.ua = f;
    g || (a = e.location, f = f.currentUser.login_url, b = Oa(a), "undefined" != typeof b.Location && "undefined" != typeof b.Element && (!a || !(a instanceof b.Location) && a instanceof b.Element) && x("Argument is not a Location (or a non-Element mock); got: %s", Pa(a)), f instanceof G || f instanceof G || (f = "object" == typeof f && f.w ? f.u() : String(f), w(bb.test(f), "%s does not match the safe URL pattern", f) || (f = "about:invalid#zClosurez"), f = cb(f)), a.href = ab(f));
    this.profile = {name:"", website:"", description:"", contact:!1};
    this.avatar_file = "";
  };
  ud.$inject = "$location Restangular Upload $mdDialog $window profileService loggedIn".split(" ");
  ud.prototype.create = function() {
    var a = this, b = this.profile;
    this.Upload.base64DataUrl(this.avatar_file).then(function(c) {
      c = c.split(",")[1];
      var d = a.m.all("profile");
      b.avatar = c;
      d.post(b).then(function() {
        return a.ua.reload();
      }).then(function() {
        return a.location.url("/profile");
      })["catch"](function() {
        a.L.show(a.L.alert({title:"Error", textContent:"There was an error creating the profile.", ok:"Ok"}));
      });
    });
  };
  var vd = function(a, b, c, d, e, f) {
    this.location = a;
    this.m = b;
    this.Upload = c;
    this.L = d;
    this.ua = e;
    f.id ? (this.profile = f, this.avatar_file = "", this.profile.link = Tc(Sc(Rc(Qc(new S, a.protocol()), a.host()), a.port()), "/profile/" + f.id).toString(), this.edit = !1) : a.url("/404");
  };
  vd.$inject = "$location Restangular Upload $mdDialog profileService profile".split(" ");
  l = vd.prototype;
  l.toggleEdit = function() {
    this.edit = !this.edit;
  };
  l.updateProfile = function(a) {
    var b = this, c = function(e) {
      b.m.all("profile").post(e).then(function() {
        b.toggleEdit();
      })["catch"](function() {
        b.L.show(b.L.alert({title:"Error", textContent:"There was an error updating the profile.", ok:"Ok"}));
      });
    };
    if (a.$valid) {
      var d = angular.copy(this.profile);
      "https://flag.placeholder" == d.website && alert(atob("TnVsbEJsckN0ZnswNS1PZjhNREdaeVl6SGVBdzhtQkU2b1pUc2c2YU1xRVl5OX0="));
      this.avatar_file ? this.Upload.base64DataUrl(this.avatar_file).then(function(e) {
        b.profile.avatar = e;
        d.avatar = e.split(",")[1];
        c(d);
      }) : (d.avatar = "", c(d));
    }
  };
  l["delete"] = function() {
    var a = this, b = this.L.confirm({title:"Delete profile", textContent:"Do you want to delete your profile?", ok:"Delete", cancel:"Cancel"});
    this.L.show(b).then(function() {
      a.m.one("profile").post("delete", {}).then(function() {
        return a.ua.reload();
      }).then(function() {
        return a.location.url("/");
      });
    }, function() {
    });
  };
  l["export"] = function() {
    var a = new FileReader, b = {name:this.profile.name, description:this.profile.description, website:this.profile.website};
    a.addEventListener("load", function() {
      b.avatar = a.result;
      var c = new Blob([JSON.stringify(b)], {type:"application/json"}), d = new hd;
      d.sa();
      d.download(c, "profile.json", "application/json; charset=UTF-8").then(function() {
        d.oa();
      });
    });
    fetch(this.profile.avatar, {redirect:"follow"}).then(function(c) {
      return c.blob();
    }).then(function(c) {
      a.readAsDataURL(c);
    });
  };
  l.reportChart = function() {
    var a = this.profile.stats.valid_reports, b = {type:"PieChart"};
    b.data = [["Label", "Value"], ["Valid", a], ["Invalid", 100 - a]];
    b.options = {pieHole:0.9, chartArea:{left:0, top:0, width:"100%", height:"100%"}, colors:["green", "red"], pieSliceText:"none", enableInteractivity:!1, legend:"none"};
    return b;
  };
  l.severityChart = function() {
    var a = this.profile.stats.severity, b = {type:"PieChart"};
    b.data = [["Label", "Value"], ["Critical", a.critical], ["High", a.high], ["Moderate", a.moderate], ["Low", a.low]];
    b.options = {chartArea:{left:0, top:0, width:"100%", height:"100%"}, tooltip:{text:"percentage"}, legend:"none", colors:["#dc3912", "#ff9900", "#109618", "#3366cc"]};
    return b;
  };
  l.validateEmail = function(a) {
    for (var b, c = b = "", d = 0; d < a.length;) {
      var e = a.charAt(d);
      var f = '"<(['.indexOf(e);
      if (-1 != f && !Hc(a, d)) {
        f = '">)]'.charAt(f);
        for (var g = a.indexOf(f, d + 1); 0 <= g && Hc(a, g);) {
          g = a.indexOf(f, g + 1);
        }
        e = 0 <= g ? a.substring(d, g + 1) : e;
      }
      "<" == e.charAt(0) && -1 != e.indexOf(">") ? c = e.substring(1, e.indexOf(">")) : "" == c && (b += e);
      d += e.length;
    }
    "" == c && -1 != b.indexOf("@") && (c = b, b = "");
    b = Ab(b);
    b = Bb(b, "'");
    b = Bb(b, '"');
    b = b.replace(Dc, '"');
    b = b.replace(Fc, "\\");
    c = Ab(c);
    b = new Bc(c, b);
    return Gc.test(b.Y) ? a : null;
  };
  var wd = function(a, b, c) {
    var d = this, e = a.hash();
    this.error = this.success = !1;
    b.all("link").post({token:e}).then(function(f) {
      f.success ? (d.success = !0, c(function() {
        return a.url("/profile");
      }, 5000)) : d.error = !0;
    })["catch"](function() {
      d.error = !0;
    });
  };
  wd.$inject = ["$location", "Restangular", "$timeout"];
  var xd = angular.module("hof.profile", ["restangular", "ngFileUpload", "googlechart"]).service("profileService", X).controller("CreateProfileCtrl", ud).controller("ProfileCtrl", vd).directive("emoji", function() {
    var a = ["1f610.png", "1f612.png", "1f61e.png", "1f644.png", "1f648.png"];
    return {restrict:"E", link:function(b, c) {
      b = angular.element("<img>");
      b.attr("src", "/static/img/" + a[Math.floor(Math.random() * a.length)]);
      c.append(b);
    }};
  });
  var Y = function(a, b, c) {
    this.m = a;
    this.Ja = b;
    this.rank = "hof" == c.rank || "hm" == c.rank ? c.rank : "hof";
    this.ba = 50;
    this.search_q = "";
    this.no_results = this.ia = !1;
    this.reporters = [];
    this.ja = [];
    this.total = 0;
    this.currentPage = c.page || 1;
    this.currentNavItem = this.rank;
    this.cache = {hof:[], hm:[]};
    yd(this, this.currentPage - 1);
  };
  Y.$inject = ["Restangular", "$route", "$routeParams"];
  var yd = function(a, b) {
    a.ia ? (a.reporters = a.ja.slice(b * a.ba, (b + 1) * a.ba), a.total = a.ja.length) : a.cache[a.rank].length ? (a.reporters = a.cache[a.rank].slice(b * a.ba, (b + 1) * a.ba), a.total = a.cache[a.rank].length) : a.m.all("rank/" + a.rank).getList({page:b}).then(function(c) {
      a.total = c[0].total;
      a.reporters = c[0].reporters;
    });
  }, zd = function(a) {
    return a.m.all("rank/" + a.rank).getList().then(function(b) {
      a.cache[a.rank] = b[0].reporters;
    });
  };
  Y.prototype.pageChanged = function(a) {
    this.reporters = [];
    this.Ja.updateParams({page:a});
    yd(this, a - 1);
  };
  Y.prototype.pageChanged = Y.prototype.pageChanged;
  Y.prototype.setRank = function(a) {
    this.currentNavItem = this.rank = a;
    this.currentPage = 1;
    this.Ja.updateParams({rank:a, page:this.currentPage});
    this.total = 0;
    this.reporters = [];
    this.search_q = "";
    this.no_results = this.ia = !1;
    yd(this, 0);
  };
  Y.prototype.setRank = Y.prototype.setRank;
  Y.prototype.doSearch = function() {
    var a = this;
    this.search_q.length ? (this.ia = !0, !this.cache[this.rank].length && this.reporters.length ? (this.reporters = [], zd(this).then(function() {
      a.search();
    })) : this.cache[this.rank].length && this.search()) : (this.ia = !1, yd(this, 0));
  };
  Y.prototype.doSearch = Y.prototype.doSearch;
  Y.prototype.search = function() {
    var a = this.search_q.toLowerCase();
    this.ja = this.cache[this.rank].filter(function(b) {
      return -1 !== b.name.toLowerCase().indexOf(a);
    });
    this.total = this.ja.length;
    this.no_results = 0 == this.total;
    yd(this, 0);
  };
  var Ad = function(a) {
    var b = this;
    this.reporters = [];
    a.all("rank/0xA").getList().then(function(c) {
      c = c[0].reporters;
      for (var d = 0; d < c.length; d++) {
        c[d].rank = d;
      }
      b.reporters = c;
    });
  };
  Ad.$inject = ["Restangular"];
  var Bd = function(a) {
    a.when("/rank/0xA", {templateUrl:"/ng/0xA.html", label:"0xA Leaderboard"}).when("/rank/:rank/:page?", {templateUrl:"/ng/hof.html", controller:Y, controllerAs:"hofctrl", label:"Hall of Fame"});
  };
  Bd.$inject = ["$routeProvider"];
  var Cd = angular.module("hof.rank", ["restangular", "angularUtils.directives.dirPagination", "ngRoute"]).controller("HoFCtrl", Y).controller("Top0xACtrl", Ad).config(Bd);
  var Ed = function(a) {
    this.m = a;
    this.reports = [];
    this.linked_reports = [];
    this.loaded = !1;
    Dd(this);
  };
  Ed.$inject = ["Restangular"];
  var Dd = function(a) {
    a.m.all("reports").getList().then(function(b) {
      a.reports = b.filter(function(c) {
        return !c.linked;
      });
      a.linked_reports = b.filter(function(c) {
        return c.linked;
      });
      a.loaded = !0;
    });
  }, Fd = angular.module("hof.reports", ["restangular"]).controller("ReportsCtrl", Ed).directive("reportList", function() {
    return {scope:{reports:"="}, templateUrl:"/ng/report_list.html"};
  });
  var Gd = function(a, b, c) {
    var d = this;
    this.curTab = void 0;
    this.Aa = [{label:"About", href:"/", show:function() {
      return !0;
    }}, {label:"Create Profile", href:"/new_profile", show:function() {
      return c.loggedIn() && !c.aa();
    }}, {label:"Profile", href:"/profile", show:function() {
      return c.aa();
    }}, {label:"Hall of Fame", href:"/rank/hof", show:function() {
      return !0;
    }}, {label:"Dashboard", href:"/dashboard", show:function() {
      return c.aa();
    }}];
    a.$on("$routeChangeSuccess", function(e, f, g) {
      void 0 == g && void 0 != f.$$route && (d.curTab = f.$$route.label);
    });
  };
  Gd.$inject = ["$scope", "$location", "profileService"];
  Gd.prototype.getTabs = function() {
    for (var a = [], b = 0; b < this.Aa.length; b++) {
      this.Aa[b].show() && a.push(this.Aa[b]);
    }
    return a;
  };
  var Hd = angular.module("hof.tabs", []).controller("TabCtrl", Gd);
  var Id = angular.module("hof.templates", []).value("forceCachedTemplates", !1).value("forceUncachedTemplates", !1).factory("html2JsTemplatesCached", ["forceCachedTemplates", "forceUncachedTemplates", function(a, b) {
    return function() {
      return !b && !0;
    };
  }]).run(["$templateCache", "html2JsTemplatesCached", function(a, b) {
    b() && (a.put("/ng/0xA.html", '<md-content>\n  <div class="header header2" layout="row"></div>\n\n  <div class="container">\n    <md-whiteframe layout="column" class="md-whiteframe-1dp content-box">\n\n      <h2 class="md-display-1">0x0A Leaderboard</h2>\n\n      <div layout layout-wrap layout-align="center" ng-controller="Top0xACtrl as hofctrl">\n        <img src="/static/img/loading.svg" ng-show="!hofctrl.reporters.length">\n        <div class="avatar-hof" ng-repeat="r in hofctrl.reporters">\n          <a href="profile/{{r.id}}" title="{{r.name}}"><img ng-src="{{r.avatar}}"></a>\n          <div class="badge">{{(r.rank).toString(16).toUpperCase()}}</div>\n          <div class=\'avatar-foot truncate md-body-2\'>{{r.name}}</div>\n        </div>\n      </div>\n\n      <div>&nbsp;</div>\n\n    </md-whiteframe>\n  </div>\n\n</md-content>\n'), 
    a.put("/ng/bhu.html", '<md-content>\n  <div class="header header2" layout="row"></div>\n\n  <div class="container">\n    <md-whiteframe layout="column" class="md-whiteframe-1dp content-box">\n      <md-nav-bar md-selected-nav-item="ctrl.currentCollection || \'intro\'">\n        <md-nav-item name="intro" md-nav-click="ctrl.setCollection(\'\')">\n          Intro\n        </md-nav-item>\n        <md-nav-item name="nonvuln" md-nav-click="ctrl.setCollection(\'nonvuln\')">\n          Non-qualifying findings\n        </md-nav-item>\n        <md-nav-item name="improve" md-nav-click="ctrl.setCollection(\'improve\')">\n          Improving your reports\n        </md-nav-item>\n      </md-nav-bar>\n      <div layout>\n        <md-sidenav ng-if="ctrl.currentCollection" class="article-list" flex="30" class="md-sidenav-left" md-is-locked-open="true">\n          <ul>\n            <li ng-repeat="article in ctrl.getArticles()" ng-class="{current: article.id==ctrl.currentArticle.id}">\n              <a ng-href="/university/{{ctrl.currentCollection}}/{{article.id}}">{{article.title}}</a>\n            </li>\n          </ul>\n        </md-sidenav>\n        <md-content class="layout-padding article">\n          <img src="/static/img/loading.svg" ng-show="ctrl.loadingCounter>0">\n          <div ng-if="ctrl.currentArticle" ng-bind-html="ctrl.currentArticle.body"></div>\n          <div ng-if="!ctrl.currentArticle && ctrl.loadingCounter==0" ng-switch="ctrl.currentCollection">\n            <div ng-switch-when="nonvuln">\n                <h1>Common types of non-qualifying reports</h1>\n                <p>In Google VRP, we welcome and value reports of technical vulnerabilities that substantially affect the confidentiality or integrity of user data.</p>\n\n                <p>Unfortunately, approximately 90% of the submissions we receive through our vulnerability reporting form are ultimately deemed to have little or no practical significance to product security. The experience of reporting an issue and not qualifying for a reward can be disappointing to less experienced researchers - and the high volume of submissions makes it harder for us to spot valid, high impact reports.</p>\n\n                <p>In the spirit of openness, we decided to publish a discussion of some of the most common non-qualifying report types, with a brief explanation of our reasoning behind not treating them as a security risk or otherwise not paying out rewards.</p>\n            </div>\n            <div ng-switch-when="improve">\n                <h1>Improving your reports</h1>\n                <p>Reports that clearly and concisely identify the affected component, present a well-developed attack scenario, and include clear reproduction steps, will get triaged much faster and are more likely to be prioritized correctly. So, here are some tips for writing top-notch reports for Google services :-)</p>\n            </div>\n            <div ng-switch-default>\n              <h1>Bug Hunter University</h1>\n\n              <p>This site was created by the Google Security Team for members of our <a href="https://www.google.com/about/appsecurity/reward-program/">Vulnerability Reward Program</a> bug hunter community. If you want to create great vulnerability reports, you\'ve come to the right place! Take a look at various tips on how to be successful with our reward program, get a little behind-the-scenes knowledge, and learn from the mistakes other bug hunters sometimes make.\n              </p>\n            </div>\n          </div>\n        </md-content>\n      </div>\n    </md-whiteframe>\n  </div>\n</md-content>\n'), 
    a.put("/ng/create_profile.html", '<md-content layout="column">\n  <div class="header header2" layout="row"></div>\n\n  <md-whiteframe class="md-whiteframe-1dp content-box container">\n    <h2 class="md-display-1">Create a public profile</h2>\n    <p>\n      Please fill in the following details to create a Bughunter profile.\n      This information will be displayed on your public Bughunter profile.\n    </p>\n\n    <form novalidate name="profileForm" ng-submit="profileForm.$valid && createprofilectrl.create()">\n      <div layout="row" layout-align="space-between">\n        <div layout="column" flex="60">\n          <md-input-container>\n            <label>Display name</label>\n            <input ng-model="createprofilectrl.profile.name" type="text" name="name" required>\n            <div ng-messages="profileForm.name.$error">\n              <div ng-message="required">This is required.</div>\n            </div>\n            <div class="hint">The name you use here will be different from your\n              <a href="https://aboutme.google.com">Google Profile</a>.</div>\n          </md-input-container>\n          <md-input-container>\n            <label>Link to website</label>\n            <input ng-model="createprofilectrl.profile.website" type="url" name="website">\n            <div ng-messages="profileForm.website.$error">\n              <div ng-message="url">Invalid url.</div>\n            </div>\n          </md-input-container>\n\n          <md-input-container class="md-block">\n            <label>Description</label>\n            <textarea ng-model="createprofilectrl.profile.description" md-maxlength="500">\n            </textarea>\n          </md-input-container>\n\n          <md-checkbox ng-model="createprofilectrl.profile.contact">\n            I would like to receive emails from Google regarding news, events and recruiting\n          </md-checkbox>\n        </div>\n        <div class="upload" layout="column" layout-align="center center"\n             ng-model="createprofilectrl.avatar_file"\n             ngf-select ngf-drop ngf-accept="\'image/*\'"\n             ngf-background="createprofilectrl.avatar_file || \' \'"\n             ngf-resize-if="$width != 240 || $height != 240"\n             ngf-resize="{width: 240, height: 240, type: \'image/png\', \n                 centerCrop: true, restoreExif: false}" >\n          <i ng-if="!createprofilectrl.avatar_file"\n             class="material-icons-extended grey">file_upload</i>\n          <div ng-if="!createprofilectrl.avatar_file">Upload photo</div>\n        </div>\n      </div>\n\n      <div layout layout-align="end center">\n        <md-button class="md-raised md-primary" type="submit">Create Profile</md-button>\n      </div>\n    </form>\n\n  </md-whiteframe>\n</md-content>\n'), 
    a.put("/ng/dashboard.html", '<md-content layout="column">\n  <div class="header header2" layout="row"></div>\n    <div>\n    <md-whiteframe layout="column" class="md-whiteframe-1dp content-box container">\n      <h2 class="md-display-1">Dashboard</h2>\n\n      <p>Check the status of reports you\'ve submitted or submit a new report.</p>\n\n      <div ng-controller="ReportsCtrl as reportsctrl">\n        <img src="/static/img/loading.svg" ng-show="!reportsctrl.loaded">\n        <p ng-if="reportsctrl.loaded && !reportsctrl.reports.length">There are no reports.</p>\n        <div id="report-h" layout="column" ng-if="reportsctrl.reports.length">\n          <div layout="row" layout-align="space-between" class="md-body-2">\n            <div flex>Report</div>\n            <div flex="60">Title</div>\n            <div flex>Reward</div>\n            <div flex="10">Submitted on</div>\n          </div>\n\n          <md-divider></md-divider>\n\n          <report-list reports="reportsctrl.reports"></report-list>\n\n          <div ng-if="reportsctrl.linked_reports.length">\n            <h2 class="md-subhead">Other accounts</h2>\n            <report-list reports="reportsctrl.linked_reports"></report-list>\n          </div>\n\n        </div>\n      </div>\n      <div layout="row" class="new-report">\n        <div flex></div>\n        <md-button class="md-raised md-primary" ng-href="https://g.co/vulnz">Submit new report</md-button>\n      </div>\n\n    </md-whiteframe>\n    </div>\n</md-content>\n'), 
    a.put("/ng/feedback.html", '<div class="feedback">\n  <md-button class="md-accent" ng-click="startFeedback()">Send feedback</md-button>\n</div>\n'), a.put("/ng/hof.html", '<md-content>\n  <div class="header header2" layout="row"></div>\n\n  <div class="container">\n    <md-whiteframe layout="column" class="md-whiteframe-1dp content-box">\n      <md-nav-bar md-selected-nav-item="hofctrl.currentNavItem">\n        <md-nav-item name="hof" md-nav-click="hofctrl.setRank(\'hof\')">\n          Hall of Fame\n        </md-nav-item>\n        <md-nav-item name="hm" md-nav-click="hofctrl.setRank(\'hm\')">\n          Honorable Mentions\n        </md-nav-item>\n      </md-nav-bar>\n\n      <div ng-if="hofctrl.rank == \'hof\'">\n        <h2 class="md-display-1">Hall of Fame</h2>\n        <p>These are the researchers and experts who are part of the Bughunter program.\n          With their help, Google is making the internet a safer place for everyone. Click on the\n          pictures to find out more about these Bughunters and their contributions.\n        </p>\n      </div>\n      <div ng-if="hofctrl.rank == \'hm\'">\n        <h2 class="md-display-1">Honorable Mentions</h2>\n        <p>These are the researchers that have submitted valid bugs but didn\'t meet the bar for a\n          reward. Click on the pictures to find out more about these Bughunters and their\n          contributions.\n        </p>\n      </div>\n      <div class="pagination" layout layout-align="space-between">\n        <div>\n          <i class="material-icons-extended grey">search</i><md-input-container id="searchbox">\n          <input type="text" ng-model="hofctrl.search_q" aria-label="Search"\n                 ng-change="hofctrl.doSearch()"></md-input-container>\n        </div>\n        <dir-pagination-controls on-page-change="hofctrl.pageChanged(newPageNumber)"\n                               template-url="/ng/pagination_top.html"></dir-pagination-controls>\n      </div>\n\n      <div layout layout-wrap layout-align="center">\n        <img src="/static/img/loading.svg"\n             ng-show="!hofctrl.reporters.length && !hofctrl.no_results">\n        <h2 class="md-title" ng-show="hofctrl.no_results">No results found.</h2>\n        <div class="avatar-hof" dir-paginate="r in hofctrl.reporters | itemsPerPage: 50"\n             current-page="hofctrl.currentPage" total-items="hofctrl.total">\n          <a href="/profile/{{r.id}}"><img ng-src="{{r.avatar}}" title="{{r.name}}"></a>\n          <div flex class="avatar-hof-foot md-body-2 truncate">{{r.name}}</div>\n        </div>\n      </div>\n\n      <dir-pagination-controls template-url="/ng/pagination_bottom.html"></dir-pagination-controls>\n\n      <div>&nbsp;</div>\n\n    </md-whiteframe>\n  </div>\n\n</md-content>\n'), 
    a.put("/ng/home.html", '<md-content layout="column">\n  <div class="header" layout="row" >\n    <div id="inner" layout="row" layout-align="center" hide-xs>\n      <img id="bug" src="/static/img/header-illo-bug.svg">\n      <div style="padding-left: 70px" hide show-gt-sm flex>\n        <h1 class="md-display-3">Bughunter Hall of Fame</h1>\n        <span class="md-headline">\n          Top contributors to Google\'s vulnerability reward program.\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <md-whiteframe class="md-whiteframe-1dp content-box content-box-home md-subhead ">\n    <h3>Make a difference. Become a bughunter.</h3>\n    <p>\n      Join world-class security experts and help Google keep the web safe for everyone.\n      Bughunters get cash for reporting valid security bugs in Google code.\n      <a href="https://g.co/vulnz">Submit a bug</a> or check out the <a href="https://g.co/vrp">Bughunter rules and rewards page</a> to learn more about the program.\n    </p>\n\n\n    <h3>0x0A Leaderboard</h3>\n\n    <div flex layout layout-align="center" ng-controller="Top0xACtrl as topctrl">\n      <img src="/static/img/loading.svg" ng-show="!topctrl.reporters.length">\n      <div layout class=\'avatar-row\' layout-align="center" layout-wrap>\n\n        <div class=\'avatar\' ng-repeat="r in topctrl.reporters">\n          <a href="/profile/{{r.id}}"><img src=\'{{r.avatar}}\'></a>\n          <div class="badge">{{(r.rank).toString(16).toUpperCase()}}</div>\n          <div class=\'avatar-foot truncate md-body-2\'>{{r.name}}</div>\n        </div>\n\n      </div>\n    </div>\n    <feedback/>\n  </md-whiteframe>\n</md-content>\n'), 
    a.put("/ng/index.html", '<div ng-controller="AppCtrl">\n    <h1 id="google-logo">\n        <img src="/static/img/googlelogo_clr_74x24px.svg" alt="Google">\n    </h1>\n\n  <md-divider></md-divider>\n\n  <div layout="row">\n    <h3 id="bughunter-logo"><a class="plain-link" href="/">Bughunter Hall of Fame</a></h3>\n    <div ng-controller="TabCtrl as tabctrl">\n      <md-nav-bar md-selected-nav-item="tabctrl.curTab">\n        <md-nav-item ng-repeat="tab in tabctrl.getTabs()" name="{{tab.label}}" md-nav-href="{{tab.href}}">\n          {{tab.label}}\n        </md-nav-item>\n      </md-nav-bar>\n    </div>\n    <div flex></div>\n    <div ng-if="ps.loggedIn()" class="login">{{ps.currentUser.login}}</div>\n    <md-button ng-if="!ps.loggedIn()" class="md-raised md-primary log-button" ng-href="{{ps.currentUser.login_url}}" target="_self">Sign In</md-button>\n    <md-button ng-if="ps.loggedIn()" class="md-raised md-primary log-button" ng-href="{{ps.currentUser.logout_url}}" target="_self">Logout</md-button>\n  </div>\n</div>\n'), 
    a.put("/ng/link_email.html", '<md-content layout="column">\n  <div class="header header2" layout="row"></div>\n  <div>\n    <md-whiteframe layout="column" class="md-whiteframe-1dp content-box container">\n      <h2 class="md-display-1">Link email</h2>\n\n      <div ng-if="emailctrl.success">\n        <p>The addresss has been successfully linked to your profile.</p>\n      </div>\n      <div ng-if="emailctrl.error">\n        <p>The token is invalid or the email address is already linked.</p>\n      </div>\n    </md-whiteframe>\n  </div>\n</md-content>\n'), 
    a.put("/ng/pagination_bottom.html", '\n<div class="pagination" layout layout-align="end" ng-if="1 < pages.length || !autoHide">\n  <div layout>\n    <a ng-if="boundaryLinks" href="" ng-click="setCurrent(1)">\n      <div  ng-class="{ page: true, disabled: pagination.current == 1 }">&laquo;</div>\n    </a>\n    <a href="" ng-if="directionLinks" ng-click="setCurrent(pagination.current - 1)"\n       aria-label="Previous page">\n      <div ng-class="{ page: true, disabled: pagination.current == 1 }"\n           aria-hidden="true">&lsaquo;</div>\n    </a>\n\n    <a href="" ng-click="setCurrent(pageNumber)" ng-repeat="pageNumber in pages track by $index">\n      <div ng-class="{ page: true, active: pagination.current == pageNumber, \n                     disabled : pageNumber == \'...\' }">{{ pageNumber }}</div>\n    </a>\n\n    <a ng-if="directionLinks" href="" ng-click="setCurrent(pagination.current + 1)"\n       aria-label="Next page">\n      <div ng-class="{ page: true, disabled: pagination.current == pagination.last }"\n           aria-hidden="true">&rsaquo;</div>\n    </a>\n    <a ng-if="boundaryLinks" href="" ng-click="setCurrent(pagination.last)">\n      <div ng-class="{ page: true, disabled: pagination.current == pagination.last }">&raquo;</div>\n    </a>\n  </div>\n</div>\n'), 
    a.put("/ng/pagination_top.html", '<div layout ng-if="1 < pages.length || !autoHide">\n  <a ng-if="boundaryLinks" href="" ng-click="setCurrent(1)">\n    <div  ng-class="{ page: true, disabled: pagination.current == 1 }">&laquo;</div>\n  </a>\n  <a href="" ng-if="directionLinks" ng-click="setCurrent(pagination.current - 1)"\n     aria-label="Previous page">\n    <div ng-class="{ page: true, disabled: pagination.current == 1 }"\n         aria-hidden="true">&lsaquo;</div>\n  </a>\n\n  <a href="" ng-click="setCurrent(pageNumber)" ng-repeat="pageNumber in pages track by $index">\n    <div ng-class="{ page: true, active: pagination.current == pageNumber, \n                   disabled : pageNumber == \'...\' }">{{ pageNumber }}</div>\n  </a>\n\n  <a ng-if="directionLinks" href="" ng-click="setCurrent(pagination.current + 1)"\n     aria-label="Next page">\n    <div ng-class="{ page: true, disabled: pagination.current == pagination.last }"\n         aria-hidden="true">&rsaquo;</div>\n  </a>\n  <a ng-if="boundaryLinks" href="" ng-click="setCurrent(pagination.last)">\n    <div ng-class="{ page: true, disabled: pagination.current == pagination.last }">&raquo;</div>\n  </a>\n</div>\n'), 
    a.put("/ng/profile.html", '<md-content layout="column">\n  <div class="header header2" layout="row"></div>\n\n  <div class="container">\n    <form name="profileForm" novalidate>\n    <md-whiteframe id="profile_description"\n                   class="md-whiteframe-1dp content-box content-box-profile"\n                   layout="column">\n      <div layout layout-align="start center">\n        <div flex="60" layout="column">\n          <h3 class="md-display-1 grey" ng-show="profilectrl.profile.editable">Bughunter Profile</h3>\n          <div ng-if="!profilectrl.edit">\n          <h3 class="md-display-1 nomtop break-word">\n            {{profilectrl.profile.name}}<br>\n            <span class="md-subhead" ng-if="profilectrl.profile.website">\n              <a href="{{profilectrl.profile.website}}"\n                 class="plain-link">{{profilectrl.profile.website}}</a></span>\n          </h3>\n          </div>\n          <div ng-if="profilectrl.edit" layout="column">\n              <md-input-container>\n                <label>Name</label>\n                <input ng-model="profilectrl.profile.name" type="text" name="name" required>\n                <div ng-messages="profileForm.name.$error">\n                  <div ng-message="required">This is required.</div>\n                </div>\n                <div class="hint">The name on your Bughunter profile is different from your\n                  <a href="https://aboutme.google.com">Google Profile</a>.</div>\n              </md-input-container>\n\n              <md-input-container>\n                <label>Website</label>\n                <input ng-model="profilectrl.profile.website" type="url">\n              </md-input-container>\n\n              <md-input-container class="md-block">\n                <label>Description</label>\n                <textarea ng-model="profilectrl.profile.description" md-maxlength="500"></textarea>\n              </md-input-container>\n\n              <md-input-container>\n              <label>Emails</label>\n                <md-chips placeholder="Add email" ng-model="profilectrl.profile.emails"\n                          md-add-on-blur="true"\n                          md-transform-chip="profilectrl.validateEmail($chip)"></md-chips>\n              </md-input-container>\n\n              <md-checkbox ng-model="profilectrl.profile.is_public">\n                Make my profile public\n              </md-checkbox>\n              <md-checkbox ng-model="profilectrl.profile.show_stats">\n                Show stats\n              </md-checkbox>\n              <md-checkbox ng-model="profilectrl.profile.contact">\n                I would like to receive emails from Google regarding news, events and recruiting\n              </md-checkbox>\n          </div>\n\n          <p ng-if="!profilectrl.edit" class="break-word">{{profilectrl.profile.description}}</p>\n          <p class="md-caption grey"\n             ng-if="profilectrl.profile.editable && profilectrl.profile.is_public"\n             target="_self">Public profile: <a href="{{profilectrl.profile.link}}"\n                                               class="plain-link">{{profilectrl.profile.link}}</a></p>\n        </div>\n        <div flex="40" layout="column" layout-align="center center">\n          <div class="profile-avatar">\n              <div ng-show="profilectrl.edit">\n                <div class="profile-upload" layout="column" layout-align="center center"\n                     ng-model="profilectrl.avatar_file"\n                     ngf-select ngf-drop ngf-accept="\'image/*\'"\n                     ngf-background="profilectrl.avatar_file || profilectrl.profile.avatar"\n                     ngf-resize-if="$width != 240 || $height != 240"\n                     ngf-resize="{width: 240, height: 240, type: \'image/png\', \n                         centerCrop: true, restoreExif: false}" >\n                  <i ng-if="!profilectrl.avatar_file"\n                     class="material-icons-extended grey">file_upload</i>\n                  <div ng-if="!profilectrl.avatar_file">Upload photo</div>\n                </div>\n              </div>\n              <div ng-if="!profilectrl.edit">\n                <img class="profile-avatar-img" ng-src="{{profilectrl.profile.avatar}}">\n                <md-button class="md-raised md-primary edit-btn" ng-if="profilectrl.profile.editable"\n                           ng-click="profilectrl.toggleEdit()" aria-label="Edit profile">\n                  <i class="material-icons-extended" aria-hidden="true">mode_edit</i>\n                </md-button>\n              </div>\n          </div>\n        </div>\n      </div>\n      <div layout layout-align="space-between end" class="w100">\n        <md-button id="save-btn" class="md-raised md-primary" ng-if="profilectrl.edit"\n                   ng-click="profilectrl.updateProfile(profileForm)">Save</md-button>\n        <span>\n          <md-button class="md-raised md-warn" ng-if="profilectrl.edit"\n                   ng-click="profilectrl.delete()">Delete</md-button>\n          <md-button class="md-raised" ng-if="profilectrl.edit"\n                   ng-click="profilectrl.export()">Export</md-button>\n        </span>\n      </div>\n    </md-whiteframe>\n    </form>\n\n    \n\n    <div layout layout-align="space-between stretch" ng-if="profilectrl.profile.rank != 0">\n      <md-whiteframe flex="30" class="md-whiteframe-1dp content-box content-box-profile center-text"\n                     layout="column" layout-alignment="center center">\n        <h3>Rank</h3>\n        <h1 class="rank-position">\n          {{profilectrl.profile.rank != 0 ? profilectrl.profile.rank : \'-\'}}\n        </h1>\n      </md-whiteframe>\n      <md-whiteframe flex="30"\n                     class="md-whiteframe-1dp content-box content-box-profile center-text">\n        <h3>Accepted Reports</h3>\n        <div class="stats-container" ng-if="profilectrl.profile.stats.valid_reports!=null">\n          <div google-chart chart="profilectrl.reportChart()"></div>\n          <div class="stats-overlay">\n            <div class="valid-reports">\n              {{profilectrl.profile.stats.valid_reports||0 | number:0}}%\n            </div>\n          </div>\n        </div>\n        <div ng-if="profilectrl.profile.stats.valid_reports==null">\n          <emoji title="Stats have been hidden :("></emoji>\n        </div>\n      </md-whiteframe>\n      <md-whiteframe flex="30"\n                     class="md-whiteframe-1dp content-box content-box-profile center-text">\n        <h3>Severity</h3>\n        <div google-chart chart="profilectrl.severityChart()"\n             ng-if="profilectrl.profile.stats.severity!=null"></div>\n        <div ng-if="profilectrl.profile.stats.severity==null">\n          <emoji title="Stats have been hidden :("/>\n        </div>\n      </md-whiteframe>\n    </div>\n\n    \n\n  </div>\n\n</md-content>\n\n'), 
    a.put("/ng/report_list.html", '<div ng-repeat="r in reports">\n  <md-divider ng-if="!$first"></md-divider>\n  <div layout="row" layout-align="space-between" class="md-body-1" >\n    <div flex>\n      <p ng-if="r.type==\'c\'">{{ r.id }}</p>\n      <p ng-if="r.type==\'b\'">\n        <a href="{{\'https://issuetracker.google.com/issues/\'+r.id}}">{{ r.id }}</a></p>\n    </div>\n    <div flex="60"><p>{{ r.title }}</p></div>\n    <div flex>\n      <p ng-if="!r.reward">-</p>\n      <p ng-if="r.reward > 0">${{ r.reward }}</p>\n    </div>\n    <div flex="10"><p>{{ r.date }}</p></div>\n  </div>\n</div>\n'));
  }]);
  var Jd = function(a) {
    a.setBaseUrl("/api");
  };
  Jd.$inject = ["RestangularProvider"];
  var Kd = function(a) {
    a.definePalette("googleBlue", {50:"e8f0fe", 100:"c6dafc", 200:"a1c2fa", 300:"7baaf7", 400:"5e97f6", 500:"4285f4", 600:"3b78e7", 700:"3367d6", 800:"2a56c6", 900:"1c3aa9", A100:"82b1ff", A200:"448aff", A400:"2979ff", A700:"2962ff", contrastDefaultColor:"light", contrastDarkColors:"50 100 200 300 400 A100".split(" ")});
    a.theme("default").primaryPalette("googleBlue").accentPalette("googleBlue");
  };
  Kd.$inject = ["$mdThemingProvider"];
  var Ld = function(a) {
    a.setAccount("UA-41780504-2");
  };
  Ld.$inject = ["AnalyticsProvider"];
  var Md = function(a, b) {
    a.ps = b;
  };
  v("hof.application.AppCtrl", Md);
  Md.$inject = ["$scope", "profileService"];
  var Nd = function(a, b) {
    a.when("/", {templateUrl:"/ng/home.html", label:"About"}).when("/new_profile", {templateUrl:"/ng/create_profile.html", label:"Create Profile", controller:ud, controllerAs:"createprofilectrl", resolve:{loggedIn:["profileService", function(c) {
      return c.reload().then(function() {
        return c.loggedIn();
      });
    }]}}).when("/profile", {templateUrl:"/ng/profile.html", controller:vd, controllerAs:"profilectrl", label:"Profile", resolve:{profile:["profileService", function(c) {
      return c.profile();
    }]}}).when("/profile/:id", {templateUrl:"/ng/profile.html", controller:vd, controllerAs:"profilectrl", label:"", resolve:{profile:["$route", "profileService", function(c, d) {
      return d.Ha(c.current.params.id);
    }]}}).when("/link", {templateUrl:"/ng/link_email.html", controller:wd, controllerAs:"emailctrl", label:""}).when("/dashboard", {templateUrl:"/ng/dashboard.html", label:"Dashboard"}).when("/university/:collection?/:article?", {templateUrl:"/ng/bhu.html", label:"Bug Hunter University", controller:pd, controllerAs:"ctrl"}).when("/404", {template:"Page not found."});
    b.html5Mode(!0);
  };
  Nd.$inject = ["$routeProvider", "$locationProvider"];
  var Od = function(a) {
    if (!a) {
      throw Error("Could not find Analytics");
    }
  };
  Od.$inject = ["Analytics"];
  var Z = angular.module("hof.application", [xd.name, Cd.name, Id.name, Hd.name, Fd.name, qd.name, td.name, "ngMaterial", "ngMessages", "ngRoute", "ngSanitize", "angular-google-analytics"]);
  Z.controller("AppCtrl", Md);
  Z.config(Nd);
  Z.config(Jd);
  Z.config(Kd);
  Z.config(Ld);
  Z.run(["Analytics", Od]);
  
  