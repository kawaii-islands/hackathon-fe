import cn from "classnames/bind";
import styles from "styles/common/list-news.module.scss";
import listNews from "news";
import listLibrary from "library";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

function News({ news, isLatest, pathname }) {
  return (
    <div className={cx("news")}>
      <div
        className={cx("content", {
          isLatest,
        })}
      >
        <Link href={`/${pathname}/${news.url}`}>
          <div className={cx("title", { isLatest })}>{news.title}</div>
        </Link>
        <div className={cx("date", { isLatest })}>{news.date}</div>
        <div
          className={cx("description", {
            isLatest,
          })}
        >
          {news.description.slice(0, 200) + "..."}
        </div>
      </div>
      <img
        src={news.image || "/images/home/1.jpg"}
        className={cx({ isLatest }, "image")}
      />
    </div>
  );
}

export default function ListNews({ isLatest }) {
  const router = useRouter();
  const { t } = useTranslation();
  let data =
    router.pathname.split("/")[1] === "library" ? listLibrary : listNews;
  if (isLatest)
    data = [
      ...listNews.map((i) => ({ ...i, pathname: "hackathon" })),
      ...listLibrary.map((i) => ({ ...i, pathname: "library" })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

  return (
    <div className={cx("list-news")}>
      {isLatest && (
        <>
          <div className={cx("title")}>{t("news.latest")}</div>
          {data.map((news) => (
            <News
              news={news}
              isLatest={isLatest}
              key={news.url}
              pathname={news.pathname}
            />
          ))}
        </>
      )}
      {!isLatest &&
        data.map((news) => (
          <News
            news={news}
            isLatest={isLatest}
            key={news.url}
            pathname={router.pathname.split("/")[1]}
          />
        ))}
    </div>
  );
}
