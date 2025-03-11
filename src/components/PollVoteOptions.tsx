'use client';

import React, { useState } from 'react';
import { Option } from '@/lib/api';
import { Button } from './Button';

interface PollVoteOptionsProps {
  pollId: string;
  options: Option[];
  hasVoted: boolean;
  hideResults: boolean;
  onVote: (optionId: string) => Promise<void>;
  totalVotes: number;
}

export function PollVoteOptions({
  pollId,
  options,
  hasVoted,
  hideResults,
  onVote,
  totalVotes
}: PollVoteOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState('');

  const handleVote = async () => {
    if (!selectedOption) return;
    
    setIsVoting(true);
    setVoteError('');
    
    try {
      await onVote(selectedOption);
    } catch (error) {
      setVoteError(error instanceof Error ? error.message : 'Failed to vote');
    } finally {
      setIsVoting(false);
    }
  };

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  // Show results if the user has voted or results are not hidden
  const showResults = hasVoted || !hideResults;

  return (
    <div className="space-y-4">
      {voteError && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg">
          {voteError}
        </div>
      )}

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option._id;
          const percentage = getPercentage(option.votes || 0);
          
          return (
            <div
              key={option._id}
              className={`relative overflow-hidden rounded-lg border ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              } ${!hasVoted ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (!hasVoted) {
                  setSelectedOption(option._id);
                }
              }}
            >
              <div className="relative z-10 p-4 flex justify-between items-center">
                <span>{option.text}</span>
                {showResults && (
                  <span className="font-medium">
                    {percentage}% <span className="text-sm text-slate-500">({option.votes || 0})</span>
                  </span>
                )}
              </div>
              
              {/* Progress bar for results */}
              {showResults && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-indigo-100 dark:bg-indigo-900/50 z-0"
                  style={{ width: `${percentage}%` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {!hasVoted && (
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleVote}
            disabled={!selectedOption || isVoting}
            isLoading={isVoting}
          >
            Vote
          </Button>
        </div>
      )}

      {showResults && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
          Total votes: {totalVotes}
        </p>
      )}
    </div>
  );
}
