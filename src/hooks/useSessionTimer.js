import { useEffect, useState } from 'react';

/**
 * Custom hook for managing session timers
 * Counts down remaining time and triggers warnings
 */
export const useSessionTimer = (session, onWarning5Min, onWarning1Min, onExpired) => {
  const [remainingTime, setRemainingTime] = useState(session.remainingMinutes * 60);
  const [hasWarned5Min, setHasWarned5Min] = useState(false);
  const [hasWarned1Min, setHasWarned1Min] = useState(false);

  useEffect(() => {
    if (session.isPaused || remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;

        // 5 minute warning
        if (newTime === 300 && !hasWarned5Min) {
          setHasWarned5Min(true);
          onWarning5Min?.();
        }

        // 1 minute warning
        if (newTime === 60 && !hasWarned1Min) {
          setHasWarned1Min(true);
          onWarning1Min?.();
        }

        // Expired
        if (newTime <= 0) {
          onExpired?.();
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [session.isPaused, hasWarned5Min, hasWarned1Min, onWarning5Min, onWarning1Min, onExpired]);

  return {
    minutes: Math.floor(remainingTime / 60),
    seconds: remainingTime % 60,
  };
};
