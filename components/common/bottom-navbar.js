import React from "react";
import styles from "styles/common/navbar.module.scss";
import cn from "classnames/bind";
import { Container } from "@mui/material";
import Link from "next/link";

const cx = cn.bind(styles);

function BottomNavbar() {
  return (
    <div className={cx("bottom-navbar")}>
      <Container className={cx("list-menu")}>
        <Link href={`/`}>
          <div className={cx("item-menu")}>Oraichain Hackathon</div>
        </Link>
        <Link href={`/library`}>
          <div className={cx("item-menu")}>Library</div>
        </Link>
      </Container>
    </div>
  );
}

export default BottomNavbar;
