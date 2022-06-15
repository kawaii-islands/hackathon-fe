import { Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import cn from "classnames/bind";
import styles from "styles/common/breadcrumb.module.scss";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

export default function Breadcrumb() {
  const router = useRouter();
  const routerName = router.pathname.replace("/", "");

  return (
    <Container>
      <Toolbar className={cx("breadcrumb")}>
        <img src="/icons/home.svg" style={{ marginBottom: 4 }} />
        <div className={cx("text")}>Homepage</div>
        <img src="/icons/forward.svg" />
        <div className={cx("text", "active")}>{routerName}</div>
      </Toolbar>
    </Container>
  );
}
