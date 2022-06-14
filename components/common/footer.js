/* eslint-disable react/jsx-no-target-blank */
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import styles from "styles/common/footer.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export default function Footer() {
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
            <div className={cx("organized")}>ORGANIZED BY</div>
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
            <div className={cx("label")}>Ecosystem</div>
            <a href="https://kawaii.global/" target="_blank">
              Kawaiiverse
            </a>
            <a href="https://play.kawaii.global/" target="_blank">
              Kawaii Islands
            </a>
            <a href="">Kawaii Fishing Saga</a>
            <a href="https://marketplace.kawaii.global/" target="_blank">
              Marketplace
            </a>
          </Grid>
          <Grid item lg={1} md={3} xs={6}>
            <div className={cx("label")}>Resources</div>
            <a href="https://docs.kawaii.global/litepaper" target="_blank">
              Litepaper
            </a>
            <a href="https://kawaii.global/media-kit" target="_blank">
              Media Kit
            </a>
            <a href="mailto:contact@kawaii.global">Contact</a>
            <a href="https://blog.kawaii.global" target="_blank">
              Blog
            </a>
            <a href="https://docs.kawaii.global/" target="_blank">
              Instruction
            </a>
          </Grid>
          <Grid item lg={2} md={6} xs={6}>
            <div className={cx("label", "fourth-col")}>Terms</div>
            <a
              href="https://kawaii.global/terms"
              target="_blank"
              className={cx("fourth-col")}
            >
              Terms of use
            </a>
            <a
              href="https://kawaii.global/privacy"
              target="_blank"
              className={cx("fourth-col")}
            >
              Privacy Policy
            </a>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <div className={cx("label")}>SOCIAL MEDIA</div>
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
              <button className={cx("login")}>Log in</button>
              <button className={cx("apply")}>Apply now</button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
