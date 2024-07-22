import useSettings from "@/hooks/useSettings";
import useTimer from "@/hooks/useTimer";

const TimerMenu = () => {
  const { active, setActive } = useTimer();

  const { breakTime, longBreakTime, workTime } = useSettings();

  function handlePomo() {
    if (active === "work") return;
    setActive({
      active: "work",
      currentTime: workTime,
      minutes: workTime,
      isStarted: false,
    });
  }

  function handleBreak() {
    if (active === "break") return;
    setActive({
      active: "break",
      currentTime: breakTime,
      minutes: breakTime,
      isStarted: false,
    });
  }

  function handleLongBreak() {
    if (active === "longBreak") return;
    setActive({
      active: "longBreak",
      currentTime: longBreakTime,
      minutes: longBreakTime,
      isStarted: false,
    });
  }

  return (
    <ul className="flex justify-between text-md">
      <button
        className={active === "work" ? "bg-slate-400 px-1 rounded-md" : "px-1"}
        onClick={handlePomo}
      >
        Pomodoro
      </button>
      <button
        className={active === "break" ? "bg-slate-400 px-1 rounded-md" : "px-1"}
        onClick={handleBreak}
      >
        Short Break
      </button>
      <button
        className={
          active === "longBreak" ? "bg-slate-400 px-1 rounded-md" : "px-1"
        }
        onClick={handleLongBreak}
      >
        Long Break
      </button>
    </ul>
  );
};

export default TimerMenu;
