<script>
  import Themer, { auto, system } from "themer.js";
  import { light, dark, custom } from "./themer/index.js";

  const state = {
    active: undefined,
    selected: light,
    themes: [light, dark, auto, system, custom]
  };

  const themer = new Themer({
    debug: true,
    onUpdate: theme => (state.active = theme),
    themes: { light, dark, auto, system, custom }
  });

  function noThemeSupport({ theme }) {
    return theme === "system" && !themer.themeSupportCheck();
  }

  function setTheme(theme) {
    state.selected = theme;
    themer.set(theme);
  }

  themer.set(state.selected);
</script>

<style>
  :global(html) {
    background-color: var(--app-background-color, #f1f1f1);
  }

  main {
    color: var(--primary-text-color, #61dafb);
  }

  img {
    filter: var(--logo-filter);
  }
</style>

<main>
  <img alt="Svelte logo" src="assets/svelte-logo.svg" />
  <section>
    {#each state.themes as theme}
      <button
        class={state.selected === theme ? 'selected' : undefined}
        disabled={noThemeSupport(theme)}
        key={theme.name}
        title={noThemeSupport(theme) ? 'This theme is not supported by your browser.' : `Change theme to ${theme.name}.`}
        on:click={() => setTheme(theme)}>
         {theme.name}
      </button>
    {/each}
  </section>
</main>
