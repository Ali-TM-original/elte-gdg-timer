"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useTimer } from "@/components/context/TimerContext";

type CustomTimeModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const CustomTimeModalContext =
  createContext<CustomTimeModalContextValue | null>(null);

export function CustomTimeModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <CustomTimeModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && <CustomTimeModal onClose={closeModal} />}
    </CustomTimeModalContext.Provider>
  );
}

function CustomTimeModal({ onClose }: { onClose: () => void }) {
  return (
    <dialog open className="modal">
      <div className="modal-box bg-white text-neutral-800 shadow-xl">
        <h3 className="text-lg font-bold">Set custom time</h3>
        <p className="py-2 text-sm text-neutral-600">
          Enter hours, minutes, and seconds for the countdown.
        </p>

        <CustomTimeForm onClose={onClose} />
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose} aria-label="Close">
          close
        </button>
      </form>
    </dialog>
  );
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function CustomTimeForm({ onClose }: { onClose: () => void }) {
  const { setTime } = useTimer();

  const [time, setTimeState] = useState({
    hours: 0,
    minutes: 10,
    seconds: 0,
  });

  const update = (key: keyof typeof time, val: number) => {
    setTimeState((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTime(
      clamp(time.hours, 0, 23),
      clamp(time.minutes, 0, 59),
      clamp(time.seconds, 0, 59),
    );

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      <div className="flex flex-wrap items-end gap-4">
        <TimeInput
          label="Hours"
          min={0}
          max={23}
          value={time.hours}
          onChange={(v) => update("hours", v)}
        />

        <TimeInput
          label="Minutes"
          min={0}
          max={59}
          value={time.minutes}
          onChange={(v) => update("minutes", v)}
        />

        <TimeInput
          label="Seconds"
          min={0}
          max={59}
          value={time.seconds}
          onChange={(v) => update("seconds", v)}
        />
      </div>

      <div className="modal-action">
        <button
          type="button"
          className="btn btn-ghost text-neutral-600 hover:bg-neutral-100"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn bg-[#6B8BFF] text-white border-none hover:bg-[#5a7aeb]"
        >
          Set time
        </button>
      </div>
    </form>
  );
}

type TimeInputProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function TimeInput({ label, value, min, max, onChange }: TimeInputProps) {
  return (
    <div className="form-control w-24 shrink-0">
      <label className="label">
        <span className="label-text text-neutral-600">{label}</span>
      </label>

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="input input-bordered input-neutral w-full bg-white text-neutral-800"
      />

      <p className="text-neutral-500 text-xs mt-1">
        {min}–{max}
      </p>
    </div>
  );
}

export function useCustomTimeModal() {
  const ctx = useContext(CustomTimeModalContext);

  if (!ctx) {
    throw new Error(
      "useCustomTimeModal must be used within CustomTimeModalProvider",
    );
  }

  return ctx;
}
