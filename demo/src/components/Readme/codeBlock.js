import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";

export default class CodeBlock extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    style: null
  };

  render() {
    const { value } = this.props;

    return (
      <SyntaxHighlighter style={this.props.syntax} language="javascript">
        {value}
      </SyntaxHighlighter>
    );
  }
}
