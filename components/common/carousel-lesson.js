import React from "react";
import styles from "styles/courses/carousel-lesson.module.scss";
import cn from "classnames/bind";
import Slider from "react-slick";
import lessons from "../../lesson";
import Link from "next/link";
import CourseCard from "./course-card";
import { Container, useMediaQuery } from "@mui/material";

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

const CarouselLesson = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  
  const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 500,
    cssEase: "linear",
    slidesToShow: isDesktop ? 3 : 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Container className={cx("carousel-lesson")} >
      <Slider {...settings}>
        {lessons?.map((item) => (
          <Link href={`/courses/blockchain/${item.lesson}`} key={item.lesson}>
            <div className={cx("slider-item")}>
              <CourseCard lesson={item} />
            </div>
          </Link>
        ))}
      </Slider>
    </Container>
  );
};

export default CarouselLesson;
