import { Box } from "@mui/system";
import styles from "styles/common/language-select.module.scss";
import cn from "classnames/bind";
import Image from "next/image";
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
        <Image src="/images/common/vi.svg" width={32} height={20} />
      </div>
      <div
        className={cx("item", locale === "en" && "active")}
        onClick={() => changeLocale("en")}
      >
        <Image src="/images/common/us.svg" width={32} height={20} />
      </div>
    </Box>
  );
}
