import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const Wallet: React.FC = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // @ts-ignore
  const { ethereum } = window;
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="App-header text-white">
      {haveMetamask ? (
        <div className="App-header">
          {isConnected ? (
            <div className="card">
              <div className="card-row">
                <button className="bg-blue-600 px-3 py-1 rounded-md">
                  {accountAddress.slice(0, 5)}
                  ...
                  {accountAddress.slice(accountAddress.length-6, accountAddress.length)} (Balance:{" "}
                  {accountBalance.slice(0, 3)})
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-600 px-3 py-1 rounded-md"
            >
              Connect Wallet
            </button>
          )}
        </div>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </div>
  );
};

export default Wallet;
