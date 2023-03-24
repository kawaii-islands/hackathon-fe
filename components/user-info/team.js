import React, { useEffect } from "react";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import axios from "axios";
import { ENDPOINT } from "consts";

const TeamInfoTab = () => {
  const token = window.localStorage.getItem("token");

  const getData = async () => {
    try {
      const res = await axios({
        url: `${ENDPOINT}/teams/download`,
        method: "GET",
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "file.zip");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        style={{
          border: "none",
          padding: "8px 20px",
          borderRadius: "8px",
          color: "#ffffff",
          backgroundColor: "#9671FF",
        }}
        
        onClick={() => getData()}
      >
        <DownloadRoundedIcon /> &nbsp; Download Teams Info
      </button>
    </div>
  );
};

export default TeamInfoTab;
