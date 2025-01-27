"use client";

import { useEffect, useState } from "react";
import { Input } from "app/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    // Update the URL when the query changes
    const updateURL = () => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (query) {
        newSearchParams.set("query", query);
      } else {
        newSearchParams.delete("query");
      }
      router.push(`/?${newSearchParams.toString()}`, { scroll: false });
    };

    const debounceTimer = setTimeout(updateURL, 300); // Debounce to reduce updates
    return () => clearTimeout(debounceTimer);
  }, [query, router, searchParams]);

  return (
    <div className="container py-8 space-y-6 flex flex-row items-center gap-4">
      <Input
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-xl"
      />
    </div>
  );
}
