import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("SettingsContext was used outside SettingsContextProvider");
  }
  return context;
}

export default useSettings;
