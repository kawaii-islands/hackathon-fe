import React, { useMemo, useState, useRef, useEffect } from "react";
import cn from "classnames/bind";
import styles from "styles/apply/index.module.scss";
import { Container } from "@mui/system";
import { Grid, OutlinedInput, TextareaAutosize } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "hooks/useAuth";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ENDPOINT } from "consts";
import refreshToken from "utils/refresh-token";
import { toast } from "react-toastify";
import { AUTH_STATUS } from "hooks/useAuth";

const cx = cn.bind(styles);

export default function Apply() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(0);
  const [currentTeam, setCurrentTeam] = useState({
    email: user?.email,
    country: "",
    gameIdea: "",
    name: "",
    story: "",
    members: [
      {
        discordUsername: "",
        name: "",
        position: "",
      },
    ],
  });
  const schema = yup
    .object()
    .shape({
      name: yup.string().required("apply.error.team-name.required"),
      email: yup
        .string()
        .email("apply.error.team-email.invalid")
        .required("apply.error.team-email.required"),
      noOfMembers: yup
        .number()
        .integer("apply.error.no-of-members.integer")
        .min(1, "apply.error.no-of-members.min")
        .max(6, "apply.error.no-of-members.max"),
      country: yup.string().required("apply.error.country.required"),
      story: yup.string().required("apply.error.story.required"),
      gameIdea: yup.string().required("apply.error.idea.required"),
      attachment: yup.mixed().test({
        message: "apply.error.document.required",
        test: (file) => {
          return currentTeam.name || file?.length;
        },
      }),
      members: yup.array().of(
        yup.object().shape({
          name: yup.string().required("apply.error.name.required"),
          position: yup.string().required("apply.error.position.required"),
          discordUsername: yup
            .string()
            .required("apply.error.username.required"),
        })
      ),
    })
    .required();

  const {
    setFocus,
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      noOfMembers: currentTeam.members.length,
      email: currentTeam.email,
      country: currentTeam.country,
      gameIdea: currentTeam.gameIdea,
      name: currentTeam.name,
      story: currentTeam.story,
    },
  });
  const { t } = useTranslation();
  const noOfMembers = watch("noOfMembers");
  const attachmentRef = watch("attachment");
  const olfNoOfMembers = useRef();

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control,
  });

  useEffect(() => {
    if (noOfMembers === olfNoOfMembers.current) return;
    const newVal = parseInt(noOfMembers || 0);
    if (newVal > 6 || newVal < 1)
      return setValue("noOfMembers", olfNoOfMembers.current);
    olfNoOfMembers.current = noOfMembers;
    const oldVal = fields.length;
    if (newVal > oldVal) {
      for (let i = oldVal; i < newVal; i++) {
        append({ name: "", position: "", discordUsername: "" });
      }
    } else {
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [noOfMembers]);

  useEffect(() => {
    setAttachment(getValues("attachment"));
  }, [attachmentRef]);

  const firstError = useMemo(
    () =>
      Object.keys(errors).reduce((field, a) => {
        if (a === "members") {
          let index;
          let field;
          const isError = errors.members.some((member, idx) => {
            if (Object.keys(member).length) {
              index = idx;
              field = Object.keys(member)[0];
              return true;
            }
            return false;
          });
          if (isError) return `members.${index}.${field}`;
        }
        return !!errors[field] ? field : a;
      }, null),
    [errors]
  );

  useEffect(() => {
    getCurrentTeam();
  }, []);

  useEffect(() => {
    if (firstError) {
      setFocus(firstError);
    }
  }, [firstError]);

  const getCurrentTeam = async () => {
    try {
      const res = await axios.get(`${ENDPOINT}/teams`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      setCurrentTeam(res.data);
      delete res.data.createdBy;
      delete res.data.id;
      Object.keys(res.data).forEach((key) => {
        if (key === "attachment") {
        } else if (key === "members") {
          setValue("noOfMembers", res.data[key].length);
          const members = getValues("members");
          members.forEach((_, idx) => remove(idx));
          res.data[key].forEach((item, idx) => {
            append({
              name: item.name,
              position: item.position,
              discordUsername: item.discordUsername,
            });
          });
        } else {
          setValue(key, res.data[key]);
        }
      });
    } catch (error) {
      if (error?.response?.data?.code === 401) refreshToken(getCurrentTeam);
      else if (error?.response?.data?.code !== 404) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const onSubmit = async (values) => {
    try {
      const body = { ...values };
      setLoading(true);
      delete body.noOfMembers;

      if (body?.attachment?.length) {
        body.attachment = body.attachment[0];
      } else delete body.attachment;
      body.members = JSON.stringify(body.members);

      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) =>
        formData.append(key, value)
      );
      let res;
      if (currentTeam.name) {
        res = await axios.put(`${ENDPOINT}/teams`, formData, {
          headers: {
            "Content-Type": "multipart/form-data; boundary=something",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        });
        toast.success("Update successfully");
      } else {
        res = await axios.post(`${ENDPOINT}/teams`, formData, {
          headers: {
            "Content-Type": "multipart/form-data; boundary=something",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        });
        toast.success("Apply successfully");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.code === 401)
        refreshToken(() => onSubmit(values));
      else {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    }
  };

  const authStatus = useAuth(true);

  if (authStatus !== AUTH_STATUS.VERIFIED) return <></>;
  return (
    <div className={cx("apply")}>
      <Container className={cx("container")}>
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <Grid
            container
            spacing={{
              md: 6,
              xs: 0,
            }}
          >
            <Grid item md={6} xs={12}>
              <div className={cx("title")}>{t("apply.info")}</div>
              <div className={cx("label")}>{t("apply.teamName")}</div>
              <OutlinedInput className={cx("input")} {...register(`name`)} />
              {errors.name && firstError === "name" && (
                <div className={cx("error")}>{t(errors.name.message)}</div>
              )}
              <div className={cx("label")}>{t("apply.teamEmail")}</div>
              <OutlinedInput
                className={cx("input")}
                {...register(`email`)}
                readOnly
              />
              {errors.email && firstError === "email" && (
                <div className={cx("error")}>{t(errors.email.message)}</div>
              )}
              <div className={cx("label")}>{t("apply.noOfMembers")}</div>
              <OutlinedInput
                className={cx("input")}
                type="number"
                inputProps={{
                  min: 1,
                  max: 6,
                }}
                {...register(`noOfMembers`)}
              />
              {errors.noOfMembers && firstError === "noOfMembers" && (
                <div className={cx("error")}>
                  {t(errors.noOfMembers.message)}
                </div>
              )}
              <div className={cx("label")}>{t("apply.country")}</div>
              <OutlinedInput className={cx("input")} {...register(`country`)} />
              {errors.country && firstError === "country" && (
                <div className={cx("error")}>{t(errors.country.message)}</div>
              )}
              <div className={cx("label")}>{t("apply.story")}</div>
              <TextareaAutosize
                className={cx("textarea")}
                minRows={5}
                {...register(`story`)}
              />
              {errors.story && firstError === "story" && (
                <div className={cx("error")}>{t(errors.story.message)}</div>
              )}
              <div className={cx("label")}>{t("apply.idea")}</div>
              <TextareaAutosize
                className={cx("textarea")}
                minRows={5}
                {...register(`gameIdea`)}
              />
              {errors.gameIdea && firstError === "gameIdea" && (
                <div className={cx("error")}>{t(errors.gameIdea.message)}</div>
              )}
              <div className={cx("label")}>{t("apply.document")}</div>
              <input
                id="file"
                className={cx("file")}
                {...register(`attachment`)}
                type="file"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg"
              />
              <label htmlFor="file">
                <div>
                  {attachment?.[0]?.name ||
                    currentTeam?.attachment?.origin ||
                    t("apply.upload")}
                </div>
                <img src="/icons/upload.svg" />
              </label>
              {errors.attachment && firstError === "attachment" && (
                <div className={cx("error")}>
                  {t(errors.attachment.message)}
                </div>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={cx("title")}>{t("apply.team.members")}</div>
              {fields.map((_, idx) => (
                <React.Fragment key={idx}>
                  <div className={cx("sub-title")}>
                    {t("apply.team.no")}
                    {idx + 1}
                  </div>
                  <div className={cx("label")}>{t("apply.team.name")}</div>
                  <OutlinedInput
                    className={cx("input")}
                    {...register(`members.${idx}.name`)}
                  />
                  {errors?.members?.[idx]?.name &&
                    firstError === `members.${idx}.name` && (
                      <div className={cx("error")}>
                        {t(errors.members[idx].name.message)}
                      </div>
                    )}
                  <div className={cx("label")}>{t("apply.team.position")}</div>
                  <OutlinedInput
                    className={cx("input")}
                    {...register(`members.${idx}.position`)}
                  />
                  {errors?.members?.[idx]?.position &&
                    firstError === `members.${idx}.position` && (
                      <div className={cx("error")}>
                        {t(errors.members[idx].position.message)}
                      </div>
                    )}
                  <div className={cx("label")}>{t("apply.team.username")}</div>
                  <OutlinedInput
                    className={cx("input")}
                    {...register(`members.${idx}.discordUsername`)}
                  />
                  {errors?.members?.[idx]?.discordUsername &&
                    firstError === `members.${idx}.discordUsername` && (
                      <div className={cx("error")}>
                        {t(errors.members[idx].discordUsername.message)}
                      </div>
                    )}
                </React.Fragment>
              ))}
            </Grid>
            <button className={cx("submit")} disabled={loading}>
              {currentTeam.name ? t("apply.update") : t("common.apply")}
            </button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
