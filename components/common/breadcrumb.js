import { Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import cn from "classnames/bind";
import styles from "styles/common/breadcrumb.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const cx = cn.bind(styles);

export default function Breadcrumb() {
  const { t } = useTranslation();
  const router = useRouter();
  const routerName = router.pathname.replace("/", "").split("/")[0];

  return (
    <Container style={{ maxWidth: "1180px" }}>
      <Toolbar className={cx("breadcrumb")}>
        <img src="/icons/home.svg" style={{ marginBottom: 4 }} />
        <Link href="/">
          <div className={cx("text")}>{t("breadcrumb.homepage")}</div>
        </Link>
        <img src="/icons/forward.svg" />
        <Link href={`/${routerName}`}>
          <div className={cx("text", "active")}>
            {t(`breadcrumb.${routerName}`)}
          </div>
        </Link>
      </Toolbar>
    </Container>
  );
}
