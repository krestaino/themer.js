import { gruvboxLight } from "react-syntax-highlighter/dist/styles/hljs";

export default {
  name: "Custom",
  icon: "🎨",
  syntax: gruvboxLight,
  android: "#b95c2f",
  styles: {
    "--app-background-color": "#fbf1c7",
    "--primary-text-color": "#403c28",
    "--primary-accent-color": "#ff9800",
    "--primary-link-color": "var(--primary-accent-color)",
    "--header-background-color": "#fff9df",
    "--button-border-color": "#928b69",
    "--button-background-color": "var(--table-pre-background-color)",
    "--button-text-color": "#403c28",
    "--button-active-border-color": "var(--primary-accent-color)",
    "--table-pre-background-color": "#eae0ae",
    "--table-zebra-background-color": "rgba(0, 0, 0, 0.05)",
    "--code-background-color": "rgba(0, 0, 0, 0.075)"
  }
};
