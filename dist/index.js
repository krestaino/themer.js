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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Themer =
/*#__PURE__*/
function (_Component) {
  _inherits(Themer, _Component);

  function Themer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Themer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Themer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      theme: "light"
    });

    return _this;
  }

  _createClass(Themer, [{
    key: "autoTheme",
    value: function () {
      var _autoTheme = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _ref, coords, latitude, longitude;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.getLocation();

              case 3:
                _ref = _context.sent;
                coords = _ref.coords;
                latitude = coords.latitude, longitude = coords.longitude;
                this.setAutoTheme(latitude, longitude);
                this.interval = setInterval(function () {
                  _this2.setAutoTheme(latitude, longitude);
                }, 5000);
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                this.setState({
                  theme: this.state.theme
                });
                console.error(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function autoTheme() {
        return _autoTheme.apply(this, arguments);
      }

      return autoTheme;
    }()
  }, {
    key: "setAutoTheme",
    value: function setAutoTheme(latitude, longitude) {
      var date = new Date();

      var _SunCalc$getTimes = _suncalc["default"].getTimes(date, latitude, longitude),
          sunrise = _SunCalc$getTimes.sunrise,
          sunset = _SunCalc$getTimes.sunset;

      this.setState({
        theme: date < sunrise || date > sunset ? "dark" : "light"
      });
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
  }, {
    key: "systemTheme",
    value: function systemTheme() {
      this.setState({
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      });
    }
  }, {
    key: "setTheme",
    value: function setTheme() {
      clearInterval(this.interval);

      switch (this.props.mode) {
        case "auto":
          this.autoTheme();
          break;

        case "system":
          this.systemTheme();
          break;

        case "dark":
          this.setState({
            theme: "dark"
          });
          break;

        case "light":
          this.setState({
            theme: "light"
          });
          break;

        default:
          this.setState({
            theme: this.props.mode
          });
          break;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTheme();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.mode !== this.props.mode) {
        this.setTheme();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "themer-" + this.state.theme
      }, this.props.children);
    }
  }]);

  return Themer;
}(_react.Component);

exports["default"] = Themer;
