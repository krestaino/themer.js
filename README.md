# Themer.js

## Demo

[themer.js.kmr.io](https://themer.js.kmr.io) (Source can be found under the [example](https://github.com/krestaino/themer.js/tree/master/example) folder.)

## Getting Started

### Install

```
# using yarn
$ yarn add react-themer.js

# using npm
$ npm install react-themer.js
```

### Usage

#### Static Theme

Here the theme is set to `auto`.

```
import Themer from "react-themer.js";

<Themer theme="auto">
  ...
</Themer>
```

#### Dynamic Theme

Here the theme is set to `auto` by default and when you click the button, the theme changes to `dark`.

```
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Themer from "react-themer.js";

export default class App extends Component {
  state = {
    active: "auto"
  };

  render() {
    return (
      <Themer theme={this.state.active}>
        <button onClick={() => this.setState({ active: "dark" })}>
          Dark
        </button>
      </Themer>
    )
  }
}
```

## Themes

| Theme      | CSS Selector                      | Description                                                                                                 |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `auto`     | `themer--light` or `themer--dark` | Uses user's loction to find sunset and sunrise times and automatically sets the theme to `light` or `dark`. |
| `system`   | `themer--light` or `themer--dark` | Uses system theme. Relies on [prefers-color-scheme](https://caniuse.com/#search=prefers-color-scheme).      |
| `light`    | `themer--light`                   | Sets the theme to `light`.                                                                                  |
| `dark`     | `themer--dark`                    | Sets the theme to `dark`.                                                                                   |
| `<STRING>` | `themer--<STRING>`                | Sets the theme to `<STRING>`. Use to create custom themes.                                                  |

## Styles

Themer.js adds a class to the Themer component depending on the active theme. To set styles, simply use the CSS selectors.

### No Theme

```
button {
  color: gray;
}
```

### Dark Theme

```
.themer--dark button {
  color: white;
}
```

### Light Theme

```
.themer--light button {
  color: black;
}
```

### Custom Theme

```
.themer--custom button {
  color: orange;
}
```
