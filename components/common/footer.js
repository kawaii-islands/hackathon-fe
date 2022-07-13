/* eslint-disable react/jsx-no-target-blank */
import { Button, Grid, Tooltip } from "@mui/material";
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
            <div className={cx("org")}>
              <div className={cx("left")}>
                <div className={cx("organized")}>{t("footer.host")}</div>
                <div>
                  <a href="https://kawaii.global/" target="_blank">
                    <img
                      src="/images/common/kawaii-islands.svg"
                      className={cx("icon-1")}
                    />
                  </a>
                </div>
              </div>
              <div className={cx("right")}>
                <div className={cx("from")}>{t("footer.from")}</div>
                <div className={cx("group-logo")}>
                  <a
                    href="https://imba.co/"
                    target="_blank"
                    style={{ marginTop: "0px" }}
                  >
                    <img
                      src="/images/common/imba.png"
                      className={cx("icon-2")}
                    />
                  </a>

                  <img src="/images/common/x.svg" className={cx("x")} />

                  <a
                    href="https://orai.io/"
                    target="_blank"
                    style={{ marginTop: "0px" }}
                  >
                    <img
                      src="/images/common/oraichain.svg"
                      className={cx("icon-2")}
                    />
                  </a>
                </div>
              </div>
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
            <a href="mailto:hackathon@kawaii.global">{t("footer.contact")}</a>
            <a href="https://blog.kawaii.global" target="_blank">
              Blog
            </a>
            {authStatus === AUTH_STATUS.NOT_AUTH ? (
              <Tooltip
                title="You must login to view the Resource Sample Packs"
                arrow
              >
                <a>{t("footer.instruction")}</a>
              </Tooltip>
            ) : (
              <Link href="/library/sample-art">{t("footer.instruction")}</Link>
            )}
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
              <a
                href="https://www.youtube.com/watch?v=RTw-WZ5xfOA&ab_channel=KawaiiIslands"
                target="_blank"
              >
                <img src="/images/common/youtube.svg" />
              </a>
              <a
                href="https://www.facebook.com/groups/kawaiiverse.hackathon"
                target="_blank"
              >
                <img src="/images/common/facebook.svg" />
              </a>
			  <a
                href="https://discord.com/invite/nN4FDesACB"
                target="_blank"
              >
                <img src="/images/common/discord.svg" />
              </a>
			  <a
                href="https://twitter.com/kawaii_islands"
                target="_blank"
              >
                <img src="/images/common/twiter.svg" />
              </a>
			  <a
                href="https://t.me/kawaii_islands"
                target="_blank"
              >
                <img src="/images/common/telegram.svg" />
              </a>


              <a href="https://blog.kawaii.global/" target="_blank">
                <img src="/images/common/medium.svg" />
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
