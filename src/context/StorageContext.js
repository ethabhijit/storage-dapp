import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import Storage from "../artifacts/contracts/Storage.sol/Storage.json";
import { CONTRACT_ADDRESS } from "../backend";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [eth, setEth] = useState(null);
  const [dataValue, setDataValue] = useState("");
  const [loading, setLoading] = useState(false);

  // connect Metamask
  const connectWallet = async () => {
    const metamask = eth;
    try {
      if (!metamask) return alert("Please install metamask");

      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object found.");
    }
  };

  // Checks if MetaMask is installed and an account is connected
  const checkIfWalletIsConnected = async () => {
    const metamask = eth;
    try {
      if (!metamask) return alert("Please install metamask");

      const accounts = await metamask.request({ method: "eth_accounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object found.");
    }
  };

  // get data
  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      Storage.abi,
      provider
    );

    try {
      setLoading(true);
      const data = await contract.get();
      setLoading(false);
      setDataValue(data.toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  // set data
  const setData = async (value) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, Storage.abi, signer);

    setLoading(true);

    const transaction = await contract.set(value);
    await transaction.wait();
    setLoading(false);

    getData();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEth(window.ethereum);
    }
  }, [window]);

  useEffect(() => {
    if (eth) {
      checkIfWalletIsConnected();
    }
  }, [eth]);

  useEffect(() => {
    if (currentAccount) {
      getData();
    }
  }, [currentAccount]);

  return (
    <StorageContext.Provider
      value={{
        connectWallet,
        currentAccount,
        dataValue,
        setData,
        loading
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
