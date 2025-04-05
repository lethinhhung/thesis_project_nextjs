import { createReactBlockSpec } from "@blocknote/react";

export const Quote = createReactBlockSpec(
  {
    type: "quote",
    propSchema: {},
    content: "inline", // Cho phép nội dung dạng inline
  },
  {
    render: ({ contentRef }) => {
      return (
        <blockquote
          ref={contentRef} // Đảm bảo BlockNote quản lý nội dung
          className="border-l-2 border-gray-500 pl-6 italic text-gray-700 dark:text-gray-300"
        ></blockquote>
      );
    },
  }
);
