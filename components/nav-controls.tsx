"use client";

// import LanguageSwitcher from "./language-switcher";
import { DarkModeSwitcher } from "./dark-mode-switcher";
import { LanguageSwitcher } from "./language-switcher";

export function NavControls({ isSidebarOpen }: { isSidebarOpen?: boolean }) {
  return (
    <div className="w-full h-full flex flex-wrap gap-1 items-center py-1">
      <DarkModeSwitcher
        className="p-2 h-8 w-8"
        variant={"ghost"}
        size={"icon"}
        isSidebarOpen={isSidebarOpen}
      />

      <LanguageSwitcher
        className="p-2 h-8 w-8"
        variant={"ghost"}
        size={"icon"}
        isSidebarOpen={isSidebarOpen}
      />

      {/* <LanguageSwitcher
        className="p-2 h-8 w-8"
        variant={"ghost"}
        size={"icon"}
        isSidebarOpen={isSidebarOpen}
      /> */}
    </div>
  );
}
