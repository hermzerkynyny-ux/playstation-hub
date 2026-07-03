// Formatting Utilities

export const formatCurrency = (amount, currency = 'UGX') => {
  const formatter = new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

export const formatTimeRemaining = (minutes, seconds = 0) => {
  const totalSeconds = minutes * 60 + seconds;
  const displayMinutes = Math.floor(totalSeconds / 60);
  const displaySeconds = totalSeconds % 60;
  
  return `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-UG', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatDateOnly = (date) => {
  return new Intl.DateTimeFormat('en-UG', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
};

export const formatTimeOnly = (date) => {
  return new Intl.DateTimeFormat('en-UG', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
