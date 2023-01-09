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
              src="/images/common/hackathon_full_white.svg"
            />
            <div className={cx("description")}>{t("footer.description")}</div>
            <div className={cx("org")}>
              <div className={cx("left")}>
                <div className={cx("organized")}>{t("footer.host")}</div>
              </div>
              <img src="/images/common/org_by.svg" />
            </div>
          </Grid>
          <Grid item lg={5} md={12} xs={12}>
            <div className={cx("label")}>{t("footer.ecosystem")}</div>
            <div className={cx("list-startup")}>
              <img src="/images/common/blockAiCare.svg" />
              <img src="/images/common/orchai.svg" />
              <img src="/images/common/ziden.svg" />
              <img src="/images/common/oraichainLabsUs.svg" />
            </div>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <div className={cx("label")}>{t("footer.social")}</div>
            <div className={cx("social")}>
              <a
                href="https://www.youtube.com/watch?v=RTw-WZ5xfOA&ab_channel=KawaiiIslands"
                target="_blank"
              >
                <img src="/images/common/github-mark-white.svg" />
              </a>
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
            </div>
            {/* <div className={cx("buttons")}>
              {authStatus === AUTH_STATUS.NOT_AUTH && (
                <Link href="/login">
                  <button className={cx("login")}>{t("common.login")}</button>
                </Link>
              )}
              <Link href="/apply">
                <button className={cx("apply")}>{t("common.apply")}</button>
              </Link>
            </div> */}
            <div style={{ color: "#FFFFFF" }}>
              <p>
                <b>Email</b>
              </p>
              <div>hackathon@orai.io</div>
              <div>tainangviet.twd@gmail.com</div>
              <br />
              <p>
                <b>Hotline</b>
              </p>
              <div>0344 268 982 | 0356 777 256</div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
