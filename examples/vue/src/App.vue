<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="active">
      <button
        v-for="theme in themes"
        v-bind:class="{ selected: selected === theme }"
        v-bind:disabled="noThemeSupport(theme)"
        v-bind:key="theme.name"
        v-bind:title="
          noThemeSupport(theme)
            ? 'This theme is not supported by your browser.'
            : `Change theme to ${theme.name}.`"
        v-on:click="setTheme(theme)"
        v-text="theme.name"
      />
    </div>
  </main>
</template>

<script>
import Themer, { auto, system } from "themer.js";
import { light, dark, custom } from "./themer/index.js";

export default {
  data: () => ({
    active: undefined,
    selected: light,
    themes: [light, dark, auto, system, custom]
  }),

  methods: {
    noThemeSupport({ theme }) {
      return theme === "system" && !this.themer.themeSupportCheck();
    },
    setTheme(theme) {
      this.selected = theme;
      this.themer.set(theme);
    }
  },

  mounted() {
    this.themer = new Themer({
      debug: true,
      onUpdate: theme => (this.active = theme),
      themes: { light, dark, auto, system, custom }
    });
    this.themer.set(this.selected);
  }
};
</script>

<style lang="scss">
html {
  background-color: var(--app-background-color, #f1f1f1);
}

body {
  margin: 0;
}

main {
  align-items: center;
  color: var(--primary-text-color, #42b983);
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  filter: var(--logo-filter);
  height: 10rem;
  width: 10rem;
}

div {
  margin-top: 2rem;
}

button {
  background-color: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  outline: 0;

  & + button {
    margin-left: 1rem;
  }

  &:disabled {
    opacity: 0.5;
  }

  &.selected {
    text-decoration: underline;
  }
}
</style>
