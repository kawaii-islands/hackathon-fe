import "../styles/globals.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../components/common/layout";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import "locales/i18n";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  }
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <title>Kawaiiverse Hackathon 2022</title>
          <meta name="description" content="Kawaiiverse Hackathon 2022" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Kawaiiverse Hackathon 2022" />
          <meta
            property="og:description"
            content="Kawaiiverse Hackathon 2022"
          />
          <meta property="og:image" content="https://kawaii.global/kawaiiverse.jpg" />
        </Head>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
