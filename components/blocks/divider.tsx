import { createReactBlockSpec } from "@blocknote/react";
import { Separator } from "../ui/separator";

export const Divider = createReactBlockSpec(
  {
    type: "divider",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      return (
        <Separator contentEditable={false} className="my-[0.5rem]"></Separator>
      );
    },
  }
);
