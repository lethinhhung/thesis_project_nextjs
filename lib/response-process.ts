"use client";

import { toast } from "sonner";

export async function processResponse(response: Response) {
  const data = await response.json();

  if (response.ok) {
    const successMessage = data.message || "Thành công";

    toast.success(successMessage);
    return data;
  }

  const message = data.message || "Có lỗi xảy ra";
  const details = data.error?.details || "Có lỗi xảy ra";

  switch (response.status) {
    case 401:
      toast.error(message || "Chưa xác thực", {
        description: details,
      });
      break;
    case 403:
      toast.error(message || "Không có quyền truy cập", {
        description: details,
      });
      break;
    case 404:
      toast.error(message || "Không tìm thấy tài nguyên", {
        description: details,
      });
      break;
    case 500:
    default:
      toast.error(message || "Lỗi máy chủ", {
        description: details,
      });
      break;
  }

  return data;
}
