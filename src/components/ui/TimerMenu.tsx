import useSettings from "@/hooks/useSettings";
import useTimer from "@/hooks/useTimer";

const TimerMenu = () => {
  const { activeTimer, setActiveTimer } = useTimer();

  const { breakTime, longBreakTime, workTime } = useSettings();

  type Timer = {
    timerKey: typeof activeTimer;
    name: string;
    duration: number;
  };
  const timerList: Timer[] = [
    {
      timerKey: "work",
      name: "Pomodoro",
      duration: workTime,
    },
    {
      timerKey: "break",
      name: "Short break",
      duration: breakTime,
    },
    {
      timerKey: "longBreak",
      name: "Long Break",
      duration: longBreakTime,
    },
  ];

  const handleTimer = (timer: Timer) => {
    const { duration, timerKey } = timer;
    if (activeTimer === timerKey) return;
    setActiveTimer({
      activeTimer: timerKey,
      currentTime: duration,
      minutes: duration,
      isStarted: false,
    });
  };

  return (
    <ul className="flex justify-between text-md">
      {timerList.map((timer) => (
        <button
          key={timer.timerKey}
          className={
            activeTimer === timer.timerKey
              ? "bg-slate-400 px-1 rounded-md"
              : "px-1"
          }
          onClick={() => handleTimer(timer)}
        >
          {timer.name}
        </button>
      ))}
    </ul>
  );
};

export default TimerMenu;
