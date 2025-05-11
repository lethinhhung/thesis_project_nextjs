"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Hourglass,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function CountdownTimer() {
  const [minutes, setMinutes] = useState(10); // Thời gian mặc định: 10 phút
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          const audio = new Audio("/notification.mp3");
          audio.play();
          toast.error("Out of time", {
            icon: <Hourglass size={15} />,
            description: "The countdown has ended.",
          });
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    setTimeLeft(minutes * 60 + seconds);
    setIsRunning(false);
  }, [minutes, seconds]);

  return (
    <Collapsible className="flex flex-col items-center justify-center gap-2 pt-4">
      <p className="text-4xl font-bold">
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>

      {/* Nút điều khiển */}
      <div className="flex justify-center gap-2">
        <Button
          variant={"ghost"}
          disabled={timeLeft === 0 ? true : false}
          onClick={() => setIsRunning(!isRunning)}
          size="icon"
        >
          {isRunning ? <Pause /> : <Play />}
        </Button>
        <Button
          onClick={() => {
            setTimeLeft(minutes * 60 + seconds);
            setIsRunning(false);
          }}
          variant="ghost"
          size="icon"
        >
          <RotateCcw />
        </Button>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="border-t border-dashed pt-2 text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <Button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
              setMinutes(5);
              setTimeLeft(5 * 60);
            }}
            variant="ghost"
            size={"sm"}
          >
            5&quot;
          </Button>
          <Button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
              setMinutes(25);
              setTimeLeft(25 * 60);
            }}
            variant="ghost"
            size={"sm"}
          >
            25&quot;
          </Button>
          <Button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
              setMinutes(60);
              setTimeLeft(60 * 60);
            }}
            variant="ghost"
            size={"sm"}
          >
            60&quot;
          </Button>
        </div>

        {/* Input chỉnh thời gian */}
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMinutes(minutes === 99 ? minutes : minutes + 1)}
            >
              <ChevronUp />
            </Button>
            <Input
              type="number"
              min="0"
              max="99"
              value={minutes.toString()}
              onChange={(e) => {
                if (parseInt(e.target.value, 10) >= 99) {
                  return;
                }
                const value = e.target.value.replace(/^0+/, "") || "0";
                setMinutes(parseInt(value, 10));
              }}
              className="custom-number-input text-center text-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMinutes(minutes === 0 ? minutes : minutes - 1)}
            >
              <ChevronDown />
            </Button>
          </div>
          <span className="text-xl font-semibold">&quot;</span>
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSeconds(seconds === 59 ? seconds : seconds + 1)}
            >
              <ChevronUp />
            </Button>
            <Input
              type="number"
              min="0"
              max="59"
              value={seconds.toString()}
              onChange={(e) => {
                if (parseInt(e.target.value, 10) >= 60) {
                  return;
                }
                const value = e.target.value.replace(/^0+/, "") || "0";
                setSeconds(parseInt(value, 10));
              }}
              className="custom-number-input text-center text-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSeconds(seconds === 0 ? seconds : seconds - 1)}
            >
              <ChevronDown />
            </Button>
          </div>
          <span className="text-xl font-semibold">&apos;</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
