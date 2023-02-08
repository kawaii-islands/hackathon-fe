import { useState, useEffect } from "react";
import styles from "styles/home/index.module.scss";
import cn from "classnames/bind";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import useAuth from "hooks/useAuth";
import useLocale from "hooks/useLocale";
import { Button } from "@mui/material";
import { LOCAL_ENDPOINT } from "consts";
import axios from "axios";

const cx = cn.bind(styles);

function CustomNextArrow({ className, onClick }) {
  return (
    <div className={cx(className, "arrow", "next")} onClick={onClick}>
      <img src="/images/common/next-arrow.svg" />
    </div>
  );
}

function CustomPrevArrow({ className, onClick }) {
  return (
    <div className={cx(className, "arrow", "prev")} onClick={onClick}>
      <img src="/images/common/prev-arrow.svg" />
    </div>
  );
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 5000,
  speed: 500,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
};

const secondSettings = {
  dots: true,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 5000,
  speed: 500,
  //   slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  cssEase: "linear",
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const settingInto = {
  dots: true,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 5000,
  speed: 500,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const { locale } = useLocale();
  const auth = useAuth();
  const [news, setNews] = useState();

  useEffect(() => {
    getListPost();
  }, []);

  const getListPost = async () => {
    try {
      const response = await axios.get(`${LOCAL_ENDPOINT}/posts`);
      let data;
      if (response.status === 200) {
        data = response.data.results
          .map((i) => ({ ...i, pathname: "library" }))
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
      }

      setNews(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cx("home")}>
      <Slider {...settings}>
        <div>
          <img
            className={cx("banner")}
            src={`/images/home/big-banner-${i18n.language}.png`}
          />
          <div className={cx("social")}>
            <a
              href="https://www.facebook.com/groups/kawaiiverse.hackathon"
              target="_blank"
            >
              <img src="/images/common/facebook.svg" />
            </a>
            <a href="https://twitter.com/kawaii_islands" target="_blank">
              <img src="/images/common/twiter.svg" />
            </a>
            <a href="https://discord.com/invite/nN4FDesACB" target="_blank">
              <img src="/images/common/discord.svg" />
            </a>
            <a href="https://t.me/kawaii_islands" target="_blank">
              <img src="/images/common/telegram.svg" />
            </a>
            <a href="https://play.kawaii.global" target="_blank">
              <img src="/icons/game.svg" />
            </a>
          </div>
        </div>
        {/* <div>
          <img
            className={cx("banner")}
            src={`/images/home/big-banner-${i18n.language}.png`}
          />
        </div> */}
      </Slider>

      <div className={cx("introduction")}>
        {i18n.language === "en" ? (
          <>
            <div className={cx("content")}>
              <div className={cx("title")}>
                The Oraichain for DApps Accelerator Program
              </div>
              <p>
                This Accelerator Program aims to support developers and
                entrepreneurs whose vision aligns with ours to fulfill their
                dreams of founding a company or running a business through
                DApps. Oraichain will provide our infrastructure and ecosystem,
                contribute our resources including our talent pool, and commit
                an advisory board from the early stage of development and
                deployment.
              </p>
              <p>
                The support period varies from one month up to three years
                depending on the scope of a proposed project.
              </p>
              <br />
              <div>
                <div className={cx("subtitle")}> Who can participate</div>
                <p>Any dedicated AI/Blockchain development teams who will</p>
                <p>{`(1) Utilize Oraichain’s ecosystem and/or`}</p>
                <p>
                  (2) Enrich it with new innovative modules that can participate
                  in this program.
                </p>
              </div>
              <br />
              <Link href="/register">
                <Button className={cx("buttonRegister")}>
                  {t("register.title")}
                </Button>
              </Link>
            </div>
            <div className={cx("video")}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/lX8b3JixQzw"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </>
        ) : (
          <>
            <div className={cx("content")}>
              <div className={cx("titleVi")}>Cơ cấu giải thưởng</div>
              <div className={cx("row")}>
                <img src="/images/home/first.svg" />
                <p style={{ paddingLeft: "20px" }}>
                  <b>Giải Nhất:</b> 100 triệu đồng tiền mặt, cúp vô địch, chứng
                  nhận của Ban Tổ chức và cơ hội nhận tiền đầu tư từ Oraichain
                  Labs và được khởi tạo thanh khoản trên OraiDEX
                </p>
              </div>
              <div className={cx("row")}>
                <img src="/images/home/second.svg" />
                <p style={{ paddingLeft: "20px" }}>
                  <b>Giải Nhì: </b> 60 triệu đồng tiền mặt và chứng nhận của Ban
                  Tổ chức
                </p>
              </div>
              <div className={cx("row")}>
                <img src="/images/home/third.svg" />
                <p style={{ paddingLeft: "20px" }}>
                  <b>Giải Ba:</b> 40 triệu đồng tiền mặt và chứng nhận của Ban
                  Tổ chức
                </p>
              </div>
              <div className={cx("row")}>
                <img src="/images/home/fourth.svg" />
                <p style={{ paddingLeft: "20px" }}>
                  <b>Giải Khuyến khích:</b> 02 giải, mỗi giải 10 triệu đồng tiền
                  mặt và chứng nhận của Ban Tổ chức
                </p>
              </div>
              <br />
              <Link href="/register">
                <Button className={cx("buttonRegister")}>
                  {t("register.title")}
                </Button>
              </Link>
            </div>
            <div className={cx("video")}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YkKOnPWWoc4"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </>
        )}
      </div>

      <div className={cx("explore")}>
        <Link href="/library">
          <div className={cx("title")}>{t("home.explore")}</div>
        </Link>
        <Slider {...secondSettings}>
          {news?.slice(0, 3).map((item) => (
            <Link href={`/library/${item._id}`} key={item._id}>
              <div className={cx("slider-item")}>
                <img
                  className={cx("banner")}
                  src={locale === "vi" ? item.thumbnail : item.en_thumbnail}
                  style={{ height: "320px", width: "auto", margin: "auto" }}
                />
              </div>
            </Link>
          ))}
        </Slider>
      </div>

      <div className={cx("into-kawaiiverse")}>
        <Slider {...settingInto}>
          {/* <div className={cx("banner")}>
            <div className={cx("title")}>
              <a
                href="https://blog.kawaii.global/"
                target="_blank"
                rel="noreferrer"
              >
                {t("home.into")}
              </a>
            </div>
            <a href="https://kawaii.global/" target="_blank">
              <img
                className={cx("banner-img")}
                src={`/images/home/big-banner-${i18n.language}.png`}
              />
            </a>
          </div> */}
          {news?.slice(-3).reverse().map((item, idx) => (
            <div className={cx("banner")} key={item._id}>
              <div className={cx("title")}>{t("home.into")}</div>
              <Link href={`/library/${item._id}`}>
                <img
                  className={cx("banner-img")}
                  src={locale === "vi" ? item.thumbnail : item.en_thumbnail}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
