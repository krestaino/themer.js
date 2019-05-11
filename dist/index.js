"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _suncalc = _interopRequireDefault(require("suncalc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Themer = function Themer(config) {
  var _this = this;

  _classCallCheck(this, Themer);

  _defineProperty(this, "set", function (theme) {
    if (_this.debug) {
      console.log("Setting theme.");
      console.log(theme);
    }

    clearInterval(_this.interval);

    if (!theme) {
      return;
    } else if (theme === "auto") {
      _this.setAutoTheme();
    } else if (theme === "system") {
      _this.setSystemTheme();
    } else {
      _this.setTheme(theme);
    }
  });

  _defineProperty(this, "setAutoTheme",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref2, _ref2$coords, latitude, longitude;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _this.getLocation();

          case 3:
            _ref2 = _context.sent;
            _ref2$coords = _ref2.coords;
            latitude = _ref2$coords.latitude;
            longitude = _ref2$coords.longitude;

            _this.getSunriseSunset(latitude, longitude);

            _this.interval = setInterval(function () {
              _this.getSunriseSunset(latitude, longitude);
            }, 60000);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            if (_this.debug) console.error(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  })));

  _defineProperty(this, "getLocation", function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  });

  _defineProperty(this, "getSunriseSunset", function (latitude, longitude) {
    var date = new Date();
    var _this$themes = _this.themes,
        dark = _this$themes.dark,
        light = _this$themes.light;

    var _SunCalc$getTimes = _suncalc["default"].getTimes(date, latitude, longitude),
        sunrise = _SunCalc$getTimes.sunrise,
        sunset = _SunCalc$getTimes.sunset;

    date < sunrise || date > sunset ? _this.setTheme(dark) : _this.setTheme(light);
  });

  _defineProperty(this, "setSystemTheme", function () {
    var _this$themes2 = _this.themes,
        dark = _this$themes2.dark,
        light = _this$themes2.light;

    var prefersColorScheme = function prefersColorScheme(theme) {
      return window.matchMedia("(prefers-color-scheme: ".concat(theme, ")")).matches;
    };

    if (prefersColorScheme("dark")) {
      _this.setTheme(dark);
    } else if (prefersColorScheme("light")) {
      _this.setTheme(light);
    } else {
      if (_this.debug) console.error("System theme not supported by this browser. Requires prefers-color-scheme. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme");
    }
  });

  _defineProperty(this, "setTheme", function (theme) {
    var html = document.querySelector("html");
    Object.entries(theme.styles).forEach(function (style) {
      html.style.setProperty(style[0], style[1]);
    });

    _this.setAndroid(theme);

    if (_this.debug) console.log("Theme changed successfully.");
  });

  _defineProperty(this, "setAndroid", function (theme) {
    if (theme.android) {
      var metaThemeColor = document.querySelector("meta[name=theme-color]");
      metaThemeColor.setAttribute("content", theme.android);
      if (_this.debug) console.log("Android theme-color changed successfully.");
    } else {
      if (_this.debug) console.error("Android theme-color undefined.");
    }
  });

  this.themes = config.themes;
  this.debug = config.debug;
};

exports["default"] = Themer;
