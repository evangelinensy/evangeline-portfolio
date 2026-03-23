"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Something went wrong</h2>
        <button
          onClick={() => reset()}
          className="text-sm text-gray-500 underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
