"use client";

/** Last-resort boundary for errors thrown in the root layout itself. */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "4rem 1.5rem" }}
      >
        <h1>Something went wrong</h1>
        <p>Please try again, or reload the page.</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{ padding: "0.75rem 2rem", marginTop: "1rem" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
