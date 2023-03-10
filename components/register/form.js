import { useEffect, useMemo, useState } from "react";
import {
  Paper,
  OutlinedInput,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
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
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

const cx = cn.bind(styles);

const schema = yup
  .object()
  .shape({
    name: yup.string().required("register.error.name.required"),
    // country: yup.string().required("register.error.country.required"),
    phoneNumber: yup.string().required("register.error.phone.required"),
    email: yup
      .string()
      .email("register.error.email.invalid")
      .required("register.error.email.required"),
    dateOfBirth: yup.date().required("register.error.birthday.required"),
    townCity: yup.string().required("register.error.city.required"),
    jobRole: yup.string().required("register.error.job.required"),
    placeOfWork: yup.string().required("register.error.place.required"),
    password: yup
      .string()
      .min(8, "register.error.password.min")
      .test(
        "validate-password",
        "register.error.password.validate",
        (value) => value.match(/\d/) && value.match(/[a-zA-Z]/)
      )
      .required("register.error.password.required"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "register.error.confirm-password.match"
      )
      .required("register.error.confirm-password.required"),
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
          <div className={cx("error")}>{t(errors.name.message)}</div>
        )}
        <OutlinedInput
          className={cx("input")}
          startAdornment={
            <InputAdornment position="start">
              {/* <img src="/icons/country.svg" /> */}
              <LocalPhoneRoundedIcon />
            </InputAdornment>
          }
          placeholder={t("register.phone")}
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && firstError === "phoneNumber" && (
          <div className={cx("error")}>{t(errors.phoneNumber.message)}</div>
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
          <div className={cx("error")}>{t(errors.email.message)}</div>
        )}

        <OutlinedInput
          className={cx("input")}
          type="date"
          startAdornment={
            <InputAdornment position="start">
              <CalendarMonthRoundedIcon />
            </InputAdornment>
          }
          placeholder={t("register.birthday")}
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && firstError === "dateOfBirth" && (
          <div className={cx("error")}>{t(errors.dateOfBirth.message)}</div>
        )}

        <OutlinedInput
          className={cx("input")}
          startAdornment={
            <InputAdornment position="start">
              <LocationOnRoundedIcon />
            </InputAdornment>
          }
          placeholder={t("register.city")}
          {...register("townCity")}
        />
        {errors.townCity && firstError === "townCity" && (
          <div className={cx("error")}>{t(errors.townCity.message)}</div>
        )}

        <OutlinedInput
          className={cx("input")}
          startAdornment={
            <InputAdornment position="start">
              <EngineeringRoundedIcon />
            </InputAdornment>
          }
          placeholder={t("register.job")}
          {...register("jobRole")}
        />
         {errors.jobRole && firstError === "jobRole" && (
          <div className={cx("error")}>{t(errors.jobRole.message)}</div>
        )}

        <OutlinedInput
          className={cx("input")}
          startAdornment={
            <InputAdornment position="start">
              <HomeWorkRoundedIcon />
            </InputAdornment>
          }
          placeholder={t("register.place")}
          {...register("placeOfWork")}
        />
         {errors.placeOfWork && firstError === "placeOfWork" && (
          <div className={cx("error")}>{t(errors.placeOfWork.message)}</div>
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
          <div className={cx("error")}>{t(errors.confirmPassword.message)}</div>
        )}
        <Button className={cx("submit")} type="submit" disabled={loading}>
          <span> {t("common.register")}</span>
          <span style={{ marginLeft: "16px", marginTop: "6px" }}>
            {" "}
            {loading && (
              <CircularProgress
                color="inherit"
                style={{ width: "24px", height: "24px" }}
              />
            )}
          </span>
        </Button>
        <div className={cx("footer")}>
          {t("register.already")} <Link href="/login">{t("common.login")}</Link>
        </div>
      </form>
    </Paper>
  );
}
