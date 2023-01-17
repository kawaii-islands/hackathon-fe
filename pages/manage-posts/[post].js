import React, { useEffect, useState } from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container, Grid } from "@mui/material";
import Ckeditor from "components/common/ckeditor";
import axios from "axios";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { LOCAL_ENDPOINT } from "consts";

const cx = cn.bind(styles);

function CreatePosts() {
  const [dataEn, setDataEn] = useState();
  const [dataVi, setDatavi] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [viTitle, setViTitle] = useState();
  const [viDescription, setViDescription] = useState();
  const [viThumbnail, setViThumbnail] = useState();
  const router = useRouter();
  const { post, postId } = router.query;

  useEffect(() => {
    if (post === "edit-post" && postId) {
      getNews();
    }
  }, [postId]);

  const getNews = async () => {
    try {
      const res = await axios.get(`${LOCAL_ENDPOINT}/blog/${postId}`);
      if (res.status === 200) {
        const news = res.data;
        let decodeDataVi = decodeHtml(news.content);
        let decodeDataEn = decodeHtml(news.en_content);

        setViTitle(news.title);
        setViDescription(news.description);
        setDatavi(decodeDataVi);
        setViThumbnail(news.thumbnail);
        setTitle(news.en_title);
        setDescription(news.en_description);
        setDataEn(decodeDataEn);
        setThumbnail(news.en_thumbnail);
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
      const res = await axios.post(`${LOCAL_ENDPOINT}/blog/image`, body);
      if (res.status === 200) {
        setThumbnail(res.data.imageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadViThumbnail = async (e) => {
    const body = new FormData();
    body.append("image", e.target.files[0]);

    try {
      const res = await axios.post(`${LOCAL_ENDPOINT}/blog/image`, body);
      if (res.status === 200) {
        console.log(res);
        setViThumbnail(res.data.imageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    const bodyParams = {
      title: viTitle,
      description: viDescription,
      content: dataVi,
      thumbnail: viThumbnail,
      en_title: title,
      en_description: description,
      en_content: dataEn,
      en_thumbnail: thumbnail,
    };

    try {
      let res;
      if (post === "edit-post") {
        res = await axios.put(`${LOCAL_ENDPOINT}/blog/${postId}`, bodyParams);
      } else {
        res = await axios.post(`${LOCAL_ENDPOINT}/blog`, bodyParams);
      }

      if (res.status === 200) {
        toast.success("Success!");
        router.push(`/manage-posts`);
      }
      console.log("POSt", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("manage-posts")}>
      <Container>
        <div className={cx("page-body")}>
          <Button className={cx("publish-btn")} onClick={createPost}>
            <ArrowUpwardRoundedIcon /> &nbsp;{" "}
            {post === "edit-post" ? "Save" : "Publish"}
          </Button>

          <Grid container>
            <Grid item sm={6} style={{ paddingRight: "30px" }}>
              <input
                placeholder="Title"
                defaultValue={title}
                className={cx("post-title")}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={cx("second")}>
                <textarea
                  placeholder="Description"
                  defaultValue={description}
                  className={cx("description")}
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
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
                {thumbnail ? (
                  <img src={thumbnail} width="100%" height="200px" />
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

              <Ckeditor language="en" data={dataEn} setData={setDataEn}/>
            </Grid>
            <Grid
              item
              sm={6}
              style={{ paddingLeft: "30px", borderLeft: "1px solid #ccced1" }}
            >
              <input
                placeholder="Tiêu đề"
                defaultValue={viTitle}
                className={cx("post-title")}
                onChange={(e) => setViTitle(e.target.value)}
              />
              <div className={cx("second")}>
                <textarea
                  placeholder="Mô tả"
                  defaultValue={viDescription}
                  className={cx("description")}
                  rows={5}
                  onChange={(e) => setViDescription(e.target.value)}
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
                {viThumbnail ? (
                  <img src={viThumbnail} width="100%" height="200px" />
                ) : (
                  <>
                    <label for="thumbnail" className={cx("upload-thumbnail")}>
                      <AddRoundedIcon className={cx("add-icon")} />
                      <div>Thêm ảnh bìa</div>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="thumbnail"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleUploadViThumbnail(e)}
                    />
                  </>
                )}
              </div>

              <Ckeditor language="vi" data={dataVi} setData={setDatavi} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default CreatePosts;
