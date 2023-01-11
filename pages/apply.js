import React, { useMemo, useState, useRef, useEffect } from "react";
import cn from "classnames/bind";
import styles from "styles/apply/index.module.scss";
import { Container } from "@mui/system";
import {
  Button,
  Chip,
  CircularProgress,
  Grid,
  OutlinedInput,
  TextareaAutosize,
} from "@mui/material";
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
  const [reload, setReload] = useState(false);
  const [checkDisableUploadFile, setCheckDisableUploadFile] = useState(false);
  const [attachment, setAttachment] = useState();
  const [currentTeam, setCurrentTeam] = useState({
    email: user?.email,
    // country: "",
    // gameIdea: "",
    name: "",
    story: "",
    members: [
      {
        // discordUsername: "",
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
      // country: yup.string().required("apply.error.country.required"),
      story: yup.string().required("apply.error.story.required"),
      // gameIdea: yup.string().required("apply.error.idea.required"),
      //   attachment: yup.mixed().test({
      //     message: "apply.error.document.required",
      //     test: (file) => {
      //       return currentTeam.name || file?.length;
      //     },
      //   }),
      members: yup.array().of(
        yup.object().shape({
          name: yup.string().required("apply.error.name.required"),
          position: yup.string().required("apply.error.position.required"),
          // discordUsername: yup
          //   .string()
          //   .required("apply.error.username.required"),
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
      // country: currentTeam.country,
      // gameIdea: currentTeam.gameIdea,
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
    if (newVal > 4 || newVal < 1)
      return setValue("noOfMembers", olfNoOfMembers.current);
    olfNoOfMembers.current = noOfMembers;
    const oldVal = fields.length;
    if (newVal > oldVal) {
      for (let i = oldVal; i < newVal; i++) {
        append({ name: "", position: "" });
      }
    } else {
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [noOfMembers]);

  //   useEffect(() => {
  //     let finalList = getValues("attachment");
  //     if (currentTeam?.name) {
  //       console.log("currentTeam :>> ", currentTeam);
  //       postFiles(finalList);
  //     } else {
  //       if (currentTeam?.attachments?.length + finalList?.length > 4) {
  //         setCheckDisableUploadFile(true);
  //         if (currentTeam?.attachments?.length + finalList?.length > 5) {
  //           // finalList = finalList.slice(0, 5);
  //         }
  //       } else {
  //         setCheckDisableUploadFile(false);
  //       }
  //     }

  //     console.log("attachment :>> ", finalList);
  //     setAttachment(finalList);
  //   }, [attachmentRef]);

  useEffect(() => {
    let fileList = getValues("attachment");
    console.log("fileList :>> ", attachment);
    let tempList = attachment?.length ? [...attachment] : [];
    let finalList;
    if (fileList?.length) {
      finalList = [...tempList, ...fileList];
    } else {
      finalList = [...tempList];
    }

    let numOfCurrentFile = currentTeam?.attachments?.length || 0;
    if (finalList?.length + numOfCurrentFile > 4) {
      setCheckDisableUploadFile(true);
      finalList = finalList.slice(0, 5 - numOfCurrentFile);
    } else {
      setCheckDisableUploadFile(false);
    }

    setAttachment([...finalList]);
    console.log("FinalList ", finalList);
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
  }, [reload]);

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
      console.log("res :>> ", res);
      delete res.data.createdBy;
      delete res.data.id;
      Object.keys(res.data).forEach((key) => {
        if (key === "members") {
          setValue("noOfMembers", res.data[key].length);
          const members = getValues("members");
          members.forEach((_, idx) => remove(idx));
          res.data[key].forEach((item, idx) => {
            append({
              name: item.name,
              position: item.position,
              // discordUsername: item.discordUsername,
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
    console.log("values :>> ", values);
    try {
      const body = { ...values };
      setLoading(true);

      delete body.noOfMembers;
      delete body.attachment;

      body.members = JSON.stringify(body.members);
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) =>
        formData.append(key, value)
      );

      attachment?.map((file, id) => {
        formData.append("attachments", file, file.name);
      });

      let res;
      if (currentTeam.name) {
        if (attachment.length) {
          let data = await updateFile();
          if (!data) {
            setLoading(false);
            return;
          } else {
            setAttachment([]);
            toast.success("Update file successfully");
          }
        }

        formData.delete("attachments");
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
	  
      setReload(!reload);
      setAttachment([]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.code === 401)
        refreshToken(() => onSubmit(values));
      else {
        toast.error(error?.response?.data?.message || "Error");
        setLoading(false);
      }
    }
  };

  const authStatus = useAuth(true);

  const handleDeleteOriginFile = async (file) => {
    console.log("Origin", file);
    try {
      const res = await axios.delete(
        `${ENDPOINT}/teams/attachments/${file.id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data; boundary=something",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );

      toast.success("Delete successfully");
      let numOfCurrentFile = currentTeam?.attachments?.length || 0;

      if (attachment?.length + numOfCurrentFile < 5) {
        setCheckDisableUploadFile(false);
      }
      setReload(!reload);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleDeleteFile = async (file, index) => {
    let tempArr = [...attachment];
    tempArr.splice(index, 1);
    setAttachment([...tempArr]);
    let numOfCurrentFile = currentTeam?.attachments?.length || 0;
    if (tempArr?.length + numOfCurrentFile < 5) {
      setCheckDisableUploadFile(false);
    }
  };

  const updateFile = async () => {
    const formData = new FormData();
    attachment?.map((file, id) => {
      formData.append("attachments", file, file.name);
    });

    try {
      const res = await axios.post(`${ENDPOINT}/teams/attachments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      return res.data;
    } catch (error) {
      console.log("error :>> ", error);
      toast.error(error?.response?.data?.message || "Error");
      return error;
    }
  };

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
              {/* <div className={cx("label")}>{t("apply.country")}</div>
              <OutlinedInput className={cx("input")} {...register(`country`)} />
              {errors.country && firstError === "country" && (
                <div className={cx("error")}>{t(errors.country.message)}</div>
              )} */}
              <div className={cx("label")}>{t("apply.story")}</div>
              <TextareaAutosize
                className={cx("textarea")}
                minRows={5}
                {...register(`story`)}
              />
              {errors.story && firstError === "story" && (
                <div className={cx("error")}>{t(errors.story.message)}</div>
              )}
              {/* <div className={cx("label")}>{t("apply.idea")}</div>
              <TextareaAutosize
                className={cx("textarea")}
                minRows={5}
                {...register(`gameIdea`)}
              />
              {errors.gameIdea && firstError === "gameIdea" && (
                <div className={cx("error")}>{t(errors.gameIdea.message)}</div>
              )} */}

              <div className={cx("label")}>{t("apply.document")}</div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <div className={cx("label")}>{t("apply.document")}</div>
                <Button
                  style={{
                    border: "1px solid #f25c41",
                    borderRadius: "6px",
                    width: "fit-content",
                    padding: "6px 12px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#f25c41",
                    textTransform: "none",
                  }}
                  onClick={updateFile}
                >
                  Update file
                </Button>
              </div> */}
              <input
                id="file"
                className={cx("file")}
                {...register(`attachment`)}
                type="file"
                multiple
                disabled={checkDisableUploadFile}
                accept="application/pdf"
              />

              <label htmlFor="file">
                <div>
                  {/* {attachment?.[0]?.name ||
                    currentTeam?.attachment?.origin || */}
                  {t("apply.upload")}
                </div>
                <img src="/icons/upload.svg" />
              </label>

              <div className={cx("listFile")}>
                {currentTeam?.attachments?.length > 0
                  ? currentTeam?.attachments?.map((file, index) => (
                      <div className={cx("oneFile")} key={index}>
                        <Chip
                          label={file?.origin}
                          variant="outlined"
                          onDelete={() => handleDeleteOriginFile(file, index)}
                        />
                      </div>
                    ))
                  : ""}
                {console.log("attachment :>> ", attachment)}
                {attachment?.length > 0
                  ? attachment.map((file, index) => (
                      <div className={cx("oneFile")} key={index}>
                        <Chip
                          label={file.name}
                          variant="outlined"
                          onDelete={() => handleDeleteFile(file, index)}
                        />
                      </div>
                    ))
                  : ""}
              </div>

              {/* {errors.attachment && firstError === "attachment" && (
                <div className={cx("error")}>
                  {t(errors.attachment.message)}
                </div>
              )} */}
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
                  {/* <div className={cx("label")}>{t("apply.team.username")}</div> */}
                  {/* <OutlinedInput
                    className={cx("input")}
                    {...register(`members.${idx}.discordUsername`)}
                  />
                  {errors?.members?.[idx]?.discordUsername &&
                    firstError === `members.${idx}.discordUsername` && (
                      <div className={cx("error")}>
                        {t(errors.members[idx].discordUsername.message)}
                      </div>
                    )} */}
                </React.Fragment>
              ))}
            </Grid>
            <button className={cx("submit")} disabled={loading}>
              <span>
                {currentTeam.name ? t("apply.update") : t("common.apply")}{" "}
              </span>
              <span style={{ marginLeft: "16px" }}>
                {" "}
                {loading && (
                  <CircularProgress
                    color="inherit"
                    style={{ width: "24px", height: "24px" }}
                  />
                )}
              </span>
            </button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
