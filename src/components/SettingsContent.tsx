import useSettings from "@/hooks/useSettings";
import useTimer from "@/hooks/useTimer";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";

export default function SettingsContent() {
  const {
    workTime,
    breakTime,
    longBreakTime,
    breakCount,
    handleWorkTime,
    handleBreakCount,
    handleBreakTime,
    handleLongBreakTime,
  } = useSettings();

  const { setTime, active } = useTimer();

  const [disabled, setDisabled] = useState(false);

  function handleSubmit() {
    if (active === "break") setTime(breakTime);
    if (active === "longBreak") setTime(longBreakTime);
    if (active === "work") setTime(workTime);
  }

  return (
    <>
      <div className="flex items-center gap-1 text-lg text-slate-700">
        <span>
          <IoTimeOutline />
        </span>
        <h2 className="tracking-wider uppercase"> Timer</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <label htmlFor="workTime" className="text-slate-800">
            Pomodoro
          </label>
          <input
            min={1}
            type="number"
            id="workTime"
            className="w-20 px-2 py-1 text-gray-500 border rounded-md bg-slate-100"
            defaultValue={workTime}
            onChange={(e) => {
              if (Number(e.target.value) < 1) {
                setDisabled(true);
              } else {
                setDisabled(false);

                handleWorkTime(Number(e.target.value));
              }
            }}
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="shortBreakTime" className="text-slate-800">
            Short Break
          </label>
          <input
            min={1}
            type="number"
            id="shortBreakTime"
            className="w-20 px-2 py-1 text-gray-500 border rounded-md bg-slate-100"
            defaultValue={breakTime}
            onChange={(e) => {
              if (Number(e.target.value) < 1) {
                setDisabled(true);
              } else {
                setDisabled(false);

                handleBreakTime(Number(e.target.value));
              }
            }}
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="longBreakTime" className="text-slate-800">
            Long Break
          </label>
          <input
            min={1}
            type="number"
            id="longBreakTime"
            className="w-20 px-2 py-1 text-gray-500 border rounded-md bg-slate-100"
            defaultValue={longBreakTime}
            onChange={(e) => {
              if (Number(e.target.value) < 1) {
                setDisabled(true);
              } else {
                setDisabled(false);

                handleLongBreakTime(Number(e.target.value));
              }
            }}
          ></input>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8 mb-10">
        <label htmlFor="breakCount" className="text-slate-800">
          Long Break Interval
        </label>
        <input
          min={1}
          type="number"
          id="breakCount"
          className="w-20 px-2 py-1 text-gray-500 border rounded-md bg-slate-100"
          defaultValue={breakCount}
          onChange={(e) => {
            if (Number(e.target.value) < 1) {
              setDisabled(true);
            } else {
              setDisabled(false);

              handleBreakCount(Number(e.target.value));
            }
          }}
        ></input>
      </div>
      <div className="ml-auto">
        <DialogClose asChild>
          <button
            className="px-4 py-2 text-white uppercase transition-colors duration-200 rounded-lg bg-slate-600 hover:bg-slate-800 disabled:bg-slate-300"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Save change
          </button>
        </DialogClose>
      </div>
    </>
  );
}
