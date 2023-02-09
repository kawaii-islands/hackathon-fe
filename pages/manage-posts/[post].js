import React, { useEffect, useReducer, useState } from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container, Grid } from "@mui/material";
import axios from "axios";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ENDPOINT } from "consts";
import dynamic from "next/dynamic";

const cx = cn.bind(styles);

const Ckeditor = dynamic(() => import("../../components/common/ckeditor"), {
  ssr: false,
});

function CreatePosts() {
  const [state, dispatch] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      dataEn: "",
      dataVi: "",
      title: "",
      description: "",
      thumbnail: "",
      viTitle: "",
      viDescription: "",
      viThumbnail: "",
    }
  );

  const router = useRouter();
  const { postId, action } = router.query;
  const token = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : "";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Vui lòng đăng nhập bằng tài khoản admin!");
      router.back();
    }

    if (action === "edit" && postId) {
      getNews();
    }
  }, [postId]);

  const getNews = async () => {
    try {
      const res = await axios.get(`${ENDPOINT}/posts/${postId}`);
      if (res.status === 200) {
        const news = res.data;
        let decodeDataVi = decodeHtml(news.content);
        let decodeDataEn = decodeHtml(news.en_content);

        dispatch({
          viTitle: news.title,
          viDescription: news.description,
          description: news.en_description,
          dataVi: decodeDataVi,
          viThumbnail: news.thumbnail,
          title: news.en_title,
          dataEn: decodeDataEn,
          thumbnail: news.en_thumbnail,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleUploadThumbnail = async (e) => {
    const body = new FormData();
    body.append("image", e.target.files[0]);

    try {
      const res = await axios.post(`${ENDPOINT}/images`, body, config);
      if (res.status === 200) {
        dispatch({
          thumbnail: res.data.imageUrl,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadViThumbnail = async (e) => {
    const body = new FormData();
    body.append("image", e.target.files[0]);

    try {
      const res = await axios.post(`${ENDPOINT}/images`, body, config);
      if (res.status === 200) {
        dispatch({
          viThumbnail: res.data.imageUrl,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    const bodyParams = {
      title: state.viTitle,
      description: state.viDescription,
      content: state.dataVi,
      thumbnail: state.viThumbnail,
      en_title: state.title,
      en_description: state.description,
      en_content: state.dataEn,
      en_thumbnail: state.thumbnail,
    };

    try {
      let res;
      if (action === "edit") {
        res = await axios.put(
          `${ENDPOINT}/posts/${postId}`,
          bodyParams,
          config
        );
      } else {
        res = await axios.post(`${ENDPOINT}/posts`, bodyParams, config);
      }

      if (res.status === 200) {
        toast.success("Success!");
        router.push(`/manage-posts`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataEn = (data) => {
    dispatch({
      dataEn: data,
    });
  };

  const handleDataVi = (data) => {
    dispatch({
      dataVi: data,
    });
  };

  return (
    <div className={cx("manage-posts")}>
      <Container>
        <div className={cx("page-body")}>
          <Button className={cx("publish-btn")} onClick={createPost}>
            <ArrowUpwardRoundedIcon /> &nbsp;{" "}
            {action === "edit" ? "Save" : "Publish"}
          </Button>

          <Grid container>
            <Grid item sm={6} style={{ paddingRight: "30px" }}>
              <input
                placeholder="Title"
                defaultValue={state.title}
                className={cx("post-title")}
                onChange={(e) => {
                  dispatch({
                    title: e.target.value,
                  });
                }}
              />
              <div className={cx("second")}>
                <textarea
                  placeholder="Description"
                  defaultValue={state.description}
                  className={cx("description")}
                  rows={5}
                  onChange={(e) => {
                    dispatch({
                      description: e.target.value,
                    });
                  }}
                />
              </div>

              <div
                style={{
                  width: "80%",
                  margin: "0 10%",
                  height: "200px",
                  marginBottom: "30px",
                }}
              >
                {state.thumbnail ? (
                  <div>
                    <img src={state.thumbnail} width="100%" height="160px" />
                    <div style={{ textAlign: "center" }}>
                      <label for="re-thumbnail">
                        <div className={cx("btn-change-thumbnail")}>
                          Change thumbnail
                        </div>
                      </label>
                      <input
                        type="file"
                        name="photo"
                        id="re-thumbnail"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleUploadThumbnail(e)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <label for="thumbnail" className={cx("upload-thumbnail")}>
                      <AddRoundedIcon className={cx("add-icon")} />
                      <div>Upload thumbnail</div>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="thumbnail"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleUploadThumbnail(e)}
                    />
                  </>
                )}
              </div>

              <Ckeditor
                language="en"
                data={state.dataEn}
                setData={handleDataEn}
              />
            </Grid>
            <Grid
              item
              sm={6}
              style={{ paddingLeft: "30px", borderLeft: "1px solid #ccced1" }}
            >
              <input
                placeholder="Tiêu đề"
                defaultValue={state.viTitle}
                className={cx("post-title")}
                onChange={(e) => {
                  dispatch({
                    viTitle: e.target.value,
                  });
                }}
              />
              <div className={cx("second")}>
                <textarea
                  placeholder="Mô tả"
                  defaultValue={state.viDescription}
                  className={cx("description")}
                  rows={5}
                  onChange={(e) => {
                    dispatch({
                      viDescription: e.target.value,
                    });
                  }}
                />
              </div>

              <div
                style={{
                  width: "80%",
                  margin: "0 10%",
                  height: "200px",
                  marginBottom: "30px",
                }}
              >
                {state.viThumbnail ? (
                  <div>
                    <img src={state.viThumbnail} width="100%" height="160px" />
                    <div style={{ textAlign: "center" }}>
                      <label for="re-vi-thumbnail">
                        <div className={cx("btn-change-thumbnail")}>
                          Thay đổi ảnh bìa
                        </div>
                      </label>
                      <input
                        type="file"
                        name="photo"
                        id="re-vi-thumbnail"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleUploadViThumbnail(e)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <label
                      for="vi-thumbnail"
                      className={cx("upload-thumbnail")}
                    >
                      <AddRoundedIcon className={cx("add-icon")} />
                      <div>Thêm ảnh bìa</div>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="vi-thumbnail"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleUploadViThumbnail(e)}
                    />
                  </>
                )}
              </div>

              <Ckeditor
                language="vi"
                data={state.dataVi}
                setData={handleDataVi}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default CreatePosts;
