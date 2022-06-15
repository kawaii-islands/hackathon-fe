import { useEffect, useMemo } from "react";
import { Paper, OutlinedInput, InputAdornment, Button } from "@mui/material";
import styles from "styles/register/index.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const cx = cn.bind(styles);
const schema = yup
  .object()
  .shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default function Register() {
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

  return (
    <div className={cx("register")}>
      <Paper className={cx("form")}>
        <form
          onSubmit={handleSubmit((values) => console.log(values))}
          autoComplete="off"
        >
          <div className={cx("title")}>{t("footer.login")}</div>
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
            <div className={cx("error")}>{errors.email.message}</div>
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
            <div className={cx("error")}>{errors.password.message}</div>
          )}
          <Button className={cx("submit")} type="submit">
            {t("footer.login")}
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
