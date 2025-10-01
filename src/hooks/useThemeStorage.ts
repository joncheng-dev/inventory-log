import { useTheme } from '../contexts/ThemeContext';

/**
 * Custom hook that provides theme management with localStorage persistence
 * @returns Theme management functions and current state
 */
export function useThemeStorage() {
  const { isDarkMode, theme, toggleTheme, setTheme } = useTheme();

  return {
    // Current state
    isDarkMode,
    theme,
    
    // Actions
    toggleTheme,
    setTheme,
    
    // Utility functions
    isLight: theme === 'light',
    isDark: theme === 'dark',
    
    // Theme-specific class helpers
    getThemeClasses: (lightClass: string, darkClass: string) => 
      isDarkMode ? darkClass : lightClass,
  };
}
