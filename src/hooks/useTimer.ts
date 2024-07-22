import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("TimerContext was used outside TimerContextProvider");
  }
  return context;
}

export default useTimer;
