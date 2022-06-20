import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames/bind";
import styles from "styles/common/news.module.scss";
import listNews from "news";
import LibraryLayout from "components/common/library-layout";

const cx = cn.bind(styles);

export default function NewsDetail({}) {
  const [news, setNews] = useState();
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (url) {
      const news = listNews.filter((news) => news.url === url)?.[0];
      if (news === undefined) router.push("/404");
      setNews(news);
    }
  }, [url]);

  if (!news) {
    return <></>;
  }

  return (
    <LibraryLayout>
      <div className={cx("news")}>
        <div className={cx("title")}>{news.title}</div>
        <div className={cx("date")}>{news.date}</div>
        <div className={cx("description")}>{news.description}</div>
        <div className={cx("image-box")}>
          <img src={news.image} alt="banner" className={cx("image")} />
        </div>

        {news.content}
      </div>
    </LibraryLayout>
  );
}
