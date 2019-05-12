import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./codeBlock";
import README from "themer.js/README.md";
import "reset-css";
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

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
    }
  }

  render() {
    const code = props => (
      <React.Fragment>
        <CodeBlock value={props.value} syntax={this.props.syntax} />
      </React.Fragment>
    );

    return (
      <section id="readme" className="container">
        <ReactMarkdown
          renderers={{ code }}
          source={this.state.markdown}
          escapeHtml={false}
        />
      </section>
    );
  }
}
