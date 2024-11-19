import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="favicon.png" />
        <meta name="title" content="Artopologi Membership" />
        <meta name="description" content="Artopologi Membership" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Aindrajaya" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artopologi.com" />
        <meta property="og:title" content="Artopologi Membership" />
        <meta property="og:description" content="Artopologi Membership Website" />
        <meta property="og:image" content="https://cms.dailysocial.id/wp-content/uploads/2024/01/Screenshot-2024-01-09-at-08.43.57.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://x.com/artopologi" />
        <meta property="twitter:title" content="Artopologi Membership" />
        <meta property="twitter:description" content="Artopologi Membership Twitter" />
        <meta property="twitter:image" content="https://pbs.twimg.com/profile_images/1546134441168609280/FFeUevoc_400x400.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
