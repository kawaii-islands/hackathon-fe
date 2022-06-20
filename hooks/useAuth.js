import { useRouter } from "next/router";
import { useEffect } from "react";

export const AUTH_STATUS = {
  NOT_AUTH: "NOT_AUTH",
  NOT_VERIFIED: "NOT_VERIFIED",
  VERIFIED: "VERIFIED",
};

export default function useAuth(isRedirect) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && isRedirect) {
      if (!user) router.push("/login");
      else if (!user.isEmailVerified) router.push("/register?verify");
    }
  }, [router]);
  if (!user) return AUTH_STATUS.NOT_AUTH;
  if (!user.isEmailVerified) return AUTH_STATUS.NOT_VERIFIED;
  return AUTH_STATUS.VERIFIED;
}
