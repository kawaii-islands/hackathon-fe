import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../components/common/layout";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import "locales/i18n";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Head>
          <title>Kawaiiverse Hackathon 2022</title>
          <meta name="description" content="Kawaiiverse Hackathon 2022" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
