import React, { Component } from "react";
import { hydrate, render } from "react-dom";
import Themer from "react-themer.js";

import Header from "./components/Header";
import Readme from "./components/Readme";
import Footer from "./components/Footer";

import { light, dark, custom } from "./themes/index.js";
import "./styles.scss";

const themer = new Themer({
  themes: { light, dark, custom },
  debug: true
});

export default class App extends Component {
  state = {
    theme: undefined,
    icon: undefined
  };

  setTheme(theme, icon) {
    this.setState({ theme, icon });
    themer.set(theme);
  }

  render() {
    const themes = [
      { name: "Auto", theme: "auto", icon: "🌗" },
      { name: "System", theme: "system", icon: "💻" },
      { name: "Light", theme: light, icon: "🌞" },
      { name: "Dark", theme: dark, icon: "🌒" },
      { name: "Custom", theme: custom, icon: "🎨" }
    ];

    return (
      <main>
        <Header icon={this.state.icon}>
          {themes.map(obj => (
            <button
              className={obj.theme === this.state.theme ? "active" : undefined}
              onClick={() => this.setTheme(obj.theme, obj.icon)}
              key={obj.name}
            >
              {obj.name}
            </button>
          ))}
        </Header>
        <Readme />
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
