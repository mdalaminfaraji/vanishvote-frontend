import React from 'react';
import { Button } from './Button';

interface PollOptionInputProps {
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  minOptions?: number;
  maxOptions?: number;
}

export function PollOptionInput({ 
  options, 
  setOptions, 
  minOptions = 2, 
  maxOptions = 10 
}: PollOptionInputProps) {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < maxOptions) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > minOptions) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium">Poll Options</h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {options.length}/{maxOptions} options
        </span>
      </div>

      {options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          {options.length > minOptions && (
            <Button 
              variant="outline" 
              onClick={() => removeOption(index)}
              aria-label="Remove option"
              type="button"
            >
              ✕
            </Button>
          )}
        </div>
      ))}

      {options.length < maxOptions && (
        <Button 
          variant="secondary" 
          onClick={addOption} 
          fullWidth
          type="button"
        >
          + Add Option
        </Button>
      )}
    </div>
  );
}
