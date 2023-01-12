import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:url" content="https://hackathon-orai-staging.web.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Oraichain Labs Hackathon 2023" />
          <meta
            property="og:description"
            content="This Accelerator Program aims to support developers and entrepreneurs whose vision aligns with ours to fulfill their dreams of founding a company or running a business through DApps"
          />
          <meta
            property="og:image"
            content="https://data.eueno.io/hackathon-orai/images/big_banner_orai_hackathon_2023_en.png"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://hackathon-orai-staging.web.app/"
          />
          <meta property="twitter:title" content="Oraichain Labs Hackathon 2022" />
          <meta
            property="twitter:description"
            content="This Accelerator Program aims to support developers and entrepreneurs whose vision aligns with ours to fulfill their dreams of founding a company or running a business through DApps"
          />
          <meta
            property="twitter:image"
            content="https://data.eueno.io/hackathon-orai/images/big_banner_orai_hackathon_2023_en.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&family=Volkhov:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
