import React, { Component } from "react";
import SunCalc from "suncalc";

export default class Themer extends Component {
  state = {
    theme: "auto"
  };

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
      this.setThemeColor(this.props.android.light, "light");
      console.error(error);
    }
  }

  setSystemTheme() {
    const { dark, light } = this.props.android;

    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? this.setThemeColor(dark, "dark")
      : this.setThemeColor(light, "light");
  }

  setThemeColor(color, theme) {
    this.setState({ theme: theme });
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", color);
  }

  setTheme() {
    const { active, android } = this.props;
    clearInterval(this.interval);

    switch (active) {
      case "auto":
        this.setAutoTheme();
        break;
      case "system":
        this.setSystemTheme();
        break;
      default:
        this.setThemeColor(android[active], active);
        break;
    }
  }

  getSunriseSunset(latitude, longitude) {
    const date = new Date();
    const { dark, light } = this.props.android;
    const { sunrise, sunset } = SunCalc.getTimes(date, latitude, longitude);

    date < sunrise || date > sunset
      ? this.setThemeColor(dark, "dark")
      : this.setThemeColor(light, "light");
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getThemeClassName() {
    switch (this.props.active) {
      case value:
        break;

      default:
        break;
    }
  }

  componentDidMount() {
    this.setTheme();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.setTheme();
    }
  }

  render() {
    return (
      <div className={"themer--" + this.state.theme}>{this.props.children}</div>
    );
  }

  static defaultProps = {
    active: "auto",
    android: {
      dark: "#242835",
      light: "#f1f1f1"
    }
  };
}
