import React, { Component } from "react";
import ReactDOM from "react-dom";

import Themer from "themer.js";
import { light, dark, black, auto, system, custom } from "./themer/index.js";

import Header from "./components/Header";
import Readme from "./components/Readme";
import Footer from "./components/Footer";

import "./styles.scss";

export default class App extends Component {
  state = {
    active: undefined,
    selected: dark,
    themes: [dark, light, auto, system, black, custom]
  };

  noThemeSupport({ theme }) {
    return theme === "system" && !this.themer.themeSupportCheck();
  }

  setTheme(theme) {
    this.setState({ selected: theme });
    this.themer.set(theme);
  }

  componentDidMount() {
    this.themer = new Themer({
      debug: true,
      onUpdate: theme => this.setState({ active: theme }),
      themes: {
        light,
        dark,
        auto,
        system,
        custom
      }
    });
    this.themer.set(this.state.selected);
  }

  render() {
    const { active, selected, themes } = this.state;

    return active ? (
      <main>
        <Header icon={active.icon}>
          {themes.map(theme => (
            <button
              className={selected === theme ? "active" : undefined}
              disabled={this.noThemeSupport(theme)}
              key={theme.name}
              title={
                this.noThemeSupport(theme)
                  ? "This theme is not supported by your browser."
                  : `Change theme to ${theme.name}.`
              }
              onClick={() => this.setTheme(theme)}
            >
              {theme.name}
            </button>
          ))}
        </Header>
        <Readme syntax={active.syntax} />
        <Footer />
      </main>
    ) : null;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
