import { useEffect } from "react";

/**
 * useDebounce - Trì hoãn thực thi một callback cho đến khi không còn sự thay đổi trong khoảng thời gian nhất định.
 * @param callback - Hàm cần thực thi sau khi debounce
 * @param delay - Thời gian chờ (ms)
 * @param deps - Danh sách dependencies để kích hoạt lại debounce
 */
export function useDebounce(callback: () => void, delay: number, deps: any[]) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}
