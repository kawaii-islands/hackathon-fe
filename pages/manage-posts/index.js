import React, { useState } from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container, IconButton } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Link from "next/link";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

function ManagerPosts() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          {new Array(3).fill(1).map((item, id) => (
            <div className={cx("post")} key={id}>
              <div className={cx("text")}>
                <Link href={`/library/${item._id}`}>
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
                <IconButton
                  className={cx("icon")}
                  onClick={() => router.push(`/library/${item._id}`)}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton
                  className={cx("icon")}
                  onClick={() => router.push(`/manage-posts/edit-post`)}
                >
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton className={cx("icon")} onClick={handleShow}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{
              color: "#9671ff",
              border: "1px solid #9671ff",
              borderRadius: "8px",
            }}
          >
            No
          </Button>{" "}
          &nbsp; &nbsp;
          <Button
            onClick={handleClose}
            style={{
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              borderRadius: "8px",
              backgroundColor: "#9671ff",
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManagerPosts;
