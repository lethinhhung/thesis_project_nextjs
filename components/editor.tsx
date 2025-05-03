"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@/app/[locale]/globals.css";
import {
  getDefaultReactSlashMenuItems,
  GridSuggestionMenuController,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { filterSuggestionItems } from "@blocknote/core";
import CustomEmojiPicker from "./blocks/emoji";
import { useEffect, useRef, useState } from "react";
import EditorMenubar from "./editor-menubar";
import { useTheme } from "next-themes";
import {
  insertDivider,
  insertHeading4,
  insertInlineCode,
  insertMuted,
  insertQuote,
  schema,
} from "./blocknote";
import { LessonContent } from "@/interfaces/lesson";
import { processResponse } from "@/lib/response-process";
import { useDebounce } from "@/hooks/use-debounce";

// const plainTheme = {
//   light: lightDefaultTheme,
//   dark: {
//     ...darkDefaultTheme,
//     colors: {
//       editor: {
//         background: "oklch(0.145 0 0)",
//         text: "#cfcfcf",
//       },
//     },
//   },
// };

const plainTheme = {
  light: {
    ...lightDefaultTheme,
    colors: {
      editor: {
        background: "oklch(1 0 0)",
        text: "oklch(0.145 0 0)",
      },
    },
  },
  dark: {
    ...darkDefaultTheme,
    colors: {
      editor: {
        background: "oklch(0.145 0 0)",
        text: "oklch(0.99 0 0)",
      },
    },
  },
};

const defaultTheme = {
  light: {
    ...lightDefaultTheme,
    colors: {
      editor: {
        background: "oklch(0.97 0 0)",
        text: "oklch(0.145 0 0)",
      },
    },
  },
  dark: {
    ...darkDefaultTheme,
    colors: {
      editor: {
        background: "oklch(0.269 0 0)",
        text: "oklch(0.99 0 0)",
      },
    },
  },
};

const Editor = ({
  lesson,
  isChatOpen,
  setIsChatOpen,
  markDown,
  setMarkDown,
}: {
  lesson?: LessonContent;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
  markDown: string;
  setMarkDown: (value: string) => void;
}) => {
  const editor = useCreateBlockNote({
    schema,
  });
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const [isPlainBackground, setIsPlainBackground] = useState(true);
  const [isSystemDark, setIsSystemDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(lesson?.content);

  const [pendingChange, setPendingChange] = useState(false);

  useDebounce(
    () => {
      if (pendingChange) {
        setIsLoading(true);
        saveContentAsJSON();
        setPendingChange(false);
      }
    },
    3000,
    [pendingChange]
  );

  async function loadInitialJSON() {
    if (!content) return;

    try {
      const blocks = JSON.parse(content || "");
      setTimeout(() => {
        editor.replaceBlocks(editor.document, blocks);
      }, 0);
    } catch (error) {
      console.error("Failed to parse blocks JSON:", error);
    }
  }

  async function saveContentAsJSON() {
    setIsLoading(true);
    const blocks = editor.document;
    setMarkDown(await editor.blocksToMarkdownLossy());
    try {
      const blocksJSON = JSON.stringify(blocks);
      const submitting = {
        content: blocksJSON,
      };

      const res = await fetch(`/api/lesson/update-content/${lesson?._id}`, {
        method: "PUT",
        body: JSON.stringify(submitting),
      });
      const response = await processResponse(res, {
        success: false,
        error: true,
      });

      if (response.success) {
        setContent(response.data.content);
      }
    } catch (error) {
      console.error("Failed to save blocks as JSON:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Kiểm tra hệ thống có đang ở dark mode không (chỉ khi theme = "system")
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsSystemDark(mediaQuery.matches);

    // Lắng nghe sự thay đổi theme của hệ thống
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    loadInitialJSON();

    return () => mediaQuery.removeEventListener("change", handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Xác định theme thực tế mà user đang dùng
  const isDarkTheme = theme === "dark" || (theme === "system" && isSystemDark);

  // Xác định theme của editor
  const editorTheme =
    isPlainBackground && isDarkTheme
      ? plainTheme.dark
      : isPlainBackground && !isDarkTheme
      ? plainTheme.light
      : !isPlainBackground && isDarkTheme
      ? defaultTheme.dark
      : defaultTheme.light;
  const editorRef = useRef<HTMLDivElement>(null!);

  return (
    <div className="col-span-full space-y-4">
      <EditorMenubar
        editor={editor}
        isPlainBackground={isPlainBackground}
        setIsPlainBackground={setIsPlainBackground}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        editorRef={editorRef}
        isLoading={isLoading}
        save={saveContentAsJSON}
        markDown={markDown}
      />

      <div className="w-full px-1 sm:px-2" ref={editorRef}>
        <BlockNoteView
          className="w-full"
          onChange={() => setPendingChange(true)}
          editor={editor}
          theme={editorTheme}
          slashMenu={false}
          emojiPicker={false}

          // onClick={() => console.log(editor.getSelection()?.blocks)}
        >
          <SuggestionMenuController
            triggerCharacter={"/"}
            getItems={async (query) =>
              // Gets all default slash menu items and `insertAlert` item.
              filterSuggestionItems(
                [
                  ...getDefaultReactSlashMenuItems(editor),
                  insertDivider(editor),
                  insertQuote(editor),
                  insertHeading4(editor),
                  insertInlineCode(editor),
                  insertMuted(editor),
                ],
                query
              )
            }
          />
          <GridSuggestionMenuController
            triggerCharacter={":"}
            gridSuggestionMenuComponent={CustomEmojiPicker}
            columns={isMobile ? 6 : 10}
            minQueryLength={2}
          />
        </BlockNoteView>
      </div>
    </div>
  );
};

export default Editor;
