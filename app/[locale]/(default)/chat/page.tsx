"use client";

import ChatBox from "@/components/chat-box";

function Chat() {
  return (
    <div className="flex w-full h-[calc(100dvh-92px)]">
      <div className="mx-auto w-full h-full max-w-6xl rounded-xl">
        <ChatBox />
      </div>
      {/* <div className="hidden 2xl:block columns-sm w-full min-w-100 max-w-5xl flex-1"></div> */}
    </div>
  );
}

export default Chat;
