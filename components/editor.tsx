"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  getDefaultReactSlashMenuItems,
  GridSuggestionMenuController,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { Divider } from "./blocks/divider";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import {
  SquareSplitVertical,
  Quote as QuoteIcon,
  Heading4 as Heading4Icon,
  Code,
  Type,
} from "lucide-react";
import CustomEmojiPicker from "./blocks/emoji";
import { useEffect, useState } from "react";
import { Quote } from "./blocks/quote";
import { Heading4 } from "./blocks/heading4";
import { InlineCode } from "./blocks/inline-code";
import { Muted } from "./blocks/muted";
import EditorMenubar from "./editor-menubar";
import { useTheme } from "next-themes";

const plainTheme = {
  light: lightDefaultTheme,
  dark: {
    ...darkDefaultTheme,
    colors: {
      editor: {
        background: "oklch(0.145 0 0)",
        text: "#cfcfcf",
      },
    },
  },
};

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    divider: Divider,
    quote: Quote,
    heading4: Heading4,
    inlinecode: InlineCode,
    muted: Muted,
  },
});

const insertDivider = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Divider",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "divider",
    });
  },
  aliases: ["divider", "hr", "line", "separator", "rule", "thematic break"],
  group: "More",
  icon: <SquareSplitVertical size={18} />,
});

const insertQuote = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Quote",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "quote",
    });
  },
  aliases: [
    "quote",
    "blockquote",
    "citation",
    "reference",
    "source",
    "cite",
    "quotation",
    "epigraph",
    "excerpt",
  ],
  group: "More",
  icon: <QuoteIcon size={18} />,
});

const insertHeading4 = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Heading 4",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "heading4",
    });
  },
  aliases: ["heading4", "h4", "subheading", "subheader", "subtitle"],
  group: "More",
  icon: <Heading4Icon size={18} />,
});

const insertInlineCode = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Inline code",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "inlinecode",
    });
  },
  aliases: ["inlinecode", "code", "monospace", "monospaced", "typewriter"],
  group: "More",
  icon: <Code size={18} />,
});

const insertMuted = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Muted text",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "muted",
    });
  },
  aliases: ["muted", "dim", "faded", "subdued", "soft"],
  group: "More",
  icon: <Type size={18} />,
});

const Editor = ({
  isChatOpen,
  setIsChatOpen,
  markDown,
  setMarkDown,
}: {
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

  async function loadInitialJSON() {
    const content = localStorage.getItem("blocks");
    if (!content) return;

    try {
      const blocks = JSON.parse(content);
      setTimeout(() => {
        editor.replaceBlocks(editor.document, blocks);
      }, 0);
    } catch (error) {
      console.error("Failed to parse blocks JSON:", error);
    }
  }

  async function saveContentAsJSON() {
    const blocks = editor.document;
    setMarkDown(await editor.blocksToMarkdownLossy());
    try {
      const blocksJSON = JSON.stringify(blocks);
      localStorage.setItem("blocks", blocksJSON);
      console.log(markDown);
    } catch (error) {
      console.error("Failed to save blocks as JSON:", error);
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
  }, []);

  // Xác định theme thực tế mà user đang dùng
  const isDarkTheme = theme === "dark" || (theme === "system" && isSystemDark);

  // Xác định theme của editor
  const editorTheme =
    isPlainBackground && isDarkTheme
      ? plainTheme.dark
      : isDarkTheme
      ? "dark"
      : "light";

  return (
    <div className="col-span-full space-y-4">
      <EditorMenubar
        isDarkTheme={isDarkTheme}
        isPlainBackground={isPlainBackground}
        setIsPlainBackground={setIsPlainBackground}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />

      <BlockNoteView
        className="w-full"
        onChange={saveContentAsJSON}
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
  );
};

export default Editor;
