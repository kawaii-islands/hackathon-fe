import { useEffect, useMemo, useState } from "react";
import { Paper, OutlinedInput, InputAdornment, Button } from "@mui/material";
import styles from "styles/register/index.module.scss";
import cn from "classnames/bind";
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
    currentPassword: yup.string().required("Confirm password is required"),
  })
  .required();

export default function Register() {
  const router = useRouter();
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

  const login = async (values) => {
    try {
      setLoading(true);
      let body = { ...values };
      delete body.confirmPassword;
      const token = router?.query?.token;
      await axios.post(`${ENDPOINT}/auth/reset-password?token=${token}`, body);
      toast.success("Reset password successfully");
      router.replace("/login");
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
          <div className={cx("title")} style={{ fontSize: 32 }}>
            {t("register.change")}
          </div>
          <OutlinedInput
            type="password"
            className={cx("input")}
            startAdornment={
              <InputAdornment position="start">
                <img src="/icons/lock.svg" />
              </InputAdornment>
            }
            placeholder={t("register.currentPassword")}
            {...register("currentPassword")}
          />
          {errors.currentPassword && firstError === "currentPassword" && (
            <div className={cx("error")}>{errors.currentPassword.message}</div>
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
            {t("register.send")}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
