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
    name: yup.string().required("Name is required"),
    country: yup.string().required("Country is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password min length is 8")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(8, "Confirm password min length is 8")
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
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
        <div className={cx("title")}>{t("register.title")}</div>
        <form
          onSubmit={handleSubmit((values) => console.log(values))}
          autoComplete="off"
        >
          <OutlinedInput
            className={cx("input")}
            startAdornment={
              <InputAdornment position="start">
                <img src="/icons/user.svg" />
              </InputAdornment>
            }
            placeholder={t("register.name")}
            {...register("name")}
          />
          {errors.name && firstError === "name" && (
            <div className={cx("error")}>{errors.name.message}</div>
          )}
          <OutlinedInput
            className={cx("input")}
            startAdornment={
              <InputAdornment position="start">
                <img src="/icons/country.svg" />
              </InputAdornment>
            }
            placeholder={t("register.country")}
            {...register("country")}
          />
          {errors.country && firstError === "country" && (
            <div className={cx("error")}>{errors.country.message}</div>
          )}
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
          <OutlinedInput
            type="password"
            className={cx("input")}
            startAdornment={
              <InputAdornment position="start">
                <img src="/icons/unlock.svg" />
              </InputAdornment>
            }
            placeholder={t("register.confirm")}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && firstError === "confirmPassword" && (
            <div className={cx("error")}>{errors.confirmPassword.message}</div>
          )}
          <Button className={cx("submit")} type="submit">
            {t("footer.register")}
          </Button>
          <div className={cx("footer")}>
            {t("register.already")}{" "}
            <Link href="/login">{t("footer.login")}</Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}
