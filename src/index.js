import SunCalc from "suncalc";

export const auto = {
  name: "Auto",
  theme: "auto"
};

export const system = {
  name: "System",
  theme: "system"
};

export default class Themer {
  constructor(config) {
    this.light = config.themes.light;
    this.dark = config.themes.dark;
    this.debug = config.debug;
    this.onUpdate = config.onUpdate;
  }

  set = themeObj => {
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
  };

  setAuto = async () => {
    if (!this.light || !this.dark) {
      this.log("Error: Missing `light` or `dark` theme.");
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
      this.log(`Error: ${error.message}`);
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
      this.log(
        "Error: System theme not supported by this browser. Requires prefers-color-scheme. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme"
      );
    }
  };

  setTheme = themeObj => {
    const html = document.querySelector("html");

    Object.entries(themeObj.theme.styles).forEach(style => {
      html.style.setProperty(style[0], style[1]);
    });

    this.setAndroid(themeObj.theme);
    this.log("Success: Theme changed successfully.");
    this.onUpdate(themeObj);
  };

  setAndroid = ({ android }) => {
    if (android) {
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", android);
        this.log("Success: Android theme-color changed successfully.");
      }
    } else {
      this.log("Error: Android theme-color undefined.");
    }
  };

  prefersColorScheme = theme => {
    return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches;
  };

  themeSupportCheck = () => {
    return this.prefersColorScheme("dark") || this.prefersColorScheme("light")
      ? true
      : false;
  };

  log(message) {
    if (this.debug) console.log(message);
  }
}
