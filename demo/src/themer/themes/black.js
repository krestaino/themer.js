import { hopscotch } from "react-syntax-highlighter/dist/styles/hljs";

export default {
  name: "Black",
  icon: "⚫",
  syntax: hopscotch,
  theme: {
    android: "#000",
    styles: {
      "--app-background-color": "#000",
      "--primary-text-color": "#eee",
      "--primary-accent-color": "#8fc13e",
      "--primary-link-color": "var(--primary-accent-color)",
      "--header-background-color": "#000",
      "--button-border-color": "rgba(255, 255, 255, 0.1)",
      "--button-background-color": "#000",
      "--button-text-color": "#eee",
      "--button-active-border-color": "var(--primary-accent-color)",
      "--table-pre-background-color": "rgba(255, 255, 255, 0.05)",
      "--table-zebra-background-color": "rgba(255, 255, 255, 0.02)",
      "--code-background-color": "rgba(255, 255, 255, 0.1)",
      "--selection-background-color": "var(--primary-accent-color)",
      "--selection-color": "#fff"
    }
  }
};
