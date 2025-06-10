"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

export function NavConversations({
  isRedirect = true,
}: {
  isRedirect?: boolean;
}) {
  const router = useRouter();
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
                  if (isRedirect) {
                    params.set("id", chat._id);
                    router.push(`/chat?${params.toString()}`);
                  } else {
                    const currentPathname = window.location.pathname;
                    params.delete("id");
                    params.set("id", chat._id);
                    router.replace(`${currentPathname}?${params.toString()}`, {
                      scroll: false,
                    });
                  }
                }}
              >
                <span className="truncate max-w-50">{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
