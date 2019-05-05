# Themer.js

## Demo

[themer.js.kmr.io](https://themer.js.kmr.io) (Source can be found under the `example` folder.)

## Quick Start

### Install

```
# using npm
$ npm install react-themer.js

# using yarn
$ yarn add react-themer.js
```

### Usage

```
import Themer from "react-themer.js";

<Themer theme="auto">
  ...
</Themer>
```

## Themes

| Theme      | CSS Selector       | Description                                                                                             |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| `auto`     |                    | Uses geoloction to find sunset and sunrise times and automatically sets the theme to `light` or `dark`. |
| `system`   |                    | Uses system theme. Relies on [prefers-color-scheme](https://caniuse.com/#search=prefers-color-scheme).  |
| `light`    | `themer--light`    | Sets the theme to `light`.                                                                              |
| `dark`     | `themer--dark`     | Sets the theme to `dark`.                                                                               |
| `<STRING>` | `themer--<STRING>` | Sets the theme to `<STRING>`. Use to set custom themes.                                                 |

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
