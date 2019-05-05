import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import Themer from "react-themer.js";

import "./index.css";
import "./dark.css";
import "./custom.css";

import README from "../node_modules/react-themer.js/README.md";

class App extends Component {
  state = {
    active: "auto",
    themes: ["auto", "system", "light", "dark", "custom"],
    markdown: ""
  };

  componentDidMount() {
    fetch(README)
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
  }

  render() {
    const { active, themes } = this.state;

    return (
      <Themer theme={active}>
        <main>
          <div>
            <h1>Themer.js</h1>
            <a href="https://github.com/krestaino/themer.js">
              github.com/krestaino/themer.js
            </a>
            {themes.map(theme => (
              <button
                className={theme === active ? "active" : ""}
                key={theme}
                onClick={() => this.setState({ active: theme })}
              >
                {theme}
              </button>
            ))}
            <ReactMarkdown source={this.state.markdown} />
          </div>
        </main>
      </Themer>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
