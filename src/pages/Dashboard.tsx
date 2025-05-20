import React from 'react';
import { BookOpen, Clock, Star, CloudLightning as Lightning, Link as LinkIcon } from 'lucide-react';
import KnowledgeCard from '../components/KnowledgeCard';
import RecentActivityCard from '../components/RecentActivityCard';
import KnowledgeGraph from '../components/KnowledgeGraph';
import { useKnowledge } from '../context/KnowledgeContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard: React.FC = () => {
  const { knowledgeItems, connections, recentActivities } = useKnowledge();
  const { darkMode } = useTheme();
  
  return (
    <div className="fade-in">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Your Knowledge Hub</h1>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} transition-colors border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <span className="flex items-center">
              <Lightning size={16} className="mr-2" />
              <span className="hidden sm:inline">Quick Capture</span>
            </span>
          </button>
          <button className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition-colors">
            <span className="flex items-center">
              <LinkIcon size={16} className="mr-2" />
              <span className="hidden sm:inline">New Connection</span>
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Knowledge Graph</h2>
              <div className="flex space-x-2">
                <select className={`px-2 py-1 rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'} border`}>
                  <option>All Topics</option>
                  <option>Technology</option>
                  <option>Science</option>
                  <option>Philosophy</option>
                </select>
                <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <Star size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <KnowledgeGraph 
                nodes={knowledgeItems.map(item => ({ 
                  id: item.id, 
                  label: item.title,
                  category: item.category 
                }))} 
                links={connections} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <BookOpen size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Knowledge Base</h3>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {knowledgeItems.length}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>This week</span>
                  <span className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>+12 items</span>
                </div>
                <div className={`h-2 rounded-full mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full bg-blue-600 w-[65%]"></div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-teal-900/30' : 'bg-teal-100'}`}>
                  <LinkIcon size={24} className={darkMode ? 'text-teal-400' : 'text-teal-600'} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Connections</h3>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                    {connections.length}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>This week</span>
                  <span className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>+8 connections</span>
                </div>
                <div className={`h-2 rounded-full mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full bg-teal-600 w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Knowledge</h2>
              <button className="text-sm text-purple-500 hover:text-purple-600">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {knowledgeItems.slice(0, 4).map(item => (
                <KnowledgeCard 
                  key={item.id}
                  title={item.title}
                  excerpt={item.content.substring(0, 80) + '...'}
                  category={item.category}
                  date={item.dateCreated}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <Clock size={18} className="text-gray-400" />
              </button>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Focus Time</span>
                <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>3h 25m</span>
              </div>
              <div className={`h-2 rounded-full mt-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-green-500 w-[70%]"></div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Reading Time</span>
                <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>2h 10m</span>
              </div>
              <div className={`h-2 rounded-full mt-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-blue-500 w-[45%]"></div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Learning Streak</span>
                <span className={`font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>12 days</span>
              </div>
              <div className={`h-2 rounded-full mt-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div className="h-2 rounded-full bg-purple-500 w-[85%]"></div>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-sm text-purple-500 hover:text-purple-600">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <RecentActivityCard 
                  key={index}
                  type={activity.type}
                  title={activity.title}
                  time={activity.time}
                />
              ))}
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 backdrop-blur' : 'bg-white/50 backdrop-blur'} shadow-sm border ${darkMode ? 'border-purple-900/30' : 'border-purple-200'}`}>
            <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Cortex can help analyze your knowledge and find connections.
            </p>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors">
              Analyze My Knowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;