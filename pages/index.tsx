import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNFTDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const contract = useNFTDrop("0xf96e461a89aaF3bD5E8Df7Ed1d67DE1Eb1C9f472");
  const { address, status } = useAccount();

  const claim = async () => {
    try {
      if (contract) {
        await contract.claim(1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (status === "connecting" || status === "reconnecting") {
    return null;
  }

  return (
    <div className={styles.container}>
      <ConnectButton />
      {address ? (
        <button onClick={claim}>Claim</button>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
};

export default Home;
