import React, { useState } from 'react';
import { Tag, Link as LinkIcon, Upload, FileText, Globe, LayoutGrid, X } from 'lucide-react';
import { useKnowledge } from '../context/KnowledgeContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const Capture: React.FC = () => {
  const { addKnowledgeItem, knowledgeItems } = useKnowledge();
  const { darkMode } = useTheme();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [captureMethod, setCaptureMethod] = useState<'manual' | 'url' | 'file'>('manual');
  const [url, setUrl] = useState('');
  const [suggested, setSuggested] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  
  // Get unique categories
  const existingCategories = [...new Set(knowledgeItems.map(item => item.category))];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please add a title for your knowledge item');
      return;
    }
    
    if (!content.trim() && captureMethod === 'manual') {
      toast.error('Please add some content for your knowledge item');
      return;
    }
    
    if (!category.trim()) {
      toast.error('Please select or create a category');
      return;
    }
    
    // Add the knowledge item
    addKnowledgeItem({
      id: `item-${Date.now()}`,
      title,
      content: content || 'Content from external source',
      category,
      tags,
      dateCreated: new Date().toLocaleDateString(),
    });
    
    toast.success('Knowledge captured successfully!');
    
    // Reset form
    setTitle('');
    setContent('');
    setCategory('');
    setUrl('');
    setTags([]);
    setCurrentTag('');
    setSuggested([]);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'new') {
      const newCategory = prompt('Enter new category name:');
      if (newCategory && newCategory.trim()) {
        setCategory(newCategory.trim());
      }
    } else {
      setCategory(e.target.value);
    }
  };
  
  const handleUrlCapture = () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    // Simulate fetching content from URL
    setTitle(`Content from ${url}`);
    setContent(`Automatically extracted content from ${url}`);
    setSuggested(['Technology', 'Web']);
    
    toast.success('Content extracted from URL');
  };
  
  const handleFileCapture = () => {
    // Simulate file upload
    toast.success('File uploaded and content extracted');
    setTitle('Notes from uploaded file');
    setContent('Content extracted from your document...');
    setSuggested(['Notes', 'Documents']);
  };
  
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const addSuggestedCategory = (category: string) => {
    setCategory(category);
  };
  
  return (
    <div className="fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Capture Knowledge</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="mb-6">
              <div className="flex space-x-4 mb-6">
                <button 
                  className={`flex-1 p-3 rounded-lg flex justify-center items-center ${
                    captureMethod === 'manual' 
                      ? 'bg-purple-600 text-white' 
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                  } transition-colors`}
                  onClick={() => setCaptureMethod('manual')}
                >
                  <FileText size={20} className="mr-2" />
                  Manual Input
                </button>
                <button 
                  className={`flex-1 p-3 rounded-lg flex justify-center items-center ${
                    captureMethod === 'url' 
                      ? 'bg-purple-600 text-white' 
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                  } transition-colors`}
                  onClick={() => setCaptureMethod('url')}
                >
                  <Globe size={20} className="mr-2" />
                  Capture URL
                </button>
                <button 
                  className={`flex-1 p-3 rounded-lg flex justify-center items-center ${
                    captureMethod === 'file' 
                      ? 'bg-purple-600 text-white' 
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                  } transition-colors`}
                  onClick={() => setCaptureMethod('file')}
                >
                  <Upload size={20} className="mr-2" />
                  Upload File
                </button>
              </div>
              
              {captureMethod === 'url' && (
                <div className="mb-6">
                  <label htmlFor="url" className="block mb-2 text-sm font-medium">Website URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      id="url"
                      className={`flex-1 px-4 py-3 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-gray-50 text-gray-900 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="https://example.com/article"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <button 
                      className="px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                      onClick={handleUrlCapture}
                    >
                      Extract
                    </button>
                  </div>
                </div>
              )}
              
              {captureMethod === 'file' && (
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium">Upload Document</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                  } cursor-pointer transition-colors`}
                    onClick={handleFileCapture}
                  >
                    <Upload size={40} className="mx-auto mb-2 text-gray-400" />
                    <p className="mb-1">Drag and drop your file here or click to browse</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Supports PDF, Word, Text, and Markdown files (up to 10MB)
                    </p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
                  <input
                    type="text"
                    id="title"
                    className={`w-full px-4 py-3 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-gray-50 text-gray-900 border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Give your knowledge a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                {captureMethod === 'manual' && (
                  <div className="mb-4">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium">Content</label>
                    <textarea
                      id="content"
                      rows={8}
                      className={`w-full px-4 py-3 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-gray-50 text-gray-900 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="Write or paste your knowledge here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium">Category</label>
                    <select
                      id="category"
                      className={`w-full px-4 py-3 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-gray-50 text-gray-900 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      value={category}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {existingCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="new">+ Create new category</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block mb-2 text-sm font-medium">Tags</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        id="tags"
                        className={`flex-1 px-4 py-3 rounded-lg ${
                          darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-gray-50 text-gray-900 border-gray-300'
                        } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Add tags..."
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <button 
                        type="button"
                        className="px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                        onClick={addTag}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                
                {suggested.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Suggested Categories:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggested.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`px-3 py-1 rounded-full text-sm ${
                            darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                          } hover:opacity-80 transition-opacity`}
                          onClick={() => addSuggestedCategory(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {tags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Added Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm flex items-center ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                          <button
                            type="button"
                            className="ml-2 focus:outline-none"
                            onClick={() => removeTag(tag)}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className={`px-6 py-3 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    Capture Knowledge
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div>
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-6`}>
            <h2 className="text-xl font-semibold mb-4">Tips for Capturing</h2>
            <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex">
                <span className={`inline-flex shrink-0 items-center justify-center h-6 w-6 rounded-full mr-3 ${
                  darkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
                }`}>
                  1
                </span>
                <span>Be specific with your titles for easier reference later</span>
              </li>
              <li className="flex">
                <span className={`inline-flex shrink-0 items-center justify-center h-6 w-6 rounded-full mr-3 ${
                  darkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
                }`}>
                  2
                </span>
                <span>Use categories consistently to organize your knowledge</span>
              </li>
              <li className="flex">
                <span className={`inline-flex shrink-0 items-center justify-center h-6 w-6 rounded-full mr-3 ${
                  darkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
                }`}>
                  3
                </span>
                <span>Add multiple tags to improve search and connections</span>
              </li>
              <li className="flex">
                <span className={`inline-flex shrink-0 items-center justify-center h-6 w-6 rounded-full mr-3 ${
                  darkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
                }`}>
                  4
                </span>
                <span>For web content, capture the original source URL</span>
              </li>
            </ul>
          </div>
          
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 backdrop-blur' : 'bg-white/50 backdrop-blur'} shadow-sm border ${darkMode ? 'border-purple-900/30' : 'border-purple-200'}`}>
            <h2 className="text-xl font-semibold mb-2">AI Assistance</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Cortex can help enhance your knowledge capture.
            </p>
            <div className="space-y-3">
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-colors text-sm flex items-center justify-center">
                <LayoutGrid size={16} className="mr-2" />
                Summarize Content
              </button>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium hover:from-teal-700 hover:to-teal-600 transition-colors text-sm flex items-center justify-center">
                <Tag size={16} className="mr-2" />
                Generate Tags
              </button>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium hover:from-purple-700 hover:to-purple-600 transition-colors text-sm flex items-center justify-center">
                <LinkIcon size={16} className="mr-2" />
                Find Connections
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capture;