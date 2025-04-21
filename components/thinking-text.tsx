import { useEffect, useState } from "react";

export default function ThinkingText() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <small className="text-sm font-medium leading-none">Thinking{dots}</small>
  );
}
