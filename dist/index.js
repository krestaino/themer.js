"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.system = exports.auto = void 0;

var _suncalc = _interopRequireDefault(require("suncalc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const auto = {
  name: "Auto",
  theme: "auto"
};
exports.auto = auto;
const system = {
  name: "System",
  theme: "system"
};
exports.system = system;

class Themer {
  constructor(config) {
    _defineProperty(this, "set", themeObj => {
      clearInterval(this.interval);

      switch (themeObj.theme) {
        case "auto":
          this.setAuto();
          break;

        case "system":
          this.setSystem();
          break;

        default:
          this.setTheme(themeObj);
          break;
      }
    });

    _defineProperty(this, "setAuto", async () => {
      if (!this.light || !this.dark) {
        this.log("Error: Missing `light` or `dark` theme.");
        return;
      }

      try {
        const {
          coords: {
            latitude,
            longitude
          }
        } = await this.getLocation();
        this.getSunriseSunset(latitude, longitude);
        this.interval = setInterval(() => {
          this.getSunriseSunset(latitude, longitude);
        }, 60000);
      } catch (error) {
        this.log(`Error: ${error.message}`);
      }
    });

    _defineProperty(this, "getLocation", () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    });

    _defineProperty(this, "getSunriseSunset", (latitude, longitude) => {
      const date = new Date();

      const {
        sunrise,
        sunset
      } = _suncalc.default.getTimes(date, latitude, longitude);

      date < sunrise || date > sunset ? this.setTheme(this.dark) : this.setTheme(this.light);
    });

    _defineProperty(this, "setSystem", () => {
      if (this.prefersColorScheme("dark")) {
        this.setTheme(this.dark);
      } else if (this.prefersColorScheme("light")) {
        this.setTheme(this.light);
      } else {
        this.log("Error: System theme not supported by this browser. Requires prefers-color-scheme. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme");
      }
    });

    _defineProperty(this, "setTheme", themeObj => {
      const html = document.querySelector("html");
      Object.entries(themeObj.theme.styles).forEach(style => {
        html.style.setProperty(style[0], style[1]);
      });
      this.setAndroid(themeObj.theme);
      this.log("Success: Theme changed successfully.");
      this.onUpdate(themeObj);
    });

    _defineProperty(this, "setAndroid", ({
      android
    }) => {
      if (android) {
        const metaThemeColor = document.querySelector("meta[name=theme-color]");

        if (metaThemeColor) {
          metaThemeColor.setAttribute("content", android);
          this.log("Success: Android theme-color changed successfully.");
        }
      } else {
        this.log("Error: Android theme-color undefined.");
      }
    });

    _defineProperty(this, "prefersColorScheme", theme => {
      return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches;
    });

    _defineProperty(this, "themeSupportCheck", () => {
      return this.prefersColorScheme("dark") || this.prefersColorScheme("light") ? true : false;
    });

    this.light = config.themes.light;
    this.dark = config.themes.dark;
    this.debug = config.debug;
    this.onUpdate = config.onUpdate;
  }

  log(message) {
    if (this.debug) console.log(message);
  }

}

exports.default = Themer;
