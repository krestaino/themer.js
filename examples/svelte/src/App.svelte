<script>
  import Themer, { auto, system } from "themer.js";
  import { light, dark, custom } from "./themer/index.js";

  export const state = {
    active: undefined,
    selected: light,
    themes: [light, dark, auto, system, custom]
  };

  function noThemeSupport({ theme }) {
    return theme === "system" && !themer.themeSupportCheck();
  }

  function setTheme(theme) {
    state.selected = theme;
    themer.set(theme);
  }

  export const themer = new Themer({
    debug: true,
    onUpdate: theme => (state.active = theme),
    themes: { light, dark, auto, system, custom }
  });
  themer.set(state.selected);
</script>

<main>
  <img alt="Svelte logo" src="assets/logo.png" />
  <div>
    {#each state.themes as theme}
      <button
        class={state.selected === theme ? 'active' : undefined}
        disabled={noThemeSupport(theme)}
        key={theme.name}
        title={noThemeSupport(theme) ? 'This theme is not supported by your browser.' : `Change theme to ${theme.name}.`}
        on:click={() => setTheme(theme)}>
         {theme.name}
      </button>
    {/each}
  </div>
</main>
