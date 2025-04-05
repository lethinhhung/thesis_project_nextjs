"use client";

import ButtonWithBadge from "@/components/button-with-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/interfaces/message";
// import { chatCompletions } from "@/utils/api";
import {
  ChevronDown,
  MessageCircleMoreIcon,
  Paperclip,
  Plus,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function ChatBox({
  attachContent,
  title,
  extraOptions = false,
}: {
  attachContent?: string;
  title?: string;
  extraOptions?: boolean;
}) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("scroll");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // const getChatCompletions = async (updatedMessages: Message[]) => {
  const getChatCompletions = async () => {
    setLoading(true);
    try {
      // const res = await chatCompletions(updatedMessages);
      // console.log(res);
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     role: "assistant",
      //     content: res?.data.choices[0]?.message?.content,
      //   },
      // ]);
    } catch (error) {
      console.error("Error fetching chat completions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      content:
        attachContent && messages.length == 0
          ? "Cho nội dung:\n" +
            attachContent +
            "\n Trả lời câu hỏi: " +
            input.trim()
          : input.trim(),
    };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");

    // Gọi API sau khi `messages` cập nhật
    // getChatCompletions(updatedMessages);
    getChatCompletions();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="flex flex-col w-full h-full space-y-4 items-center">
      {title && (
        <CardHeader className="w-full">
          <CardTitle>Ask AI</CardTitle>
          <CardDescription>about this {title}</CardDescription>
        </CardHeader>
      )}
      {messages?.length > 0 && (
        <div
          id="scroll"
          className="w-full h-full overflow-y-auto md:p-4 md:pt-0 scrollbar"
        >
          {messages?.map((message, index) =>
            message?.role === "user" ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div key={index} className="flex justify-end mb-5 pl-16">
                  <div className="p-4 rounded-md border border-dashed">
                    {message?.content}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div key={index} className="flex">
                  <div className="flex flex-col max-w-full p-4 mb-5 bg-secondary rounded-md">
                    {message?.content}
                  </div>
                </div>
              </motion.div>
            )
          )}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-2">
                <small className="text-sm font-medium leading-none">
                  Thinking...
                </small>
                <Skeleton className="w-100 p-4 mb-5 bg-secondary rounded-md h-15" />
              </div>
            </motion.div>
          )}
        </div>
      )}
      {messages?.length == 0 && (
        <h4 className="flex h-full items-center scroll-m-20 text-xl font-semibold tracking-tight ">
          <MessageCircleMoreIcon /> Ask for anything...
        </h4>
      )}
      <div className="flex flex-col items-center w-full rounded-2xl md:px-4 bg-background">
        <Textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          spellCheck={false}
          placeholder="Ask anything..."
          className="resize-none max-h-[17rem] border-dashed scrollbar"
        ></Textarea>
        <div className="w-full pt-1 md:pt-2 flex gap-1 md:gap-2 items-center justify-end">
          {extraOptions && (
            <div className="flex items-center gap-2">
              <Badge variant="outline">2 content attched</Badge>
              <Tooltip>
                <DropdownMenu>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <ButtonWithBadge
                        variant={"ghost"}
                        size={"icon"}
                        isBadgeVisible={true}
                        badgeColor="bg-sky-500"
                      >
                        <Paperclip />
                      </ButtonWithBadge>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Attach files</TooltipContent>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Attach content</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Tooltip>
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setMessages([])}
                size={"icon"}
                variant={"ghost"}
              >
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>New chat</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} onClick={scrollToBottom} variant={"ghost"}>
                <ChevronDown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Scroll to bottom</TooltipContent>
          </Tooltip>
          <Button
            disabled={!input.trim()}
            onClick={() => {
              if (!input.trim()) return;
              setMessages([
                ...messages,
                {
                  role: "user",
                  content: input.trim(),
                },
              ]);
              setInput("");
              handleSendMessage();
            }}
            size={"icon"}
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
