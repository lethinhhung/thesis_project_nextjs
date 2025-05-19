"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

export function NavConversations({
  conversations,
  isChatPage = false,
}: {
  conversations: {
    name: string;
    emoji: React.ReactNode;
    pages: {
      name: string;
      emoji: React.ReactNode;
    }[];
  }[];
  isChatPage?: boolean;
}) {
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <SidebarGroup
      className={
        "group-data-[collapsible=icon]:hidden" +
        (isChatPage ? " border-2 border-dashed" : "")
      }
    >
      <SidebarGroupLabel>{t("recent_chats")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {conversations.map((conversation) => (
            <SidebarMenuItem key={conversation.name}>
              <SidebarMenuButton onClick={() => router.push("/chat")}>
                <span>{conversation.emoji}</span>
                <span>{conversation.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => router.push("/chat")}
              className="text-sidebar-foreground/70"
            >
              <MoreHorizontal />
              {t("more")}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
