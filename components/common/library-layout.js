import styles from "styles/common/library-layout.module.scss";
import cn from "classnames/bind";
import { Toolbar, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import Breadcrumb from "./breadcrumb";
import ListNews from "./list-news";
import { links } from "./navbar";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";
import ProfileNavbar from "./profile-navbar";

const cx = cn.bind(styles);

export default function LibraryLayout({ title, date, children }) {
  const isAuth = useAuth();
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width:900px)");
  return (
    <div className={cx("library-layout")}>
      <div className={cx("navigation")}>
        <Container>
          <Toolbar className={cx("container")}>
            {isDesktop ? (
              <>
                <Link href="/">
                  <div className={cx("link")}>Kawaiiverse Hackathon</div>
                </Link>
                <Link href="/library">
                  <div className={cx("link")}>Library</div>
                </Link>
              </>
            ) : (
              <>
                {links.map((link) => {
                  if (isAuth && link.name === "register")
                    return <div key={link.name}></div>;
                  if (isAuth && link.name === "login")
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
      <Container>
        {title && <div className={cx("title")}>{title}</div>}
        {date && <div className={cx("date")}>{date}</div>}
        <div className={cx("container")}>
          {children}
          <div className={cx("banner")} />
        </div>
        <ListNews isLatest />
      </Container>
    </div>
  );
}
