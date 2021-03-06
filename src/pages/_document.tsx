import type { DocumentContext } from "next/document";
import Document, { Html, Head, Main, NextScript } from "next/document";

const APP_NAME = "monnomlog";

export const getInitialProps = async (ctx: DocumentContext) => {
  return Document.getInitialProps(ctx);
};
export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          type="image/png"
          sizes="96x96"
          rel="icon"
          href="/icons8-spa-flower-96.png"
        />

        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />

        {/* add your own app-icon */}
        {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link rel="icon" href="/app-icon.png" /> */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
