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

### Create the `light` and `dark` themes

To use the `"auto"` or `"system"` themes, you must create two themes called `"light"` and `"dark"`.

```
import Themer from "themer.js";

const themes = {
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

const themer = new Themer({
  themes: { light, dark }
});
```

**See also:** [Theme `object`](#theme)

### Create a custom theme

A custom theme can be called anything, it just needs to be a `string`. For this example, we'll use `"custom"`.

```
import Themer from "themer.js";

const themes = {
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
  },
  "custom": {
    "styles": {
      "--app-background-color": "#d6713e",
      "--primary-text-color": "#180f0a"
    }
  }
}

const themer = new Themer({
  themes: { light, dark, custom }
});
```

### Setting a theme

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

## <a name="api"></a>API

### Themer( config )

- **Arguments:**
  - `{Object} config`
- **Details:** Instantiate Themer.js.
- **Usage:**

  ```
  const themer = new Themer({
    themes: { light, dark, custom },
    debug: true
  });
  ```

- See also: [Config object](#config)

### Themer.set( theme )

- **Arguments:**
  - `{Object | string} theme`
- **Details:** Sets the active theme. Accepts default themes (`"auto"` and `"system"`) `string` or a theme object.
- **Usage:**

  ```
  // set the theme to "auto"
  Themer.set("auto")

  // directly set a theme
  Themer.set({
    "android": "#242835",
    "styles": {
      "--app-background-color": "#242835"
    }
  })
  ```

- **See also:** [Theme `object`](#theme)

### Themer.noSystemThemeSupport()

- **Details:** Helper function to determine browser support for the `system` theme.
- **Returns:** `false` if `prefers-color-scheme` is set, otherwise returns `true`.
- **Usage:**

  ```
  // Chrome 76, Firefox 67, Safari 12.1
  Themer.noSystemThemeSupport()
  ↳ false

  // unsupported browsers
  Themer.noSystemThemeSupport()
  ↳ true
  ```

- See also: [prefers-color-scheme](https://caniuse.com/#feat=prefers-color-scheme)

### <a name="config"></a>Config `object`

| Key      | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `debug`  | `boolean` | Log debug console statements  |
| `themes` | `object`  | User defined [themes](#theme) |

#### Example

```
{
  "debug": true,
  "themes": { light, dark, custom }
}
```

### <a name="theme"></a>Theme `object`

| Key       | Type     | Description                                                                                                                     |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `android` | `string` | Sets the [meta theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) |
| `styles`  | `object` | Your theme's CSS variables                                                                                                      |

#### Example

```
{
  "android": "#242835",
  "styles": {
    "--app-background-color": "#242835",
    "--primary-text-color": "#f1f1f1"
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
