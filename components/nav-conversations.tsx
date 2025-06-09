"use client";

import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const t = useTranslations("common");
  const [result, setResult] = useState<ChatInList[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = (chatId: string) => {
    // Bạn extract locale từ pathname, ví dụ "/en/courses/abc/lessons/xyz"
    const parts = pathname.split("/"); // ["", "en", "courses", ...]
    const locale = parts[1]; // "en"

    // Kiểm tra có đang ở 2 trang đặc biệt không
    const isInSpecialPage =
      pathname.startsWith(`/${locale}/courses/`) ||
      pathname === `/${locale}/chat`;

    if (isInSpecialPage) {
      // 👉 Chỉ thêm param vào URL hiện tại
      const params = new URLSearchParams(window.location.search);
      params.set("id", chatId);

      // Dùng replaceState để tránh thêm vào history stack
      window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
    } else {
      // 👉 Chuyển sang /[locale]/chat?id=chatId
      router.push(`/${locale}/chat?id=${chatId}`);
    }
  };

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
              <SidebarMenuButton onClick={() => handleClick(chat._id)}>
                <span>{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
