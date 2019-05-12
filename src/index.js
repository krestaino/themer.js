import SunCalc from "suncalc";

export default class Themer {
  constructor(config) {
    this.light = config.light;
    this.dark = config.dark;
    this.debug = config.debug;
    this.onUpdate = config.onUpdate;
  }

  setTheme = theme => {
    if (this.debug) {
      console.log(`Setting theme.`);
      console.log(theme);
    }

    clearInterval(this.interval);

    if (theme) this.setTheme(theme);
  };

  setAuto = async () => {
    if (!this.light || !this.dark) {
      if (this.debug) console.error("Missing `light` or `dark` theme.");
      return;
    }

    try {
      const {
        coords: { latitude, longitude }
      } = await this.getLocation();

      this.getSunriseSunset(latitude, longitude);
      this.interval = setInterval(() => {
        this.getSunriseSunset(latitude, longitude);
      }, 60000);
    } catch (error) {
      if (this.debug) console.error(error);
    }
  };

  getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getSunriseSunset = (latitude, longitude) => {
    const date = new Date();
    const { sunrise, sunset } = SunCalc.getTimes(date, latitude, longitude);

    date < sunrise || date > sunset
      ? this.setTheme(this.dark)
      : this.setTheme(this.light);
  };

  setSystem = () => {
    if (this.prefersColorScheme("dark")) {
      this.setTheme(this.dark);
    } else if (this.prefersColorScheme("light")) {
      this.setTheme(this.light);
    } else {
      if (this.debug)
        console.error(
          "System theme not supported by this browser. Requires prefers-color-scheme. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme"
        );
    }
  };

  setTheme = theme => {
    const html = document.querySelector("html");

    Object.entries(theme.styles).forEach(style => {
      html.style.setProperty(style[0], style[1]);
    });

    this.setAndroid(theme);

    if (this.debug) console.log("Theme changed successfully.");
    if (this.onUpdate) this.onUpdate(theme);
  };

  setAndroid = theme => {
    if (theme.android) {
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      if (metaThemeColor) metaThemeColor.setAttribute("content", theme.android);
      if (this.debug && metaThemeColor)
        console.log("Android theme-color changed successfully.");
    } else {
      if (this.debug) console.error("Android theme-color undefined.");
    }
  };

  prefersColorScheme = theme => {
    return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches;
  };

  systemThemeSupport = () => {
    return this.prefersColorScheme("dark") || this.prefersColorScheme("light")
      ? true
      : false;
  };
}
