import React, { useEffect, useState } from "react";
import styles from "styles/common/course-card.module.scss";
import cn from "classnames/bind";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Button, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

const CourseCard = ({ lesson }) => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [sliceNumber, setSliceNumber] = useState(72);

  useEffect(() => {
    if (isDesktop) {
      setSliceNumber(72);
    } else {
      setSliceNumber(60);
    }
  }, [isDesktop]);

  return (
    <div className={cx("course-card")}>
      <div className={cx("image")}>
        <img src={lesson?.thumbnail} alt="thumbnail" />
      </div>
      <div className={cx("body")}>
        <div className={cx("lesson-num")}>{`Buổi ${lesson?.lesson}`}</div>
        <div className={cx("lesson-title")}>
          {lesson?.title.slice(0, sliceNumber)}
          {lesson?.title?.length > sliceNumber && "..."}
        </div>
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
          onClick={() =>
            router.push(`/courses/blockchain/lesson${lesson?.lesson}`)
          }
        >
          Bắt đầu học
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
