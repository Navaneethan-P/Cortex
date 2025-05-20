import React, { useState } from 'react';
import { Moon, Sun, Monitor, User, Shield, Database, Bell, Zap, HardDrive, Cloud } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [storageLocation, setStorageLocation] = useState<'local' | 'cloud'>('local');
  const [autoSync, setAutoSync] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  
  return (
    <div className="fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <User size={20} className="mr-2" />
              Account Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  value="user@example.com"
                  readOnly
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">Display Name</label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-4 py-3 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  defaultValue="Knowledge Explorer"
                />
              </div>
              
              <div>
                <button className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Shield size={20} className="mr-2" />
              Privacy & Security
            </h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">End-to-End Encryption</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Encrypt all your knowledge data
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600`}></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Allow Anonymous Analytics</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Help improve Cortex with anonymous usage data
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600`}></div>
                </label>
              </div>
              
              <div>
                <button className={`px-6 py-2 rounded-lg ${
                  darkMode 
                    ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                } transition-colors`}>
                  Reset All Data
                </button>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Database size={20} className="mr-2" />
              Data Management
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Storage Location</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className={`p-4 rounded-lg flex items-center justify-center ${
                      storageLocation === 'local'
                        ? darkMode
                          ? 'bg-purple-900/30 border-purple-600 text-purple-400'
                          : 'bg-purple-100 border-purple-600 text-purple-700'
                        : darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-300' 
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                    } border-2 transition-colors`}
                    onClick={() => setStorageLocation('local')}
                  >
                    <HardDrive size={18} className="mr-2" />
                    Local Device
                  </button>
                  <button 
                    className={`p-4 rounded-lg flex items-center justify-center ${
                      storageLocation === 'cloud'
                        ? darkMode
                          ? 'bg-purple-900/30 border-purple-600 text-purple-400'
                          : 'bg-purple-100 border-purple-600 text-purple-700'
                        : darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-300' 
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                    } border-2 transition-colors`}
                    onClick={() => setStorageLocation('cloud')}
                  >
                    <Cloud size={18} className="mr-2" />
                    Cloud Storage
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Automatic Synchronization</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Keep your knowledge in sync across devices
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoSync}
                    onChange={() => setAutoSync(!autoSync)}
                  />
                  <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600`}></div>
                </label>
              </div>
              
              <div>
                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors mr-3">
                  Export Data
                </button>
                <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Sun size={20} className="mr-2" />
              Appearance
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                      !darkMode 
                        ? 'bg-purple-100 border-purple-600 text-purple-700'
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    } border-2 transition-colors`}
                    onClick={() => darkMode && toggleDarkMode()}
                  >
                    <Sun size={24} className="mb-2" />
                    Light
                  </button>
                  <button 
                    className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                      darkMode 
                        ? 'bg-purple-900/30 border-purple-600 text-purple-400'
                        : 'bg-gray-700 border-gray-600 text-gray-300'
                    } border-2 transition-colors`}
                    onClick={() => !darkMode && toggleDarkMode()}
                  >
                    <Moon size={24} className="mb-2" />
                    Dark
                  </button>
                  <button 
                    className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'
                    } border-2 transition-colors`}
                  >
                    <Monitor size={24} className="mb-2" />
                    System
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Bell size={20} className="mr-2" />
              Notifications
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Enable Notifications</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Receive alerts about your knowledge base
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)} 
                  />
                  <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600`}></div>
                </label>
              </div>
              
              {notifications && (
                <>
                  <div className="flex justify-between items-center pl-6 border-l-2 border-purple-500">
                    <span>Knowledge Connection Suggestions</span>
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                  </div>
                  <div className="flex justify-between items-center pl-6 border-l-2 border-purple-500">
                    <span>Learning Streak Reminders</span>
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                  </div>
                  <div className="flex justify-between items-center pl-6 border-l-2 border-purple-500">
                    <span>System Updates</span>
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Zap size={20} className="mr-2" />
              AI Features
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">AI Suggestions</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get intelligent insights from your knowledge
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={aiSuggestions}
                    onChange={() => setAiSuggestions(!aiSuggestions)} 
                  />
                  <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600`}></div>
                </label>
              </div>
              
              {aiSuggestions && (
                <>
                  <div className="flex justify-between items-center pl-6 border-l-2 border-purple-500">
                    <span>Automatic Knowledge Connections</span>
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                  </div>
                  <div className="flex justify-between items-center pl-6 border-l-2 border-purple-500">
                    <span>Content Summarization</span>
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                  </div>
                  <div className="flex justify-between items-center pl-6 border-l-2 border-purple-500">
                    <span>Learning Recommendations</span>
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                  </div>
                </>
              )}
              
              <div className="mt-4">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  All AI processing happens locally, protecting your privacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;