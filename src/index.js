import SunCalc from "suncalc";

export default class Themer {
  constructor(config) {
    this.themes = config.themes;
    this.debug = config.debug;
  }

  set = theme => {
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
  };

  setAutoTheme = async () => {
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
    const { dark, light } = this.themes;
    const { sunrise, sunset } = SunCalc.getTimes(date, latitude, longitude);

    date < sunrise || date > sunset
      ? this.setTheme(dark)
      : this.setTheme(light);
  };

  setSystemTheme = () => {
    const { dark, light } = this.themes;

    if (this.prefersColorScheme("dark")) {
      this.setTheme(dark);
    } else if (this.prefersColorScheme("light")) {
      this.setTheme(light);
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

  noSystemThemeSupport = () => {
    return this.prefersColorScheme("dark") || this.prefersColorScheme("light")
      ? false
      : true;
  };
}
