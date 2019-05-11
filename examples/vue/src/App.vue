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
        { name: "Auto", theme: "auto", icon: "🌗" },
        { name: "System", theme: "system", icon: "💻" },
        { name: "Light", theme: light, icon: "🌞" },
        { name: "Dark", theme: dark, icon: "🌒" },
        { name: "Custom", theme: custom, icon: "🎨" }
      ]
    };
  }
};
</script>

<style>
html {
  background-color: var(--app-background-color);
}

main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
