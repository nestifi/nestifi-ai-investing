
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LearnProgressProvider, useLearnProgress } from '@/hooks/useLearnProgress';
import ProgressBar from '@/components/learn/ProgressBar';
import AnswerOption from '@/components/learn/AnswerOption';
import BottomNavbar from '@/components/layout/BottomNavbar';

const LearnQuizContent: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { topics, saveQuizAnswer, getCurrentQuizAnswers, markQuizComplete } = useLearnProgress();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const topic = topics.find(t => t.id === topicId);
  const currentQuestion = topic?.quiz[currentQuestionIndex];
  const totalQuestions = topic?.quiz.length || 0;
  
  // Get any previously saved answers
  useEffect(() => {
    if (topic && currentQuestion) {
      const savedAnswers = getCurrentQuizAnswers(topicId!);
      const savedAnswer = savedAnswers.find(a => a.questionId === currentQuestion.id);
      
      if (savedAnswer && savedAnswer.selectedAnswerIndex !== null) {
        setSelectedAnswerIndex(savedAnswer.selectedAnswerIndex);
      } else {
        setSelectedAnswerIndex(null);
      }
    }
  }, [currentQuestion, topicId, getCurrentQuizAnswers, topic]);
  
  if (!topic || !currentQuestion) {
    return (
      <div className="p-4 text-center">
        <p>Topic or question not found.</p>
        <Button className="mt-4" onClick={() => navigate('/learn')}>
          Back to Learn
        </Button>
      </div>
    );
  }
  
  const handleSelectAnswer = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswerIndex(index);
    }
  };
  
  const handleCheckAnswer = () => {
    if (selectedAnswerIndex === null) return;
    
    const correct = selectedAnswerIndex === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Save the answer
    saveQuizAnswer(topicId!, currentQuestion.id, selectedAnswerIndex, correct);
  };
  
  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedAnswerIndex(null);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      markQuizComplete(topicId!);
      navigate(`/learn/${topicId}/complete`);
    }
  };
  
  return (
    <div className="pb-20">
      <div className="bg-white sticky top-0 z-10 border-b p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(`/learn/${topicId}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">{topic.title}</h1>
      </div>
      
      <div className="p-4">
        <ProgressBar 
          currentQuestion={currentQuestionIndex + 1} 
          totalQuestions={totalQuestions} 
        />
        
        <h2 className="text-lg font-medium mb-6">{currentQuestion.question}</h2>
        
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <AnswerOption
              key={index}
              label={option}
              selected={selectedAnswerIndex === index}
              correct={showFeedback && index === currentQuestion.correctAnswerIndex}
              incorrect={showFeedback && selectedAnswerIndex === index && index !== currentQuestion.correctAnswerIndex}
              onSelect={() => handleSelectAnswer(index)}
              disabled={showFeedback}
            />
          ))}
        </div>
        
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </p>
            <p className="mt-1 text-sm">
              {isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackIncorrect}
            </p>
          </div>
        )}
        
        <div className="mt-8">
          {showFeedback ? (
            <Button onClick={handleContinue} className="w-full">
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleCheckAnswer} 
              className="w-full"
              disabled={selectedAnswerIndex === null}
            >
              Check Answer
            </Button>
          )}
        </div>
      </div>
      
      <BottomNavbar />
    </div>
  );
};

const LearnQuiz: React.FC = () => {
  return (
    <LearnProgressProvider>
      <LearnQuizContent />
    </LearnProgressProvider>
  );
};

export default LearnQuiz;
