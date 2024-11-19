import '../styles/globals.css'
// Import thirdweb provider and Rinkeby ChainId
import { ThirdwebProvider } from '@thirdweb-dev/react';
import posthog from 'posthog-js';
import { PostHog } from 'posthog-js/react';

if (typeof window !== 'undefined') { // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <PostHogProvider client={posthog}>
        <ThirdwebProvider activeChain="sepolia" clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
          <Component {...pageProps} />
        </ThirdwebProvider>
      </PostHogProvider>
    </div>
  );
}

export default MyApp