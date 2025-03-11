'use client';

import React, { useState } from 'react';
import { FaFire, FaThumbsUp } from 'react-icons/fa';

interface PollReactionsProps {
  pollId: string;
  reactions: {
    trending: number;
    likes: number;
  };
  onReaction: (reactionType: 'trending' | 'like') => Promise<void>;
}

export function PollReactions({ pollId, reactions, onReaction }: PollReactionsProps) {
  const [isReacting, setIsReacting] = useState<Record<string, boolean>>({
    trending: false,
    like: false
  });

  const handleReaction = async (reactionType: 'trending' | 'like') => {
    setIsReacting(prev => ({ ...prev, [reactionType]: true }));
    
    try {
      await onReaction(reactionType);
    } catch (error) {
      console.error(`Failed to add ${reactionType} reaction:`, error);
    } finally {
      setIsReacting(prev => ({ ...prev, [reactionType]: false }));
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleReaction('trending')}
        disabled={isReacting.trending}
        className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 disabled:opacity-50"
      >
        <FaFire className={reactions.trending > 0 ? 'text-orange-500' : ''} />
        <span>{reactions.trending}</span>
      </button>
      
      <button
        onClick={() => handleReaction('like')}
        disabled={isReacting.like}
        className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50"
      >
        <FaThumbsUp className={reactions.likes > 0 ? 'text-blue-500' : ''} />
        <span>{reactions.likes}</span>
      </button>
    </div>
  );
}
