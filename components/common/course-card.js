import React from "react";
import styles from "styles/common/course-card.module.scss";
import cn from "classnames/bind";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

const CourseCard = ({ lesson }) => {
  const router = useRouter();

  return (
    <div className={cx("course-card")}>
      <div className={cx("image")}>
        <img src={lesson?.thumbnail} alt="thumbnail" />
      </div>
      <div className={cx("body")}>
        <div className={cx("lesson-num")}>{`Buổi ${lesson?.lesson}`}</div>
        <div className={cx("lesson-title")}>{lesson?.title.slice(0, 72)}{lesson?.title?.length > 72 && "..."}</div>
        <div className={cx("lesson-des")}>
          {lesson?.overview.slice(0, 120) + "..."}
        </div>
      </div>
      <div className={cx("bottom")}>
        <div className={cx("time")}>
          <AccessTimeRoundedIcon />
          &nbsp; {lesson?.time}
        </div>
        <Button
          className={cx("button")}
          onClick={() => router.push(`/courses/blockchain/lesson${lesson?.lesson}`)}
        >
          Bắt đầu học
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
