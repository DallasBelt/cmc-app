import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme/ThemeProvider';

import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { effectiveTheme, setTheme, theme } = useTheme();

  const isDark =
    theme === 'dark' || (theme === 'system' && effectiveTheme === 'dark');

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={toggleTheme}
        className={cn(
          'relative h-8 w-14 rounded-full transition-colors duration-300',
          isDark ? 'bg-zinc-700' : 'bg-zinc-300'
        )}
        aria-label='Toggle theme'
      >
        <span
          className={cn(
            'absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center',
            isDark ? 'bg-slate-500 translate-x-6' : 'translate-x-0'
          )}
        >
          {isDark ? (
            <Moon size={16} className='text-zinc-100' />
          ) : (
            <Sun size={16} className='text-zinc-800' />
          )}
        </span>
      </button>
    </div>
  );
};
