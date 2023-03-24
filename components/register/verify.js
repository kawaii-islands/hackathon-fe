import cn from "classnames/bind";
import styles from "styles/register/index.module.scss";
import { Paper } from "@mui/material";
import { ENDPOINT } from "consts";
import axios from "axios";
import { useState } from "react";
import refreshToken from "utils/refresh-token";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const cx = cn.bind(styles);

export default function Verify() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const { t } = useTranslation();

  const resend = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${ENDPOINT}/auth/send-verification-email`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      toast.success("Resend success");
    } catch (error) {
      if (error?.response?.data?.code === 401) refreshToken(resend);
      else toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper className={cx("verify")}>
      <div className={cx("title")}>{t("common.verifyTitle")}</div>
      <img src="/icons/send.svg" />
      <div className={cx("text")}>
        {t("common.verifyContent1")}{" "}
        <span className={cx("email")}>{user.email}</span>.{" "}
        {t("common.verifyContent2")}
      </div>
      <button className={cx("resend")} onClick={resend} disabled={loading}>
        {t("common.verifyButton")}
      </button>
    </Paper>
  );
}
