"use client";

import DigitBox from "@/components/DigitBox";
import { useTimer } from "@/components/context/TimerContext";

export default function Home() {
  const { remainingSeconds } = useTimer();

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const toTwoDigits = (value: number) =>
    value.toString().padStart(2, "0").split("");

  const [hoursFirst, hoursSecond] = toTwoDigits(hours);
  const [minutesFirst, minutesSecond] = toTwoDigits(minutes);
  const [secondsFirst, secondsSecond] = toTwoDigits(seconds);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <section className="w-full max-w-5xl py-12 px-6 sm:px-10 md:px-14 flex flex-col items-center justify-center text-center">
        <div className="space-y-2 mb-10">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Welcome to GDG Hackathon 2026!
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Have Fun Relax and Hack On!!
          </p>
        </div>

        <div className="flex items-start justify-center gap-4 sm:gap-6 md:gap-10 mb-10">
          <div className="flex flex-col items-center">
            <div className="flex gap-2">
              <DigitBox digit={hoursFirst} />
              <DigitBox digit={hoursSecond} />
            </div>
            <p className="mt-3 text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase">
              hours
            </p>
          </div>

          <div className="flex flex-col items-center justify-center pt-4 sm:pt-5 md:pt-6">
            <span className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              :
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex gap-2">
              <DigitBox digit={minutesFirst} />
              <DigitBox digit={minutesSecond} />
            </div>
            <p className="mt-3 text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase">
              minutes
            </p>
          </div>

          <div className="flex flex-col items-center justify-center pt-4 sm:pt-5 md:pt-6">
            <span className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              :
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex gap-2">
              <DigitBox digit={secondsFirst} />
              <DigitBox digit={secondsSecond} />
            </div>
            <p className="mt-3 text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase">
              seconds
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm sm:text-base md:text-lg">
          <p className="opacity-90">some small description here</p>
          <p className="opacity-90">
            Meanwhile have some tea and a snacks to keep you busy
          </p>
        </div>
      </section>
    </main>
  );
}
