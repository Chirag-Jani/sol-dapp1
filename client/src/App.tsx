import { useEffect, useState } from "react";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import idl from "./idl/init.json";
import { AnchorProvider, Program } from "@project-serum/anchor";

const rpcUrl = clusterApiUrl("testnet");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rpcConnection = new Connection(rpcUrl, {
  commitment: "confirmed",
});

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectPhantom = async () => {
    try {
      const solana = window.solana;
      const walletConection = await solana.connect();
      setWalletAddress(walletConection.publicKey.toString());

      const usebalance = await rpcConnection.getBalance(
        new PublicKey(walletConection.publicKey.toString())
      );
      console.log("User's balance is: ", usebalance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.log("Some Error Occured: ", error);
    }
  };

  const readContract = async () => {
    try {
      //
      const programId = new PublicKey(idl.metadata.address);

      const provider = new AnchorProvider(rpcConnection, window.solana, {
        commitment: "finalized",
      });

      const program = new Program(idl, programId, provider);

      const val = await program.methods.initialize().rpc();

      console.log("Value is: ", val);
    } catch (error) {
      console.log("Error Calling Program Method: ", error);
    }
  };

  useEffect(() => {
    connectPhantom();
  });

  return (
    <>
      <h1>Hello World</h1>
      <p>{walletAddress}</p>
      <button onClick={readContract}>Helo</button>
    </>
  );
}

export default App;
