import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { userDetailsState } from "../../state";
import { useRecoilState } from "recoil";
import { Preview } from "@mui/icons-material";

const ConnectWalletButton: React.FC = () => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const [haveMetamask, sethaveMetamask] = useState(true);

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
      setUserDetails((data) => ({
        ...data,
        walletAddress: accounts[0],
        accountBalance: bal,
        isConnected: true,
      }));
    } catch (error) {
      setUserDetails((data) => ({
        ...data,
        isConnected: false,
      }));
    }
  };

  return (
    <div className="App-header text-white">
      {haveMetamask ? (
        <div className="App-header">
          {userDetails.isConnected ? (
            <div className="card">
              <div className="card-row">
                <p className="bg-blue-600 px-3 py-1 rounded-md text-white">
                  {userDetails.walletAddress.slice(0, 5)}
                  ...
                  {userDetails.walletAddress.slice(
                    userDetails.walletAddress.length - 3,
                    userDetails.walletAddress.length
                  )}{" "}
                  (Balance: {userDetails.accountBalance.slice(0, 3)})
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

export { ConnectWalletButton };
