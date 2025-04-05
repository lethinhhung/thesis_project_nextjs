"use client";

import SearchBarWithTags from "@/components/search-bar-with-tags";

function Courses({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <SearchBarWithTags
        className="max-w-3xl top-18"
        placeholder="Search for courses or lessons"
        withPagination={false}
      />
      {children}
    </div>
  );
}

export default Courses;
