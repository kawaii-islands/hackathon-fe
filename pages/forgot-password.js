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
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

export default function Register() {
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
      await axios.post(`${ENDPOINT}/auth/forgot-password`, values);
      toast.success("Check your email");
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
            {t("register.forgot")}
          </div>
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
          <Button className={cx("submit")} type="submit" disabled={loading}>
            {t("register.send")}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
