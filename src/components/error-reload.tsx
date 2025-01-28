"use client";

import { useRouter } from "next/navigation";

export default function ErrorReload() {
  // -- Hooks
  const router = useRouter();

  // -- Handlers
  const handleReload = async () => {
    router.refresh();
  };

  // -- Render
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p>Something went wrong</p>
        <button onClick={() => handleReload()} className="btn btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
