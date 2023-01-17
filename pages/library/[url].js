import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames/bind";
import styles from "styles/common/news.module.scss";
import listNewsEn from "news/en";
import listNewsVi from "news/vi";
import LibraryLayout from "components/common/library-layout";
import useLocale from "hooks/useLocale";
import axios from "axios";
import moment from "moment";
import { LOCAL_ENDPOINT } from "consts";

const cx = cn.bind(styles);

export default function NewsDetail({}) {
  const { locale } = useLocale();
  const [news, setNews] = useState();
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (url) {
      getNews();
    }
  }, [url]);

  const getNews = async () => {
    try {
      const res = await axios.get(`${LOCAL_ENDPOINT}/blog/${url}`);
      if (res.status === 200) {
        const decodeDataVi = decodeHtml(res.data.content);
        const decodeDataEn = decodeHtml(res.data.en_content);

        const dataNews = {
          ...res.data,
          content: decodeDataVi,
          en_content: decodeDataEn,
        };
        setNews(dataNews);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (!news) {
    return <></>;
  }

  return (
    <LibraryLayout>
      <div className={cx("news")}>
        <div className={cx("title")}>
          {locale === "en" ? news.en_title : news.title}
        </div>
        <div className={cx("date")}>
          {moment(news.createdAt).format("HH:mm:ss, DD/MM/YYYY")}
        </div>
        <div className={cx("description")}>
          {locale === "en" ? news.en_description : news.description}
        </div>
        <img src={locale === "en" ? news.en_thumbnail : news.thumbnail} />

        <br />
        <div
          dangerouslySetInnerHTML={{
            __html: locale === "en" ? news.en_content : news.content,
          }}
        />
      </div>
    </LibraryLayout>
  );
}
