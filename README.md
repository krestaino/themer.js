# Themer.js

Spice up your app with themes. Themer.js features include:

- Automatic night/day theme switching
- System [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) support
- Android [meta theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) support
- Custom themes
- Manual control over everything

## Demo

[https://themer.js.kmr.io](https://themer.js.kmr.io)

## Getting Started

### Install

```
# using yarn
$ yarn add themer.js

# using npm
$ npm install themer.js
```

### Basic Usage

```
import Themer from "themer.js";
import { light, dark, custom } from "./themes/index.js";

// instantiate Themer.js
const themer = new Themer({
  themes: { light, dark, custom },
  debug: true
});

// set theme to dark
themer.set(dark)

// set theme to "auto"
themer.set("auto")
```

## <a name="config"></a>Configuration

| Key      | Type      | Description                                 |
| -------- | --------- | ------------------------------------------- |
| `debug`  | `boolean` | Log debug console statements                |
| `themes` | `object`  | Available themes. See more: [Theme](#theme) |

## <a name="themes"></a>Theme

The theme object.

| Key       | Type     | Description                                                                                                            |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `android` | `string` | [meta theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) |
| `styles`  | `object` | CSS variables                                                                                                          |

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

## <a name="methods"></a>Methods

| Method | Parameters      | Description      |
| ------ | --------------- | ---------------- |
| `set`  | [Theme](#theme) | Set active theme |
