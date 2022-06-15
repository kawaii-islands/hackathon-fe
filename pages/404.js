import cn from "classnames/bind";
import styles from "styles/not-found.module.scss";

const cx = cn.bind(styles);

export default function NotFound() {
  return <div className={cx("not-found")}>404 | Not Found</div>;
}
