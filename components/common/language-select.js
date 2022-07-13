import { Box } from "@mui/system";
import styles from "styles/common/language-select.module.scss";
import cn from "classnames/bind";
import useLocale from "hooks/useLocale";

const cx = cn.bind(styles);

export default function LanguageSelect({}) {
  const { locale, changeLocale } = useLocale();

  return (
    <Box className={cx("language-select")}>
      <div
        className={cx("item", locale === "vi" && "active")}
        onClick={() => changeLocale("vi")}
      >
        <img src="/images/common/vi.svg" />
      </div>
      <div
        className={cx("item", locale === "en" && "active")}
        onClick={() => changeLocale("en")}
      >
        <img src="/images/common/us.svg" />
      </div>
    </Box>
  );
}
