import { createReactBlockSpec } from "@blocknote/react";

export const InlineCode = createReactBlockSpec(
  {
    type: "inlinecode",
    propSchema: {},
    content: "inline", // Cho phép nội dung dạng inline
  },
  {
    render: ({ contentRef }) => {
      return (
        <code
          ref={contentRef}
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        ></code>
      );
    },
  }
);
