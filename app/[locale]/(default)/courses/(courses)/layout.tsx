"use client";

import SearchBarWithTags from "@/components/search-bar-with-tags";
import { SearchProvider } from "@/components/search-provider";
import { useTranslations } from "next-intl";
function Courses({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <SearchProvider>
        <SearchBarWithTags
          className="max-w-3xl top-18"
          placeholder={t("search_placeholder")}
          withPagination
        />
        {children}
      </SearchProvider>
    </div>
  );
}

export default Courses;
