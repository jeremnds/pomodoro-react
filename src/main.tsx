import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SettingsProvider } from "./context/SettingsContext.tsx";
import { TimerProvider } from "./context/TimerContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SettingsProvider>
    <TimerProvider>
      <App />
    </TimerProvider>
  </SettingsProvider>
);
