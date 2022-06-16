import cn from "classnames/bind";
import styles from "styles/register/index.module.scss";
import { Paper } from "@mui/material";
import { ENDPOINT } from "consts";
import axios from "axios";
import { useState } from "react";

const cx = cn.bind(styles);

export default function Verify() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("token");

  const resend = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${ENDPOINT}/auth/send-verification-email`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper className={cx("verify")}>
      <div className={cx("title")}>Verify your account</div>
      <img src="/icons/send.svg" />
      <div className={cx("text")}>
        A verification email has been sent to{" "}
        <span className={cx("email")}>{user.email}</span>. Please check your
        mailbox to verify the account before you log in
      </div>
      <button className={cx("resend")} onClick={resend} disabled={loading}>
        Resend
      </button>
    </Paper>
  );
}
