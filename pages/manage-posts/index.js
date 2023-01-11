import React from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Link from "next/link";

const cx = cn.bind(styles);

function ManagerPosts() {
  return (
    <div className={cx("manage-posts")}>
      <Container>
        <div className={cx("page-header")}>
          <div className={cx("page-title")}>
            <h1>Manage Posts</h1>
            <div className={cx("amount")}>3 posts</div>
          </div>
          <Link href="/manage-posts/create-post">
            <Button className={cx("button")}>
              <AddCircleOutlineRoundedIcon /> &nbsp; Create post
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default ManagerPosts;
