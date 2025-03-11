"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaClock, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { Button } from "@/components/Button";
import { PollVoteOptions } from "@/components/PollVoteOptions";
import { PollShare } from "@/components/PollShare";
import { PollReactions } from "@/components/PollReactions";
import { getPoll, voteOnPoll, addReaction, Poll } from "@/lib/api";

export default function PollPage() {
  const { pollId } = useParams() as { pollId: string };

  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  // Calculate total votes
  const totalVotes =
    poll?.options.reduce((sum, option) => sum + (option.votes || 0), 0) || 0;

  // Format expiry time
  const formatExpiryTime = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt);
    const now = new Date();

    const hoursLeft = Math.max(
      0,
      Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60))
    );
    const minutesLeft = Math.max(
      0,
      Math.floor(
        ((expiryDate.getTime() - now.getTime()) % (1000 * 60 * 60)) /
          (1000 * 60)
      )
    );

    if (expiryDate < now) {
      return "Expired";
    }

    if (hoursLeft > 0) {
      return `${hoursLeft}h ${minutesLeft}m left`;
    }

    return `${minutesLeft}m left`;
  };

  // Check if the user has voted on this poll (using localStorage)
  useEffect(() => {
    const checkVoteStatus = () => {
      if (typeof window !== "undefined") {
        const votedPolls = JSON.parse(
          localStorage.getItem("votedPolls") || "{}"
        );
        return !!votedPolls[pollId];
      }
      return false;
    };

    setHasVoted(checkVoteStatus());
  }, [pollId]);

  // Fetch poll data
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);
        const pollData = await getPoll(pollId);
        setPoll(pollData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load poll");
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [pollId]);

  // Handle voting
  const handleVote = async (optionId: string) => {
    if (!poll) return;

    try {
      const updatedPoll = await voteOnPoll(pollId, { optionId });
      setPoll(updatedPoll);

      // Store vote in localStorage to prevent multiple votes
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "{}");
      localStorage.setItem(
        "votedPolls",
        JSON.stringify({
          ...votedPolls,
          [pollId]: true,
        })
      );

      setHasVoted(true);
    } catch (error) {
      // Type guard for the error
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (
        errorMessage.includes("already voted") ||
        errorMessage.includes("Already voted")
      ) {
        handleAlreadyVoted();
      } else {
        throw error;
      }
    }
  };

  // Handle scenario when user has already voted (from a different browser on same IP)
  const handleAlreadyVoted = () => {
    // Mark as voted in localStorage to prevent future attempts
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "{}");
    localStorage.setItem(
      "votedPolls",
      JSON.stringify({
        ...votedPolls,
        [pollId]: true,
      })
    );

    // Update state to show results
    setHasVoted(true);
  };

  // Handle reactions
  const handleReaction = async (reactionType: "trending" | "like") => {
    if (!poll) return;

    try {
      const result = await addReaction(pollId, { reactionType });

      // Update poll reactions
      setPoll({
        ...poll,
        reactions: result.reactions,
      });
    } catch (error) {
      console.error("Failed to add reaction:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl flex justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading poll...</p>
        </div>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Poll Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {error || "This poll doesn't exist or has expired."}
            </p>
            <Link href="/create">
              <Button>Create a New Poll</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isExpired = new Date(poll.expiresAt) < new Date();

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{poll.title}</h1>

            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <FaClock className="text-indigo-500" />
                <span>{formatExpiryTime(poll.expiresAt)}</span>
              </div>

              {poll.isPrivate && (
                <div className="flex items-center gap-1">
                  <FaLock className="text-indigo-500" />
                  <span>Private</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                {poll.hideResults ? (
                  <>
                    <FaEyeSlash className="text-indigo-500" />
                    <span>Results hidden until expiry</span>
                  </>
                ) : (
                  <>
                    <FaEye className="text-indigo-500" />
                    <span>Results visible</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {isExpired ? (
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-4 rounded-lg">
              This poll has expired and is no longer accepting votes.
            </div>
          ) : (
            <PollVoteOptions
              options={poll.options}
              hasVoted={hasVoted}
              showResults={hasVoted || !poll.hideResults}
              hideResults={poll.hideResults}
              onVote={handleVote}
              totalVotes={totalVotes}
              onAlreadyVoted={handleAlreadyVoted}
            />
          )}

          <hr className="border-slate-200 dark:border-slate-700" />

          <PollShare pollId={pollId} isPrivate={poll.isPrivate} />
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <PollReactions
            pollId={pollId}
            reactions={poll.reactions || { trending: 0, likes: 0 }}
            onReaction={handleReaction}
          />

          <Link href="/create">
            <Button variant="secondary">Create New Poll</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
