import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  dateCreated: string;
}

interface Connection {
  source: string;
  target: string;
  strength: number;
}

interface Activity {
  type: 'created' | 'connected' | 'edited' | 'viewed';
  title: string;
  time: string;
}

interface KnowledgeContextType {
  knowledgeItems: KnowledgeItem[];
  connections: Connection[];
  recentActivities: Activity[];
  addKnowledgeItem: (item: KnowledgeItem) => void;
  updateKnowledgeItem: (id: string, item: Partial<KnowledgeItem>) => void;
  deleteKnowledgeItem: (id: string) => void;
  addConnection: (connection: Connection) => void;
}

const KnowledgeContext = createContext<KnowledgeContextType>({
  knowledgeItems: [],
  connections: [],
  recentActivities: [],
  addKnowledgeItem: () => {},
  updateKnowledgeItem: () => {},
  deleteKnowledgeItem: () => {},
  addConnection: () => {},
});

export const useKnowledge = () => useContext(KnowledgeContext);

interface KnowledgeProviderProps {
  children: ReactNode;
}

export const KnowledgeProvider: React.FC<KnowledgeProviderProps> = ({ children }) => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: 'item-1',
      title: 'The Future of Artificial Intelligence',
      content: 'Artificial intelligence continues to evolve at a rapid pace. Recent advancements in machine learning, particularly in neural networks and deep learning, have led to significant breakthroughs in natural language processing, computer vision, and predictive analytics.',
      category: 'Technology',
      tags: ['AI', 'Machine Learning', 'Future Tech'],
      dateCreated: '2023-10-15'
    },
    {
      id: 'item-2',
      title: 'Quantum Computing Explained',
      content: 'Quantum computing leverages the principles of quantum mechanics to process information in ways that classical computers cannot. Unlike classical bits that represent either 0 or 1, quantum bits or "qubits" can exist in multiple states simultaneously, allowing for potentially exponential computational power.',
      category: 'Technology',
      tags: ['Quantum', 'Computing', 'Physics'],
      dateCreated: '2023-11-03'
    },
    {
      id: 'item-3',
      title: 'Introduction to Philosophy of Mind',
      content: 'The philosophy of mind explores the nature of consciousness, mental events, and their relationship to the physical world. Key questions include the mind-body problem, the nature of consciousness, and whether artificial intelligence can truly think or have experiences.',
      category: 'Philosophy',
      tags: ['Consciousness', 'Mind', 'Thought'],
      dateCreated: '2023-09-28'
    },
    {
      id: 'item-4',
      title: 'Climate Change: Current Understanding',
      content: 'Climate change refers to significant, long-term changes in the global climate. The current scientific consensus indicates that human activities, particularly the burning of fossil fuels and deforestation, are the primary drivers of the observed warming trend.',
      category: 'Science',
      tags: ['Climate', 'Environment', 'Global Warming'],
      dateCreated: '2023-12-01'
    },
    {
      id: 'item-5',
      title: 'Neural Networks and Deep Learning',
      content: 'Neural networks are computing systems inspired by the biological neural networks that constitute animal brains. Deep learning involves neural networks with multiple layers that can learn hierarchical representations of data. These technologies power many modern AI applications from image recognition to language translation.',
      category: 'Technology',
      tags: ['Neural Networks', 'Deep Learning', 'AI'],
      dateCreated: '2023-10-20'
    },
    {
      id: 'item-6',
      title: 'The Renaissance: Art and Science',
      content: 'The Renaissance was a period of European cultural, artistic, political, and scientific "rebirth" following the Middle Ages. It saw a renewed interest in classical learning and values, advances in science, and incredible artistic achievements from figures like Leonardo da Vinci and Michelangelo.',
      category: 'History',
      tags: ['Art', 'Science', 'Europe'],
      dateCreated: '2023-11-15'
    }
  ]);
  
  const [connections, setConnections] = useState<Connection[]>([
    { source: 'item-1', target: 'item-5', strength: 0.9 },
    { source: 'item-1', target: 'item-2', strength: 0.7 },
    { source: 'item-2', target: 'item-5', strength: 0.6 },
    { source: 'item-3', target: 'item-1', strength: 0.4 },
    { source: 'item-4', target: 'item-6', strength: 0.3 },
    { source: 'item-5', target: 'item-6', strength: 0.2 }
  ]);
  
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    { type: 'created', title: 'Neural Networks and Deep Learning', time: '2 hours ago' },
    { type: 'connected', title: 'AI and Philosophy of Mind', time: '4 hours ago' },
    { type: 'edited', title: 'Climate Change: Current Understanding', time: 'Yesterday' },
    { type: 'viewed', title: 'Quantum Computing Explained', time: 'Yesterday' },
    { type: 'created', title: 'The Renaissance: Art and Science', time: '2 days ago' }
  ]);
  
  const addKnowledgeItem = (item: KnowledgeItem) => {
    setKnowledgeItems(prevItems => [...prevItems, item]);
    
    setRecentActivities(prevActivities => [
      { type: 'created', title: item.title, time: 'Just now' },
      ...prevActivities.slice(0, 4)
    ]);
  };
  
  const updateKnowledgeItem = (id: string, item: Partial<KnowledgeItem>) => {
    setKnowledgeItems(prevItems => 
      prevItems.map(prevItem => 
        prevItem.id === id 
          ? { ...prevItem, ...item } 
          : prevItem
      )
    );
    
    const updatedItem = knowledgeItems.find(item => item.id === id);
    if (updatedItem) {
      setRecentActivities(prevActivities => [
        { type: 'edited', title: updatedItem.title, time: 'Just now' },
        ...prevActivities.slice(0, 4)
      ]);
    }
  };
  
  const deleteKnowledgeItem = (id: string) => {
    const itemToDelete = knowledgeItems.find(item => item.id === id);
    
    setKnowledgeItems(prevItems => 
      prevItems.filter(item => item.id !== id)
    );
    
    setConnections(prevConnections => 
      prevConnections.filter(
        conn => conn.source !== id && conn.target !== id
      )
    );
  };
  
  const addConnection = (connection: Connection) => {
    setConnections(prevConnections => [...prevConnections, connection]);
    
    const sourceItem = knowledgeItems.find(item => item.id === connection.source);
    const targetItem = knowledgeItems.find(item => item.id === connection.target);
    
    if (sourceItem && targetItem) {
      setRecentActivities(prevActivities => [
        { 
          type: 'connected', 
          title: `${sourceItem.title} and ${targetItem.title}`, 
          time: 'Just now' 
        },
        ...prevActivities.slice(0, 4)
      ]);
    }
  };
  
  return (
    <KnowledgeContext.Provider value={{ 
      knowledgeItems, 
      connections, 
      recentActivities,
      addKnowledgeItem, 
      updateKnowledgeItem, 
      deleteKnowledgeItem,
      addConnection
    }}>
      {children}
    </KnowledgeContext.Provider>
  );
};