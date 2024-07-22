import { createContext, ReactNode, useReducer } from "react";

// Type for the state
type StateProps = {
  isStarted: boolean;
  minutes: number;
  seconds: number;
  currentTime: number;
  currentBreak: number;
  active: "work" | "break" | "longBreak";
};

// Type for the context value
type TimerContextProps = StateProps & {
  timer: () => void;
  start: () => void;
  reset: () => void;
  setActive: (value: {
    active: "work" | "break" | "longBreak";
    currentTime?: number;
    minutes?: number;
    isStarted?: boolean;
  }) => void;
  setTime: (value: number) => void;
  setBreak: (value?: number) => void;
};

// Initial state
const initialState: StateProps = {
  isStarted: false,
  currentTime: 25,
  minutes: 25,
  seconds: 0,
  currentBreak: 1,
  active: "work",
};

const TimerContext = createContext<TimerContextProps>({
  ...initialState,
  timer: () => {},
  start: () => {},
  reset: () => {},
  setActive: () => {},
  setTime: () => {},
  setBreak: () => {},
});

// Type for actions
type ActionProps =
  | { type: "start" }
  | { type: "reset" }
  | { type: "timer" }
  | {
      type: "setActive";
      payload: {
        active: "work" | "break" | "longBreak";
        currentTime?: number;
        minutes?: number;
        isStarted?: boolean;
      };
    }
  | { type: "setBreak"; payload?: number }
  | { type: "setTime"; payload: number };

function reducer(state: StateProps, action: ActionProps): StateProps {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isStarted: !state.isStarted,
      };
    case "reset":
      return {
        ...state,
        minutes: state.currentTime,
        seconds: 0,
      };
    case "timer":
      if (state.seconds > 0) return { ...state, seconds: state.seconds - 1 };
      if (state.seconds === 0 && state.minutes !== 0) {
        return {
          ...state,
          seconds: 59,
          minutes: state.minutes - 1,
        };
      }

      return state;

    case "setActive":
      return {
        ...state,
        ...action.payload,
        seconds: 0,
      };
    case "setTime":
      return {
        ...state,
        minutes: action.payload,
        currentTime: action.payload,
        seconds: 0,
      };
    case "setBreak":
      if (action.payload) return { ...state, currentBreak: action.payload };
      return {
        ...state,
        currentBreak: state.currentBreak + 1,
      };

    default:
      throw new Error(`Action unknown`);
  }
}

type TimerProviderProps = {
  children: ReactNode;
};

function TimerProvider({ children }: TimerProviderProps) {
  const [
    { isStarted, minutes, seconds, currentTime, active, currentBreak },
    dispatch,
  ] = useReducer(reducer, initialState);

  const timer = () => dispatch({ type: "timer" });
  const start = () => dispatch({ type: "start" });
  const reset = () => dispatch({ type: "reset" });
  const setActive = (value: {
    active: "work" | "break" | "longBreak";
    currentTime?: number;
    minutes?: number;
    isStarted?: boolean;
  }) => dispatch({ type: "setActive", payload: value });
  const setTime = (value: number) =>
    dispatch({ type: "setTime", payload: value });
  const setBreak = (value?: number) =>
    dispatch({ type: "setBreak", payload: value });

  return (
    <TimerContext.Provider
      value={{
        currentTime,
        isStarted,
        minutes,
        seconds,
        timer,
        start,
        reset,
        setActive,
        setTime,
        currentBreak,
        active,
        setBreak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext, TimerProvider };
