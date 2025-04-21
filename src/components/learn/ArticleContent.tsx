
import React from 'react';

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  // Simple markdown-like rendering
  const renderContent = () => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mt-5 mb-3">{line.substring(3)}</h2>;
      }
      
      // Lists
      if (line.match(/^\d+\.\s/)) {
        return <li key={index} className="ml-6 my-1 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      if (line.match(/^-\s/)) {
        return <li key={index} className="ml-6 my-1 list-disc">{line.replace(/^-\s/, '')}</li>;
      }
      
      // Bold
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="my-2">
            {parts.map((part, pIndex) => 
              pIndex % 2 === 0 ? part : <strong key={pIndex}>{part}</strong>
            )}
          </p>
        );
      }
      
      // Empty line
      if (line.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      
      // Regular paragraph
      return <p key={index} className="my-2">{line}</p>;
    });
  };

  return (
    <div className="article-content prose max-w-none">
      {renderContent()}
    </div>
  );
};

export default ArticleContent;
