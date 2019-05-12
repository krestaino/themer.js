import React, { Component } from "react";
import PACKAGE from "themer.js/package.json";
import "./styles.scss";

export default class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="meta container">
          <h1>
            Themer.js <span>v{PACKAGE.version}</span>
          </h1>
          <div>
            <span className="emoji">{this.props.icon}</span>
            <a href="https://github.com/krestaino/themer.js">
              github.com/krestaino/themer.js
            </a>
          </div>
        </div>
        <div className="buttons container">{this.props.children}</div>
      </header>
    );
  }
}
