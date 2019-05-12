import React, { Component } from "react";
import ReactDOM from "react-dom";
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

  setTheme({ theme, icon }) {
    this.setState({ active: theme, icon }, () => {
      this.themer.set(theme);
    });
  }

  getDisabled = () => {
    return !this.themer.themeSupportCheck();
  };

  getTitle = ({ name }) => {
    return !this.themer.themeSupportCheck()
      ? "This theme is not supported by your browser."
      : `Set the active theme to ${name}.`;
  };

  componentDidMount() {
    this.setTheme({ ...themes[0] });
  }

  render() {
    const { active, icon, syntax } = this.state;

    return (
      <main>
        <Header icon={icon}>
          {themes.map(({ icon, name, theme }) => (
            <button
              className={theme === active ? "active" : undefined}
              disabled={theme === "system" ? this.getDisabled() : undefined}
              title={theme === "system" ? this.getTitle({ name }) : undefined}
              onClick={() => this.setTheme({ theme, icon })}
              key={name}
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

ReactDOM.render(<App />, document.getElementById("root"));
