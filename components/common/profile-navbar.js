import React from "react";
import cn from "classnames/bind";
import styles from "styles/common/navbar.module.scss";
import { Popover } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

export default function ProfileNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refresh-token");
    router.push("/login");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const user = JSON.parse(window.localStorage.getItem("user"));

  return (
    <div>
      <div
        className={cx("profile")}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <img src="/icons/user-icon.svg" /> <div>{user.email}</div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: "6px",
            transform: "translateX(-17px)",
            padding: "1px",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            mt: "14px",
            "&::before": {
              backgroundColor: "white",
              content: '""',
              display: "block",
              position: "absolute",
              width: 14,
              height: 14,
              top: -6,
              transform: "rotate(45deg)",
              left: 20,
              "@media(max-width: 900px)": {
                left: 30,
              },
            },
          }}
        />
        <Box
          sx={{
            padding: "6px 0",
            background: "white",
            borderRadius: "6px",
            boxShadow: "0px 0px 10px rgba(68, 68, 68, 0.25)",
          }}
        >
          {/* <Box
            onClick={() => router.push("/change-password")}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "10px 20px",
              "@media(max-width: 900px)": {
                fontSize: "14px",
              },
            }}
          >
            <img src="/icons/setting.svg" style={{ marginRight: "16px" }} />
            Change password
          </Box> */}
          <Box
            onClick={logout}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "10px 20px",
              "@media(max-width: 900px)": {
                fontSize: "14px",
              },
            }}
          >
            <img src="/icons/exit.svg" style={{ marginRight: "16px" }} />
            Log out
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
