"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/interfaces/message";
// import { chatCompletions } from "@/utils/api";
import { ChevronDown, MessageCircleMoreIcon, Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ThinkingText from "./thinking-text";
import { toast } from "sonner";
import { processResponse } from "@/lib/response-process";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DocumentCard } from "./document-card";
import { Document } from "@/interfaces/document";
import DocumentPreview from "./document-preview";
import rehypeRaw from "rehype-raw";
import { Switch } from "./ui/switch";

function extractThinkBlocks(markdown: string): string | null {
  const regex = /<think[^>]*>([\s\S]*?)<\/think>/i;
  const match = regex.exec(markdown);
  return match ? match[1] : null;
}

function ChatBox({ title }: { title?: string }) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);
  const [isKnowledgeEnabled, setIsKnowledgeEnabled] = useState(false);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("scroll");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const getChatCompletions = async (updatedMessages: Message[]) => {
    setLoading(true);
    try {
      // const res = await fetch(`/api/chat/question`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     question: updatedMessages[updatedMessages.length - 1].content,
      //   }),
      // });
      const res = await fetch(`/api/chat/completions`, {
        method: "POST",
        body: JSON.stringify({
          messages: updatedMessages,
          isUseKnowledge: isKnowledgeEnabled,
        }),
      });

      const response = await processResponse(res, {
        success: false,
        error: false,
      });
      console.log("Response from chat completions:", response);
      if (response.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: response?.data.choices[0]?.message?.content,
            documents: response?.data.choices[0]?.message?.documents,
          },
        ]);
      } else {
        setMessages([]);
        const audio = new Audio("/notification.mp3");
        audio.play();
        toast.error("Something went wrong. Please try again later.", {
          className: "!bg-destructive !text-white dark:!bg-red-900",
        });
      }
    } catch (error) {
      console.error("Error fetching chat completions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: input.trim(),
    };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");

    // Gọi API sau khi `messages` cập nhật
    await getChatCompletions(updatedMessages);
    // getChatCompletions();
  };

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    setOpenDocumentPreview(true);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="flex flex-col w-full h-full space-y-4 items-center min-w-100">
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
                className="flex justify-end mb-5 pl-16"
              >
                <div className="p-4 rounded-md border border-dashed whitespace-pre-line">
                  {message?.content}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                id="llm"
                className="flex flex-col gap-4 max-w-none p-4 mb-5 bg-secondary rounded-md break-words"
              >
                {extractThinkBlocks(message?.content) && (
                  <div className="flex flex-col gap-4 border-l-2 pl-4 my-2">
                    <p className="text-sm text-muted-foreground">Thinking...</p>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]} // Cho phép sử dụng markdown GFM
                      rehypePlugins={[rehypeRaw]}
                    >
                      {extractThinkBlocks(message?.content) || "Thinking..."}
                    </ReactMarkdown>
                  </div>
                )}
                {message?.content.replace(
                  /<think[^>]*>[\s\S]*?<\/think>/gi,
                  ""
                ) && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]} // Cho phép sử dụng markdown GFM
                    rehypePlugins={[rehypeRaw]}
                  >
                    {message?.content.replace(
                      /<think[^>]*>[\s\S]*?<\/think>/gi,
                      ""
                    )}
                  </ReactMarkdown>
                )}
                {message?.documents && (
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground mt-8">
                      Documents used for this answer
                    </p>
                    <div className="columns-xs space-y-2 gap-2 p-2">
                      {message?.documents?.map((document, index) => (
                        <DocumentCard
                          variant="sm"
                          className="break-inside-avoid-column"
                          key={index}
                          document={document}
                          onClick={() => handleDocumentSelect(document)}
                        />
                      ))}
                    </div>
                  </div>
                )}
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
                  <ThinkingText />
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
      <DocumentPreview
        open={openDocumentPreview}
        onOpenChange={setOpenDocumentPreview}
        document={selectedDocument}
        fetchDocuments={() => {}}
        responsive={false}
      />
      <div className="flex flex-col items-center w-full rounded-2xl md:px-4 bg-background">
        <Textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          spellCheck={false}
          placeholder="Ask anything..."
          className="resize-none max-h-[17rem] border-dashed scrollbar"
        ></Textarea>
        <div className="w-full pt-1 md:pt-2 flex gap-1 md:gap-2 items-center justify-end">
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

          <div className="w-auto h-9 flex gap-2 p-2 bg-secondary rounded-md items-center justify-center">
            <p className="text-sm">Use knowledge</p>
            <Switch
              checked={isKnowledgeEnabled}
              onCheckedChange={setIsKnowledgeEnabled}
            />
          </div>
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
