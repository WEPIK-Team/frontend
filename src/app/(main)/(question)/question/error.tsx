"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-y-5 px-10">
      <h2>에러가 발생했어요 다시 시도해 주세요!</h2>
      <code className="rounded-md bg-black p-5 text-wpc-error">
        {error.message}
      </code>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        다시 시도
      </button>
    </div>
  );
}
