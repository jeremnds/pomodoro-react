// import startSound from "./assets/startSound.wav";
import { useEffect } from "react";
import Timer from "./components/Timer";
import Header from "./components/ui/Header";
import Layout from "./components/ui/Layout";
import useSettings from "./hooks/useSettings";
import useTimer from "./hooks/useTimer";

function App() {
  const { isStarted, minutes, seconds, activeTimer, setActiveTimer } =
    useTimer();
  const { workTime } = useSettings();
  const favicon = document.getElementById("favicon") as HTMLLinkElement;

  useEffect(() => {
    setActiveTimer({
      activeTimer: "work",
      currentTime: workTime,
      minutes: workTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isStarted) {
    if (activeTimer === "work") {
      document.title = `${minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      } - Time to focus`;
    } else {
      document.title = `${minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      } - Time to rest`;
    }
  } else {
    document.title = "Pomodoro";
    favicon.href = "./assets/favicon-16x16.png";
  }

  if (activeTimer === "break")
    favicon.href = "./assets/favicon-green-16x16.png";
  if (activeTimer === "longBreak")
    favicon.href = "./assets/favicon-blue-16x16.png";

  return (
    <Layout>
      <Header />
      <Timer />
    </Layout>
  );
}

export default App;
