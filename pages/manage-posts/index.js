import React from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container, IconButton } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Link from "next/link";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

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

        <div className={cx("list-post")}>
          {new Array(3).fill(1).map((_, id) => (
            <div className={cx("post")} key={id}>
              <div className={cx("text")}>
                <Link
                  href={`/library/announcing-winners-of-oraichain-hackathon-2022`}
                >
                  <div className={cx("title")}>
                    Announcing Winners Of Oraichain Hackathon 2022
                  </div>
                </Link>
                <div className={cx("date")}>13/06/2022</div>
                <div className={cx("description")}>
                  Oraichain is pleased to announce the results of the Oraichain
                  Hackathon 2022 — our very first hackathon event that was
                  successfully concluded yesterday in Hanoi, Vietnam!
                </div>
              </div>

              <div className={cx("image")}>
                <img src="https://hackathon-orai-staging.web.app/images/home/big-banner-en.png" />
              </div>
              <div className={cx("group-btn")}>
                <IconButton className={cx("icon")}>
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton className={cx("icon")}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton className={cx("icon")}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ManagerPosts;
