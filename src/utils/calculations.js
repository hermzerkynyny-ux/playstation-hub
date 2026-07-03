// Calculation Utilities

export const calculateRatePerMinute = (baseRatePerHour = 2000) => {
  return baseRatePerHour / 60;
};

export const calculateCostForDuration = (minutes, baseRatePerHour = 2000) => {
  const ratePerMinute = calculateRatePerMinute(baseRatePerHour);
  return Math.round(ratePerMinute * minutes);
};

export const calculateRemainingTime = (startTime, totalMinutesPaid) => {
  const now = new Date();
  const start = new Date(startTime);
  const elapsedMinutes = Math.floor((now - start) / 1000 / 60);
  const remainingMinutes = Math.max(0, totalMinutesPaid - elapsedMinutes);
  
  return {
    elapsedMinutes,
    remainingMinutes,
    totalMinutes: totalMinutesPaid,
  };
};

export const calculateSessionCost = (startTime, endTime, ratePerMinute) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMinutes = (end - start) / 1000 / 60;
  return Math.round(durationMinutes * ratePerMinute);
};

export const generateSessionId = () => {
  const date = new Date();
  const timestamp = date.getTime();
  const random = Math.floor(Math.random() * 1000);
  return `session_${timestamp}_${random}`;
};

export const generateRevenueId = () => {
  const date = new Date().toISOString().split('T')[0];
  return `revenue_${date}`;
};
