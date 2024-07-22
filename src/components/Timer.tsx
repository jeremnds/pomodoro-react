import useSettings from "@/hooks/useSettings";
import useTimer from "@/hooks/useTimer";
import { useEffect, useMemo } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { VscDebugRestart } from "react-icons/vsc";
import audioBird from "../../public/sounds/audio-bird.mp3";
import TimerMenu from "./ui/TimerMenu";

const Timer = () => {
  const {
    minutes,
    seconds,
    isStarted,
    start,
    timer,
    reset,
    setTime,
    active,
    setActive,
    setBreak,
    currentBreak,
  } = useTimer();

  const { breakTime, longBreakTime, workTime, breakCount } = useSettings();

  const startSound = useMemo(() => new Audio(audioBird), []);
  startSound.volume = 0.35;
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStarted) {
        timer();
        if (active === "work" && minutes === 0 && seconds === 0) {
          if (breakCount === 1) {
            setActive({ active: "longBreak" });
            setTime(longBreakTime);
          }
          if (breakCount === currentBreak) {
            setActive({ active: "longBreak" });
            setTime(longBreakTime);
            setBreak(1);
          } else {
            setTime(breakTime);
            setActive({ active: "break" });
            setBreak();
          }
        }
        if (active === "break" && minutes === 0 && seconds === 0) {
          setTime(workTime);
          setActive({ active: "work" });
        }

        if (active === "longBreak" && minutes === 0 && seconds === 0) {
          setTime(workTime);
          setActive({ active: "work" });
        }

        if (minutes === 0 && seconds === 0) {
          startSound.play();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    isStarted,
    timer,
    breakTime,
    active,
    setTime,
    minutes,
    seconds,
    setActive,
    workTime,
    breakCount,
    currentBreak,
    longBreakTime,
    setBreak,
    startSound,
  ]);

  function handleNextBtn() {
    if (active === "work") {
      if (breakCount === currentBreak) {
        setActive({ active: "longBreak" });
        setTime(longBreakTime);
        setBreak(1);
      } else {
        setTime(breakTime);
        setActive({ active: "break" });
        setBreak();
      }
    }

    if (active === "break" || active === "longBreak") {
      setTime(workTime);
      setActive({ active: "work" });
    }
  }

  return (
    <div className="bg-transparent rounded-lg h-96 sm:w-96 sm:m-auto">
      <div className="h-full pt-4 m-auto w-80">
        <TimerMenu />
        <div className="flex items-center justify-center w-full h-48 font-extrabold text-[7.5rem] mt-6 mb-6">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="flex justify-between mt-5 ">
          <button
            className={isStarted ? "" : "invisible"}
            onClick={() => reset()}
          >
            <VscDebugRestart className="text-4xl transition-all duration-300 hover:text-slate-500" />
          </button>
          <button
            className="px-5 py-2 text-lg font-bold uppercase duration-300 bg-transparent rounded-lg transition-background hover:bg-slate-500"
            onClick={() => start()}
          >
            {isStarted ? "Pause" : "Start"}
          </button>
          <button className={isStarted ? "" : "invisible"}>
            <GrFormNextLink
              className="text-5xl transition-all duration-300 hover:text-slate-500"
              onClick={handleNextBtn}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
