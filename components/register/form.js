import { useEffect, useMemo, useState } from "react";
import { Paper, OutlinedInput, InputAdornment, Button } from "@mui/material";
import styles from "styles/register/index.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINT } from "../../consts";

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
      .test(
        "validate-password",
        "Password must contain at least 1 letter and 1 number",
        (value) => value.match(/\d/) && value.match(/[a-zA-Z]/)
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  })
  .required();

export default function Form({ setStep }) {
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let body = { ...values };
      delete body.confirmPassword;
      const res = await axios.post(`${ENDPOINT}/auth/register`, body);
      if (res?.data?.user) {
        window.localStorage.setItem("token", res.data.tokens.access.token);
        window.localStorage.setItem(
          "refresh-token",
          res.data.tokens.refresh.token
        );
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        axios.post(
          `${ENDPOINT}/auth/send-verification-email`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + res.data.tokens.access.token,
            },
          }
        );
        setStep(1);
      } else throw new Error("An error occurred, please try again");
    } catch (error) {
      let message = error?.message;
      if (error?.response?.data?.message) message = error.response.data.message;
      console.error(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className={cx("form")}>
      <div className={cx("title")}>{t("register.title")}</div>
      <form
        onSubmit={handleSubmit((values) => onSubmit(values))}
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
        <Button className={cx("submit")} type="submit" disabled={loading}>
          {t("common.register")}
        </Button>
        <div className={cx("footer")}>
          {t("register.already")} <Link href="/login">{t("common.login")}</Link>
        </div>
      </form>
    </Paper>
  );
}
