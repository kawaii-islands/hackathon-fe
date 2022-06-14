import { Container, Box } from "@mui/system";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import LanguageSelect from "./language-select";
import cn from "classnames/bind";
import styles from "styles/common/navbar.module.scss";
import Link from "next/link";

const cx = cn.bind(styles);

const links = [
  {
    name: "Apply",
    href: "/",
  },
  {
    name: "Log in",
    href: "/login",
  },
  {
    name: "Register",
    href: "/register",
  },
];

export default function Navbar({}) {
  return (
    <AppBar>
      <Container>
        <Toolbar className={cx("navbar")}>
          <Box display="flex" alignItems="center">
            <Link href="/">
              <a>
                <Image
                  src="/images/common/kawaiiverse.png"
                  height={41}
                  width={191}
                  alt="logo"
                />
              </a>
            </Link>
            <LanguageSelect />
          </Box>
          <div className={cx("nav-links")}>
            {links.map((link) => (
              <div
                className={cx("link", {
                  apply: link.name === "Apply",
                })}
                key={link.name}
              >
                <Link href={link.href}>{link.name}</Link>
              </div>
            ))}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
