import React, { Component } from "react";
import { hydrate, render } from "react-dom";
import Themer from "react-themer.js";

import Header from "./components/Header";
import Readme from "./components/Readme";
import Footer from "./components/Footer";

import light from "./themes/light.json";
import dark from "./themes/dark.json";
import custom from "./themes/custom.json";

import "./index.scss";

export default class App extends Component {
  state = {
    active: "auto",
    icon: "🌗",
    themes: { dark, light, custom }
  };

  render() {
    const { active, icon, themes } = this.state;

    const Button = (theme, name, icon) => {
      return (
        <button
          className={theme === active ? "active" : undefined}
          onClick={() => this.setState({ active: theme, icon })}
        >
          {name}
        </button>
      );
    };

    return (
      <main>
        <Themer active={active} themes={themes} />
        <Header icon={icon}>
          {Button("auto", "Auto", "🌗")}
          {Button("system", "System", "💻")}
          {Button(light, "Light", "🌞")}
          {Button(dark, "Dark", "🌒")}
          {Button(custom, "Custom", "🎨")}
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
