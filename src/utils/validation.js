// Validation Utilities

export const validatePlayerName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Player name is required' };
  }
  if (name.length > 50) {
    return { valid: false, error: 'Player name is too long (max 50 characters)' };
  }
  return { valid: true };
};

export const validateDuration = (minutes) => {
  if (!minutes || minutes <= 0) {
    return { valid: false, error: 'Duration must be greater than 0' };
  }
  if (minutes < 30) {
    return { valid: false, error: 'Minimum duration is 30 minutes' };
  }
  if (minutes > 480) {
    return { valid: false, error: 'Maximum duration is 8 hours (480 minutes)' };
  }
  return { valid: true };
};

export const validateStationName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Station name is required' };
  }
  if (name.length > 50) {
    return { valid: false, error: 'Station name is too long' };
  }
  return { valid: true };
};

export const validateGameSelection = (gameId) => {
  if (!gameId) {
    return { valid: false, error: 'Please select a game' };
  }
  return { valid: true };
};
