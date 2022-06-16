import { useMemo, useState, useEffect } from "react";
import cn from "classnames/bind";
import styles from "styles/apply/index.module.scss";
import { Container } from "@mui/system";
import { Grid, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "hooks/useAuth";

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

export default function Apply() {
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

  const isAuth = useAuth(true);

  if (!isAuth) return <></>;

  return (
    <div className={cx("apply")}>
      <Container className={cx("container")}>
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <div className={cx("title")}>general information</div>
            <div className={cx("label")}>Team name</div>
            <OutlinedInput className={cx("input")} />
            <div className={cx("label")}>Team email</div>
            <OutlinedInput className={cx("input")} />
            <div className={cx("label")}>No. of members</div>
            <OutlinedInput
              className={cx("input")}
              type="number"
              inputProps={{
                min: 1,
                max: 6,
              }}
            />
            <div className={cx("label")}>Country</div>
            <OutlinedInput className={cx("input")} />
            <div className={cx("label")}>Team story (on game development)</div>
            <OutlinedInput className={cx("input")} />
            <div className={cx("label")}>Game Idea</div>
            <OutlinedInput className={cx("input")} />
            <div className={cx("label")}>Supporting document/art</div>
            <OutlinedInput className={cx("input")} />
          </Grid>
          <Grid item lg={6}>
            <div className={cx("title")}>team members</div>
            <div className={cx("sub-title")}>No.1</div>
            <div className={cx("label")}>Name/Nickname</div>
            <OutlinedInput className={cx("input")} />
            <div className={cx("label")}>Position</div>
            <OutlinedInput className={cx("input")} />
            <div className={cx("label")}>Discord username</div>
            <OutlinedInput className={cx("input")} />
          </Grid>
          <button className={cx("submit")}>Apply</button>
        </Grid>
      </Container>
    </div>
  );
}
