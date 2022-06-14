import styles from "styles/common/library-layout.module.scss";
import cn from "classnames/bind";
import { Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import Breadcrumb from "./breadcrumb";

const cx = cn.bind(styles);

export default function LibraryLayout() {
  return (
    <div className={cx("library-layout")}>
      <div className={cx("sub-header")}>
        <Container>
          <Toolbar className={cx("container")}>
            <Link href="/">
              <div className={cx("link")}>Kawaiiverse Hackathon</div>
            </Link>
            <Link href="/library">
              <div className={cx("link")}>Library</div>
            </Link>
          </Toolbar>
        </Container>
      </div>
      <Breadcrumb />
    </div>
  );
}
