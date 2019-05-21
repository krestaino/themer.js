<template>
  <main>
    <img alt="Vue logo" src="./assets/vue-logo.svg">
    <section v-if="active">
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
    </section>
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

<style>
html {
  background-color: var(--app-background-color, #f1f1f1);
}

main {
  color: var(--primary-text-color, #61dafb);
}

img {
  filter: var(--logo-filter);
}
</style>
