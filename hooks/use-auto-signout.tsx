// hooks/useAutoSignOut.ts
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export function useAutoSignOut() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const expiresAt = new Date(session.expires).getTime(); // thời gian hết hạn
    const now = Date.now();
    const timeout = expiresAt - now;

    if (timeout <= 0) {
      signOut({ callbackUrl: "/en/login" });
      toast.error("Session expired. Please log in again.");
      return;
    }
  }, [session]);
}
