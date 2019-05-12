import React, { Component } from "react";
import { hydrate, render } from "react-dom";
import Themer from "themer.js";

import Header from "./components/Header";
import Readme from "./components/Readme";
import Footer from "./components/Footer";

import { light, dark, custom } from "./themes/index.js";
import "./styles.scss";

export default class App extends Component {
  state = {
    active: light,
    theme: light
  };

  themer = new Themer({
    light,
    dark,
    debug: false,
    onUpdate: theme => this.setState({ theme, syntax: theme.syntax })
  });

  setTheme(theme) {
    this.setState({ active: theme });
    this.themer.set(theme);
  }

  componentDidMount() {
    this.themer.set(light);
  }

  render() {
    const themes = [
      { name: "Light", theme: light },
      { name: "Dark", theme: dark },
      { name: "Auto", theme: "auto" },
      { name: "System", theme: "system" },
      { name: "Custom", theme: custom }
    ];

    return (
      <main>
        <Header theme={this.state.theme}>
          {themes.map(obj => (
            <button
              className={obj.theme === this.state.active ? "active" : undefined}
              disabled={
                !this.themer.systemThemeSupport() && obj.theme === "system"
              }
              key={obj.name}
              onClick={() => this.setTheme(obj.theme)}
              title={`Set ${obj.name} as the active theme.`}
            >
              {obj.name}
            </button>
          ))}
        </Header>
        <Readme syntax={this.state.syntax} />
        <Footer />
      </main>
    );
  }
}

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
