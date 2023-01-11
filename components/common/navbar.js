import React from "react";
import { Container, Box } from "@mui/system";
import { AppBar, Toolbar, MenuItem, Fade, Menu, Popover } from "@mui/material";
import LanguageSelect from "./language-select";
import cn from "classnames/bind";
import styles from "styles/common/navbar.module.scss";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";
import ProfileNavbar from "./profile-navbar";
import { AUTH_STATUS } from "hooks/useAuth";

const cx = cn.bind(styles);

export const links = [
  {
    name: "apply",
    href: "/apply",
  },
  {
    name: "find",
    href: "/find",
  },
  {
    name: "login",
    href: "/login",
  },
  {
    name: "register",
    href: "/register",
  },
  {
    name: "managePosts",
    href: "/manage-posts"
  }
];

export default function Navbar({}) {
  const { t } = useTranslation();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const authStatus = useAuth();

  return (
    <AppBar className={cx("navbar-box")}>
      <Container>
        <Toolbar className={cx("navbar")}>
          <Box display="flex" alignItems="center">
            <Link href="/">
              <a>
                <img
                  src="/images/common/orai_hackathon_logo_full.png"
                  className={cx("logo")}
                  alt="logo"
                />
              </a>
            </Link>
            <LanguageSelect />
          </Box>
          {isDesktop ? (
            <div className={cx("nav-links")}>
              {links.map((link) => {
                if (link.name === "find")
                  return (
                    <a href="https://www.facebook.com/groups/oraichain.dev" target="_blank">
                      <div className={cx("link")}>
                        {t(`common.${link.name}`)}
                      </div>
                    </a>
                  );
                if (
                  authStatus !== AUTH_STATUS.NOT_AUTH &&
                  link.name === "register"
                )
                  return <div key={link.name}></div>;
                if (
                  authStatus !== AUTH_STATUS.NOT_AUTH &&
                  link.name === "login"
                )
                  return <ProfileNavbar key={link.name} />;
                return (
                  <Link href={link.href} key={link.name}>
                    <div
                      className={cx("link", {
                        apply: link.name === "apply",
                      })}
                    >
                      {t(`common.${link.name}`)}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <>
              <img
                src="/icons/menu.svg"
                className={cx("toggle")}
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 700 }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/");
                  }}
                >
                  Oraichain Hackathon
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/library");
                  }}
                >
                  Library
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
