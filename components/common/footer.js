/* eslint-disable react/jsx-no-target-blank */
import { Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import styles from "styles/common/footer.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";
import { AUTH_STATUS } from "hooks/useAuth";

const cx = cn.bind(styles);

export default function Footer() {
  const authStatus = useAuth();
  const { t } = useTranslation();
  return (
    <div className={cx("footer")}>
      <Container>
        <Grid
          container
          spacing={{
            md: 1,
            sm: 3,
          }}
        >
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <img
              className={cx("logo")}
              src="/images/common/kawaiiverse-v2.png"
            />
            <div className={cx("description")}>
              Kawaiiverse Hackathon 2022, a new playground for game developers
              around the world, join us in developing our Anime Metaverse, where
              everyone play, create, connect and earn.
            </div>
            <div className={cx("organized")}>{t("footer.host")}</div>
            <div className={cx("logos")}>
              <a href="https://imba.co/" target="_blank">
                <img src="/images/common/imba.png" />
              </a>
              <div className={cx("divider")} />
              <a href="https://orai.io/" target="_blank">
                <img src="/images/common/oraichain.svg" />
              </a>
            </div>
          </Grid>
          <Grid item lg={2} md={3} xs={6}>
            <div className={cx("label")}>{t("footer.ecosystem")}</div>
            <a
              href="https://blog.kawaii.global/tagged/kawaiiverse"
              target="_blank"
            >
              Kawaiiverse
            </a>
            <a
              href="https://kawaii.global/?shortlink=social&pid=social"
              target="_blank"
            >
              Kawaii Islands
            </a>
            <a href="https://blog.kawaii.global/tagged/kfs">
              Kawaii Fishing Saga
            </a>
            <a href="https://marketplace.kawaii.global/" target="_blank">
              Marketplace
            </a>
          </Grid>
          <Grid item lg={1} md={3} xs={6}>
            <div className={cx("label")}>{t("footer.resource")}</div>
            <a href="https://docs.kawaii.global/litepaper" target="_blank">
              {t("footer.litepaper")}
            </a>
            <a href="https://kawaii.global/media-kit" target="_blank">
              Media Kit
            </a>
            <a href="mailto:contact@kawaii.global">{t("footer.contact")}</a>
            <a href="https://blog.kawaii.global" target="_blank">
              Blog
            </a>
            <a href="https://docs.kawaii.global/" target="_blank">
              {t("footer.instruction")}
            </a>
          </Grid>
          <Grid item lg={2} md={6} xs={6}>
            <div className={cx("label", "fourth-col")}>{t("footer.term")}</div>
            <a
              href="https://kawaii.global/terms"
              target="_blank"
              className={cx("fourth-col")}
            >
              {t("footer.use")}
            </a>
            <a
              href="https://kawaii.global/privacy"
              target="_blank"
              className={cx("fourth-col")}
            >
              {t("footer.privacy")}
            </a>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <div className={cx("label")}>{t("footer.social")}</div>
            <div className={cx("social")}>
              <a href="">
                <img src="/images/common/medium.svg" />
              </a>
              <a href="">
                <img src="/images/common/youtube.svg" />
              </a>
              <a href="">
                <img src="/images/common/facebook.svg" />
              </a>
            </div>
            <div className={cx("buttons")}>
              {authStatus === AUTH_STATUS.NOT_AUTH && (
                <Link href="/login">
                  <button className={cx("login")}>{t("common.login")}</button>
                </Link>
              )}
              <Link href="/apply">
                <button className={cx("apply")}>{t("common.apply")}</button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
