import {
  DefaultReactGridSuggestionItem,
  GridSuggestionMenuProps,
} from "@blocknote/react";

export default function CustomEmojiPicker(
  props: GridSuggestionMenuProps<DefaultReactGridSuggestionItem>
) {
  return (
    <div
      className="bg-background p-2 shadow-sm grid flex-col gap-1 h-fit-content max-h-inherit overflow-y-auto"
      style={
        {
          gridTemplateColumns: `repeat(${props.columns || 1}, 1fr)`,
        } as React.CSSProperties
      }
    >
      {props.items.map((item, index) => (
        <div
          key={index}
          className={`emoji-picker-item ${
            props.selectedIndex === index ? " selected" : ""
          } cursor-pointer text-[1.5rem]`}
          onClick={() => {
            props.onItemClick?.(item);
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
