# Themer.js

## Demo<a name="demo"></a>

[https://themer.js.kmr.io](https://themer.js.kmr.io)
([source](https://github.com/krestaino/themer.js/tree/master/example))

# Getting Started<a name="getting-started"></a>

### Install Dependencies<a name="install-dependencies"></a>

```
# using yarn
$ yarn add react-themer.js

# using npm
$ npm install react-themer.js
```

### Using Themer.js<a name="using-themer-js"></a>

#### Simple<a name="simple"></a>

The default theme adds a CSS selector for you to target light and dark themes depending on the sunset and sunrise.

See more: [Styles](#styles)

```
import Themer from "react-themer.js";

<Themer>
  ...
</Themer>
```

#### Dynamic Themes<a name="dynamic-themes"></a>

If you want some more control, you can pass available themes using the `active` prop.
Here the theme has been set to `dark` and on `<button>` clicks, the theme is set to `auto`. The `android` prop is used to set the toolbar color in Chrome.

See more: [Props](#props)

```
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Themer from "react-themer.js";

export default class App extends Component {
  state = {
    active: "dark",
    android: { dark: "#242835" }
  };

  render() {
    const { active, android } = this.state;

    return (
      <Themer active={active} android={android}>
        <button onClick={() => this.setState({ active: "auto" })}>
          Auto
        </button>
      </Themer>
    )
  }
}
```

# Default Props<a name="props"></a>

| Prop      | Type     | Default                                                          | Description                                                                                                                                                      |
| --------- | -------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`  | `string` | `"auto"`                                                         | The active theme.                                                                                                                                                |
| `android` | `object` | `{ "dark": "#242835", "light": "#f1f1f1", "custom": "#b95c2f" }` | Used to set the toolbar color in Chrome on Android. ([info](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android)) |
| `themes`  | `array`  | `[ "auto", "system", "light", "dark", "custom" ]`                | Available themes.                                                                                                                                                |

# Themes<a name="themes"></a>

## Default

| Theme    | CSS Selector                      | Description                                                                                                  |
| -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `auto`   | `themer--light` \| `themer--dark` | Uses user's location to find sunset and sunrise times and automatically sets the theme to `light` or `dark`. |
| `system` | `themer--light` \| `themer--dark` | Uses system theme. Relies on [prefers-color-scheme](https://caniuse.com/#search=prefers-color-scheme).       |
| `light`  | `themer--light`                   | Sets the theme to `light`.                                                                                   |
| `dark`   | `themer--dark`                    | Sets the theme to `dark`.                                                                                    |
| `custom` | `themer--custom`                  | Sets the theme to `custom`.                                                                                  |

## Custom

You can create a new theme by passing a string to the `active` prop.

```
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Themer from "react-themer.js";

export default class App extends Component {
  state = {
    active: "custom",
    android: { custom: "#b95c2f" }
  };

  render() {
    const { active, android } = this.state;

    return (
      <Themer active={active} android={android}>
        Auto
      </Themer>
    )
  }
}
```

```
.themer--custom main {
  background-color: #b95c2f;
  color: #332016;
}
```

## Styles<a name="styles"></a>

To target a specific theme, simply use the theme's CSS selector.

#### No Theme

```
button {
  color: gray;
}
```

#### Dark Theme `"dark"`

```
.themer--dark button {
  color: white;
}
```

#### Light Theme `"light"`

```
.themer--light button {
  color: black;
}
```

#### Custom Theme `<STRING>`

```
.themer--custom button {
  color: orange;
}
```
