import React from "react";
import styles from "styles/courses/index.module.scss";
import cn from "classnames/bind";
import { Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import useLocale from "hooks/useLocale";

const cx = cn.bind(styles);

const posts = [
  {
    title: `Khoá học "Blockchain Anyone"`,
    en_title: `Khoá học "Blockchain Anyone"`,
    url: `blockchain`,
    createdAt: "Wednesday, 15 March 2023 15:00:00 GMT+07:00",
    thumbnail: "/images/courses/blockchain-thumbnail.jpeg",
    en_thumbnail: "/images/courses/blockchain-thumbnail.jpeg",
    description: `Tổng thời lượng của Khóa học “Blockchain Anyone” là hơn 10 tiếng được chia thành 04 buổi học (từ ngày 15/3 đến ngày 25/3/2023) với 11 chuyên đề về kiến thức Blockchain, 02 chuyên đề phụ trợ về thích ứng tâm lý, cơ hội việc và 01 buổi tọa đàm tư vấn, hướng nghiệp cho các bạn đoàn viên, thanh niên.`,
    en_description: `Tổng thời lượng của Khóa học “Blockchain Anyone” là hơn 10 tiếng được chia thành 04 buổi học (từ ngày 15/3 đến ngày 25/3/2023) với 11 chuyên đề về kiến thức Blockchain, 02 chuyên đề phụ trợ về thích ứng tâm lý, cơ hội việc và 01 buổi tọa đàm tư vấn, hướng nghiệp cho các bạn đoàn viên, thanh niên.`,
  },
];

const Courses = () => {
  const { locale } = useLocale();
  const router = useRouter();

  return (
    <div className={cx("manage-posts")}>
      <Container>
        <div className={cx("page-header")}>
          <div className={cx("page-title")}>
            <h1>Danh sách khoá học</h1>
            {/* <div className={cx("amount")}>{`(${posts?.length})`}</div> */}
          </div>
        </div>

        <div className={cx("list-post")}>
          {posts.map((item, id) => (
            <div
              className={cx("post")}
              key={id}
              onClick={() => router.push(`/courses/${item.url}`)}
            >
              <div className={cx("text")}>
                <Link href={`/courses/${item.url}`}>
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
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Courses;
