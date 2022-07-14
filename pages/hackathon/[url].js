import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames/bind";
import styles from "styles/common/news.module.scss";
import listNewsEn from "news/en";
import listNewsVi from "news/vi";
import LibraryLayout from "components/common/library-layout";
import useLocale from "hooks/useLocale";

const cx = cn.bind(styles);

export default function NewsDetail({}) {
  const { locale } = useLocale();
  const [news, setNews] = useState();
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (url) {
      const listNews = locale === "en" ? listNewsEn : listNewsVi;

      const news = listNews.filter((news) => news.url === url)?.[0];

      if (news === undefined) router.push("/404");
      setNews(news);
    }
  }, [url, locale]);

  if (!news) {
    return <></>;
  }

  return (
    <LibraryLayout>
      <div className={cx("news")}>
        <div className={cx("title")}>{news.title}</div>
        <div className={cx("date")}>{news.date}</div>
        <div className={cx("description")}>{news.description}</div>
        <img src={news.image} />
        {news.content}
      </div>
    </LibraryLayout>
  );
}
