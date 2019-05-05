import React, { Component } from "react";
import SunCalc from "suncalc";

export default class Themer extends Component {
  state = {
    theme: "light"
  };

  async autoTheme() {
    try {
      const { coords } = await this.getLocation();
      const { latitude, longitude } = coords;
      this.setAutoTheme(latitude, longitude);
      this.interval = setInterval(() => {
        this.setAutoTheme(latitude, longitude);
      }, 5000);
    } catch (error) {
      this.setState({ theme: this.state.theme });
      console.error(error);
    }
  }

  setAutoTheme(latitude, longitude) {
    const date = new Date();
    const { sunrise, sunset } = SunCalc.getTimes(date, latitude, longitude);

    this.setState({
      theme: date < sunrise || date > sunset ? "dark" : "light"
    });
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  systemTheme() {
    this.setState({
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    });
  }

  setTheme() {
    clearInterval(this.interval);
    switch (this.props.mode) {
      case "auto":
        this.autoTheme();
        break;
      case "system":
        this.systemTheme();
        break;
      case "dark":
        this.setState({ theme: "dark" });
        break;
      case "light":
        this.setState({ theme: "light" });
        break;
      default:
        this.setState({ theme: this.props.mode });
        break;
    }
  }

  componentDidMount() {
    this.setTheme();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) {
      this.setTheme();
    }
  }

  render() {
    return (
      <div className={"themer-" + this.state.theme}>{this.props.children}</div>
    );
  }
}
