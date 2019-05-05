import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import Themer from "react-themer.js";

import "./index.css";
import "./dark.css";
import "./custom.css";

import README from "../node_modules/react-themer.js/README.md";
import PACKAGE from "../node_modules/react-themer.js/package.json";

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

  getEmoji() {
    switch (this.state.active) {
      case "auto":
        return "🌗";
      case "system":
        return "💻";
      case "light":
        return "☀️";
      case "dark":
        return "🌑";
      case "custom":
        return "🎨";
      default:
        return "🌗";
    }
  }

  render() {
    const { active, themes } = this.state;

    return (
      <Themer theme={active}>
        <main>
          <section>
            <header>
              <div className="meta">
                <h1>
                  Themer.js <span>v{PACKAGE.version}</span>
                </h1>
                <a href="https://github.com/krestaino/themer.js">
                  github.com/krestaino/themer.js
                </a>
                <p>
                  <span className="emoji">{this.getEmoji()}</span>{" "}
                  {PACKAGE.description}
                </p>
              </div>
              <div className="buttons">
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
            </header>
            <div className="readme">
              <ReactMarkdown source={this.state.markdown} />
            </div>
            <footer>
              <span>{PACKAGE.author.name}</span>
              <span>{PACKAGE.author.email}</span>
              <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                />
              </svg>
            </footer>
          </section>
        </main>
      </Themer>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
