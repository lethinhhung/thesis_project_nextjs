import { createReactBlockSpec } from "@blocknote/react";

export const Muted = createReactBlockSpec(
  {
    type: "muted",
    propSchema: {},
    content: "inline", // Cho phép nội dung dạng inline
  },
  {
    render: ({ contentRef }) => {
      return (
        <p ref={contentRef} className="!text-sm !text-muted-foreground"></p>
      );
    },
  }
);
