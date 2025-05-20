import React, { useState } from 'react';
import { Search, Filter, Tag, Calendar, Clock, ArrowDownUp } from 'lucide-react';
import KnowledgeCard from '../components/KnowledgeCard';
import { useKnowledge } from '../context/KnowledgeContext';
import { useTheme } from '../context/ThemeContext';

const Explore: React.FC = () => {
  const { knowledgeItems } = useKnowledge();
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'category'>('recent');
  
  // Get unique categories
  const categories = [...new Set(knowledgeItems.map(item => item.category))];
  
  // Filter knowledge items
  const filteredItems = knowledgeItems.filter(item => {
    // Text search
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === null || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort knowledge items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'recent':
      default:
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    }
  });
  
  return (
    <div className="fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Explore Knowledge</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-3">
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400`}>
              <Search size={20} />
            </div>
            <input
              type="text"
              className={`pl-10 pr-4 py-3 rounded-lg w-full ${
                darkMode 
                  ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                  : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              placeholder="Search your knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <select 
              className={`appearance-none pl-4 pr-10 py-3 rounded-lg w-full ${
                darkMode 
                  ? 'bg-gray-800 text-white border-gray-700' 
                  : 'bg-white text-gray-900 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'name' | 'category')}
            >
              <option value="recent">Recent</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <ArrowDownUp size={16} />
            </div>
          </div>
          <button className={`p-3 rounded-lg ${
            darkMode 
              ? 'bg-gray-800 text-white border-gray-700' 
              : 'bg-white text-gray-900 border-gray-200'
          } border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}>
            <Filter size={20} />
          </button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <button 
          className={`px-3 py-2 rounded-full text-sm flex items-center ${
            selectedCategory === null
              ? 'bg-purple-600 text-white'
              : darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
          onClick={() => setSelectedCategory(null)}
        >
          <Tag size={14} className="mr-2" />
          All Categories
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            className={`px-3 py-2 rounded-full text-sm flex items-center ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
            onClick={() => setSelectedCategory(category)}
          >
            <Tag size={14} className="mr-2" />
            {category}
          </button>
        ))}
      </div>
      
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-4`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Results</h2>
            <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              {sortedItems.length} items
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-2" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems.map(item => (
            <KnowledgeCard 
              key={item.id}
              title={item.title}
              excerpt={item.content.substring(0, 80) + '...'}
              category={item.category}
              date={item.dateCreated}
            />
          ))}
          
          {sortedItems.length === 0 && (
            <div className={`col-span-3 py-12 text-center rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <p className="text-lg">No knowledge items found matching your criteria.</p>
              <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Create New Knowledge Item
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button className={`px-4 py-2 rounded-lg ${
          darkMode 
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } transition-colors`}>
          Previous
        </button>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(page => (
            <button 
              key={page}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                page === 1
                  ? 'bg-purple-600 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className={`px-4 py-2 rounded-lg ${
          darkMode 
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } transition-colors`}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Explore;