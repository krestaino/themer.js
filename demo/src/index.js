import React, { Component } from "react";
import { hydrate, render } from "react-dom";
import Themer from "themer.js";

import Header from "./components/Header";
import Readme from "./components/Readme";
import Footer from "./components/Footer";

import { light, dark, custom } from "./themes/index.js";
import "./styles.scss";

const themes = [
  { name: "Light", icon: "🌞", theme: light },
  { name: "Dark", icon: "🌒", theme: dark },
  { name: "Auto", icon: "🌗", theme: "auto" },
  { name: "System", icon: "💻", theme: "system" },
  { name: "Custom", icon: "🎨", theme: custom }
];

export default class App extends Component {
  state = {
    active: undefined,
    icon: undefined,
    theme: undefined,
    themes
  };

  themer = new Themer({
    debug: false,
    onUpdate: theme => {
      this.setState({
        theme,
        syntax: theme.syntax
      });
    },
    light,
    dark
  });

  setTheme(theme, icon) {
    this.setState({ active: theme, icon }, () => {
      this.themer.set(theme);
    });
  }

  getDisabled = theme => {
    return !this.themer.themeSupportCheck() && theme === "system";
  };

  getTitle = ({ name, theme }) => {
    return !this.themer.themeSupportCheck() && theme === "system"
      ? "This theme is not supported by your browser."
      : `Set the active theme to ${name}.`;
  };

  componentDidMount() {
    this.setTheme(light, "🌞");
  }

  render() {
    const { active, syntax } = this.state;

    return (
      <main>
        <Header icon={this.state.icon}>
          {themes.map(({ icon, name, theme }) => (
            <button
              className={theme === active ? "active" : undefined}
              disabled={this.getDisabled(theme)}
              key={name}
              onClick={() => this.setTheme(theme, icon)}
              title={this.getTitle({ name, theme })}
            >
              {name}
            </button>
          ))}
        </Header>
        <Readme syntax={syntax} />
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
