"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { DarkModeSwitcher } from "./dark-mode-switcher";

export function AdminNav() {
  return (
    <div className="flex flex-col py-4 sm:py-0 sm:flex-row w-full items-center justify-between min-h-16 gap-2 px-4">
      <h2 className="scroll-m-20 text-xl font-bold tracking-tight first:mt-0">
        NOTEBOK ADMIN
      </h2>
      <div className="flex gap-2">
        <DarkModeSwitcher size={"icon"} />
        <LanguageSwitcher size={"icon"} />
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    </div>
  );
}
