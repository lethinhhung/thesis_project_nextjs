import { createReactBlockSpec } from "@blocknote/react";

export const Heading4 = createReactBlockSpec(
  {
    type: "heading4",
    propSchema: {},
    content: "inline", // Cho phép nội dung dạng inline
  },
  {
    render: ({ contentRef }) => {
      return (
        <h4
          ref={contentRef}
          className="text-xl font-semibold tracking-tight"
        ></h4>
      );
    },
  }
);
