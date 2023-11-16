'use client';

import { useTheme } from 'next-themes';
import { BsSun } from 'react-icons/bs';
import { FiMoon } from 'react-icons/fi';
import { useState, useEffect } from 'react';

type Props = {
  taglineDay: String;
  taglineNight: String;
};

const ThemeSwitch = ({ taglineDay, taglineNight }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!taglineDay || !taglineNight) {
    return (
      <>
        {theme === 'dark' ? (
          <BsSun size={30} cursor="pointer" onClick={() => setTheme('light')} />
        ) : (
          <FiMoon size={30} cursor="pointer" onClick={() => setTheme('dark')} />
        )}
      </>
    );
  }

  return (
    <>
      {theme === 'dark' ? (
        <div className="flex items-center gap-4">
          <span>{taglineNight}</span>

          <BsSun size={30} cursor="pointer" onClick={() => setTheme('light')} />
        </div>
      ) : (
        <div className="flex items-center  gap-4">
          <span>{taglineDay}</span>
          <FiMoon size={30} cursor="pointer" onClick={() => setTheme('dark')} />
        </div>
      )}
    </>
  );
};

export default ThemeSwitch;
