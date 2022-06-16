import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuth(isRedirect) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && isRedirect) {
      if (!user) router.push("/login");
      else if (!user.isEmailVerified) router.push("/register?verify");
    }
  }, [router]);
  if (!user) return false;
  if (!user.isEmailVerified) return false;
  return true;
}
