import { useThemeStorage } from '../hooks/useThemeStorage';
import { getStoredTheme, clearStoredTheme } from '../utils/themeUtils';

export default function ThemeDebug() {
  const { theme, isDarkMode, toggleTheme, setTheme } = useThemeStorage();

  const handleClearStorage = () => {
    clearStoredTheme();
    // Reset to system preference
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-theme border border-theme rounded-lg shadow-lg text-theme-primary text-sm">
      <h3 className="font-semibold mb-2">Theme Debug</h3>
      <div className="space-y-1">
        <p>Current theme: <span className="font-mono">{theme}</span></p>
        <p>Is dark mode: <span className="font-mono">{isDarkMode.toString()}</span></p>
        <p>Stored theme: <span className="font-mono">{getStoredTheme() || 'none'}</span></p>
      </div>
      <div className="mt-3 space-x-2">
        <button
          onClick={toggleTheme}
          className="px-2 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600"
        >
          Toggle
        </button>
        <button
          onClick={() => setTheme('light')}
          className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="px-2 py-1 bg-gray-800 text-white rounded text-xs hover:bg-gray-700"
        >
          Dark
        </button>
        <button
          onClick={handleClearStorage}
          className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
