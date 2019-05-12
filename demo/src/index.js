import React, { Component } from "react";
import { hydrate, render } from "react-dom";
import Themer from "themer.js";

import Header from "./components/Header";
import Readme from "./components/Readme";
import Footer from "./components/Footer";

import { light, dark, custom } from "./themes/index.js";
import "./styles.scss";

const themes = [light, dark, custom];

export default class App extends Component {
  state = {
    active: light,
    theme: light
  };

  themer = new Themer({
    light,
    dark,
    onUpdate: theme => this.setState({ theme, syntax: theme.syntax })
  });

  componentDidMount() {
    this.themer.setTheme(light);
  }

  render() {
    return (
      <main>
        <Header theme={this.state.theme}>
          {themes.map(theme => (
            <button
              className={theme === this.state.active ? "active" : undefined}
              onClick={() =>
                this.setState({ active: theme }, () => {
                  this.themer.setTheme(theme);
                })
              }
              key={theme.name}
              title={`Set ${theme.name} as the active theme.`}
            >
              {theme.name}
            </button>
          ))}
          <button
            className={"auto" === this.state.active ? "active" : undefined}
            onClick={() =>
              this.setState({ active: "auto" }, () => {
                this.themer.setAuto();
              })
            }
            title={"Set `auto` as the active theme."}
          >
            Auto
          </button>
          <button
            className={"system" === this.state.active ? "active" : undefined}
            disabled={!this.themer.systemThemeSupport()}
            onClick={() =>
              this.setState({ active: "system" }, () => {
                this.themer.setSystem();
              })
            }
            title={
              !this.themer.systemThemeSupport()
                ? "This theme is not supported by your browser."
                : "Set `system` as the active theme."
            }
          >
            System
          </button>
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
