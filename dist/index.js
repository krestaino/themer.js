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

      if (!theme) {
        return;
      } else if (theme === "auto") {
        this.setAutoTheme();
      } else if (theme === "system") {
        this.setSystemTheme();
      } else {
        this.setTheme(theme);
      }
    });

    _defineProperty(this, "setAutoTheme", async () => {
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
        dark,
        light
      } = this.themes;

      const {
        sunrise,
        sunset
      } = _suncalc.default.getTimes(date, latitude, longitude);

      date < sunrise || date > sunset ? this.setTheme(dark) : this.setTheme(light);
    });

    _defineProperty(this, "setSystemTheme", () => {
      const {
        dark,
        light
      } = this.themes;

      if (this.prefersColorScheme("dark")) {
        this.setTheme(dark);
      } else if (this.prefersColorScheme("light")) {
        this.setTheme(light);
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

    _defineProperty(this, "systemThemeSupport", () => {
      return this.prefersColorScheme("dark") || this.prefersColorScheme("light") ? true : false;
    });

    this.themes = config.themes;
    this.debug = config.debug;
  }

}

exports.default = Themer;
