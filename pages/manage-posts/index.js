import React, { useEffect, useState } from "react";
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
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { LOCAL_ENDPOINT } from "consts";

const cx = cn.bind(styles);

function ManagerPosts() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [posts, setPosts] = useState();
  const [deleteItem, setDeleteItem] = useState();

  useEffect(() => {
    getListPost();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setDeleteItem(item);
    setShow(true);
  };

  const getListPost = async () => {
    try {
      const response = await axios.get(`${LOCAL_ENDPOINT}/blog`);
      setPosts(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `${LOCAL_ENDPOINT}/blog/${deleteItem._id}`
      );
      if (res.status === 200) {
        toast.success("Success!");
        setShow(false);
        getListPost();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cx("manage-posts")}>
      <Container>
        <div className={cx("page-header")}>
          <div className={cx("page-title")}>
            <h1>Manage Posts</h1>
            <div className={cx("amount")}>{posts?.length} posts</div>
          </div>
          <Link href="/manage-posts/create-post">
            <Button className={cx("button")}>
              <AddCircleOutlineRoundedIcon /> &nbsp; Create post
            </Button>
          </Link>
        </div>

        <div className={cx("list-post")}>
          {posts?.map((item, id) => (
            <div className={cx("post")} key={id}>
              <div className={cx("text")}>
                <Link href={`/library/${item._id}`}>
                  <div className={cx("title")}>{item.title}</div>
                </Link>
                <div className={cx("date")}>
                  {moment(item.createdAt).format("HH:mm:ss, DD/MM/YYYY")}
                </div>
                <div className={cx("description")}>{item.description}</div>
              </div>

              <div className={cx("image")}>
                <img
                  src={
                    item.thumbnail
                      ? item.thumbnail
                      : "https://hackathon-orai-staging.web.app/images/home/big-banner-en.png"
                  }
                />
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
                  onClick={() =>
                    router.push(`/manage-posts/edit-post?postId=${item._id}`)
                  }
                >
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                  className={cx("icon")}
                  onClick={() => handleShow(item)}
                >
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
            onClick={handleDeletePost}
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
