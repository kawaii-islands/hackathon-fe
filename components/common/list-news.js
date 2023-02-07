import { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "styles/common/list-news.module.scss";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useLocale from "hooks/useLocale";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";
import axios from "axios";
import { LOCAL_ENDPOINT } from "consts";
import { Pagination } from "@mui/material";

const cx = cn.bind(styles);

function News({ news, isLatest, pathname }) {
  const { locale } = useLocale();
  let { title, description, thumbnail, content } = news;

  if (locale === "en") {
    title = news.en_title;
    description = news.en_description;
    thumbnail = news.en_thumbnail;
    content = news.en_content;
  }

  return (
    <div className={cx("news")}>
      <div
        className={cx("content", {
          isLatest,
        })}
      >
        <Link href={`/${pathname}/${news._id}`}>
          <div className={cx("title", { isLatest })}>{title}</div>
        </Link>
        <div className={cx("date", { isLatest })}>{news.createAt}</div>
        <div
          className={cx("description", {
            isLatest,
          })}
        >
          {description.slice(0, 200) + "..."}
        </div>
      </div>
      <img
        src={
          thumbnail ||
          "https://data.eueno.io/hackathon-orai/images/big_banner_orai_hackathon_2023_en.png"
        }
        className={cx({ isLatest }, "image")}
        alt="thumbnail"
      />
    </div>
  );
}

export default function ListNews({ isLatest }) {
  const { locale } = useLocale();
  const auth = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [posts, setPosts] = useState();
  const NUM_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getListPost();
  }, []);

  const getListPost = async () => {
    try {
      const response = await axios.get(`${LOCAL_ENDPOINT}/posts`);
      let data;
      if (response.status === 200) {
        data = response.data.results;
        if (isLatest) {
          data = response.data.results
            .map((i) => ({ ...i, pathname: "library" }))
            .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
            .slice(0, 3);
        }
      }

      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cx("list-news")}>
      {isLatest && (
        <div>
          <div className={cx("title", "latest")}>{t("news.latest")}</div>
          {posts?.map((news) => (
            <News
              news={news}
              isLatest={isLatest}
              key={news._id}
              pathname={news.pathname}
            />
          ))}
        </div>
      )}

      {!isLatest && (
        <>
          {posts
            ?.slice(
              (currentPage - 1) * NUM_PER_PAGE,
              currentPage * NUM_PER_PAGE
            )
            .map((news) => (
              <News
                news={news}
                isLatest={isLatest}
                key={news._id}
                pathname={router.pathname.split("/")[1]}
              />
            ))}

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
        </>
      )}
    </div>
  );
}
