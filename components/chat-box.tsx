"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/interfaces/message";
// import { chatCompletions } from "@/utils/api";
import {
  AlertCircle,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  History,
  LibraryBig,
  MessageCircleMoreIcon,
  Plus,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CardHeader, CardTitle } from "./ui/card";
import { AnimatePresence, motion } from "framer-motion";
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
import { AttachContent } from "./attach-content";
import { Course } from "@/interfaces/course";
import { useRouter, useSearchParams } from "next/navigation";
import { NavConversations } from "./nav-conversations";
import { useTranslations } from "next-intl";

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
  const [attachedCourse, setAttachedCourse] = useState<Course | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");
  const t = useTranslations("chat");

  const models = [
    {
      type: "qa",
      name: "llama-3.3-70b-versatile",
      description: t("1"),
    },
    {
      type: "qa",
      name: "meta-llama/llama-4-maverick-17b-128e-instruct",
      description: t("2"),
    },
    {
      type: "qa",
      name: "llama3-70b-8192",
      description: t("3"),
    },
    {
      type: "instant",
      name: "llama-3.1-8b-instant",
      description: t("4"),
    },
    {
      type: "instant",
      name: "llama3-8b-8192",
      description: t("5"),
    },
    {
      type: "instant",
      name: "gemma2-9b-it",
      description: t("6"),
    },
    // {
    //   type: "reasoning",
    //   name: "mistral-saba-24b",
    //   description: "Chatbot / Q&A học tập",
    // },
    {
      type: "reasoning",
      name: "deepseek-r1-distill-llama-70b",
      description: t("7"),
    },
    {
      type: "reasoning",
      name: "qwen-qwq-32b",
      description: t("8"),
    },
  ];

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatContainer = document.getElementById("scroll");
      if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
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
      scrollToBottom();
      const res = await fetch(`/api/chat/completions`, {
        method: "POST",
        body: JSON.stringify({
          messages: updatedMessages,
          isUseKnowledge: isKnowledgeEnabled,
          model: model,
          courseId:
            isKnowledgeEnabled && attachedCourse?._id ? attachedCourse._id : "",
          _id: currentChatId == null ? undefined : currentChatId,
        }),
      });

      const response = await processResponse(res, {
        success: false,
        error: false,
      });
      if (response.success) {
        if (response.data._id) {
          setCurrentChatId(response.data._id);
          const currentPathname = window.location.pathname;
          const params = new URLSearchParams(searchParams.toString());
          params.set("id", response.data._id);

          router.replace(`${currentPathname}?${params.toString()}`, {
            scroll: false,
          });
        }
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
        searchParams.delete();
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
      content:
        context && context != "" && isContextEnabled && messages.length === 0
          ? `### Yêu cầu: ${input.trim()}. Dựa vào nội dung sau:\n${context}`
          : input.trim(),
      documents: [],
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
    async function fetchChatData() {
      if (chatId) {
        setCurrentChatId(chatId);
        try {
          const res = await fetch(`/api/chat/get-completion?_id=${chatId}`, {
            method: "GET",
          });
          const response = await processResponse(res, {
            success: false,
            error: false,
          });

          if (response.success) {
            setMessages(response.data.messages || []);
          } else {
            console.error("Error fetching chat data:", response.error);
          }
        } catch (error) {
          console.error("Error parsing chat ID:", error);
        }
      }
    }

    fetchChatData();
  }, [chatId]);

  return (
    <div className="flex flex-col w-full h-full space-y-4 items-center 2xl:min-w-100">
      {title && (
        <CardHeader className="w-full flex items-center justify-between">
          <CardTitle>{t("chat")}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant={"ghost"}>
                <History />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavConversations isRedirect={false} />
            </DropdownMenuContent>
          </DropdownMenu>
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
                <div
                  id="llm"
                  className="bg-secondary p-4 rounded-md border border-dashed break-all"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]} // Cho phép sử dụng markdown GFM
                    rehypePlugins={[rehypeRaw]}
                  >
                    {message?.content}
                  </ReactMarkdown>
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
                {message?.documents && message.documents.length > 0 && (
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground mt-8">
                      {t("ref_documents")}
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
                <Skeleton className="w-80 p-4 mb-5 bg-secondary rounded-md h-15" />
              </div>
            </motion.div>
          )}
        </div>
      )}
      {messages?.length == 0 && (
        <div className="flex flex-col flex-1 items-center justify-center">
          <AnimatePresence>
            <h4 className="flex gap-1 scroll-m-20 text-xl font-semibold tracking-tight">
              <MessageCircleMoreIcon /> {t("ask_anything")}
            </h4>
            {isKnowledgeEnabled && !attachedCourse && (
              <motion.span
                key={"knowledge-base"}
                className="text-sm text-muted-foreground ml-2"
                initial={{ opacity: 0, y: 10 }}
                exit={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {t("use_knowledge")}
              </motion.span>
            )}
            {attachedCourse && isKnowledgeEnabled && (
              <motion.span
                key={"attached-course"}
                className="flex gap-1 text-sm text-muted-foreground ml-2"
                initial={{ opacity: 0, y: 10 }}
                exit={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {t("about")} <p className="font-bold">{attachedCourse.title}</p>
              </motion.span>
            )}
            {isContextEnabled && (
              <motion.span
                key={"context"}
                className="flex gap-1 text-sm text-muted-foreground ml-2"
                initial={{ opacity: 0, y: 10 }}
                exit={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {t("with")} <p className="font-bold">{t("attached")}</p>
              </motion.span>
            )}
          </AnimatePresence>
          <small className="flex gap-1 items-center text-sm text-destructive mt-2">
            <AlertCircle size={14} />
            {t("ai_can_be_wrong")}
          </small>
        </div>
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
          placeholder={t("placeholder")}
          className="resize-none max-h-[17rem] border-dashed scrollbar"
        ></Textarea>
        <div className="w-full pt-1 md:pt-2 flex flex-wrap gap-1 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <BrainCircuit className="hidden sm:flex" />
                <p className="truncate max-w-12 xl:max-w-50">{model}</p>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>{t("select_model")}</DropdownMenuLabel>
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
          {context && (
            <div className="w-auto h-9 flex gap-1 p-2 bg-secondary rounded-md items-center justify-center relative">
              <BookOpen className="sm:hidden" size={18} />
              <p className="text-sm font-semibold hidden xl:flex">
                {t("content")}
              </p>
              <Switch
                checked={isContextEnabled}
                onCheckedChange={setIsContextEnabled}
              />
              <div
                hidden={messages?.length === 0}
                className="w-full h-full absolute z-10 bg-background top-0 left-0 rounded-md opacity-50"
              ></div>
            </div>
          )}
          <AttachContent
            disabled={!isKnowledgeEnabled}
            selectedCourse={attachedCourse}
            setSelectedCourse={setAttachedCourse}
          />
          <div className="w-auto h-9 flex gap-1 p-2 bg-secondary rounded-md items-center justify-center">
            <LibraryBig className="" size={18} />
            <p className="text-sm font-semibold hidden xl:flex">
              {t("knowledge")}
            </p>
            <Switch
              checked={isKnowledgeEnabled}
              onCheckedChange={setIsKnowledgeEnabled}
            />
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setMessages([]);
                    setCurrentChatId(null);
                    const currentPathname = window.location.pathname;
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("id");
                    router.replace(`${currentPathname}?${params.toString()}`, {
                      scroll: false,
                    });
                  }}
                  size={"icon"}
                  variant={"secondary"}
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("new")}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  onClick={scrollToBottom}
                  variant={"secondary"}
                >
                  <ChevronDown />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("scroll")}</TooltipContent>
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
                    documents: [],
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
    </div>
  );
}

export default ChatBox;
