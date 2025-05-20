import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className={`h-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between px-4 md:px-6`}>
      <div className="relative w-full max-w-md">
        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400`}>
          <Search size={18} />
        </div>
        <input
          type="text"
          className={`pl-10 pr-4 py-2 rounded-md w-full ${
            darkMode 
              ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
              : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-transparent'
          } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
          placeholder="Search your knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}>
          <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-purple-500 rounded-full"></span>
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          {darkMode ? 
            <Sun size={20} className="text-gray-300" /> : 
            <Moon size={20} className="text-gray-600" />
          }
        </button>
        
        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white cursor-pointer">
          <User size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;