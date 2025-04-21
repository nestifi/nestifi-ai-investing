
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LearnProgressProvider, useLearnProgress } from '@/hooks/useLearnProgress';
import ArticleContent from '@/components/learn/ArticleContent';
import BottomNavbar from '@/components/layout/BottomNavbar';

const LearnArticleContent: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { topics, resetQuizProgress } = useLearnProgress();
  
  const topic = topics.find(t => t.id === topicId);
  
  if (!topic) {
    return (
      <div className="p-4 text-center">
        <p>Topic not found.</p>
        <Button className="mt-4" onClick={() => navigate('/learn')}>
          Back to Learn
        </Button>
      </div>
    );
  }
  
  const handleStartQuiz = () => {
    resetQuizProgress(topicId!);
    navigate(`/learn/${topicId}/quiz`);
  };
  
  return (
    <div className="pb-20">
      <div className="bg-white sticky top-0 z-10 border-b p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/learn')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">{topic.title}</h1>
      </div>
      
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={topic.imageUrl} 
          alt={topic.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder.svg";
          }} 
        />
      </div>
      
      <div className="p-4">
        <ArticleContent content={topic.article} />
        
        <div className="mt-8 mb-20">
          <Button onClick={handleStartQuiz} className="w-full">
            Take Quiz
          </Button>
        </div>
      </div>
      
      <BottomNavbar />
    </div>
  );
};

const LearnArticle: React.FC = () => {
  return (
    <LearnProgressProvider>
      <LearnArticleContent />
    </LearnProgressProvider>
  );
};

export default LearnArticle;
