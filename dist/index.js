"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _suncalc = _interopRequireDefault(require("suncalc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Themer =
/*#__PURE__*/
function (_Component) {
  _inherits(Themer, _Component);

  function Themer() {
    _classCallCheck(this, Themer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Themer).apply(this, arguments));
  }

  _createClass(Themer, [{
    key: "init",
    value: function init() {
      clearInterval(this.interval);
      var active = this.props.active;

      if (!active) {
        return;
      } else if (active === "auto") {
        this.setAutoTheme();
      } else if (active === "system") {
        this.setSystemTheme();
      } else {
        this.setTheme(active);
      }
    }
  }, {
    key: "setAutoTheme",
    value: function () {
      var _setAutoTheme = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var _ref, _ref$coords, latitude, longitude;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.getLocation();

              case 3:
                _ref = _context.sent;
                _ref$coords = _ref.coords;
                latitude = _ref$coords.latitude;
                longitude = _ref$coords.longitude;
                this.getSunriseSunset(latitude, longitude);
                this.interval = setInterval(function () {
                  _this.getSunriseSunset(latitude, longitude);
                }, 60000);
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                this.setTheme(this.props.themes.light);
                console.error(_context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function setAutoTheme() {
        return _setAutoTheme.apply(this, arguments);
      }

      return setAutoTheme;
    }()
  }, {
    key: "getLocation",
    value: function getLocation() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
  }, {
    key: "getSunriseSunset",
    value: function getSunriseSunset(latitude, longitude) {
      var date = new Date();
      var _this$props$themes = this.props.themes,
          dark = _this$props$themes.dark,
          light = _this$props$themes.light;

      var _SunCalc$getTimes = _suncalc["default"].getTimes(date, latitude, longitude),
          sunrise = _SunCalc$getTimes.sunrise,
          sunset = _SunCalc$getTimes.sunset;

      date < sunrise || date > sunset ? this.setTheme(dark) : this.setTheme(light);
    }
  }, {
    key: "setSystemTheme",
    value: function setSystemTheme() {
      var _this$props$themes2 = this.props.themes,
          dark = _this$props$themes2.dark,
          light = _this$props$themes2.light;
      window.matchMedia("(prefers-color-scheme: dark)").matches ? this.setTheme(dark) : this.setTheme(light);
    }
  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      var root = document.querySelector("html");
      var metaThemeColor = document.querySelector("meta[name=theme-color]");
      Object.entries(theme.styles).forEach(function (style) {
        root.style.setProperty(style[0], style[1]);
      });
      metaThemeColor.setAttribute("content", theme.android);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.active !== this.props.active) {
        this.init();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Themer;
}(_react.Component);

exports["default"] = Themer;
