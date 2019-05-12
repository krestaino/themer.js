# Themer.js

Spice up your app with themes. Themer.js features include:

- Automatic night/day theme switching
- System [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) support
- Android [meta theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) support
- Custom themes
- Manual control over everything

## Demo

[https://themer.js.kmr.io](https://themer.js.kmr.io)

## Quick Start

### Install

```
# using yarn
$ yarn add themer.js

# using npm
$ npm install themer.js
```

### Define the `light` and `dark` themes

To use the `auto` or `system` themes, you must define a `light` and `dark` [Theme object](#theme).

```
import Themer from "themer.js";

const config = {
  "light": {
    "styles": {
      "--app-background-color": "#f1f1f1",
      "--primary-text-color": "#555"
    }
  },
  "dark": {
    "styles": {
      "--app-background-color": "#242835",
      "--primary-text-color": "#f1f1f1"
    }
  }
}

// instantiate Themer.js
const themer = new Themer(config);
```

### Setting a theme

```
import Themer from "themer.js";
import { light, dark } from "./themes/index.js";

const themer = new Themer({ light, dark });

// set theme to dark
themer.setTheme(dark)

// set theme to auto
themer.setAuto()

// set theme to system
themer.setSystem()
```

### Create a custom theme

A custom theme can be called anything, just include a valid [Theme `object`](#theme) to the themes array. For this example, we'll use `"custom"`.

```
import Themer from "themer.js";
import { custom } from "./themes/index.js";

const themer = new Themer();

themer.set(custom)
```

## <a name="api"></a>API

### Themer( config )

- **Arguments:**
  - `{Object} config`
- **Details:** Instantiate Themer.js.
- **Usage:**

  ```
  const themer = new Themer({
    light,
    dark,
    debug: true,
    onUpdate: (theme) => console.log(theme)
  });
  ```

- See also: [Config object](#config)

### Themer.setAuto()

- **Details:** Sets the active theme to `light` during the day and `dark` during the night.
- **Restrictions:**
  - `light` and `dark` themes must be defined.
  - Requires user geolocation consent.
- **Usage:**

  ```
  Themer.setAuto()
  ```

### Themer.setSystem()

- **Details:** Sets the active theme to `system`.
- **Restriction:**
  - `light` and `dark` themes must be defined.
  - The browser must support [prefers-color-scheme](https://caniuse.com/#feat=prefers-color-scheme).
- **Usage:**

  ```
  Themer.setSystem()
  ```

### Themer.setTheme( theme )

- **Arguments:**
  - `{Object | string} theme`
- **Details:** Sets the active theme.
- **Usage:**

  ```
  const dark = {
    "android": "#242835",
    "styles": {
      "--app-background-color": "#242835"
    }
  }

  Themer.setTheme(dark)
  ```

- **See also:** [Theme `object`](#theme)

### Themer.systemThemeSupport()

- **Details:** Helper function to determine browser support for the `system` theme.
- **Returns:** `boolean`
- **Usage:**

  ```
  // Chrome 76, Firefox 67, Safari 12.1
  Themer.systemThemeSupport()
  ↳ true

  // unsupported browsers
  Themer.systemThemeSupport()
  ↳ false
  ```

- See also: [prefers-color-scheme](https://caniuse.com/#feat=prefers-color-scheme)

### <a name="config"></a>Config `object`

| Key        | Type       | Description                                       |
| ---------- | ---------- | ------------------------------------------------- |
| `debug`    | `boolean`  | Log debug console statements.                     |
| `onUpdate` | `function` | A callback function that returns the set `theme`. |
| `light`    | `object`   | User defined light [theme](#theme).               |
| `dark`     | `object`   | User defined dark [theme](#theme).                |

#### Example

```
{
  "debug": true,
  "themes": [ light, dark, custom ]
}
```

### <a name="theme"></a>Theme `object`

| Key       | Type     | Description                                                                                                                      |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `name`    | `string` | Unique identifier for the theme.                                                                                                 |
| `android` | `string` | Sets the [meta theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android). |
| `styles`  | `object` | Your theme's CSS variables.                                                                                                      |

#### Example

```
{
  "android": "#f1f1f1",
  "styles": {
    "--app-background-color": "#f1f1f1",
    "--primary-text-color": "#555"
  }
}
```

You reference this variable anywhere in your CSS and it will update in real time to the active theme.

```
html {
  background-color: var(--app-background-color);
  color: var(--primary-text-color);
}
```
