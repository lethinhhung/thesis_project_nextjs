"use client";

import { signOut } from "next-auth/react";
import { toast } from "sonner";

export async function processResponse(
  response: Response,
  toastify = { success: true, error: true }
) {
  const data = await response.json();

  if (response.ok) {
    if (!toastify.success) {
      return data;
    }
    const successMessage = data.message || "Thành công";
    toast.success(successMessage);
    return data;
  }

  if (!toastify.error) {
    return data;
  }

  const message = data.message || "Có lỗi xảy ra";
  const details = data.error?.details || "Có lỗi xảy ra";

  switch (response.status) {
    case 401:
      signOut({
        redirect: true,
        callbackUrl: "/login?error=unauthorized",
      });
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
