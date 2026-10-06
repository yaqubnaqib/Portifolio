"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-[#262626] text-center"
    >
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#2a2a2a] dark:text-white mb-3">
        Something went wrong
      </h1>
      <p className="text-[#4a4a4a] dark:text-[#9C9C9C] max-w-md mb-8">
        Please try again, or go back to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded bg-[#83c3de] hover:bg-[#9ed3ea] text-[#10303f] px-8 py-3 font-semibold transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded border-2 border-[#83c3de] text-[#1f4f63] dark:text-white px-8 py-2.5 font-medium"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
