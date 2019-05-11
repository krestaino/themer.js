<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <a v-for="obj in themes" @click.prevent="$themer(obj.theme)" :key="obj.name">{{ obj.name }}</a>
  </div>
</template>

<script>
import { light, dark, custom } from "./themes/index.js";

export default {
  name: "app",
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
