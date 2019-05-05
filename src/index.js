import React, { Component } from "react";
import SunCalc from "suncalc";

export default class Themer extends Component {
  async autoTheme() {
    try {
      const { coords } = await this.getLocation();
      const { latitude, longitude } = coords;
      this.setAutoTheme(latitude, longitude);
      this.interval = setInterval(() => {
        this.setAutoTheme(latitude, longitude);
      }, 60000);
    } catch (error) {
      this.setState({ theme: this.props.theme });
      console.error(error);
    }
  }

  setAutoTheme(latitude, longitude) {
    const date = new Date();
    const { sunrise, sunset } = SunCalc.getTimes(date, latitude, longitude);

    date < sunrise || date > sunset
      ? this.setDarkTheme()
      : this.setLightTheme();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  systemTheme() {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? this.setDarkTheme()
      : this.setLightTheme();
  }

  setDarkTheme() {
    this.setState({ theme: "dark" });
    this.setThemeColor(this.props.config.colors.dark);
  }

  setLightTheme() {
    this.setState({ theme: "light" });
    this.setThemeColor(this.props.config.colors.light);
  }

  setCustomTheme() {
    this.setState({ theme: this.props.theme });
    this.setThemeColor(this.props.config.colors.custom);
  }

  setThemeColor(color) {
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", color);
  }

  setTheme() {
    clearInterval(this.interval);
    switch (this.props.theme) {
      case "auto":
        this.autoTheme();
        break;
      case "system":
        this.systemTheme();
        break;
      case "dark":
        this.setDarkTheme();
        break;
      case "light":
        this.setLightTheme();
        break;
      default:
        this.setCustomTheme();
        break;
    }
  }

  componentDidMount() {
    this.setTheme();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.setTheme();
    }
  }

  render() {
    return (
      <div className={"themer--" + this.props.theme}>{this.props.children}</div>
    );
  }
}
