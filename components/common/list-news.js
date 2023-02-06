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

const cx = cn.bind(styles);

function News({ news, isLatest, pathname }) {
  const { locale } = useLocale();
  let { title, description, thumbnail, content } = news;

  if (locale === "en") {
    title = news.en_title;
    description = news.en_description;
    thumbnail = news.en_thumbail;
    content = news.en_content;
  }

  return (
    <div className={cx("news")}>
      <div
        className={cx("content", {
          isLatest,
        })}
      >
        <Link href={`/${pathname}/${news.url}`}>
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
      {!isLatest &&
        posts?.map((news) => (
          <News
            news={news}
            isLatest={isLatest}
            key={news._id}
            pathname={router.pathname.split("/")[1]}
          />
        ))}
    </div>
  );
}
