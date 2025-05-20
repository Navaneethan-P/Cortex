import React from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, Compass, Plus, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar: React.FC = () => {
  const { darkMode } = useTheme();
  
  const navItems = [
    { path: '/', icon: <Brain size={20} />, label: 'Dashboard' },
    { path: '/explore', icon: <Compass size={20} />, label: 'Explore' },
    { path: '/capture', icon: <Plus size={20} />, label: 'Capture' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
    <aside className={`w-16 md:w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0 flex flex-col transition-all duration-300`}>
      <div className="p-4 flex items-center justify-center md:justify-start">
        <div className={`h-10 w-10 rounded-md flex items-center justify-center ${darkMode ? 'bg-purple-700' : 'bg-purple-600'}`}>
          <Brain className="text-white" />
        </div>
        <h1 className="ml-3 text-xl font-bold hidden md:block">Cortex</h1>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-link flex items-center p-3 rounded-md transition-colors ${
                    isActive 
                      ? `${darkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-50 text-purple-700'}`
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`
                }
              >
                <span>{item.icon}</span>
                <span className="ml-3 hidden md:block">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 hidden md:block">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'} text-center`}>
          <p className="text-sm">Used: 28% of 10GB</p>
          <div className={`mt-2 h-2 w-full rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
            <div className="h-2 rounded-full bg-purple-600 w-[28%]"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;