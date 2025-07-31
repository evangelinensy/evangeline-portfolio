import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PlayPage() {
  return (
    <div className="min-h-screen pt-[50px] px-[50px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-medium text-gray-900 dark:text-gray-100 mb-8">
          Play
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          A collection of my creative experiments, side projects, and explorations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for future projects */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              More projects and experiments will be added here soon.
            </p>
            <Button variant="outline" disabled>
              View Project
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <Button asChild>
            <Link href="/">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 