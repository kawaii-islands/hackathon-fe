import React, { useEffect, useState } from "react";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import axios from "axios";
import { ENDPOINT } from "consts";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { Grid, IconButton, Pagination } from "@mui/material";
import moment from "moment";

const cx = cn.bind(styles);

const TeamInfoTab = () => {
  const token = window.localStorage.getItem("token");
  const NUM_PER_PAGE = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTeam();
  }, []);

  const download = async (url, fileName) => {
    try {
      const res = await axios({
        url: `${ENDPOINT}/teams/${url}`,
        method: "GET",
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `${fileName}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTeam = async () => {
    try {
      const res = await axios.get(`${ENDPOINT}/teams/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          style={{
            border: "none",
            padding: "8px 20px",
            borderRadius: "8px",
            color: "#ffffff",
            backgroundColor: "#9671FF",
          }}
          onClick={() =>
            download("download-CSV", "orai-hackathon-team-info.csv")
          }
        >
          <DownloadRoundedIcon /> &nbsp; Download Teams Info
        </button>
        <button
          style={{
            border: "none",
            padding: "8px 20px",
            borderRadius: "8px",
            color: "#ffffff",
            backgroundColor: "#9671FF",
            marginLeft: 30,
          }}
          onClick={() =>
            download("download-attachments", "orai-hackathon-team-ideas.zip")
          }
        >
          <DownloadRoundedIcon /> &nbsp; Download All Teams Ideas
        </button>
      </div>

      <div className={cx("table")}>
        <Grid container className={cx("table-header")}>
          <Grid item xs={1}>
            TeamId
          </Grid>
          <Grid item xs={2}>
            Tên nhóm
          </Grid>
          <Grid item xs={2}>
            Số thành viên
          </Grid>
          <Grid item xs={2}>
            Tên nhóm trưởng
          </Grid>
          <Grid item xs={2}>
            Email nhóm
          </Grid>
          <Grid item xs={2}>
            Thời gian cập nhất cuối
          </Grid>
          <Grid item xs={1} style={{ textAlign: "center" }}>
            Ý tưởng
          </Grid>
        </Grid>
        <div className={cx("table-body")}>
          {data
            ?.slice(
              (currentPage - 1) * NUM_PER_PAGE,
              currentPage * NUM_PER_PAGE
            )
            .map((team, id) => (
              <Grid container className={cx("table-row")} key={`team-${id}`}>
                <Grid item xs={1}>
                  {team.teamId}
                </Grid>
                <Grid item xs={2}>
                  {team.name}
                </Grid>
                <Grid item xs={2} style={{ paddingLeft: 28 }}>
                  {team.members.length}
                </Grid>
                <Grid item xs={2}>
                  {team.members[0].name}
                </Grid>
                <Grid item xs={2}>
                  {team.email}
                </Grid>
                <Grid item xs={2}>
                  {moment(team.updatedAt).format("DD/MM/YYYY, hh:mm:ss a")}
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  {team.attachments.length ? (
                    <IconButton
                      onClick={() =>
                        download(`download/${id}`, `team-${id}-ideas.zip`)
                      }
                    >
                      <DownloadRoundedIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            ))}

          {data?.length > NUM_PER_PAGE ? (
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(data?.length / NUM_PER_PAGE)}
                onChange={(e, p) => setCurrentPage(p)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamInfoTab;
