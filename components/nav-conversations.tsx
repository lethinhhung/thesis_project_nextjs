"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Loader, MessageCircleMore } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { processResponse } from "@/lib/response-process";
import { useEffect, useState } from "react";
import { ChatInList } from "@/interfaces/message";

export function NavConversations() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [result, setResult] = useState<ChatInList[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  const fetchChats = async () => {
    setLoading(true);
    const res = await fetch(`/api/chat/get-all`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: false,
    });

    if (response.success) {
      setResult(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, [chatId]);

  if (!result || result.length === 0) return null;

  return (
    <SidebarGroup className={"group-data-[collapsible=icon]:hidden w-full"}>
      <SidebarGroupLabel className="justify-between w-full">
        <p className="flex gap-1">
          <MessageCircleMore size={16} />
          {t("recent_chats")}
        </p>

        {loading && <Loader className="animate-spin" />}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {result.map((chat) => (
            <SidebarMenuItem key={chat._id}>
              <SidebarMenuButton
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.set("id", chat._id);
                  router.push(`${pathname}?${params.toString()}`);
                }}
              >
                <span>{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
