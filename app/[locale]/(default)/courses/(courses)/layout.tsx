"use client";

import SearchBarWithTags from "@/components/search-bar-with-tags";
import { SearchProvider } from "@/components/search-provider";
function Courses({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <SearchProvider>
        <SearchBarWithTags
          className="max-w-3xl top-18"
          placeholder="Search for courses or lessons"
          withPagination
        />
        {children}
      </SearchProvider>
    </div>
  );
}

export default Courses;
