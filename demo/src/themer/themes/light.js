import { atomOneLight } from "react-syntax-highlighter/dist/styles/hljs";

export default {
  name: "Light",
  icon: "🌞",
  syntax: atomOneLight,
  theme: {
    android: "#eee",
    styles: {
      "--app-background-color": "#f1f1f1",
      "--primary-text-color": "#555",
      "--primary-accent-color": "#056fb6",
      "--primary-link-color": "var(--primary-accent-color)",
      "--header-background-color": "#eee",
      "--button-border-color": "#ddd",
      "--button-background-color": "#fff",
      "--button-text-color": "#666",
      "--button-active-border-color": "var(--primary-accent-color)",
      "--table-pre-background-color": "#e6e6e6",
      "--table-zebra-background-color": "rgba(0, 0, 0, 0.05)",
      "--code-background-color": "rgba(0, 0, 0, 0.075)",
      "--selection-background-color": "var(--primary-accent-color)",
      "--selection-color": "#fff"
    }
  }
};
