import React, { useEffect, useRef, useState } from "react";
import styles from "styles/manage-posts/userInfo.module.scss";
import cn from "classnames/bind";
import { Container } from "@mui/material";
import TeamInfoTab from "components/user-info/team";
import UserInfoTab from "components/user-info/user";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const cx = cn.bind(styles);

const UserInfo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const user = window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : "";

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Vui lòng đăng nhập bằng tài khoản admin!");
      router.push("/");
    }
  }, []);

  return (
    <div className={cx("user-info")}>
      <Container>
        <div className={cx("tabs")}>
          <div
            className={cx("tab", activeTab === 0 && "active")}
            onClick={() => setActiveTab(0)}
          >
            Users
          </div>
          <div
            className={cx("tab", activeTab === 1 && "active")}
            onClick={() => setActiveTab(1)}
          >
            Teams
          </div>
        </div>

        <div className={cx("body")}>
          {activeTab ? <TeamInfoTab /> : <UserInfoTab />}
        </div>
      </Container>
    </div>
  );
};

export default UserInfo;
