import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { routeItem } from "../../interfaces/app.interfaces";
import RouteItemComponent from "../ToolebarRouteItem/ToolbarRouteItem";

const Toolbar: React.FC = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
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
        method: 'eth_requestAccounts',
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

  const [routes] = useState<routeItem[]>([
    {
      text: "Create",
      path: "/create",
    },
    {
      text: "Market Place",
      path: "/market-place",
    },
    {
      text: "Analytics",
      path: "/analytics",
    },
  ]);

  return (
    <nav className="bg-black h-14 flex items-center">
      <div className="container w-full mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl text-4xl text-blue-500">
              Linkd
            </span>
          </div>
          <div className="flex">
            {routes.map((route) => (
              <RouteItemComponent key={route.text} {...route} />
            ))}
          </div>
          <div className="App-header text-white">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <button className="bg-blue-600 px-3 py-1 rounded-md">
                    {accountAddress.slice(0, 3)}
                    ...
                    {accountAddress.slice(39, 42)}{' '}
                    (Balance: {accountBalance.slice(0, 3)})
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

        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
