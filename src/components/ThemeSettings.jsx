import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSettings = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className="flex items-center p-0.5 rounded-lg border border-violet-500/20 bg-violet-500/5"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition ${
          !isDark
            ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400 shadow-sm'
            : 'text-slate-400 hover:text-amber-400 hover:bg-amber-500/10'
        }`}
        aria-label="Light mode"
        aria-pressed={!isDark}
        title="Light mode"
      >
        <Sun size={18} strokeWidth={!isDark ? 2.5 : 2} />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition ${
          isDark
            ? 'bg-violet-500/25 text-violet-300 shadow-sm'
            : 'text-slate-400 hover:text-violet-300 hover:bg-violet-500/10'
        }`}
        aria-label="Dark mode"
        aria-pressed={isDark}
        title="Dark mode"
      >
        <Moon size={18} strokeWidth={isDark ? 2.5 : 2} />
      </button>
    </div>
  );
};

export default ThemeSettings;
