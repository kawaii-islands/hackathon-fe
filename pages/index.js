import styles from "styles/home/index.module.scss";
import cn from "classnames/bind";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import Link from "next/link";

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
};

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className={cx("home")}>
      <Slider {...settings}>
        <div>
          <img className={cx("banner")} src="/images/home/big-banner.png" />
        </div>
        <div>
          <img className={cx("banner")} src="/images/home/big-banner.png" />
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
    </div>
  );
}
