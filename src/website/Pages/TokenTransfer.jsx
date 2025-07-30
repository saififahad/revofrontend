import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./../Styles/TokenTransfer.css";
import DWPopup from "./DWPopup";
import { useAuth } from "../../context/AuthContext";

const networks = {
  // nexa: {
  //   chainId: "0x2341",
  //   chainName: "Nexa Blockchain",
  //   nativeCurrency: {
  //     name: "NEXA",
  //     symbol: "NXBT",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rpc-nodes-sigma.nexablockscan.io"],
  //   blockExplorerUrls: ["https://nexablockscan.io"],
  //   tokenAddress: "0x94651A5a28D43569bDA103F38f4F27aBb8499BcB",
  // },
  bep20: {
    chainId: "0x38", // Hexadecimal for 56
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
    tokenAddress: "0x55d398326f99059fF775485246999027B3197955",
  },
  erc20: {
    chainId: "0x1", // Hexadecimal for 1
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum.publicnode.com"],
    blockExplorerUrls: ["https://etherscan.io"],
    tokenAddress: "0x78365433F897F1303f6c7D8a3fbe3D6dae984C68", // REV Token Address on Etherscan
  },
  // erc20: {
  //   chainId: "0x61", // Hexadecimal for 1
  //   chainName: "Ethereum",
  //   nativeCurrency: {
  //     name: "Ether",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpCurls: ["https://bsc-testnet-rpc.publicnode.com/"],
  //   blockExplorerUrls: ["https://etherscan.io"],
  //   tokenAddress: import.meta.env.REV_TOKEN_SECRET_KEY, // REV Token Address on Etherscan
  // },
};

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const TokenTransfer = () => {
  const [account, setAccount] = useState(null);
  const { user } = useAuth();

  const [show, setShow] = useState(false);
  const [PopupTitle, SetPopupTitle] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedToken, setSelectedToken] = useState("REV");

  useEffect(() => {
    if (selectedToken) {
      changeNetwork(selectedToken === "usdt" ? "bep20" : "erc20");
    }
  }, [selectedToken]);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
        toast.error(
          "MetaMask connection error. Make sure MetaMask is installed."
        );
      }
    } else if (isMobileDevice()) {
      const token = localStorage.getItem("token");
      const dappUrl = `${window.location.href}?token=${token}`;
      const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
      window.location.href = metamaskAppDeepLink;
    } else {
      toast.error("MetaMask is not installed.");
    }
  };

  // const changeNetwork = async (networkKey) => {
  //   const networkData = networks[networkKey];
  //   try {
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: networkData.chainId }],
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const changeNetwork = async (networkKey) => {
    const networkData = networks[networkKey];
    if (!networkData) {
      toast.error("Network data not found for the selected token.");
      return;
    }

    try {
      // Try switching to the desired network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkData.chainId }],
      });
    } catch (error) {
      // If the network is not added, try adding it
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: networkData.chainId,
                chainName: networkData.chainName,
                nativeCurrency: networkData.nativeCurrency,
                rpcUrls: networkData.rpcUrls,
                blockExplorerUrls: networkData.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding network:", addError);
          toast.error("Failed to add network. Please try again.");
        }
      } else {
        console.error("Error switching network:", error);
        toast.error("Failed to switch network. Please try again.");
      }
    }
  };

  const showHandler = (title) => {
    setShow(true);
    SetPopupTitle(title);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div id="root">
      <div className="my-wallet">
        <div className="current-bal">
          <div className="current-bal-child">
            <h1>Deposit Wallet (USD)</h1>
            <span className="points">{user?.deposit}</span>
          </div>
          <div className="current-bal-child">
            <h1>Earning Wallet (USD)</h1>
            <span className="points">{user?.money}</span>
          </div>
          <div className="account-details-part">
            Account Details: <br />
            <p className="acc-det">{account}</p>
          </div>

          {!account && (
            <button onClick={connectMetaMask} className="wall-btn ">
              Connect
            </button>
          )}
        </div>
        {account && (
          <div className="meta-part">
            <select
              onChange={(e) => {
                setSelectedToken(e.target.value);
              }}
              value={selectedToken}
              className="token-select"
            >
              {/* <option value="NXBT" className="option-part">
                NXBT
              </option> */}
              <option value="rev" className="option-part">
                REV
              </option>
              <option value="usdt" className="option-part">
                USDT
              </option>
            </select>
            <div>
              <button
                className="wall-btn"
                onClick={() => showHandler("Withdraw")}
              >
                Withdraw
              </button>
              <button
                className="wall-btn"
                onClick={() => showHandler("Deposit")}
              >
                Deposit
              </button>
            </div>
            <DWPopup
              isOpen={show}
              onClose={handleClose}
              title={PopupTitle}
              Cur={selectedToken}
              setIsProcessing={setIsProcessing}
              account={account}
            />
          </div>
        )}
      </div>

      <div className={isProcessing ? "modal-overlay" : "hidden"}>
        <div className="modal-content">
          <h2>Processing Transfer</h2>
          <div className="loader">
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
          </div>
          <p>Please wait while your transaction is being processed.</p>
        </div>
      </div>
    </div>
  );
};

export default TokenTransfer;
