// hooks/use-countdown.ts
import { useEffect, useState } from "react";

interface Countdown {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
  isExpired: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

const computeCountdown = (target: Date | null): Countdown => {
  if (!target) {
    return {
      hours: "00",
      minutes: "00",
      seconds: "00",
      totalSeconds: 0,
      isExpired: true,
    };
  }

  const diffSeconds = Math.max(
    0,
    Math.floor((target.getTime() - Date.now()) / 1000),
  );

  return {
    hours: pad(Math.floor(diffSeconds / 3600)),
    minutes: pad(Math.floor((diffSeconds % 3600) / 60)),
    seconds: pad(diffSeconds % 60),
    totalSeconds: diffSeconds,
    isExpired: diffSeconds === 0,
  };
};

export const useCountdown = (target: Date | null): Countdown => {
  const [countdown, setCountdown] = useState(() => computeCountdown(target));

  useEffect(() => {
    if (!target) return;

    setCountdown(computeCountdown(target));
    const interval = setInterval(() => {
      setCountdown(computeCountdown(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target?.getTime()]); // 👈 stable dep

  return countdown;
};
