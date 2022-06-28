import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <title>Kawaiiverse Hackathon 2022</title>
          <meta name="description" content="Kawaiiverse Hackathon 2022" />
          <meta property="og:url" content="https://kawaii-hackathon.web.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Kawaiiverse Hackathon 2022" />
          <meta
            property="og:description"
            content="Kawaiiverse Hackathon 2022"
          />
          <meta
            property="og:image"
            content="https://kawaii-hackathon.web.app/images/home/big-banner-en.png"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://kawaii-hackathon.web.app/"
          />
          <meta property="twitter:title" content="Kawaiiverse Hackathon 2022" />
          <meta
            property="twitter:description"
            content="Kawaiiverse Hackathon 2022"
          />
          <meta
            property="twitter:image"
            content="https://kawaii-hackathon.web.app/images/home/big-banner-en.png"
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
