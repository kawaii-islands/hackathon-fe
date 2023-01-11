import cn from "classnames/bind";
import styles from "styles/common/list-news.module.scss";
import listNewsEn from "news/en";
import listNewsVi from "news/vi";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useLocale from "hooks/useLocale";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";

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
  const { locale } = useLocale();
  const auth = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const listLibrary = locale === "en" ? listNewsEn : listNewsVi;
  const listNews = locale === "en" ? listNewsEn : listNewsVi;
  let data = listNews;
  if (isLatest)
    data = [
      ...listNews.map((i) => ({ ...i, pathname: "library" })),
      ...listLibrary
        .map((i) => ({ ...i, pathname: "library" }))
        .filter((i) => !(auth === "NOT_AUTH" && i.url === "sample-art")),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

  return (
    <div className={cx("list-news")}>
      {isLatest && (
        <div>
          <div className={cx("title", "latest")}>{t("news.latest")}</div>
          {data.map((news) => (
            <News
              news={news}
              isLatest={isLatest}
              key={news.url}
              pathname={news.pathname}
            />
          ))}
        </div>
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
