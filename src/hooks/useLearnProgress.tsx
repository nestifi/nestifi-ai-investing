
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LearnTopic, learnTopics } from '@/data/learnTopics';

type QuizAnswer = {
  questionId: string;
  selectedAnswerIndex: number | null;
  isCorrect: boolean;
};

type TopicProgress = {
  topicId: string;
  progress: number;
  completedQuiz: boolean;
  quizAnswers: QuizAnswer[];
};

interface LearnProgressContextType {
  topics: LearnTopic[];
  updateTopicProgress: (topicId: string, progress: number) => void;
  getCurrentQuizAnswers: (topicId: string) => QuizAnswer[];
  saveQuizAnswer: (topicId: string, questionId: string, selectedAnswerIndex: number, isCorrect: boolean) => void;
  getCorrectAnswersCount: (topicId: string) => number;
  markQuizComplete: (topicId: string) => void;
  resetQuizProgress: (topicId: string) => void;
}

const LearnProgressContext = createContext<LearnProgressContextType | undefined>(undefined);

export const LearnProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topicsProgress, setTopicsProgress] = useState<TopicProgress[]>([]);
  const [topics, setTopics] = useState<LearnTopic[]>(learnTopics);

  // Initialize or load from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('learnProgress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress) as TopicProgress[];
      setTopicsProgress(parsed);
      
      // Update the topics with the saved progress
      const updatedTopics = learnTopics.map(topic => {
        const savedTopic = parsed.find(p => p.topicId === topic.id);
        if (savedTopic) {
          return {
            ...topic,
            progress: savedTopic.progress
          };
        }
        return topic;
      });
      
      setTopics(updatedTopics);
    }
  }, []);

  // Save to localStorage when progress changes
  useEffect(() => {
    if (topicsProgress.length > 0) {
      localStorage.setItem('learnProgress', JSON.stringify(topicsProgress));
      
      // Update the topics with the new progress
      const updatedTopics = topics.map(topic => {
        const updatedTopic = topicsProgress.find(p => p.topicId === topic.id);
        if (updatedTopic) {
          return {
            ...topic,
            progress: updatedTopic.progress
          };
        }
        return topic;
      });
      
      setTopics(updatedTopics);
    }
  }, [topicsProgress]);

  const updateTopicProgress = (topicId: string, progress: number) => {
    setTopicsProgress(prev => {
      const existing = prev.find(p => p.topicId === topicId);
      if (existing) {
        return prev.map(p => 
          p.topicId === topicId ? { ...p, progress } : p
        );
      } else {
        return [...prev, { 
          topicId, 
          progress, 
          completedQuiz: false,
          quizAnswers: [] 
        }];
      }
    });
  };

  const getCurrentQuizAnswers = (topicId: string): QuizAnswer[] => {
    const topicProgress = topicsProgress.find(p => p.topicId === topicId);
    return topicProgress?.quizAnswers || [];
  };

  const saveQuizAnswer = (topicId: string, questionId: string, selectedAnswerIndex: number, isCorrect: boolean) => {
    setTopicsProgress(prev => {
      const topic = prev.find(p => p.topicId === topicId);
      
      if (topic) {
        // Update existing topic
        const updatedTopic = {
          ...topic,
          quizAnswers: [
            ...topic.quizAnswers.filter(a => a.questionId !== questionId),
            { questionId, selectedAnswerIndex, isCorrect }
          ]
        };
        
        return prev.map(p => p.topicId === topicId ? updatedTopic : p);
      } else {
        // Create new topic progress
        return [...prev, {
          topicId,
          progress: 0,
          completedQuiz: false,
          quizAnswers: [{ questionId, selectedAnswerIndex, isCorrect }]
        }];
      }
    });
  };

  const getCorrectAnswersCount = (topicId: string): number => {
    const topicProgress = topicsProgress.find(p => p.topicId === topicId);
    return topicProgress?.quizAnswers.filter(a => a.isCorrect).length || 0;
  };

  const markQuizComplete = (topicId: string) => {
    const topic = learnTopics.find(t => t.id === topicId);
    if (!topic) return;
    
    const correctAnswers = getCorrectAnswersCount(topicId);
    const totalQuestions = topic.quiz.length;
    const progressPercentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    setTopicsProgress(prev => {
      const existing = prev.find(p => p.topicId === topicId);
      if (existing) {
        return prev.map(p => 
          p.topicId === topicId ? { ...p, completedQuiz: true, progress: progressPercentage } : p
        );
      } else {
        return [...prev, { 
          topicId, 
          progress: progressPercentage, 
          completedQuiz: true,
          quizAnswers: [] 
        }];
      }
    });
  };

  const resetQuizProgress = (topicId: string) => {
    setTopicsProgress(prev => {
      return prev.map(p => 
        p.topicId === topicId ? { ...p, completedQuiz: false, quizAnswers: [] } : p
      );
    });
  };

  return (
    <LearnProgressContext.Provider value={{
      topics,
      updateTopicProgress,
      getCurrentQuizAnswers,
      saveQuizAnswer,
      getCorrectAnswersCount,
      markQuizComplete,
      resetQuizProgress
    }}>
      {children}
    </LearnProgressContext.Provider>
  );
};

export const useLearnProgress = () => {
  const context = useContext(LearnProgressContext);
  if (context === undefined) {
    throw new Error('useLearnProgress must be used within a LearnProgressProvider');
  }
  return context;
};
