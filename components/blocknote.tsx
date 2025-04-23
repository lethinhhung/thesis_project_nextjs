import {
  BlockNoteSchema,
  defaultBlockSpecs,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { Divider } from "./blocks/divider";
import { Quote } from "./blocks/quote";
import { Heading4 } from "./blocks/heading4";
import { InlineCode } from "./blocks/inline-code";
import { Muted } from "./blocks/muted";
import {
  SquareSplitVertical,
  Quote as QuoteIcon,
  Heading4 as Heading4Icon,
  Code,
  Type,
} from "lucide-react";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    divider: Divider,
    quote: Quote,
    heading4: Heading4,
    inlinecode: InlineCode,
    muted: Muted,
  },
});

export const insertDivider = (editor: typeof schema.BlockNoteEditor) => ({
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

export const insertQuote = (editor: typeof schema.BlockNoteEditor) => ({
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

export const insertHeading4 = (editor: typeof schema.BlockNoteEditor) => ({
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

export const insertInlineCode = (editor: typeof schema.BlockNoteEditor) => ({
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

export const insertMuted = (editor: typeof schema.BlockNoteEditor) => ({
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
