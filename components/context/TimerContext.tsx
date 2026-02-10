"use client";

import * as React from "react";

const DEFAULT_SECONDS = 2 * 60 * 60 + 10 * 60 + 15; // 02:10:15

type TimerContextValue = {
  remainingSeconds: number;
  isRunning: boolean;
  setTime: (hours: number, minutes: number, seconds: number) => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

const TimerContext = React.createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [initialTimeSeconds, setInitialTimeSeconds] =
    React.useState(DEFAULT_SECONDS);
  const [remainingSeconds, setRemainingSeconds] =
    React.useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = React.useState(false);

  const setTime = React.useCallback(
    (hours: number, minutes: number, seconds: number) => {
      const total =
        hours * 3600 + minutes * 60 + Math.min(59, Math.max(0, seconds));
      setInitialTimeSeconds(total);
      setRemainingSeconds(total);
      setIsRunning(false);
    },
    []
  );

  const start = React.useCallback(() => setIsRunning(true), []);
  const stop = React.useCallback(() => setIsRunning(false), []);
  const reset = React.useCallback(() => {
    setRemainingSeconds(initialTimeSeconds);
    setIsRunning(false);
  }, [initialTimeSeconds]);

  // Countdown: tick every second when running
  React.useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) return;

    const id = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [isRunning, remainingSeconds]);

  const value = React.useMemo(
    () => ({
      remainingSeconds,
      isRunning,
      setTime,
      start,
      stop,
      reset,
    }),
    [remainingSeconds, isRunning, setTime, start, stop, reset]
  );

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

export function useTimer() {
  const ctx = React.useContext(TimerContext);
  if (!ctx) throw new Error("useTimer must be used within TimerProvider");
  return ctx;
}
