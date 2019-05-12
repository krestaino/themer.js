import { atomOneDark } from "react-syntax-highlighter/dist/styles/hljs";

export default {
  name: "Dark",
  icon: "🌒",
  syntax: atomOneDark,
  android: "#2d303c",
  styles: {
    "--app-background-color": "#242835",
    "--primary-text-color": "#f1f1f1",
    "--primary-accent-color": "#056fb6",
    "--primary-link-color": "var(--primary-accent-color)",
    "--header-background-color": "#2d303c",
    "--button-border-color": "#464d5f",
    "--button-background-color": "#393e4d",
    "--button-text-color": "#f1f1f1",
    "--button-active-border-color": "var(--primary-accent-color)",
    "--table-pre-background-color": "#323340",
    "--table-zebra-background-color": "rgba(255, 255, 255, 0.04)",
    "--code-background-color": "rgba(255, 255, 255, 0.1)"
  }
};
