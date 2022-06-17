import { useRouter } from "next/router";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { ENDPOINT } from "consts";
import refreshToken from "utils/refresh-token";

export default function VerifyEmail() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.token) {
      sendVerify(router.query.token);
    }
  }, [router]);

  const sendVerify = async (token) => {
    try {
      await axios.post(
        `${ENDPOINT}/auth/verify-email?token=${token}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      const user = JSON.parse(window.localStorage.getItem("user"));
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          isEmailVerified: true,
        })
      );
      toast.success("Verify successfully!!");
      router.replace("/login");
    } catch (error) {
      toast.error(error.message);
      if (error?.response?.data?.code === 401) toast.error("Expired token");
      else toast.error(error?.response?.data?.message);
    }
  };

  if (!router.isReady) return <></>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress style={{ marginRight: 20 }} /> Wait a seconds
    </div>
  );
}
