import styles from "styles/home/index.module.scss";
import cn from "classnames/bind";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import Link from "next/link";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

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
  autoplay: true,
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
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  slidesToShow: 3,
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
  infinite: true,
  autoplay: true,
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

  return (
    <div className={cx("home")}>
      <Slider {...settings}>
        <div>
          <img
            className={cx("banner")}
            src={`/images/home/big-banner-${i18n.language}.png`}
          />
        </div>
        <div>
          <img
            className={cx("banner")}
            src={`/images/home/big-banner-${i18n.language}.png`}
          />
        </div>
      </Slider>
      <div className={cx("explore")}>
        <Link href="/library">
          <div className={cx("title")}>{t("home.explore")}</div>
        </Link>
        <Slider {...secondSettings}>
          <div>
            <div className={cx("slider-item")}></div>
          </div>
          <div>
            <div className={cx("slider-item")}></div>
          </div>
          <div>
            <div className={cx("slider-item")}></div>
          </div>
          <div>
            <div className={cx("slider-item")}></div>
          </div>
          <div>
            <div className={cx("slider-item")}></div>
          </div>
        </Slider>
      </div>

      <div className={cx("into-kawaiiverse")}>
        <Slider {...settingInto}>
          <a
            href="https://blog.kawaii.global/introducing-kawaiiverse-subnetwork-on-oraichain-the-first-glimpse-f717d35658ff"
            target="_blank"
            rel="noreferrer"
            className={cx("banner", "banner-4")}
          >
            <div className={cx("title")}>
              <a
                href="https://blog.kawaii.global/"
                target="_blank"
                rel="noreferrer"
              >
                Into the Kawaiiverse
              </a>
            </div>
            <img
              className={cx("banner-img")}
              src={`https://miro.medium.com/max/1400/0*ATFLXLKvxGuWUlpb`}
            />
          </a>

          <a
            href="https://blog.kawaii.global/kawaiiverses-blooming-first-quarter-mobile-apps-new-economy-and-more-8e44d39591eb"
            target="_blank"
            rel="noreferrer"
            className={cx("banner", "banner-3")}
          >
            <div className={cx("title")}>
              <a
                href="https://blog.kawaii.global/"
                target="_blank"
                rel="noreferrer"
              >
                Into the Kawaiiverse
              </a>
            </div>
            <img
              className={cx("banner-img")}
              src={`https://miro.medium.com/max/1400/0*FGztSi3DJE07Bh95`}
            />
          </a>

          <a
            href="https://blog.kawaii.global/the-dawn-of-our-kawaiiverse-65567bc16ed5"
            target="_blank"
            rel="noreferrer"
            className={cx("banner", "banner-2")}
          >
            <div className={cx("title")}>
              <a
                href="https://blog.kawaii.global/"
                target="_blank"
                rel="noreferrer"
              >
                Into the Kawaiiverse
              </a>
            </div>
            <img
              className={cx("banner-img")}
              src={`https://miro.medium.com/max/1400/0*_hVANsSxLl2PWmuq`}
            />
          </a>

          <a
            href="https://blog.kawaii.global/kawaii-islands-2022-bouncing-into-the-anime-metaverse-9e7c1a344aac"
            target="_blank"
            rel="noreferrer"
            className={cx("banner", "banner-1")}
          >
            <div className={cx("title")}>
              <a
                href="https://blog.kawaii.global/"
                target="_blank"
                rel="noreferrer"
              >
                Into the Kawaiiverse
              </a>
            </div>
            <img
              className={cx("banner-img")}
              src={`https://miro.medium.com/max/1400/1*ZR99DqyNJUGkWc81cw4N1Q.png`}
            />
          </a>
        </Slider>
      </div>
    </div>
  );
}
