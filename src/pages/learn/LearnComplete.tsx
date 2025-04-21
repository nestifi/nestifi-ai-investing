
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LearnProgressProvider, useLearnProgress } from '@/hooks/useLearnProgress';
import BottomNavbar from '@/components/layout/BottomNavbar';

const LearnCompleteContent: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { topics, getCorrectAnswersCount } = useLearnProgress();
  
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
  
  const correctAnswers = getCorrectAnswersCount(topicId!);
  const totalQuestions = topic.quiz.length;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <div className="rounded-full bg-green-100 p-6 mb-6">
        <Check className="h-12 w-12 text-green-600" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Quiz Complete!</h1>
      <p className="text-gray-600 mb-6">You finished {totalQuestions} questions!</p>
      
      <div className="bg-gray-50 rounded-lg p-6 w-full max-w-sm mb-8">
        <div className="text-3xl font-bold text-primary mb-2">
          {correctAnswers}/{totalQuestions} Correct
        </div>
        <p className="text-gray-600">
          {correctAnswers === totalQuestions 
            ? 'Perfect score! Excellent work!' 
            : correctAnswers > totalQuestions / 2 
              ? 'Good job! Keep learning to improve.' 
              : 'Keep studying to improve your knowledge.'}
        </p>
      </div>
      
      <Button 
        onClick={() => navigate('/learn')} 
        className="w-full max-w-sm"
      >
        Back to Learn Topics
      </Button>
      
      <BottomNavbar />
    </div>
  );
};

const LearnComplete: React.FC = () => {
  return (
    <LearnProgressProvider>
      <LearnCompleteContent />
    </LearnProgressProvider>
  );
};

export default LearnComplete;
