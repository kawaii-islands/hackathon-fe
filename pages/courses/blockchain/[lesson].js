import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import styles from "styles/courses/lesson-detail.module.scss";
import cn from "classnames/bind";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import lessons from "../../../lesson";
import { useRouter } from "next/router";
import CarouselLesson from "components/common/carousel-lesson";

const cx = cn.bind(styles);

const LessonDetail = () => {
  const router = useRouter();
  const { lesson } = router.query;
  const [lessonId, setLessonId] = useState();
  const [lessonContent, setLessonContent] = useState();
  const [currentTopic, setCurrentTopic] = useState(0);

  useEffect(() => {
    if (lesson) {
      const id = lesson.slice(-1);
      setLessonId(id);
      setLessonContent(lessons[id - 1]);
      setCurrentTopic(0);
    }
  }, [lesson]);

  return (
    <Container className={cx("container")}>
      <div className={cx("body")}>
        <div className={cx("main")}>
          <div className={cx("lesson")}>Buổi {lessonId}</div>
          <h1>{lessonContent?.title}</h1>

          <iframe
            width="560"
            height="315"
            src={lessonContent?.content[currentTopic]?.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className={cx("video")}
          ></iframe>

          <div className={cx("overview")}>
            <h3>Tổng quan về bài học</h3>
            <div className={cx("description")}>
                <h5>{`Phần ${currentTopic + 1}: ${lessonContent?.content[currentTopic]?.topicTitle}`}</h5>
              <p>
               {lessonContent?.content[currentTopic]?.description}
              </p>
            </div>
          </div>

          {lessonContent?.content[currentTopic]?.document && (
            <a
              className={cx("button")}
              href={lessonContent?.content[currentTopic]?.document}
              target="_blank"
              rel="noreferrer"
            >
              Tải slide bài học &nbsp;
              <FileDownloadOutlinedIcon />
            </a>
          )}
        </div>
        <div className={cx("table-of-content")}>
          <div className={cx("tab-header")}>Nội dung</div>
          {lessonContent?.content?.map((topic, id) => (
            <div className={cx("topic")} key={`topic-${id}`}>
              <div
                className={cx("topic-title")}
                onClick={() => setCurrentTopic(id)}
              >
                <div className={cx("number")}>{id + 1}</div>
                <div
                  className={cx("text", id === currentTopic && "text-active")}
                >
                  {topic.topicTitle}
                </div>
              </div>
              <div className={cx("topic-content")}>
                {topic.detail?.map((detailTitle, index) => (
                  <div className={cx("content")} key={`detail-index`}>
                    <span className={cx("dot")}></span> &nbsp; {detailTitle}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("list-lesson")}>
        <h4>Các bài học tiếp theo</h4>
        <CarouselLesson />
      </div>
    </Container>
  );
};

export default LessonDetail;
