import styles from "styles/common/library-layout.module.scss";
import cn from "classnames/bind";
import { Button, Toolbar, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import Breadcrumb from "./breadcrumb";
import ListNews from "./list-news";
import { links } from "./navbar";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";
import ProfileNavbar from "./profile-navbar";
import { AUTH_STATUS } from "hooks/useAuth";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

export default function LibraryLayout({ title, date, children }) {
  const authStatus = useAuth();
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const router = useRouter();

  console.log("pathname", router.pathname);

  return (
    <div className={cx("library-layout")}>
      <div
        className={cx("left")}
        style={{
          width: router.pathname.includes("[url]") ? "852px" : "1120px",
        }}
      >
        <div className={cx("navigation")}>
          <Container style={{ maxWidth: "1120px" }}>
            <Toolbar className={cx("container")}>
              {isDesktop ? (
                <>
                  <Link href="/hackathon">
                    <div className={cx("link")}>Kawaiiverse Hackathon</div>
                  </Link>
                  <Link href="/library">
                    <div className={cx("link")}>{t("breadcrumb.library")}</div>
                  </Link>
                </>
              ) : (
                <>
                  {links.map((link) => {
                    if (
                      authStatus !== AUTH_STATUS.NOT_AUTH &&
                      link.name === "register"
                    )
                      return <div key={link.name}></div>;
                    if (
                      authStatus !== AUTH_STATUS.NOT_AUTH &&
                      link.name === "login"
                    )
                      return <ProfileNavbar key={link.name} />;
                    return (
                      <div
                        className={cx("link", {
                          apply: link.name === "apply",
                        })}
                        key={link.name}
                      >
                        <Link href={link.href}>{t(`common.${link.name}`)}</Link>
                      </div>
                    );
                  })}
                </>
              )}
            </Toolbar>
          </Container>
        </div>
        <Breadcrumb />
        <Container style={{ maxWidth: "1120px" }}>
          {title && <div className={cx("title")}>{title}</div>}
          {date && <div className={cx("date")}>{date}</div>}
          <div className={cx("container")}>
            {children}
            <div className={cx("banner")} />
          </div>
          <ListNews isLatest />
        </Container>
      </div>
      {router.pathname.includes("[url]") ? (
        <div className={cx("right")}>
          <div
            className={cx("banner")}
            style={{
              backgroundImage:
                "url(" +
                `/images/home/banner-vertical-${i18n.language}.png` +
                ")",
            }}
          >
            <Button
              className={cx("button")}
              onClick={() => router.push("/apply")}
            >
              {t("news.register-now")}
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
