import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if user has a preference stored, otherwise use system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('cortex-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  const [darkMode, setDarkMode] = useState(getInitialTheme());
  
  useEffect(() => {
    // Update theme when component mounts
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference
    localStorage.setItem('cortex-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};