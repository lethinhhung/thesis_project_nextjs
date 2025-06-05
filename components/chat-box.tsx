"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/interfaces/message";
// import { chatCompletions } from "@/utils/api";
import {
  Book,
  BrainCircuit,
  ChevronDown,
  MessageCircleMoreIcon,
  Plus,
  Send,
} from "lucide-react";
import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const models = [
  {
    type: "qa",
    name: "llama-3.3-70b-versatile",
    description: "Tổng hợp nội dung, tạo câu hỏi, tóm tắt",
  },
  {
    type: "qa",
    name: "meta-llama/llama-4-maverick-17b-128e-instruct",
    description: "Phản hồi nhanh, hiểu lệnh tốt",
  },
  {
    type: "qa",
    name: "llama3-70b-8192",
    description: "LLM mạnh mẽ, phản hồi chính xác",
  },
  {
    type: "instant",
    name: "llama-3.1-8b-instant",
    description: "Assistant nhẹ, phản hồi nhanh",
  },
  {
    type: "instant",
    name: "llama3-8b-8192",
    description: "Xử lý ngữ cảnh dài với tốc độ cao",
  },
  {
    type: "instant",
    name: "gemma2-9b-it",
    description: "Instruct-tuned, gọn nhẹ",
  },
  // {
  //   type: "reasoning",
  //   name: "mistral-saba-24b",
  //   description: "Chatbot / Q&A học tập",
  // },
  {
    type: "reasoning",
    name: "deepseek-r1-distill-llama-70b",
    description: "Hướng tới ứng dụng kỹ thuật suy luận + học tập",
  },
  {
    type: "reasoning",
    name: "qwen-qwq-32b",
    description: "Một trong các model Trung Quốc mạnh về lập luận đa bước",
  },
];

function extractThinkBlocks(markdown: string): string | null {
  const regex = /<think[^>]*>([\s\S]*?)<\/think>/i;
  const match = regex.exec(markdown);
  return match ? match[1] : null;
}

function ChatBox({ title, context }: { title?: string; context?: string }) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);
  const [isKnowledgeEnabled, setIsKnowledgeEnabled] = useState(false);
  const [isContextEnabled, setIsContextEnabled] = useState(false);
  const [model, setModel] = useState<string>("llama-3.3-70b-versatile");

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
          model: model,
        }),
      });

      const response = await processResponse(res, {
        success: false,
        error: false,
      });
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
      scrollToBottom();
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    scrollToBottom();

    const newMessage: Message = {
      role: "user",
      content:
        context && context != "" && isContextEnabled && messages.length === 0
          ? `Dựa vào nội dung:\n"${context}".\n Hãy trả lời: ${input.trim()}`
          : input.trim(),
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

  return (
    <div className="flex flex-col w-full h-full space-y-4 items-center 2xl:min-w-100">
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
                <div className="bg-secondary p-4 rounded-md border border-dashed whitespace-pre-line">
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
      <div className="flex flex-col gap-1 items-center w-full rounded-2xl md:px-4 bg-background">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <BrainCircuit className="hidden sm:flex" />
                <p className="truncate max-w-16 sm:max-w-50">{model}</p>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Select model</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {models.map((model) => (
                <Tooltip key={model.name} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem
                      key={model.name}
                      onClick={() => setModel(model.name)}
                    >
                      {model.type === "qa" ? (
                        <span className="text-yellow-500">Q&A</span>
                      ) : model.type === "instant" ? (
                        <span className="text-green-500">Instant</span>
                      ) : model.type === "reasoning" ? (
                        <span className="text-blue-500">Reasoning</span>
                      ) : (
                        <span className="text-gray-500">Other</span>
                      )}
                      <p className="truncate max-w-30 sm:max-w-100">
                        {model.name}
                      </p>
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p className="text-xs">{model.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {context && messages.length === 0 && (
            <div className="w-auto h-9 flex gap-2 p-2 bg-secondary rounded-md items-center justify-center">
              <Book className="sm:hidden" size={18} />
              <p className="text-sm font-semibold hidden sm:flex">Content</p>
              <Switch
                checked={isContextEnabled}
                onCheckedChange={setIsContextEnabled}
              />
            </div>
          )}
          <div className="w-auto h-9 flex gap-2 p-2 bg-secondary rounded-md items-center justify-center">
            <Book className="sm:hidden" size={18} />
            <p className="text-sm font-semibold hidden sm:flex">Knowledge</p>
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
