import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import README from "react-themer.js/README.md";
import "./styles.scss";

export default class Readme extends Component {
  state = {
    markdown: null
  };

  componentDidMount() {
    fetch(README)
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
  }

  render() {
    return (
      <section id="readme" className="container">
        <ReactMarkdown source={this.state.markdown} escapeHtml={false} />
      </section>
    );
  }
}
