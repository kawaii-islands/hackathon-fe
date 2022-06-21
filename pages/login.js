import { useEffect, useMemo, useState } from "react";
import { Paper, OutlinedInput, InputAdornment, Button } from "@mui/material";
import styles from "styles/register/index.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINT } from "consts";

const cx = cn.bind(styles);
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("register.error.email.invalid")
      .required("register.error.email.required"),
    password: yup.string().required("register.error.password.required"),
  })
  .required();

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const {
    setFocus,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const firstError = useMemo(
    () =>
      Object.keys(errors).reduce((field, a) => {
        return !!errors[field] ? field : a;
      }, null),
    [errors]
  );

  useEffect(() => {
    if (firstError) {
      setFocus(firstError);
    }
  }, [firstError]);

  const login = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(`${ENDPOINT}/auth/login`, values);
      if (res.data.user) {
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        window.localStorage.setItem("token", res.data.tokens.access.token);
        window.localStorage.setItem(
          "refresh-token",
          res.data.tokens.refresh.token
        );
        router.push("/");
      }
    } catch (error) {
      let message = error.message;
      if (error?.response?.data?.message) message = error.response.data.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("register")}>
      <Paper className={cx("form")}>
        <form onSubmit={handleSubmit((values) => login(values))}>
          <div className={cx("title")}>{t("common.login")}</div>
          <OutlinedInput
            className={cx("input")}
            startAdornment={
              <InputAdornment position="start">
                <img src="/icons/mail.svg" />
              </InputAdornment>
            }
            placeholder={t("register.email")}
            {...register("email")}
          />
          {errors.email && firstError === "email" && (
            <div className={cx("error")}>{t(errors.email.message)}</div>
          )}
          <OutlinedInput
            type="password"
            className={cx("input")}
            startAdornment={
              <InputAdornment position="start">
                <img src="/icons/lock.svg" />
              </InputAdornment>
            }
            placeholder={t("register.password")}
            {...register("password")}
          />
          {errors.password && firstError === "password" && (
            <div className={cx("error")}>{t(errors.password.message)}</div>
          )}
          <Link href="/forgot-password">
            <div className={cx("forgot-password")}>{t("register.forgot")}?</div>
          </Link>
          <Button className={cx("submit")} type="submit" disabled={loading}>
            {t("common.login")}
          </Button>
          <div className={cx("footer")}>
            {t("register.member")}{" "}
            <Link href="/register">{t("register.register")}</Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}
