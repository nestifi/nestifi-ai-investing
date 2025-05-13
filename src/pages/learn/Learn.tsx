
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, CreditCard, PiggyBank, BadgeDollarSign, Coins } from 'lucide-react';
import TopicCard from '@/components/learn/TopicCard';
import BottomNavbar from '@/components/layout/BottomNavbar';
import { LearnProgressProvider, useLearnProgress } from '@/hooks/useLearnProgress';

const getTopicIcon = (topicId: string) => {
  switch (topicId) {
    case "credit-score":
      return <CreditCard size={36} />;
    case "compound-interest":
      return <PiggyBank size={36} />;
    case "credit-cards":
      return <BadgeDollarSign size={36} />;
    case "stablecoins":
      return <Coins size={36} />;
    default:
      return null;
  }
};

const LearnContent: React.FC = () => {
  const { topics } = useLearnProgress();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-20">
      <div className="bg-primary/5 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold mb-4">Learn</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Financial Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              id={topic.id}
              title={topic.title}
              description={topic.description}
              progress={topic.progress}
              imageUrl={topic.imageUrl}
              icon={getTopicIcon(topic.id)}
            />
          ))}
          
          {filteredTopics.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No topics found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavbar />
    </div>
  );
};

const Learn: React.FC = () => {
  return (
    <LearnProgressProvider>
      <LearnContent />
    </LearnProgressProvider>
  );
};

export default Learn;
