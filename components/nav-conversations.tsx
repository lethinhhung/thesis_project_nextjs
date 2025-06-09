"use client";

import { useRouter } from "next/navigation";
import { Loader, MessageCircleMore, RefreshCcw } from "lucide-react";
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
import { Button } from "./ui/button";

export function NavConversations() {
  const router = useRouter();
  const t = useTranslations("common");
  const [result, setResult] = useState<ChatInList[]>([]);
  const [loading, setLoading] = useState(false);

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
  }, []);

  return (
    <SidebarGroup className={"group-data-[collapsible=icon]:hidden w-full"}>
      <SidebarGroupLabel className="justify-between w-full">
        <p className="flex gap-1">
          <MessageCircleMore size={16} />
          {t("recent_chats")}
        </p>
        <Button size={"sm"} variant={"ghost"} onClick={fetchChats}>
          {loading ? <Loader className="animate-spin" /> : <RefreshCcw />}
        </Button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {result.map((chat) => (
            <SidebarMenuItem key={chat._id}>
              <SidebarMenuButton
                onClick={() => router.push(`/chat?id=${chat._id}`)}
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
