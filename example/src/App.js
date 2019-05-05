import React, { Component } from "react";
import Themer from "react-themer.js";
import "./App.css";

export default class App extends Component {
  state = {
    active: "auto",
    themes: ["auto", "system", "light", "dark", "custom"]
  };

  render() {
    const { active, themes } = this.state;

    return (
      <Themer mode={active}>
        <main>
          <div>
            {themes.map(theme => (
              <button
                className={theme === active ? "active" : ""}
                key={theme}
                onClick={() => this.setState({ active: theme })}
              >
                {theme}
              </button>
            ))}
          </div>
        </main>
      </Themer>
    );
  }
}
