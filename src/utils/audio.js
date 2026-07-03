// Audio Utilities for Alarms and Notifications

const audioContext = (() => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  } catch (e) {
    console.warn('AudioContext not supported:', e);
    return null;
  }
})();

// Play a simple beep tone
export const playBeep = (frequency = 800, duration = 200, volume = 0.5) => {
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(volume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

  oscillator.start(now);
  oscillator.stop(now + duration / 1000);
};

// Play warning sound (5-minute warning)
export const playWarning5Min = () => {
  if (!audioContext) return;
  
  // Soft bell pattern
  playBeep(523, 200, 0.3); // C5
  setTimeout(() => playBeep(659, 200, 0.3), 250); // E5
};

// Play urgent sound (1-minute warning)
export const playWarning1Min = () => {
  if (!audioContext) return;
  
  // Urgent beep pattern
  playBeep(1000, 150, 0.4);
  setTimeout(() => playBeep(1000, 150, 0.4), 200);
  setTimeout(() => playBeep(1000, 150, 0.4), 400);
};

// Play alarm sound (time expired)
export const playAlarmExpired = () => {
  if (!audioContext) return;
  
  // Loud alarm pattern
  const frequencies = [800, 1200, 800, 1200, 800, 1200];
  let delay = 0;
  
  frequencies.forEach((freq) => {
    setTimeout(() => playBeep(freq, 200, 0.6), delay);
    delay += 250;
  });
};

// Vibration feedback
export const vibrate = (pattern = 100) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

export const vibrationWarning5Min = () => {
  vibrate([100, 50, 100]); // 3 short pulses
};

export const vibrationWarning1Min = () => {
  vibrate([200, 100, 200, 100, 200]); // 5 rapid pulses
};

export const vibrationExpired = () => {
  vibrate([300, 100, 300, 100, 300, 100, 300]); // Heavy pattern
};
