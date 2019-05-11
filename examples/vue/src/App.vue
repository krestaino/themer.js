<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <a
        v-for="obj in themes"
        v-on:click.prevent="$themer.set(obj.theme)"
        v-bind:key="obj.name"
        v-text="obj.name"
        href="#"
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

a {
  color: #42b983;
}

a + a {
  margin-left: 1rem;
}
</style>
