import '../styles/globals.css'
// Import thirdweb provider and Rinkeby ChainId
import { ThirdwebProvider } from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ThirdwebProvider activeChain="sepolia" clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </div>
  );
}

export default MyApp