import React from 'react';
import { FileText, Link as LinkIcon, Edit, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface RecentActivityCardProps {
  type: 'created' | 'connected' | 'edited' | 'viewed';
  title: string;
  time: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ type, title, time }) => {
  const { darkMode } = useTheme();
  
  const getActivityIcon = () => {
    switch (type) {
      case 'created':
        return <FileText size={16} className={darkMode ? 'text-green-400' : 'text-green-600'} />;
      case 'connected':
        return <LinkIcon size={16} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />;
      case 'edited':
        return <Edit size={16} className={darkMode ? 'text-amber-400' : 'text-amber-600'} />;
      case 'viewed':
        return <Eye size={16} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />;
      default:
        return <FileText size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />;
    }
  };
  
  const getActivityText = () => {
    switch (type) {
      case 'created':
        return 'Created note';
      case 'connected':
        return 'Connected';
      case 'edited':
        return 'Edited';
      case 'viewed':
        return 'Viewed';
      default:
        return 'Interacted with';
    }
  };
  
  return (
    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-pointer flex items-start`}>
      <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-white'} mr-3`}>
        {getActivityIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium mb-1 truncate">{getActivityText()} <span className="font-semibold">{title}</span></p>
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{time}</p>
      </div>
    </div>
  );
};

export default RecentActivityCard;