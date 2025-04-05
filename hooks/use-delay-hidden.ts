import { useEffect, useState } from "react";

export function useDelayedHidden(hidden: boolean, delay: number = 75) {
  const [isFullyHidden, setIsFullyHidden] = useState(hidden);

  useEffect(() => {
    if (!hidden) {
      if (isFullyHidden) setIsFullyHidden(false); // Chỉ cập nhật nếu cần
    } else {
      const timeout = setTimeout(() => setIsFullyHidden(true), delay);
      return () => clearTimeout(timeout);
    }
  }, [hidden, delay, isFullyHidden]); // Thêm `isFullyHidden` để tránh re-render không cần thiết

  return isFullyHidden;
}
