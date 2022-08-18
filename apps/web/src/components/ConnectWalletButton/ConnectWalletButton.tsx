import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { currentWalletState } from "../../state";
import { useRecoilState } from "recoil";

const ConnectWalletButton: React.FC = () => {
  const [currentWallet, setCurrentWallet] = useRecoilState(currentWalletState);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // @ts-ignore
  const { ethereum } = window;

  // @ts-ignore
  let provider: Web3Provider;
  useEffect(() => {

    // @ts-ignore
    const { ethereum } = window;

    if (!ethereum) return;
    provider = new ethers.providers.Web3Provider(ethereum);


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
      setCurrentWallet(accounts[0]);
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
                <p className="bg-blue-600 px-3 py-1 rounded-md text-white">
                  {currentWallet.slice(0, 5)}
                  ...
                  {currentWallet.slice(currentWallet.length - 3, currentWallet.length)} (Balance:{" "}
                  {accountBalance.slice(0, 3)})
                </p>
              </div>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              color="secondary"
              variant="contained"
              size="small"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </div>
  );
};

export {
  ConnectWalletButton
};
