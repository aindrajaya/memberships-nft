import '../styles/globals.css'
import Head from 'next/head'
// Import thirdweb provider and Rinkeby ChainId
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Sepolia;


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <html lang="en" />
        <meta charset="utf-8" />
        <title>Artopologi Membership</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="favicon.png" />
        

        <meta name="title" content="Artopologi Membership" />
        <meta
          name="description"
          content="Artopologi Membership"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Aindrajaya" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artopologi.com" />
        <meta property="og:title" content="Artopologi Membership" />
        <meta
          property="og:description"
          content="Artopologi Membership"
        />
        <meta property="og:image" content="https://web.com/thumb.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://web.com" />
        <meta property="twitter:title" content="Artopologi Membership" />
        <meta
          property="twitter:description"
          content="Artopologi Membership"
        />
        <meta
          property="twitter:image"
          content="https://web.com/thumb.png"
        />

      
      </Head>
<div>
<ThirdwebProvider activeChain="sepolia" clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
      <Component {...pageProps} />
      </ThirdwebProvider>
</div>
    </div>);
}

export default MyApp