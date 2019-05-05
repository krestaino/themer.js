import React, { Component } from "react";
import ReactDOM from "react-dom";
import Themer from "react-themer.js";
import "./index.css";

class App extends Component {
  state = {
    active: "auto",
    themes: ["auto", "system", "light", "dark", "custom"]
  };

  render() {
    const { active, themes } = this.state;

    return (
      <Themer theme={active}>
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

ReactDOM.render(<App />, document.getElementById("root"));
