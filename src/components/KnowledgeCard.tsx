import React from 'react';
import { Tag, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface KnowledgeCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ title, excerpt, category, date }) => {
  const { darkMode } = useTheme();
  
  const getCategoryColor = (category: string) => {
    const categories: Record<string, { bg: string; text: string; bgDark: string; textDark: string }> = {
      Technology: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-700',
        bgDark: 'bg-blue-900/30',
        textDark: 'text-blue-400'
      },
      Science: { 
        bg: 'bg-green-100', 
        text: 'text-green-700',
        bgDark: 'bg-green-900/30',
        textDark: 'text-green-400'
      },
      Philosophy: { 
        bg: 'bg-purple-100', 
        text: 'text-purple-700',
        bgDark: 'bg-purple-900/30',
        textDark: 'text-purple-400'
      },
      History: { 
        bg: 'bg-amber-100', 
        text: 'text-amber-700',
        bgDark: 'bg-amber-900/30',
        textDark: 'text-amber-400'
      },
      Art: { 
        bg: 'bg-pink-100', 
        text: 'text-pink-700',
        bgDark: 'bg-pink-900/30',
        textDark: 'text-pink-400'
      }
    };
    
    return categories[category] || { 
      bg: 'bg-gray-100', 
      text: 'text-gray-700',
      bgDark: 'bg-gray-700',
      textDark: 'text-gray-300'
    };
  };
  
  const categoryColor = getCategoryColor(category);
  
  return (
    <div className={`knowledge-card p-4 rounded-lg ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer transition-all`}>
      <h3 className="font-medium text-lg mb-2 line-clamp-1">{title}</h3>
      <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{excerpt}</p>
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full flex items-center ${darkMode ? categoryColor.bgDark : categoryColor.bg} ${darkMode ? categoryColor.textDark : categoryColor.text}`}>
          <Tag size={12} className="mr-1" />
          {category}
        </span>
        <span className={`text-xs flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar size={12} className="mr-1" />
          {date}
        </span>
      </div>
    </div>
  );
};

export default KnowledgeCard;