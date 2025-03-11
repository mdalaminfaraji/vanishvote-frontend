"use client";

import React, { useState } from "react";
import { Option } from "@/lib/api";
import { Button } from "./Button";

interface PollVoteOptionsProps {
  options: Option[];
  hasVoted: boolean;
  showResults: boolean;
  hideResults: boolean; // Needed for compatibility with parent component
  onVote: (optionId: string) => Promise<void>;
  totalVotes: number;
  onAlreadyVoted?: () => void;
}

export function PollVoteOptions(props: PollVoteOptionsProps) {
  const { options, hasVoted, showResults, onVote, totalVotes, onAlreadyVoted } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState("");

  const handleVote = async () => {
    if (!selectedOption) return;

    setIsVoting(true);
    setVoteError("");

    try {
      await onVote(selectedOption);
    } catch (error) {
      // Get error message and log for debugging
      const errorMessage =
        error instanceof Error ? error.message : "Failed to vote";
      console.log("Vote error:", errorMessage);
      setVoteError(errorMessage);
      
      // Check for various "already voted" message patterns
      const alreadyVotedPatterns = [
        "already voted",
        "have already voted",
        "you have already voted",
      ];
      
      const isAlreadyVotedError = alreadyVotedPatterns.some(pattern => 
        errorMessage.toLowerCase().includes(pattern)
      );
      
      // If this is an "already voted" error, notify parent component
      if (isAlreadyVotedError && onAlreadyVoted) {
        onAlreadyVoted();
      }
    } finally {
      setIsVoting(false);
    }
  };

  // Calculate percentage for the progress bar
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  // Check if any error is an "already voted" error
  const isAlreadyVotedError = [
    "already voted",
    "have already voted",
    "you have already voted",
  ].some(pattern => voteError.toLowerCase().includes(pattern));

  return (
    <div className="space-y-4">
      {voteError && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg">
          {isAlreadyVotedError ? (
            <>
              <p>You have already voted on this poll</p>
              <p className="mt-2 text-sm">
                Note: Our system prevents multiple votes from the same network to
                ensure fair voting. Results are still visible below.
              </p>
            </>
          ) : (
            voteError
          )}
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
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              } ${
                !hasVoted && !isAlreadyVotedError
                  ? "cursor-pointer"
                  : ""
              }`}
              onClick={() => {
                if (!hasVoted && !isAlreadyVotedError) {
                  setSelectedOption(option._id);
                }
              }}
            >
              <div className="relative z-10 p-4 flex justify-between items-center">
                <span>{option.text}</span>
                {(showResults || isAlreadyVotedError) && (
                  <span className="font-medium">
                    {percentage}%{" "}
                    <span className="text-sm text-slate-500">
                      ({option.votes || 0})
                    </span>
                  </span>
                )}
              </div>

              {/* Progress bar for results */}
              {(showResults || isAlreadyVotedError) && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-indigo-100 dark:bg-indigo-900/50 z-0"
                  style={{ width: `${percentage}%` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {!hasVoted && !isAlreadyVotedError && (
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

      {(showResults || isAlreadyVotedError) && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
          Total votes: {totalVotes}
        </p>
      )}
    </div>
  );
}
