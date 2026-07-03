import { useEffect } from 'react';

/**
 * Custom hook for handling keyboard shortcuts
 */
export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      shortcuts.forEach((shortcut) => {
        const keyCombination = shortcut.key.toLowerCase();
        const isCtrlPressed = e.ctrlKey || e.metaKey;
        const currentKey = e.key.toLowerCase();

        if (keyCombination.includes('ctrl+') && isCtrlPressed && keyCombination.includes(currentKey)) {
          e.preventDefault();
          shortcut.action();
        } else if (currentKey === keyCombination && !isCtrlPressed) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
