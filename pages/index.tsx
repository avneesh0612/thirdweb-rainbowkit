import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContract, useNFTDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";
import { useAccount } from "wagmi";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data: contract } = useContract(
    "0xf96e461a89aaF3bD5E8Df7Ed1d67DE1Eb1C9f472",
    "nft-drop"
  );
  const { address, status } = useAccount();
  const [loading, setLoading] = useState(false);

  const claim = async () => {
    try {
      setLoading(true);
      if (contract) {
        await contract.claim(1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (status === "connecting" || status === "reconnecting") {
    return null;
  }

  return (
    <div className={styles.container}>
      <ConnectButton />
      {address ? (
        <button className={styles.button} onClick={claim} disabled={loading}>
          {loading ? "Claiming..." : "Claim"}
        </button>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
};

export default Home;
