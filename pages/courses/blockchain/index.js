import React from "react";
import { Avatar, Button, Container, Grid } from "@mui/material";
import styles from "styles/courses/courses-intro.module.scss";
import cn from "classnames/bind";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import CourseCard from "components/common/course-card";
import lessons from "../../../lesson";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

const lectures = [
  {
    name: "TS. Đào Thành Chung",
    position: "CEO & Co-Founder Oraichain Labs",
    avatar: "/images/courses/dao-thanh-chung.jpg",
  },
  {
    name: "TS. Đỗ Bá Lâm",
    position:
      "Giảng viên Trường công nghệ thông tin và Truyền thông - Đại học Bách Khoa Hà Nội",
    avatar: "/images/courses/do-ba-lam.png",
  },
  {
    name: "TS. Trần Vĩnh Đức",
    position:
      "Giảng viên Trường Công nghệ thông tin và Truyền thông - Đại học Bách Khoa Hà Nội",
    avatar: "/images/courses/tran-vinh-duc.jpeg",
  },
  {
    name: "Anh Phạm Thanh Tú",
    position: "CTO & Co-Founder Oraichain Labs",
    avatar: "/images/courses/pham-thanh-tu.jpg",
  },
  {
    name: "Anh Phạm Lê Đức",
    position: "CPO & Co-Founder Oraichain Labs",
    avatar: "/images/courses/pham-le-duc.jpg",
  },
  // {
  //   name: "Anh Vũ Anh Nhật",
  //   position: "CEO & Co-Founder/Deputy CEO cum CPTO TopCV",
  //   avatar: "/images/courses/do-anh-tung.png",
  // },
  {
    name: "TS. Nguyễn Thị Ngọc Diệp",
    position: "CAIO Oraichain Labs",
    avatar: "/images/courses/nguyen-thi-ngoc-diep.JPG",
  },
  {
    name: "Anh Đỗ Anh Tùng",
    position: "CEO Oraichain Labs US",
    avatar: "/images/courses/do-anh-tung.png",
  },
  {
    name: "Anh Đinh Hữu Hải Quân",
    position: "CPO Trava Finance",
    avatar: "/images/courses/dinh-huu-hai-quan.jpg",
  },
  {
    name: "PGS.TS. Trần Thành Nam",
    position:
      "Chủ nhiệm Khoa các Khoa học giáo dục Trường ĐH Giáo dục - ĐHQG Hà Nội",
    avatar: "/images/courses/tran-thanh-nam.jpg",
  },
];

const Blockchain = () => {
  const router = useRouter();

  return (
    <Container className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <h1>Khóa học Blockchain Anyone</h1>
          <div>
            Thực hiện bởi <b>BTC Oraichain Hackathon</b>
          </div>
        </div>
        <Button
          className={cx("button")}
          onClick={() => router.push(`/courses/blockchain/lesson1`)}
        >
          Bắt đầu học &nbsp;
          <EastRoundedIcon />
        </Button>
      </div>
      <div className={cx("banner")}>
        <img
          src={"/images/courses/blockchain-thumbnail.jpeg"}
          alt="blockchain-course-banner"
        />
      </div>

      <div className={cx("course-intro")}>
        <div className={cx("overview")}>
          <h3>Tổng quan khoá học</h3>
          <div className={cx("content")}>
            <p>
              Với chủ đề “Công nghệ vì cuộc sống”, khóa học “Blockchain Anyone”
              được tổ chức tổ chức bởi Công ty Cổ phần Oraichain Labs và Trung
              tâm Phát triển Khoa học, Công nghệ và Tài năng trẻ (CYTAST), nhằm
              cung cấp các kiến thức cơ bản và mở rộng cần có để tiếp cận với
              công nghệ Blockchain cho “bất kỳ ai" - từ những người mới bắt đầu
              muốn tìm hiểu cho đến lập trình viên ở mọi trình độ. Bên cạnh đó,
              khóa học mong muốn cung cấp những kỹ năng mềm giúp học viên có thể
              thích ứng và vững vàng tâm lý trong bối cảnh chuyển đổi số mạnh mẽ
              hiện nay.
            </p>
            <p>
              Khóa học Blockchain Anyone là một hoạt động đồng hành của cuộc thi
              Oraichain Hackathon 2023, quy tụ các diễn giả đến từ đa dạng các
              đơn vị như ĐH Bách Khoa Hà Nội, ĐH Quốc Gia Hà Nội, Viettel, TopCV
              hay Trava.Finance.
            </p>
            <p>Bạn có thể học miễn phí khóa học tại đây.</p>
          </div>
        </div>
        <div className={cx("lecturer")}>
          <div className={cx("tab-header")}>Diễn giả</div>
          <div className={cx("list-lecture")}>
            {lectures.map((item, id) => (
              <div className={cx("lecture-detail")} key={`lecture-${id}`}>
                <Avatar
                  alt="Remy Sharp"
                  src={item.avatar}
                  sx={{ width: 56, height: 56 }}
                />
                <div className={cx("lecture-info")}>
                  <div className={cx("name")}>{item.name}</div>
                  <div className={cx("position")}>{item.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("list-lesson")}>
        <h2>Danh sách bài học ({lessons?.length})</h2>
        <br />
        <Grid container spacing={4}>
          {lessons.map((item, id) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={`lesson-$${id}`}
              onClick={() =>
                router.push(`/courses/blockchain/lesson${item.lesson}`)
              }
            >
              <CourseCard lesson={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Blockchain;
