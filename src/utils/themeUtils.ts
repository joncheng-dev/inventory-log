const THEME_STORAGE_KEY = 'inventory-log-theme';

/**
 * Get the saved theme from localStorage
 * @returns 'light' | 'dark' | null if not found
 */
export function getStoredTheme(): 'light' | 'dark' | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return parsed ? 'dark' : 'light';
    }
  } catch (error) {
    console.warn('Failed to get stored theme:', error);
  }
  return null;
}

/**
 * Save theme to localStorage
 * @param isDarkMode - Whether dark mode is enabled
 */
export function saveTheme(isDarkMode: boolean): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
  } catch (error) {
    console.warn('Failed to save theme:', error);
  }
}

/**
 * Clear stored theme from localStorage
 */
export function clearStoredTheme(): void {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear stored theme:', error);
  }
}

/**
 * Check if system prefers dark mode
 * @returns boolean indicating if system prefers dark mode
 */
export function getSystemThemePreference(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
