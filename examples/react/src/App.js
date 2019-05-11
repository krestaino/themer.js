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
  { name: "Auto", theme: "auto" },
  { name: "System", theme: "system" },
  { name: "Light", theme: light },
  { name: "Dark", theme: dark },
  { name: "Custom", theme: custom }
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
