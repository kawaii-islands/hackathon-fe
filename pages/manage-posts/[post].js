import React, { useState } from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container, Grid } from "@mui/material";
import Ckeditor from "components/common/ckeditor";
import axios from "axios";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const cx = cn.bind(styles);

const API = "http://192.168.1.39:3000/orai-hackathon/v1/blog";

function CreatePosts() {
  const dataEn = window.localStorage.getItem("en-post-data");
  const dataVi = window.localStorage.getItem("vi-post-data");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [viTitle, setViTitle] = useState();
  const [viDescription, setViDescription] = useState();
  const [viThumbnail, setViThumbnail] = useState();
  const router = useRouter();
  const { post } = router.query;

  console.log(post);

  const handleUploadThumbnail = async (e) => {
    const body = new FormData();
    body.append("image", e.target.files[0]);

    try {
      const res = await axios.post(`${API}/image`, body);
      if (res.status === 200) {
        console.log(res);
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
      const res = await axios.post(`${API}/image`, body);
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
      title,
      description,
      content: dataEn,
      thumbnail,
    };

    try {
      const res = await axios.post(`${API}`, bodyParams);
      if (res.status === 200) {
        toast.success("Success!");
        router.push(`/library/${res.data._id}`);
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
            <ArrowUpwardRoundedIcon /> &nbsp; Publish
          </Button>

          <Grid container>
            <Grid sm={6} style={{ paddingRight: "30px" }}>
              <input
                placeholder="Title"
                className={cx("post-title")}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={cx("second")}>
                <textarea
                  placeholder="Description"
                  className={cx("description")}
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {thumbnail ? (
                  <img src={thumbnail} width="18%" />
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

              <Ckeditor language="en" />
            </Grid>
            <Grid
              sm={6}
              style={{ paddingLeft: "30px", borderLeft: "1px solid #ccced1" }}
            >
              <input
                placeholder="Tiêu đề"
                className={cx("post-title")}
                onChange={(e) => setViTitle(e.target.value)}
              />
              <div className={cx("second")}>
                <textarea
                  placeholder="Mô tả"
                  className={cx("description")}
                  rows={5}
                  onChange={(e) => setViDescription(e.target.value)}
                />
                {thumbnail ? (
                  <img src={thumbnail} width="18%" />
                ) : (
                  <>
                    <label for="thumbnail" className={cx("upload-thumbnail")}>
                      <AddRoundedIcon className={cx("add-icon")} />
                      <div>Chọn ảnh bìa</div>
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

              <Ckeditor language="vi" />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default CreatePosts;
