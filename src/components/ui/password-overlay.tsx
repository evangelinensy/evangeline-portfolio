'use client';

import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PasswordOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectTitle?: string;
}

export function PasswordOverlay({
  isOpen,
  onClose,
  onSuccess,
  projectTitle = 'Support Copilot'
}: PasswordOverlayProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const CORRECT_PASSWORD = 'shownottell';
  const EMAIL = 'eggsvans@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      setError('');
      onSuccess();
      // Reset state after successful submission
      setPassword('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setIsCopied(false);
    onClose();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {projectTitle}
          </h2>
          <p className="text-sm text-gray-600">
            This case study is under NDA.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(''); // Clear error when user types
              }}
              placeholder="Enter password"
              className="w-full outline-none focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 rounded-lg p-3 border-2 border-gray-200 transition-all"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Submit
          </Button>
        </form>

        {/* Footer hint */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Need access? Contact{' '}
            <span className="inline-flex items-center gap-1.5 relative group">
              <span className="text-blue-600 font-medium">
                {EMAIL}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="relative inline-flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Copy email"
              >
                {isCopied ? (
                  <Check size={14} className="text-green-600" />
                ) : (
                  <Copy size={14} />
                )}
                {isCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
