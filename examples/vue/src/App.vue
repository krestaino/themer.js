<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <button
        v-for="obj in themes"
        v-on:click="$themer.set(obj.theme)"
        v-bind:key="obj.name"
        v-text="obj.name"
      />
    </div>
  </main>
</template>

<script>
import { light, dark, custom } from "./themes/index.js";

export default {
  data() {
    return {
      themes: [
        { name: "Auto", theme: "auto" },
        { name: "System", theme: "system" },
        { name: "Light", theme: light },
        { name: "Dark", theme: dark },
        { name: "Custom", theme: custom }
      ]
    };
  }
};
</script>

<style>
html {
  background-color: var(--app-background-color);
}

body {
  margin: 0;
}

main {
  align-items: center;
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-height: 10rem;
}

div {
  margin-top: 2rem;
}

button {
  background-color: transparent;
  border: 0;
  color: #42b983;
  cursor: pointer;
  font-size: 1rem;
}

button + button {
  margin-left: 1rem;
}
</style>
