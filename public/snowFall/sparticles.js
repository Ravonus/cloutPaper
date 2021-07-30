/**!
 * Sparticles - Lightweight, High Performance Particles in Canvas
 * @version 1.2.0
 * @license MPL-2.0
 * @author simeydotme <simey.me@gmail.com>
 * @website http://sparticlesjs.dev
 * @repository https://github.com/simeydotme/sparticles.git
 */
var Sparticles = (function () {
  'use strict';
  function t(t, e, i) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = i),
      t
    );
  }
  function e(t, e) {
    var i = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(t);
      e &&
        (s = s.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        i.push.apply(i, s);
    }
    return i;
  }
  function i(i) {
    for (var s = 1; s < arguments.length; s++) {
      var n = null != arguments[s] ? arguments[s] : {};
      s % 2
        ? e(Object(n), !0).forEach(function (e) {
            t(i, e, n[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(n))
        : e(Object(n)).forEach(function (t) {
            Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return i;
  }
  var s = function () {
      var t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : function () {},
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 60;
      (this.fps = e), (this.handler = t);
      var i = 0;
      (this.start = function () {
        var t = this;
        if (!this.started) {
          var e = performance.now(),
            s = 1e3 / this.fps;
          (i = requestAnimationFrame(function n(r) {
            var a = r - e;
            (i = requestAnimationFrame(n)),
              a >= s - 0 && (t.handler(a), (e = r - (a % s)));
          })),
            (this.started = !0);
        }
      }),
        (this.stop = function () {
          cancelAnimationFrame(i), (this.started = !1);
        });
    },
    n = function (t) {
      return [Math.cos(a(t - 90)), Math.sin(a(t - 90))];
    },
    r = function (t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
      return Math.max(e, Math.min(i, t));
    },
    a = function (t) {
      return (t * Math.PI) / 180;
    },
    h = function () {
      var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
        i =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : Math.random();
      return (
        e <= t
          ? (i = t)
          : (0 !== t || 1 !== e) && e > t && (i = i * (e - t) + t),
        i
      );
    },
    o = function (t) {
      return t[Math.floor(h(0, t.length))];
    },
    l = function () {
      var t = p(h(0, 360)),
        e = p(h(90, 100)),
        i = p(h(45, 85));
      return 'hsl('.concat(t, ',').concat(e, '%,').concat(i, '%)');
    },
    c = function (t) {
      return t > h();
    },
    p = function (t) {
      return (0.5 + t) | 0;
    },
    g = function (t) {
      return (
        t
          ? ((this.canvas = t.canvas),
            (this.settings = t.settings),
            (this.colors = t.colors),
            (this.shapes = t.shapes),
            (this.images = t.images),
            (this.styles = t.styles),
            (this.ctx = t.canvas.getContext('2d')),
            this.setup(),
            this.init())
          : console.warn('Invalid parameters given to Sparticle()', arguments),
        this
      );
    };
  (g.prototype.setup = function () {
    var t = this.settings;
    (this.frame = 0),
      (this.frameoffset = p(h(0, 360))),
      (this.size = p(h(t.minSize, t.maxSize))),
      (this.da = this.getAlphaDelta()),
      (this.dx = this.getDeltaX()),
      (this.dy = this.getDeltaY()),
      (this.dd = this.getDriftDelta()),
      (this.dr = this.getRotationDelta()),
      (this.color = this.getColor()),
      (this.shape = this.getShape()),
      (this.image = this.getImage()),
      (this.style = this.getStyle()),
      (this.rotation = t.rotate ? a(h(0, 360)) : 0),
      (this.vertical =
        (t.direction > 150 && t.direction < 210) ||
        (t.direction > 330 && t.direction < 390) ||
        (t.direction > -30 && t.direction < 30)),
      (this.horizontal =
        (t.direction > 60 && t.direction < 120) ||
        (t.direction > 240 && t.direction < 300));
  }),
    (g.prototype.init = function () {
      var t = this.settings,
        e = this.canvas;
      (this.alpha = 0),
        (t.speed > 0 || 0 === t.alphaSpeed) &&
          (this.alpha = h(t.minAlpha, t.maxAlpha)),
        t.bounce
          ? ((this.px = p(h(2, e.width - this.size - 2))),
            (this.py = p(h(2, e.height - this.size - 2))))
          : ((this.px = p(h(2 * -this.size, e.width + this.size))),
            (this.py = p(h(2 * -this.size, e.height + this.size))));
    }),
    (g.prototype.reset = function () {
      this.setup(),
        this.py < 0
          ? (this.py = this.canvas.height + 2 * this.size)
          : this.py > this.canvas.height && (this.py = 0 - 2 * this.size),
        this.px < 0
          ? (this.px = this.canvas.width + 2 * this.size)
          : this.px > this.canvas.width && (this.px = 0 - 2 * this.size);
    }),
    (g.prototype.bounce = function () {
      this.settings.direction;
      (this.py <= 0 || this.py + this.size >= this.canvas.height) &&
        ((this.dy = -this.dy), this.horizontal && (this.dd = -this.dd)),
        (this.px <= 0 || this.px + this.size >= this.canvas.width) &&
          ((this.dx = -this.dx), this.vertical && (this.dd = -this.dd));
    }),
    (g.prototype.isOffCanvas = function () {
      var t = 0 - 2 * this.size,
        e = this.canvas.height + 2 * this.size,
        i = this.canvas.width + 2 * this.size;
      return this.px < t || this.px > i || this.py < t || this.py > e;
    }),
    (g.prototype.isTouchingEdge = function () {
      var t = this.canvas.height - this.size,
        e = this.canvas.width - this.size;
      return this.px < 0 || this.px > e || this.py < 0 || this.py > t;
    }),
    (g.prototype.getColor = function () {
      return 'random' === this.settings.color
        ? o(this.colors)
        : Array.isArray(this.settings.color)
        ? o(this.settings.color)
        : this.settings.color;
    }),
    (g.prototype.getShape = function () {
      return 'random' === this.settings.shape
        ? o(this.shapes)
        : Array.isArray(this.settings.shape)
        ? o(this.settings.shape)
        : this.settings.shape;
    }),
    (g.prototype.getImage = function () {
      return Array.isArray(this.settings.imageUrl)
        ? o(this.settings.imageUrl)
        : this.settings.imageUrl;
    }),
    (g.prototype.getStyle = function () {
      return o(this.styles);
    }),
    (g.prototype.getDelta = function () {
      var t = 0.1 * this.settings.speed;
      return this.settings.speed && this.settings.parallax
        ? t + (this.size * this.settings.parallax) / 50
        : t;
    }),
    (g.prototype.getDeltaVariance = function () {
      var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        e = this.settings.speed || 10;
      return t > 0 ? (h(-t, t) * e) / 100 : 0;
    }),
    (g.prototype.getDeltaX = function () {
      var t = this.getDelta(),
        e = this.getDeltaVariance(this.settings.xVariance);
      return n(this.settings.direction)[0] * t + e;
    }),
    (g.prototype.getDeltaY = function () {
      var t = this.getDelta(),
        e = this.getDeltaVariance(this.settings.yVariance);
      return n(this.settings.direction)[1] * t + e;
    }),
    (g.prototype.getAlphaDelta = function () {
      var t = this.settings.alphaVariance,
        e = h(1, t + 1);
      return c(0.5) && (e = -e), e;
    }),
    (g.prototype.getDriftDelta = function () {
      return this.settings.drift
        ? h(
            this.settings.drift - this.settings.drift / 2,
            this.settings.drift + this.settings.drift / 2
          )
        : 0;
    }),
    (g.prototype.getRotationDelta = function () {
      var t = 0;
      return (
        this.settings.rotate &&
          this.settings.rotation &&
          ((t = a(h(0.5, 1.5) * this.settings.rotation)), c(0.5) && (t = -t)),
        t
      );
    }),
    (g.prototype.update = function () {
      return (this.frame += 1), this.updatePosition(), this.updateAlpha(), this;
    }),
    (g.prototype.updateAlpha = function () {
      return (
        this.settings.alphaSpeed > 0 &&
          (this.settings.twinkle
            ? (this.alpha = this.updateTwinkle())
            : (this.alpha = this.updateFade())),
        this.alpha
      );
    }),
    (g.prototype.updateFade = function () {
      var t = (this.da / 1e3) * this.settings.alphaSpeed * 0.5,
        e = this.alpha + t,
        i = this.da > 0 && e > this.settings.maxAlpha,
        s = this.da < 0 && e < this.settings.minAlpha;
      return (
        (i || s) &&
          ((this.da = -this.da),
          (e = this.settings.maxAlpha),
          s && (e = this.settings.minAlpha)),
        e
      );
    }),
    (g.prototype.updateTwinkle = function () {
      var t = this.alpha,
        e = Math.abs(this.da),
        i = t > this.settings.maxAlpha,
        s = t < this.settings.minAlpha,
        n = (e / 1e3) * this.settings.alphaSpeed * 0.5,
        r = c(1 / 30),
        a = c(1 / 30);
      return (
        this.resettingTwinkle
          ? (t += 5 * n)
          : r
          ? (t += 50 * n)
          : (t -= a ? 25 * n : n),
        s
          ? ((this.resettingTwinkle = !0), (t = this.settings.minAlpha))
          : i && ((this.resettingTwinkle = !1), (t = this.settings.maxAlpha)),
        t
      );
    }),
    (g.prototype.updatePosition = function () {
      if (this.settings.bounce && this.isTouchingEdge()) this.bounce();
      else if (this.isOffCanvas()) return void this.reset();
      (this.px += this.dx),
        (this.py += this.dy),
        this.updateDrift(),
        this.updateRotation();
    }),
    (g.prototype.updateRotation = function () {
      this.settings.rotate &&
        this.settings.rotation &&
        (this.rotation += this.dr);
    }),
    (g.prototype.updateDrift = function () {
      var t = this.settings;
      t.direction;
      t.drift &&
        t.speed &&
        (this.vertical
          ? (this.px +=
              (n(this.frame + this.frameoffset)[0] * this.dd) /
              (15 * this.getDelta()))
          : this.horizontal &&
            (this.py +=
              (n(this.frame + this.frameoffset)[1] * this.dd) /
              (15 * this.getDelta())));
    }),
    (g.prototype.render = function (t) {
      var e,
        i = (e =
          'image' !== this.shape
            ? t[this.color][this.shape][this.style]
            : t[this.color][this.shape][this.image]).width,
        s = this.size / i,
        n = this.px / s,
        a = this.py / s;
      return (
        (this.ctx.globalAlpha = r(this.alpha, 0, 1)),
        this.renderRotate(),
        this.ctx.transform(s, 0, 0, s, 0, 0),
        this.ctx.drawImage(e, 0, 0, i, i, n, a, i, i),
        this.ctx.setTransform(1, 0, 0, 1, 0, 0),
        this
      );
    }),
    (g.prototype.renderRotate = function () {
      if ('circle' !== this.shape && this.settings.rotate) {
        var t = this.px + this.size / 2,
          e = this.py + this.size / 2;
        this.ctx.translate(t, e),
          this.ctx.rotate(this.rotation),
          this.ctx.translate(-t, -e);
      }
    });
  var u = function (t, e, n, r) {
    arguments.length >= 1 &&
      !(arguments[0] instanceof HTMLElement) &&
      ((e = arguments[0]),
      (n = arguments[1]),
      (r = arguments[2]),
      (t = void 0)),
      n && !r && (r = n);
    var a = {
      alphaSpeed: 10,
      alphaVariance: 1,
      bounce: !1,
      color: 'random',
      randomColor: l,
      randomColorCount: 3,
      composition: 'source-over',
      count: 50,
      direction: 180,
      drift: 1,
      glow: 0,
      imageUrl: '',
      maxAlpha: 1,
      maxSize: 10,
      minAlpha: 0,
      minSize: 1,
      parallax: 1,
      rotate: !0,
      rotation: 1,
      shape: 'circle',
      speed: 10,
      style: 'fill',
      twinkle: !1,
      xVariance: 2,
      yVariance: 2,
    };
    return (
      (this.el = t || document.body),
      (this.settings = i(i({}, a), e)),
      (this.resizable = !n && !r),
      (this.width = this.resizable ? this.el.clientWidth : n),
      (this.height = this.resizable ? this.el.clientHeight : r),
      (this.init = function () {
        var t = this;
        return (
          (this.sparticles = []),
          (this.colors = this.getColorArray()),
          (this.shapes = this.getShapeArray()),
          (this.styles = this.getStyleArray()),
          (this.imageUrls = this.getImageArray()),
          this.setupMainCanvas(),
          this.setupOffscreenCanvasses(function () {
            t.createSparticles(), t.start();
          }),
          window.addEventListener('resize', this),
          this
        );
      }),
      (this.handleEvent = function (t) {
        var e = this;
        'resize' === t.type &&
          (clearTimeout(this.resizeTimer),
          (this.resizeTimer = setTimeout(function () {
            e.resizable &&
              ((e.width = e.el.clientWidth),
              (e.height = e.el.clientHeight),
              e.setCanvasSize().resetSparticles());
          }, 200)));
      }),
      (this.start = function () {
        var t = this;
        return (
          this.loop ||
            (this.loop = new s(function (e) {
              t.drawFrame(e);
            })),
          this.loop.start(),
          this
        );
      }),
      (this.stop = function () {
        return this.loop.stop(), this;
      }),
      (this.destroy = function () {
        for (var t in (this.stop(),
        this.el.removeChild(this.canvas),
        window.removeEventListener('resize', this),
        this))
          this.hasOwnProperty(t) && delete this[t];
        return this;
      }),
      (this.setCanvasSize = function (t, e) {
        return (
          t && (this.resizable = !1),
          (this.width = t || this.width),
          (this.height = e || this.height),
          (this.canvas.width = this.width),
          (this.canvas.height = this.height),
          this
        );
      }),
      (this.resetSparticles = this.createSparticles =
        function () {
          (this.sparticles = []),
            (this.ctx.globalCompositeOperation = this.settings.composition);
          for (var t = 0; t < this.settings.count; t++)
            this.sparticles.push(new g(this));
          return (
            this.sparticles.sort(function (t, e) {
              return t.size > e.size;
            }),
            this.sparticles
          );
        }),
      this.init()
    );
  };
  return (
    (u.prototype.getColorArray = function () {
      var t = Array.isArray(this.settings.color)
        ? this.settings.color
        : [this.settings.color];
      if (
        t.some(function (t) {
          return 'random' === t;
        })
      )
        for (var e = 0; e < this.settings.randomColorCount; e++)
          t[e] = this.settings.randomColor(e, this.settings.randomColorCount);
      return t;
    }),
    (u.prototype.getShapeArray = function () {
      var t = Array.isArray(this.settings.shape)
        ? this.settings.shape
        : [this.settings.shape];
      return (
        t.some(function (t) {
          return 'random' === t;
        }) && (t = ['square', 'circle', 'triangle']),
        t
      );
    }),
    (u.prototype.getImageArray = function () {
      return Array.isArray(this.settings.imageUrl)
        ? this.settings.imageUrl
        : [this.settings.imageUrl];
    }),
    (u.prototype.getStyleArray = function () {
      var t = this.settings.style;
      return (t = 'fill' !== t && 'stroke' !== t ? ['fill', 'stroke'] : [t]);
    }),
    (u.prototype.setupMainCanvas = function () {
      return (
        (this.canvas = document.createElement('canvas')),
        this.canvas.setAttribute('class', 'sparticles'),
        (this.ctx = this.canvas.getContext('2d')),
        this.setCanvasSize(),
        this.el.appendChild(this.canvas),
        this.canvas
      );
    }),
    (u.prototype.setupOffscreenCanvasses = function (t) {
      var e = this,
        i = this.colors.filter(function (t, i) {
          return e.colors.indexOf(t) === i;
        }),
        s = this.shapes.filter(function (t, i) {
          return e.shapes.indexOf(t) === i;
        }),
        n = this.styles.filter(function (t, i) {
          return e.styles.indexOf(t) === i;
        }),
        r = this.imageUrls.filter(function (t, i) {
          return e.imageUrls.indexOf(t) === i;
        }),
        a = i.length * r.length,
        h = i.length * s.length * n.length,
        o = 0,
        l = 0;
      (this.canvasses = this.canvasses || {}),
        i.forEach(function (i) {
          (e.canvasses[i] = e.canvasses[i] || {}),
            s.forEach(function (s) {
              (e.canvasses[i][s] = e.canvasses[i][s] || {}),
                'image' === s
                  ? r.forEach(function (n, r) {
                      var h = new Image(),
                        l = document.createElement('canvas');
                      (e.canvasses[i][s][n] = l),
                        (h.onload = function () {
                          o++,
                            e.drawOffscreenCanvasForImage(h, i, l),
                            t && o === a && t();
                        }),
                        (h.onerror = function () {
                          console.error('failed to load source image: ', n);
                        }),
                        (h.src = n);
                    })
                  : n.forEach(function (n) {
                      var r = document.createElement('canvas');
                      (e.canvasses[i][s][n] = r),
                        l++,
                        e.drawOffscreenCanvas(s, n, i, r),
                        t && l === h && t();
                    });
            });
        });
    }),
    (u.prototype.getGlowSize = function (t) {
      return this.settings.glow;
    }),
    (u.prototype.getLineSize = function (t) {
      return r(t / 20, 1, 5);
    }),
    (u.prototype.renderStyle = function (t, e, i, s) {
      'fill' === s
        ? (t.fillStyle = e)
        : ((t.lineWidth = i), (t.strokeStyle = e));
    }),
    (u.prototype.renderGlow = function (t, e, i) {
      var s = this.getGlowSize(i) / 2;
      (t.shadowColor = e), (t.shadowBlur = s);
    }),
    (u.prototype.renderColor = function (t, e) {
      'fill' === e ? t.fill() : t.stroke();
    }),
    (u.prototype.drawOffscreenCanvas = function (t, e, i, s) {
      return this.offScreenCanvas[t].call(this, e, i, s);
    }),
    (u.prototype.offScreenCanvas = {}),
    (u.prototype.offScreenCanvas.circle = function (t, e, i) {
      var s = i.getContext('2d'),
        n = this.settings.maxSize,
        r = this.getLineSize(n),
        a = n + r + this.getGlowSize(n);
      return (
        (i.width = a),
        (i.height = a),
        this.renderGlow(s, e, n),
        this.renderStyle(s, e, r, t),
        s.beginPath(),
        s.ellipse(a / 2, a / 2, n / 2, n / 2, 0, 0, 360),
        this.renderColor(s, t),
        i
      );
    }),
    (u.prototype.offScreenCanvas.square = function (t, e, i) {
      var s = i.getContext('2d'),
        n = this.settings.maxSize,
        r = this.getLineSize(n),
        a = n + r + this.getGlowSize(n);
      return (
        (i.width = a),
        (i.height = a),
        this.renderGlow(s, e, n),
        this.renderStyle(s, e, r, t),
        s.beginPath(),
        s.rect(a / 2 - n / 2, a / 2 - n / 2, n, n),
        this.renderColor(s, t),
        i
      );
    }),
    (u.prototype.offScreenCanvas.line = function (t, e, i) {
      var s = i.getContext('2d'),
        n = 2 * this.settings.maxSize,
        r = this.getLineSize(n),
        a = n + r + this.getGlowSize(n),
        h = a / 2 - n / 2,
        o = a / 2 - n / 2;
      return (
        (i.width = a),
        (i.height = a),
        this.renderGlow(s, e, n),
        (s.lineWidth = r),
        (s.strokeStyle = e),
        s.beginPath(),
        s.moveTo(h, o),
        s.lineTo(h + n, o + n),
        s.stroke(),
        s.closePath(),
        i
      );
    }),
    (u.prototype.offScreenCanvas.triangle = function (t, e, i) {
      var s = i.getContext('2d'),
        n = this.settings.maxSize,
        r = this.getLineSize(n),
        a = n + r + this.getGlowSize(n),
        h = n * (Math.sqrt(3) / 2),
        o = a / 2,
        l = a / 2 - n / 2;
      return (
        (i.width = a),
        (i.height = a),
        this.renderGlow(s, e, n),
        this.renderStyle(s, e, r, t),
        s.beginPath(),
        s.moveTo(o, l),
        s.lineTo(o - n / 2, l + h),
        s.lineTo(o + n / 2, l + h),
        s.closePath(),
        this.renderColor(s, t),
        i
      );
    }),
    (u.prototype.offScreenCanvas.diamond = function (t, e, i) {
      var s = i.getContext('2d'),
        n = this.settings.maxSize,
        r = n / 2,
        a = this.getLineSize(n),
        h = n + a + this.getGlowSize(n),
        o = h / 2,
        l = 0.08 * n,
        c = 0.02 * n,
        p = o - r,
        g = o;
      return (
        (i.width = h),
        (i.height = h),
        this.renderGlow(s, e, n),
        this.renderStyle(s, e, a, t),
        s.beginPath(),
        s.moveTo(p + c, g),
        s.bezierCurveTo(o - l / 2, o - 2 * l, o - 2 * l, o - l / 2, o, o - r),
        s.bezierCurveTo(
          o + 2 * l,
          o - l / 2,
          o + l / 2,
          o - 2 * l,
          o + r - c,
          o
        ),
        s.bezierCurveTo(o + l / 2, o + 2 * l, o + 2 * l, o + l / 2, o, o + r),
        s.bezierCurveTo(o - 2 * l, o + l / 2, o - l / 2, o + 2 * l, p + c, g),
        s.closePath(),
        this.renderColor(s, t),
        i
      );
    }),
    (u.prototype.offScreenCanvas.star = function (t, e, i) {
      var s = i.getContext('2d'),
        n = this.getLineSize(52),
        r = this.getGlowSize(52),
        a = 52 + 2 * n + r;
      return (
        (i.width = a),
        (i.height = a),
        this.renderGlow(s, e, 52),
        this.renderStyle(s, e, n, t),
        s.translate(n / 2 + r / 2, n / 2 + r / 2 - 1),
        s.beginPath(),
        s.moveTo(27.76, 2.07),
        s.lineTo(34.28, 15.46),
        s.translate(36.01480792437574, 14.614221385040288),
        s.arc(0, 0, 1.93, 2.687967128721911, 1.7293919056045395, 1),
        s.translate(-36.01480792437574, -14.614221385040288),
        s.lineTo(50.37, 18.7),
        s.translate(50.10443046629834, 20.601544851632347),
        s.arc(0, 0, 1.92, -1.4320339785975214, 0.8159284165499665, 0),
        s.translate(-50.10443046629834, -20.601544851632347),
        s.lineTo(40.78, 32.36),
        s.translate(42.13415324373887, 33.735197801216785),
        s.arc(0, 0, 1.93, -2.3484841809999386, -3.3054346524687857, 1),
        s.translate(-42.13415324373887, -33.735197801216785),
        s.lineTo(42.7, 48.76),
        s.translate(40.81489078457234, 49.06734873663269),
        s.arc(0, 0, 1.91, -0.16161824093711977, 2.052504457600845, 0),
        s.translate(-40.81489078457234, -49.06734873663269),
        s.lineTo(26.83, 43.76),
        s.translate(25.939999999999998, 45.438660180024534),
        s.arc(0, 0, 1.9, -1.083293536758034, -2.0582991168317593, 1),
        s.translate(-25.939999999999998, -45.438660180024534),
        s.lineTo(11.92, 50.7),
        s.translate(11.046023488962076, 49.00168758523234),
        s.arc(0, 0, 1.91, 1.0955254432622383, 3.3002085355055915, 0),
        s.translate(-11.046023488962076, -49.00168758523234),
        s.lineTo(11.7, 34),
        s.translate(9.820265754085725, 33.66132734870218),
        s.arc(0, 0, 1.91, 0.178258078542773, -0.7933922953534395, 1),
        s.translate(-9.820265754085725, -33.66132734870218),
        s.lineTo(0.57, 21.85),
        s.translate(1.9278161466350117, 20.478418681981545),
        s.arc(0, 0, 1.93, 2.351151232528948, 4.5627030955491055, 0),
        s.translate(-1.9278161466350117, -20.478418681981545),
        s.lineTo(16.31, 16.47),
        s.translate(16.062056630005188, 14.576161547207466),
        s.arc(0, 0, 1.91, 1.4406156600933306, 0.4870016654036473, 1),
        s.translate(-16.062056630005188, -14.576161547207466),
        s.lineTo(24.33, 2.07),
        s.translate(26.045, 2.9107585860400085),
        s.arc(0, 0, 1.91, -2.6857849028374465, -0.45580775075234703, 0),
        s.translate(-26.045, -2.9107585860400085),
        s.closePath(),
        this.renderColor(s, t),
        i
      );
    }),
    (u.prototype.drawOffscreenCanvasForImage = function (t, e, i) {
      var s = t.width,
        n = i.getContext('2d');
      return (
        (i.width = s),
        (i.height = s),
        n.drawImage(t, 0, 0, s, s, 0, 0, s, s),
        (n.globalCompositeOperation = 'source-atop'),
        (n.fillStyle = e),
        n.fillRect(0, 0, s, s),
        i
      );
    }),
    (u.prototype.drawFrame = function () {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (var t = 0; t < this.sparticles.length; t++) {
        this.sparticles[t].update().render(this.canvasses);
      }
      return this.sparticles;
    }),
    u
  );
})();
