import styles from "styles/home/index.module.scss";
import cn from "classnames/bind";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import news from "news";
import library from "library";

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
  autoplaySpeed: 2000,
  speed: 1000,
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
        <Link href="/hackathon">
          <div className={cx("title")}>{t("home.explore")}</div>
        </Link>
        <Slider {...secondSettings}>
          {news.map((item) => (
            <Link href={`/hackathon/${item.url}`} key={item.url}>
              <div className={cx("slider-item")}>
                <img
                  className={cx("banner")}
                  src={`/images/home/kawaii-hackathon-banner.jpg`}
                />
              </div>
            </Link>
          ))}
        </Slider>
      </div>

      <div className={cx("into-kawaiiverse")}>
        <Slider {...settingInto}>
          {library.map((item, idx) => (
            <div className={cx("banner", `banner-${idx + 1}`)} key={item.url}>
              <div className={cx("title")}>
                <a
                  href="https://blog.kawaii.global/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("home.into")}
                </a>
              </div>
              <Link href={`/library/${item.url}`}>
                <img className={cx("banner-img")} src={item.image} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
