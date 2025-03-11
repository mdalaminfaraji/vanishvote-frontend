'use client';

import React, { useState } from 'react';
import { Button } from './Button';

interface PollShareProps {
  pollId: string;
  isPrivate: boolean;
}

export function PollShare({ pollId, isPrivate }: PollShareProps) {
  const [copied, setCopied] = useState(false);
  
  const pollUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/poll/${pollId}`
    : `/poll/${pollId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pollUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Share this poll</h3>
      
      {isPrivate && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          This is a private poll. Only people with the link can access it.
        </p>
      )}
      
      <div className="flex gap-2">
        <input
          type="text"
          value={pollUrl}
          readOnly
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-sm"
        />
        <Button onClick={handleCopyLink} variant={copied ? 'secondary' : 'primary'}>
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}
