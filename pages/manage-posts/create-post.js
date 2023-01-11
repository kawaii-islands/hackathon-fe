import React from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container } from "@mui/material";
import Ckeditor from "components/common/ckeditor";

const cx = cn.bind(styles);

function CreatePosts() {
  const data = window.localStorage.getItem("post-data");
  return (
    <div className={cx("manage-posts")}>
      <Container>
        <div className={cx("page-body")}>
          <input placeholder="Title" className={cx("post-title")} />
          <textarea placeholder="Description" className={cx("description")} rows={5} />
          <Ckeditor />

          {/* <div
            className={cx("preview-areas")}
            dangerouslySetInnerHTML={{
              __html: data,
            }}
          /> */}
        </div>
      </Container>
    </div>
  );
}

export default CreatePosts;
