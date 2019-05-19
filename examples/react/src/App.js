import React, { Component } from "react";
import Themer, { auto, system } from "themer.js";
import { light, dark, custom } from "./themer/index.js";

import logo from "./assets/logo.png";
import "./App.css";

export default class App extends Component {
  state = {
    active: undefined,
    selected: light,
    themes: [light, dark, auto, system, custom]
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
      themes: { light, dark, auto, system, custom }
    });
    this.themer.set(this.state.selected);
  }

  render() {
    const { active, selected, themes } = this.state;

    return (
      <main>
        <img alt="React logo" src={logo} />
        <section>
          {active &&
            themes.map(theme => (
              <button
                className={selected === theme ? "selected" : undefined}
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
        </section>
      </main>
    );
  }
}
