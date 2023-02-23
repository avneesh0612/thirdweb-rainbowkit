import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";

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

function ThirdwebProvider({
  wagmiClient,
  children,
}: {
  wagmiClient: any;
  children: React.ReactNode;
}) {
  const { data: signer } = useSigner();

  return (
    <ThirdwebSDKProvider
      activeChain={ChainId.Mumbai}
      signer={signer as any}
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
