import React, { useEffect, useState } from "react";
import styles from "styles/manage-posts/index.module.scss";
import cn from "classnames/bind";
import { Button, Container, IconButton, Pagination } from "@mui/material";
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
import { ENDPOINT } from "consts";
import useLocale from "hooks/useLocale";

const cx = cn.bind(styles);

function ManagerPosts() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [posts, setPosts] = useState();
  const [deleteItem, setDeleteItem] = useState();
  const token = window.localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { locale } = useLocale();
  const NUM_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const user = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user"))
  : "";

  useEffect(() => {
    if (user?.role === "admin") {
      getListPost();
    } else {
      toast.error("Vui lòng đăng nhập bằng tài khoản admin!");
      router.push("/");
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setDeleteItem(item);
    setShow(true);
  };

  const getListPost = async () => {
    try {
      const response = await axios.get(`${ENDPOINT}/posts`);
      setPosts(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `${ENDPOINT}/posts/${deleteItem._id}`,
        config
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
          <Link href={`/manage-posts/post?action=create`}>
            <Button className={cx("button")}>
              <AddCircleOutlineRoundedIcon /> &nbsp; Create post
            </Button>
          </Link>
        </div>

        <div className={cx("list-post")}>
          {posts
            ?.slice(
              (currentPage - 1) * NUM_PER_PAGE,
              currentPage * NUM_PER_PAGE
            )
            .map((item, id) => (
              <div className={cx("post")} key={id}>
                <div className={cx("text")}>
                  <Link href={`/library/${item._id}`}>
                    <div className={cx("title")}>
                      {locale === "vi" ? item.title : item.en_title}
                    </div>
                  </Link>
                  <div className={cx("date")}>
                    {moment(item.createdAt).format("HH:mm:ss, DD/MM/YYYY")}
                  </div>
                  <div className={cx("description")}>
                    {locale === "vi"
                      ? item.description.slice(0, 150)
                      : item.en_description.slice(0, 150)}
                    ...
                  </div>
                </div>

                <div className={cx("image")}>
                  {locale === "vi" ? (
                    <img
                      src={
                        item.thumbnail
                          ? item.thumbnail
                          : "https://hackathon-orai-staging.web.app/images/home/big-banner-en.png"
                      }
                    />
                  ) : (
                    <img
                      src={
                        item.en_thumbnail
                          ? item.en_thumbnail
                          : "https://hackathon-orai-staging.web.app/images/home/big-banner-en.png"
                      }
                    />
                  )}
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
                      router.push(`/manage-posts/post?postId=${item._id}&action=edit`)
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

        {posts?.length > NUM_PER_PAGE ? (
          <div className={cx("pagination")}>
            <Pagination
              count={Math.ceil(posts?.length / NUM_PER_PAGE)}
              onChange={(e, p) => setCurrentPage(p)}
            />
          </div>
        ) : (
          <></>
        )}
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
