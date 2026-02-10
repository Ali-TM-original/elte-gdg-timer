"use client";

import { useRegisterActions } from "kbar";
import { useTimer } from "@/components/context/TimerContext";
import { useCallback } from "react";

const PRESETS: { id: string; name: string; h: number; m: number; s: number }[] =
  [
    { id: "set-2h10m", name: "2 hours 10 minutes", h: 2, m: 10, s: 0 },
    { id: "set-1h", name: "1 hour", h: 1, m: 0, s: 0 },
    { id: "set-30m", name: "30 minutes", h: 0, m: 30, s: 0 },
    { id: "set-15m", name: "15 minutes", h: 0, m: 15, s: 0 },
    { id: "set-5m", name: "5 minutes", h: 0, m: 5, s: 0 },
    { id: "set-1m", name: "1 minute", h: 0, m: 1, s: 0 },
  ];

export default function RegisterTimerActions() {
  const { setTime, start, stop, reset } = useTimer();

  // I don't know about this yet will have to think of how to do a custom timer
  const setCustomTime = useCallback(() => {
    const h = parseInt(window.prompt("Hours (0–23)?", "0") ?? "0", 10) || 0;
    const m = parseInt(window.prompt("Minutes (0–59)?", "10") ?? "10", 10) || 0;
    const s = parseInt(window.prompt("Seconds (0–59)?", "0") ?? "0", 10) || 0;
    setTime(h, m, s);
  }, [setTime]);

  useRegisterActions(
    [
      ...PRESETS.map((p) => ({
        id: p.id,
        name: p.name,
        keywords: "timer set time",
        section: "Timer",
        perform: () => setTime(p.h, p.m, p.s),
      })),
      {
        id: "set-custom",
        name: "Set custom time…",
        keywords: "timer set custom",
        section: "Timer",
        perform: setCustomTime,
      },
      {
        id: "start_timer",
        name: "Start timer",
        shortcut: ["s"],
        keywords: "timer start run",
        section: "Timer",
        perform: start,
      },
      {
        id: "stop_timer",
        name: "Stop timer",
        shortcut: ["x"],
        keywords: "timer stop pause",
        section: "Timer",
        perform: stop,
      },
      {
        id: "reset_timer",
        name: "Reset timer",
        shortcut: ["r"],
        keywords: "timer reset",
        section: "Timer",
        perform: reset,
      },
    ],
    [setTime, start, stop, reset, setCustomTime],
  );

  return null;
}
