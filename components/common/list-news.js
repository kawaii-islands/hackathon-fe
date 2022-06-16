import cn from "classnames/bind";
import styles from "styles/common/list-news.module.scss";
import listNews from "news";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const cx = cn.bind(styles);

function News({ news, isLatest }) {
  return (
    <div className={cx("news")}>
      <div
        className={cx("content", {
          isLatest,
        })}
      >
        <Link href={`/library/${news.url}`}>
          <div className={cx("title", { isLatest })}>{news.title}</div>
        </Link>
        <div className={cx("date", { isLatest })}>{news.date}</div>
        <div
          className={cx("description", {
            isLatest,
          })}
        >
          {news.description}
        </div>
      </div>
      <img src="/images/common/news.png" className={cx({ isLatest })} />
    </div>
  );
}

export default function ListNews({ isLatest }) {
  const { t } = useTranslation();
  let data = listNews.reverse();
  if (isLatest) data = listNews.reverse().slice(0, 3);

  return (
    <div className={cx("list-news")}>
      {isLatest && (
        <>
          <div className={cx("title")}>{t("news.latest")}</div>
          {data.map((news) => (
            <News news={news} isLatest={isLatest} key={news.url} />
          ))}
        </>
      )}
      {!isLatest &&
        data.map((news) => (
          <News news={news} isLatest={isLatest} key={news.url} />
        ))}
    </div>
  );
}
