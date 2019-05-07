# Themer.js

Spice up your app with themes. Themer.js features include:

- Automatic night/day theme switching
- System theme support using `prefers-color-scheme`
- Custom themes
- Manual control over everything

## Demo

[https://themer.js.kmr.io](https://themer.js.kmr.io)

## Getting Started

### Install

```
# using yarn
$ yarn add react-themer.js

# using npm
$ npm install react-themer.js
```

### Basic Usage

```
import React, { Component } from "react";
import Themer from "react-themer.js";

const themes = {
  light: {
    "--app-background-color": "#f1f1f1",
    "--primary-text-color": "#555"
  },
  dark: {
    "--app-background-color": "#242835",
    "--primary-text-color": "#f1f1f1"
  }
}

export default class App extends Component {
  render() {
    return (
      <main style="
        background-color: var(--app-background-color);
        color: var(--primary-text-color);
      ">
        <Themer active="auto" themes={themes} />
      </main>
    )
  }
}
```

### Advanced Usage

```
# index.js

import React, { Component } from "react";
import Themer from "react-themer.js";

import light from "./light.json";
import dark from "./dark.json";

import './index.css';

export default class App extends Component {
  state = {
    active: "auto",
    themes: { dark, light }
  };

  render() {
    const { active, themes } = this.state;

    const Button = (theme, name) => {
      return (
        <button onClick={() => this.setState({ active: theme })}>
          {name}
        </button>
      );
    };

    return (
      <main>
        <Themer active={active} themes={themes} />
        {Button("auto", "Auto")}
        {Button("system", "System")}
        {Button(light, "Light")}
        {Button(dark, "Dark")}
      </main>
    )
  }
}
```

```
# index.css

main {
  background-color: --app-background-color;
  color: --primary-text-color;
}

```

```
# light.json

{
  "styles": {
    "--app-background-color": "#f1f1f1",
    "--primary-text-color": "#555",
  }
}
```

```
# dark.json

{
  "styles": {
    "--app-background-color": "#242835",
    "--primary-text-color": "#f1f1f1",
  }
}
```

## <a name="props"></a>Props

| Prop     | Type                 | Description       |
| -------- | -------------------- | ----------------- |
| `active` | `string` or `object` | The active theme. |
| `themes` | `object`             | Available themes. |

## Themes

```
{
  "styles": {
    "--app-background-color": "#242835",
    "--primary-text-color": "#f1f1f1",
    "--primary-accent-color": "#056fb6",
    "--primary-link-color": "var(--primary-accent-color)",
    "--header-background-color": "#2d303c",
    "--button-border-color": "#464d5f",
    "--button-background-color": "#393e4d",
    "--button-text-color": "#f1f1f1",
    "--button-active-border-color": "var(--primary-accent-color)",
    "--table-pre-background-color": "#3a3b46",
    "--table-zebra-background-color": "rgba(255, 255, 255, 0.04)",
    "--code-background-color": "rgba(255, 255, 255, 0.1)"
  },
  "android": "#242835"
}
```

Note: The `android` key is used to set the [meta theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android).
