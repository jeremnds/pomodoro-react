import { createContext, useEffect, useReducer } from "react";

type StateProps = {
  workTime: number;
  breakTime: number;
  longBreakTime: number;
  breakCount: number;
};

type InitialStateProps = StateProps & {
  handleWorkTime: (value: number) => void;
  handleBreakTime: (value: number) => void;
  handleLongBreakTime: (value: number) => void;
  handleBreakCount: (value: number) => void;
};

const initialState: StateProps = {
  workTime: 25,
  breakTime: 5,
  breakCount: 4,
  longBreakTime: 15,
};

// Récupérer l'état depuis le localStorage ou utiliser l'état par défaut
const getInitialState = (): StateProps => {
  const localState = localStorage.getItem("settings");
  return localState ? JSON.parse(localState) : initialState;
};

const SettingsContext = createContext<InitialStateProps>({
  ...getInitialState(),
  handleWorkTime: () => {},
  handleBreakTime: () => {},
  handleLongBreakTime: () => {},
  handleBreakCount: () => {},
});

type ActionProps = {
  type: string;
  payload?: number;
};

function reducer(state: StateProps, action: ActionProps): StateProps {
  switch (action.type) {
    case "changeWorkTime":
      if (typeof action.payload !== "number") {
        throw new Error("Invalid payload type for changeWorkTime");
      }
      if (action.payload < 1) return state;
      return {
        ...state,
        workTime: action.payload,
      };
    case "changeBreakTime":
      if (typeof action.payload !== "number") {
        throw new Error("Invalid payload type for changeBreakTime");
      }
      if (action.payload < 1) return state;
      return {
        ...state,
        breakTime: action.payload,
      };
    case "changeLongBreakTime":
      if (typeof action.payload !== "number") {
        throw new Error("Invalid payload type for changeLongBreakTime");
      }
      if (action.payload < 1) return state;
      return {
        ...state,
        longBreakTime: action.payload,
      };
    case "changeBreakCount":
      if (typeof action.payload !== "number") {
        throw new Error("Invalid payload type for changeBreakCount");
      }
      if (action.payload < 1) return state;
      return {
        ...state,
        breakCount: action.payload,
      };

    default:
      throw new Error(`Action ${action.type} unknown`);
  }
}

type SettingsProviderProps = {
  children: React.ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const { workTime, breakTime, breakCount, longBreakTime } = state;

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(state));
  }, [state]);

  const handleWorkTime = (value: number) => {
    dispatch({ type: "changeWorkTime", payload: value });
  };

  const handleBreakTime = (value: number) => {
    dispatch({ type: "changeBreakTime", payload: value });
  };
  const handleLongBreakTime = (value: number) => {
    dispatch({ type: "changeLongBreakTime", payload: value });
  };
  const handleBreakCount = (value: number) => {
    dispatch({ type: "changeBreakCount", payload: value });
  };

  return (
    <SettingsContext.Provider
      value={{
        workTime,
        breakTime,
        breakCount,
        longBreakTime,
        handleWorkTime,
        handleBreakCount,
        handleBreakTime,
        handleLongBreakTime,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider };
