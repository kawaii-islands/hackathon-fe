import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames/bind";
import styles from "styles/common/news.module.scss";
import listNewsEn from "news/en";
import listNewsVi from "news/vi";
import LibraryLayout from "components/common/library-layout";
import useLocale from "hooks/useLocale";
import axios from "axios";

const cx = cn.bind(styles);

const API = "http://192.168.1.39:3000/orai-hackathon/v1/blog";

export default function NewsDetail({}) {
  const { locale } = useLocale();
  const [news, setNews] = useState();
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (url) {
      const listNews = locale === "en" ? listNewsEn : listNewsVi;

      const news = listNews.filter((news) => news.url === url)?.[0];

      if (news === undefined) {
        getNews();
        // router.push("/404")
      }

      setNews(news);
    }
  }, [url, locale]);

  const getNews = async () => {
    try {
      const res = await axios.get(`${API}/${url}`);
      if (res.status === 200) {
        setNews(res.data);
      }
      setNews(res.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  if (!news) {
    return <></>;
  }

  return (
    <LibraryLayout>
      <div className={cx("news")}>
        <div className={cx("title")}>{news.title}</div>
        <div className={cx("date")}>{news.date}</div>
        <div className={cx("description")}>{news.description}</div>
        {/* <img src={news.image} /> */}
        <div
          dangerouslySetInnerHTML={{
            __html: news.content,
          }}
        />
        {news.content}
      </div>
    </LibraryLayout>
  );
}
