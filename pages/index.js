import styles from "styles/home/index.module.scss";
import cn from "classnames/bind";
import Slider from "react-slick";

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
  speed: 500,
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
  return (
    <div className={cx("home")}>
      <Slider {...settings}>
        <div>
          <div className={cx("banner")}>
            <div className={cx("logos")}>
              <img
                src="/images/home/kawaii.png"
                alt="kawaii-logo"
                className={cx("left")}
              />
              <img src="/images/home/separate.svg" />
              <img
                src="/images/common/kawaiiverse.png"
                alt="kawaii-logo"
                className={cx("right")}
              />
            </div>
            <div className={cx("sub-title")}>KAWAIIVERSE</div>
            <div className={cx("title")}>HACKATHON 2022</div>
            <div className={cx("description")}>
              Building the Kawaiiverse gaming ecosystem
            </div>
            <div className={cx("prize")}>
              <span className={cx("yellow")}>$5,000</span> FOR EACH CHOSEN TEAM
              AND CHANCES FOR PRIVATE DEALS
            </div>
            <div className={cx("date")}>21/06/2022 - 21/08/2022</div>
          </div>
        </div>
        <div>
          <div className={cx("banner")}>
            <div className={cx("logos")}>
              <img
                src="/images/home/kawaii.png"
                alt="kawaii-logo"
                className={cx("left")}
              />
              <img src="/images/home/separate.svg" />
              <img
                src="/images/common/kawaiiverse.png"
                alt="kawaii-logo"
                className={cx("right")}
              />
            </div>
            <div className={cx("sub-title")}>KAWAIIVERSE</div>
            <div className={cx("title")}>HACKATHON 2022</div>
            <div className={cx("description")}>
              Building the Kawaiiverse gaming ecosystem
            </div>
            <div className={cx("prize")}>
              <span className={cx("yellow")}>$5,000</span> FOR EACH CHOSEN TEAM
              AND CHANCES FOR PRIVATE DEALS
            </div>
            <div className={cx("date")}>21/06/2022 - 21/08/2022</div>
          </div>
        </div>
      </Slider>
      <div className={cx("explore")}>
        <div className={cx("title")}>Explore Kawaiiverse Hackathon</div>
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
