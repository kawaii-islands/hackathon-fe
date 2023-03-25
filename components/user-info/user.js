import React, { useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { ENDPOINT } from "consts";
import axios from "axios";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { Grid } from "@mui/material";
import moment from "moment";

const cx = cn.bind(styles);

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const UserInfoTab = () => {
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${ENDPOINT}/users?role=user&limit=1000000&page=1&sortBy=timestamp:asc`,
        config
      );

      if (res.status === 200) {
        const customData = res?.data?.results?.map((user, id) => {
          let obj = {};
          obj["phoneNumber"] = user.phoneNumber ? user.phoneNumber : "";
          obj["jobRole"] = user.jobRole ? user.jobRole : "";
          obj["placeOfWork"] = user.placeOfWork ? user.placeOfWork : "";
          obj["townCity"] = user.townCity ? user.townCity : "";
          obj["dateOfBirth"] = user.dateOfBirth ? user.dateOfBirth : "";
        
          const userData = { ...user, ...obj };
          return userData;
        });

        setData(customData.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ExcelFile
        element={
          <button
            style={{
              border: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              color: "#ffffff",
              backgroundColor: "#9671FF",
            }}
          >
            <DownloadRoundedIcon /> &nbsp; Download Users Info
          </button>
        }
      >
        <ExcelSheet data={data} name="User">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Phone number" value="phoneNumber" />
          <ExcelColumn label="Email" value="email" />
          <ExcelColumn label="Date of birth" value="dateOfBirth" />
          <ExcelColumn label="Job" value="jobRole" />
          <ExcelColumn label="Place of work" value="placeOfWork" />
          <ExcelColumn label="Town/City" value="townCity" />
        </ExcelSheet>
      </ExcelFile>

      <div className={cx("table")}>
        <Grid container className={cx("table-header")}>
          <Grid item xs={2}>
            Name
          </Grid>
          <Grid item xs={1}>
            Phone
          </Grid>
          <Grid item xs={3} style={{ paddingLeft: "16px" }}>
            Email
          </Grid>
          <Grid item xs={1}>
            Date of birth
          </Grid>
          <Grid item xs={1}>
            Job
          </Grid>
          <Grid item xs={3}>
            Place of work
          </Grid>
          <Grid item xs={1}>
            Town/City
          </Grid>
        </Grid>
        <div className={cx("table-body")}>
          {data?.map((user, id) => (
            <Grid container className={cx("table-row")} key={`user-${id}`}>
              <Grid item xs={2}>
                {user.name}
              </Grid>
              <Grid item xs={1}>
                {user.phoneNumber}
              </Grid>
              <Grid item xs={3} style={{ paddingLeft: "16px" }}>
                {user.email}
              </Grid>
              <Grid item xs={1}>
                {user.dateOfBirth ? moment(user.dateOfBirth).format("L") : null}
              </Grid>
              <Grid item xs={1}>
                {user.jobRole}
              </Grid>
              <Grid item xs={3}>
                {user.placeOfWork}
              </Grid>
              <Grid item xs={1}>
                {user.townCity}
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfoTab;
