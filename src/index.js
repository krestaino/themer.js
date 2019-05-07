import React, { Component } from "react";
import SunCalc from "suncalc";

export default class Themer extends Component {
  init() {
    clearInterval(this.interval);
    const { active } = this.props;

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

  async setAutoTheme() {
    try {
      const {
        coords: { latitude, longitude }
      } = await this.getLocation();

      this.getSunriseSunset(latitude, longitude);
      this.interval = setInterval(() => {
        this.getSunriseSunset(latitude, longitude);
      }, 60000);
    } catch (error) {
      this.setTheme(this.props.themes.light);
      console.error(error);
    }
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getSunriseSunset(latitude, longitude) {
    const date = new Date();
    const { dark, light } = this.props.themes;
    const { sunrise, sunset } = SunCalc.getTimes(date, latitude, longitude);

    date < sunrise || date > sunset
      ? this.setTheme(dark)
      : this.setTheme(light);
  }

  setSystemTheme() {
    const { dark, light } = this.props.themes;

    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? this.setTheme(dark)
      : this.setTheme(light);
  }

  setTheme(theme) {
    const root = document.querySelector("html");
    const metaThemeColor = document.querySelector("meta[name=theme-color]");

    Object.entries(theme.styles).forEach(style => {
      root.style.setProperty(style[0], style[1]);
    });

    metaThemeColor.setAttribute("content", theme.android);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.init();
    }
  }

  render() {
    return null;
  }
}
