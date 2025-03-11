'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { PollOptionInput } from '@/components/PollOptionInput';
import { createPoll } from '@/lib/api';

export default function CreatePollPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [expiresIn, setExpiresIn] = useState<'1hour' | '12hours' | '24hours'>('24hours');
  const [hideResults, setHideResults] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!title.trim()) {
      setError('Please enter a poll title');
      return;
    }

    const filteredOptions = options.filter(option => option.trim() !== '');
    if (filteredOptions.length < 2) {
      setError('Please add at least 2 valid options');
      return;
    }

    setIsLoading(true);

    try {
      const poll = await createPoll({
        title: title.trim(),
        options: filteredOptions,
        expiresIn,
        hideResults,
        isPrivate
      });

      // Redirect to the newly created poll
      router.push(`/poll/${poll.pollId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create poll');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Create a New Poll</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h2 className="text-xl font-semibold">Poll Details</h2>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Poll Question
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="What's your favorite programming language?"
                required
              />
            </div>

            <PollOptionInput options={options} setOptions={setOptions} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="expiresIn" className="block text-sm font-medium mb-1">
                  Poll Duration
                </label>
                <select
                  id="expiresIn"
                  value={expiresIn}
                  onChange={(e) => setExpiresIn(e.target.value as '1hour' | '12hours' | '24hours')}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1hour">1 Hour</option>
                  <option value="12hours">12 Hours</option>
                  <option value="24hours">24 Hours</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="hideResults"
                  type="checkbox"
                  checked={hideResults}
                  onChange={(e) => setHideResults(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <label htmlFor="hideResults" className="ml-2 block text-sm">
                  Hide results until poll ends
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="isPrivate"
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <label htmlFor="isPrivate" className="ml-2 block text-sm">
                  Make poll private (only accessible via link)
                </label>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Cancel
            </Link>
            <Button type="submit" isLoading={isLoading}>
              Create Poll
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
