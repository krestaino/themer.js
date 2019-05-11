import React from "react";
import logo from "./assets/logo.svg";
import "./App.css";

// Themer.js setup
import Themer from "themer.js";
import { light, dark, custom } from "./themes/index.js";

const themer = new Themer({
  themes: { light, dark, custom },
  debug: true
});

const themes = [
  { name: "Auto", theme: "auto", icon: "🌗" },
  { name: "System", theme: "system", icon: "💻" },
  { name: "Light", theme: light, icon: "🌞" },
  { name: "Dark", theme: dark, icon: "🌒" },
  { name: "Custom", theme: custom, icon: "🎨" }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {themes.map(obj => (
            <button onClick={() => themer.set(obj.theme)} key={obj.name}>
              {obj.name}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
