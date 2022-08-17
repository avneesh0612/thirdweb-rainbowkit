import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function ThirdwebProvider({ wagmiClient, children }: any) {
  const { data: signer } = useSigner();

  return (
    <ThirdwebSDKProvider
      desiredChainId={ChainId.Mumbai}
      signer={signer as any}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient as any}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <ThirdwebProvider wagmiClient={wagmiClient}>
          <Component {...pageProps} />
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
