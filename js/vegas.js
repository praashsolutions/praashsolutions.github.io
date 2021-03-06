$(window).load(function() {
	setTimeout(function() {
		$("#vegas-background").vegas({
			slides: [
				{
					src: "../img/slides/slide-1.jpg",
				},
				{
					src: "../img/slides/slide-2.jpg",
				},
				{
					src: "../img/slides/slide-3.jpg",
				},
			],
			delay: 5e3,
			transition: "fade",
		});
	}, 1);
}),
	(function($) {
		"use strict";
		var t = {
				slide: 0,
				delay: 5e3,
				preload: !1,
				preloadImage: !1,
				preloadVideo: !1,
				timer: !1,
				overlay: !1,
				autoplay: !0,
				shuffle: !1,
				cover: !0,
				color: null,
				align: "center",
				valign: "center",
				transition: "fade",
				transitionDuration: 1e3,
				transitionRegister: [],
				animation: null,
				animationDuration: "auto",
				animationRegister: [],
				init: function() {},
				play: function() {},
				pause: function() {},
				walk: function() {},
				slides: [],
			},
			s = {},
			i = function(s, i) {
				(this.elmt = s),
					(this.settings = $.extend({}, t, $.vegas.defaults, i)),
					(this.slide = this.settings.slide),
					(this.total = this.settings.slides.length),
					(this.noshow = this.total < 2),
					(this.paused = !this.settings.autoplay || this.noshow),
					(this.$elmt = $(s)),
					(this.$timer = null),
					(this.$overlay = null),
					(this.$slide = null),
					(this.timeout = null),
					(this.transitions = [
						"fade",
						"fade2",
						"blur",
						"blur2",
						"flash",
						"flash2",
						"negative",
						"negative2",
						"burn",
						"burn2",
						"slideLeft",
						"slideLeft2",
						"slideRight",
						"slideRight2",
						"slideUp",
						"slideUp2",
						"slideDown",
						"slideDown2",
						"zoomIn",
						"zoomIn2",
						"zoomOut",
						"zoomOut2",
						"swirlLeft",
						"swirlLeft2",
						"swirlRight",
						"swirlRight2",
					]),
					(this.animations = [
						"kenburns",
						"kenburnsLeft",
						"kenburnsRight",
						"kenburnsUp",
						"kenburnsUpLeft",
						"kenburnsUpRight",
						"kenburnsDown",
						"kenburnsDownLeft",
						"kenburnsDownRight",
					]),
					this.settings.transitionRegister instanceof Array == !1 &&
						(this.settings.transitionRegister = [
							this.settings.transitionRegister,
						]),
					this.settings.animationRegister instanceof Array == !1 &&
						(this.settings.animationRegister = [
							this.settings.animationRegister,
						]),
					(this.transitions = this.transitions.concat(
						this.settings.transitionRegister
					)),
					(this.animations = this.animations.concat(
						this.settings.animationRegister
					)),
					(this.support = {
						objectFit: "objectFit" in document.body.style,
						transition:
							"transition" in document.body.style ||
							"WebkitTransition" in document.body.style,
						video: $.vegas.isVideoCompatible(),
					}),
					this.settings.shuffle === !0 && this.shuffle(),
					this._init();
			};
		(i.prototype = {
			_init: function() {
				var t,
					s,
					i,
					e = "BODY" === this.elmt.tagName,
					n = this.settings.timer,
					o = this.settings.overlay,
					a = this;
				this._preload(),
					e ||
						(this.$elmt.css("height", this.$elmt.css("height")),
						(t = $('<div class="vegas-wrapper">')
							.css("overflow", this.$elmt.css("overflow"))
							.css("padding", this.$elmt.css("padding"))),
						this.$elmt.css("padding") ||
							t
								.css(
									"padding-top",
									this.$elmt.css("padding-top")
								)
								.css(
									"padding-bottom",
									this.$elmt.css("padding-bottom")
								)
								.css(
									"padding-left",
									this.$elmt.css("padding-left")
								)
								.css(
									"padding-right",
									this.$elmt.css("padding-right")
								),
						this.$elmt
							.clone(!0)
							.children()
							.appendTo(t),
						(this.elmt.innerHTML = "")),
					n &&
						this.support.transition &&
						((i = $(
							'<div class="vegas-timer"><div class="vegas-timer-progress">'
						)),
						(this.$timer = i),
						this.$elmt.prepend(i)),
					o &&
						((s = $('<div class="vegas-overlay">')),
						"string" == typeof o &&
							s.css("background-image", "url(" + o + ")"),
						(this.$overlay = s),
						this.$elmt.prepend(s)),
					this.$elmt.addClass("vegas-container"),
					e || this.$elmt.append(t),
					setTimeout(function() {
						a.trigger("init"),
							a._goto(a.slide),
							a.settings.autoplay && a.trigger("play");
					}, 1);
			},
			_preload: function() {
				var t, s, i;
				for (i = 0; i < this.settings.slides.length; i++)
					(this.settings.preload || this.settings.preloadImages) &&
						this.settings.slides[i].src &&
						((s = new Image()),
						(s.src = this.settings.slides[i].src)),
						(this.settings.preload ||
							this.settings.preloadVideos) &&
							this.support.video &&
							this.settings.slides[i].video &&
							(t =
								this.settings.slides[i].video instanceof Array
									? this._video(this.settings.slides[i].video)
									: this._video(
											this.settings.slides[i].video.src
									  ));
			},
			_random: function(t) {
				return t[Math.floor(Math.random() * (t.length - 1))];
			},
			_slideShow: function() {
				var t = this;
				this.total > 1 &&
					!this.paused &&
					!this.noshow &&
					(this.timeout = setTimeout(function() {
						t.next();
					}, this._options("delay")));
			},
			_timer: function(t) {
				var s = this;
				clearTimeout(this.timeout),
					this.$timer &&
						(this.$timer
							.removeClass("vegas-timer-running")
							.find("div")
							.css("transition-duration", "0ms"),
						this.paused ||
							this.noshow ||
							(t &&
								setTimeout(function() {
									s.$timer
										.addClass("vegas-timer-running")
										.find("div")
										.css(
											"transition-duration",
											s._options("delay") - 100 + "ms"
										);
								}, 100)));
			},
			_video: function(t) {
				var i,
					e,
					n = t.toString();
				return s[n]
					? s[n]
					: (t instanceof Array == !1 && (t = [t]),
					  (i = document.createElement("video")),
					  (i.preload = !0),
					  t.forEach(function(t) {
							(e = document.createElement("source")),
								(e.src = t),
								i.appendChild(e);
					  }),
					  (s[n] = i),
					  i);
			},
			_fadeOutSound: function(t, s) {
				var i = this,
					e = s / 10,
					n = t.volume - 0.09;
				n > 0
					? ((t.volume = n),
					  setTimeout(function() {
							i._fadeOutSound(t, s);
					  }, e))
					: t.pause();
			},
			_fadeInSound: function(t, s) {
				var i = this,
					e = s / 10,
					n = t.volume + 0.09;
				1 > n &&
					((t.volume = n),
					setTimeout(function() {
						i._fadeInSound(t, s);
					}, e));
			},
			_options: function(t, s) {
				return (
					void 0 === s && (s = this.slide),
					void 0 !== this.settings.slides[s][t]
						? this.settings.slides[s][t]
						: this.settings[t]
				);
			},
			_goto: function(t) {
				function s() {
					c._timer(!0),
						setTimeout(function() {
							v &&
								(c.support.transition
									? (o
											.css(
												"transition",
												"all " + y + "ms"
											)
											.addClass(
												"vegas-transition-" + v + "-out"
											),
									  o.each(function() {
											var t = o.find("video").get(0);
											t &&
												((t.volume = 1),
												c._fadeOutSound(t, y));
									  }),
									  i
											.css(
												"transition",
												"all " + y + "ms"
											)
											.addClass(
												"vegas-transition-" + v + "-in"
											))
									: i.fadeIn(y));
							for (var t = 0; t < o.length - 4; t++)
								o.eq(t).remove();
							c.trigger("walk"), c._slideShow();
						}, 100);
				}
				"undefined" == typeof this.settings.slides[t] && (t = 0),
					(this.slide = t);
				var i,
					e,
					n,
					o = this.$elmt.children(".vegas-slide"),
					a = this.settings.slides[t].src,
					r = this.settings.slides[t].video,
					d = this._options("delay"),
					h = this._options("align"),
					l = this._options("valign"),
					g =
						this._options("color") ||
						this.$elmt.css("background-color"),
					u = this._options("cover") ? "cover" : "contain",
					c = this,
					p = o.length,
					m,
					f,
					v = this._options("transition"),
					y = this._options("transitionDuration"),
					_ = this._options("animation"),
					w = this._options("animationDuration");
				("random" === v || v instanceof Array) &&
					(v =
						v instanceof Array
							? this._random(v)
							: this._random(this.transitions)),
					("random" === _ || _ instanceof Array) &&
						(_ =
							_ instanceof Array
								? this._random(_)
								: this._random(this.animations)),
					("auto" === y || y > d) && (y = d),
					"auto" === w && (w = d),
					(i = $('<div class="vegas-slide"></div>')),
					this.support.transition &&
						v &&
						i.addClass("vegas-transition-" + v),
					this.support.video && r
						? ((m =
								r instanceof Array
									? this._video(r)
									: this._video(r.src)),
						  (m.loop = void 0 !== r.loop ? r.loop : !0),
						  (m.muted = void 0 !== r.mute ? r.mute : !0),
						  m.muted === !1
								? ((m.volume = 0), this._fadeInSound(m, y))
								: m.pause(),
						  (n = $(m)
								.addClass("vegas-video")
								.css("background-color", g)),
						  this.support.objectFit
								? n
										.css("object-position", h + " " + l)
										.css("object-fit", u)
										.css("width", "100%")
										.css("height", "100%")
								: "contain" === u &&
								  n.css("width", "100%").css("height", "100%"),
						  i.append(n))
						: ((f = new Image()),
						  (e = $('<div class="vegas-slide-inner"></div>')
								.css("background-image", "url(" + a + ")")
								.css("background-color", g)
								.css("background-position", h + " " + l)
								.css("background-size", u)),
						  this.support.transition &&
								_ &&
								e
									.addClass("vegas-animation-" + _)
									.css("animation-duration", w + "ms"),
						  i.append(e)),
					this.support.transition || i.css("display", "none"),
					p ? o.eq(p - 1).after(i) : this.$elmt.prepend(i),
					c._timer(!1),
					m
						? (4 === m.readyState && (m.currentTime = 0),
						  m.play(),
						  s())
						: ((f.src = a), (f.onload = s));
			},
			shuffle: function() {
				for (var t, s, i = this.total - 1; i > 0; i--)
					(s = Math.floor(Math.random() * (i + 1))),
						(t = this.settings.slides[i]),
						(this.settings.slides[i] = this.settings.slides[s]),
						(this.settings.slides[s] = t);
			},
			play: function() {
				this.paused &&
					((this.paused = !1), this.next(), this.trigger("play"));
			},
			pause: function() {
				this._timer(!1), (this.paused = !0), this.trigger("pause");
			},
			toggle: function() {
				this.paused ? this.play() : this.pause();
			},
			playing: function() {
				return !this.paused && !this.noshow;
			},
			current: function(t) {
				return t
					? {
							slide: this.slide,
							data: this.settings.slides[this.slide],
					  }
					: this.slide;
			},
			jump: function(t) {
				0 > t ||
					t > this.total - 1 ||
					t === this.slide ||
					((this.slide = t), this._goto(this.slide));
			},
			next: function() {
				this.slide++,
					this.slide >= this.total && (this.slide = 0),
					this._goto(this.slide);
			},
			previous: function() {
				this.slide--,
					this.slide < 0 && (this.slide = this.total - 1),
					this._goto(this.slide);
			},
			trigger: function(t) {
				var s = [];
				(s =
					"init" === t
						? [this.settings]
						: [this.slide, this.settings.slides[this.slide]]),
					this.$elmt.trigger("vegas" + t, s),
					"function" == typeof this.settings[t] &&
						this.settings[t].apply(this.$elmt, s);
			},
			options: function(s, i) {
				var e = this.settings.slides.slice();
				if ("object" == typeof s)
					this.settings = $.extend({}, t, $.vegas.defaults, s);
				else {
					if ("string" != typeof s) return this.settings;
					if (void 0 === i) return this.settings[s];
					this.settings[s] = i;
				}
				this.settings.slides !== e &&
					((this.total = this.settings.slides.length),
					(this.noshow = this.total < 2),
					this._preload());
			},
			destroy: function() {
				clearTimeout(this.timeout),
					this.$elmt.removeClass("vegas-container"),
					this.$elmt.find("> .vegas-slide").remove(),
					this.$elmt
						.find("> .vegas-wrapper")
						.clone(!0)
						.children()
						.appendTo(this.$elmt),
					this.$elmt.find("> .vegas-wrapper").remove(),
					this.settings.timer && this.$timer.remove(),
					this.settings.overlay && this.$overlay.remove(),
					(this.elmt._vegas = null);
			},
		}),
			($.fn.vegas = function(t) {
				var s = arguments,
					e = !1,
					n;
				if (void 0 === t || "object" == typeof t)
					return this.each(function() {
						this._vegas || (this._vegas = new i(this, t));
					});
				if ("string" == typeof t) {
					if (
						(this.each(function() {
							var i = this._vegas;
							if (!i)
								throw new Error(
									"No Vegas applied to this element."
								);
							"function" == typeof i[t] && "_" !== t[0]
								? (n = i[t].apply(i, [].slice.call(s, 1)))
								: (e = !0);
						}),
						e)
					)
						throw new Error('No method "' + t + '" in Vegas.');
					return void 0 !== n ? n : this;
				}
			}),
			($.vegas = {}),
			($.vegas.defaults = t),
			($.vegas.isVideoCompatible = function() {
				return !/(Android|webOS|Phone|iPad|iPod|BlackBerry|Windows Phone)/i.test(
					navigator.userAgent
				);
			});
	})(window.jQuery || window.Zepto);
