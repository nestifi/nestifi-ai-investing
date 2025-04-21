
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Question {currentQuestion} of {totalQuestions}</span>
        <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} className="w-full h-2" />
    </div>
  );
};

export default ProgressBar;
