"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _suncalc = _interopRequireDefault(require("suncalc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Themer {
  constructor(config) {
    _defineProperty(this, "set", theme => {
      if (this.debug) {
        console.log(`Setting theme.`);
        console.log(theme);
      }

      clearInterval(this.interval);

      switch (theme) {
        case "auto":
          this.setAuto();
          break;

        case "system":
          this.setSystem();
          break;

        default:
          this.setTheme(theme);
          break;
      }
    });

    _defineProperty(this, "setAuto", async () => {
      if (!this.light || !this.dark) {
        if (this.debug) console.error("Missing `light` or `dark` theme.");
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
        if (this.debug) console.error(error);
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
        if (this.debug) console.error("System theme not supported by this browser. Requires prefers-color-scheme. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme");
      }
    });

    _defineProperty(this, "setTheme", theme => {
      const html = document.querySelector("html");
      Object.entries(theme.styles).forEach(style => {
        html.style.setProperty(style[0], style[1]);
      });
      this.setAndroid(theme);
      if (this.debug) console.log("Theme changed successfully.");
      if (this.onUpdate) this.onUpdate(theme);
    });

    _defineProperty(this, "setAndroid", theme => {
      if (theme.android) {
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (metaThemeColor) metaThemeColor.setAttribute("content", theme.android);
        if (this.debug && metaThemeColor) console.log("Android theme-color changed successfully.");
      } else {
        if (this.debug) console.error("Android theme-color undefined.");
      }
    });

    _defineProperty(this, "prefersColorScheme", theme => {
      return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches;
    });

    _defineProperty(this, "themeSupportCheck", () => {
      return this.prefersColorScheme("dark") || this.prefersColorScheme("light") ? true : false;
    });

    this.light = config.light;
    this.dark = config.dark;
    this.debug = config.debug;
    this.onUpdate = config.onUpdate;
  }

}

exports.default = Themer;
