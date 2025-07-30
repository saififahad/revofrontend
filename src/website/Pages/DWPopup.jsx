import React, { useState } from "react";
import "../Styles/DWPopup.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { postData } from "./../../api/ClientFunction";
import Web3 from "web3";
import { mutate } from "swr";
import Swal from "sweetalert2";

const networks = {
  // nexa: {
  //   chainId: "0x2341",
  //   chainName: "Nexa Blockchain",
  //   nativeCurrency: {
  //     name: "NEXB",
  //     symbol: "NEXB",
  //     decimals: 18,
  //   },
  //   rpCurls: ["https://rpc-nodes-sigma.nexablockscan.io"],
  //   blockExplorerUrls: ["https://nexablockscan.io"],
  //   tokenAddress: "0x94651A5a28D43569bDA103F38f4F27aBb8499BcB", // NXBT Token Address
  // },
  bep20: {
    chainId: "0x38", // Hexadecimal for 56
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpCurls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
    tokenAddress: "0x55d398326f99059fF775485246999027B3197955", // USDT Token Address on BSC
  },
  erc20: {
    chainId: "0x1", // Hexadecimal for 1
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpCurls: ["https://ethereum.publicnode.com"],
    blockExplorerUrls: ["https://etherscan.io"],
    tokenAddress: "0x78365433F897F1303f6c7D8a3fbe3D6dae984C68", // REV Token Address on Etherscan// REV Token Address on Etherscan
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

const erc20Abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

function isChrome() {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  );
}

const DWPopup = ({ isOpen, onClose, title, Cur, setIsProcessing, account }) => {
  const [number, setNumber] = useState("");
  const { user } = useAuth();
  console.log(number);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumber(value);
  };

  const handleReset = () => {
    setNumber("");
  };

  const multipliedValue = number
    ? Cur.toUpperCase() === "REV"
      ? user.rev * number
      : user.usdt * number
    : 0;
  const dividedValue = number
    ? Cur.toUpperCase() === "REV"
      ? number / user.rev
      : number / user.usdt
    : 0;

  if (!isOpen) return null;

  const withdrawToken = async (amountWithdraw) => {
    if (!amountWithdraw || !account || amountWithdraw < 0) {
      toast.error("Invalid Input");
      return;
    }

    if (user?.money < Number(number)) {
      toast.error(
        `Not enough balance you can only withdraw` + " " + user?.money
      );
      return;
    }

    // if (user?.money < 50) {
    //   toast.error("You don't have enough balance to withdraw");
    //   return;
    // }

    const points =
      Cur === "REV"
        ? Number(amountWithdraw) * user?.rev
        : Number(amountWithdraw) * user?.usdt;

    // if (user?.money < points) {
    //   console.log(user?.money, "money");
    //   console.log(points, "points");
    //   return toast.error("Insuffcient Funds");
    // }
    if (user?.mwa > points) {
      return toast.error(`Minimum Withdraw Amount is ${user?.mwa} USD`);
    }
    if (!points) {
      return toast.warning("Points Can't be zero");
    }

    try {
      setIsProcessing(true);
      const res = await postData("/user/withdrawfunds", {
        amount: Number(number),
        type: "w",
        cur: Cur.toUpperCase(),
        sender: user?.address,
        receiver: account,
        points,
        name_user: user?.name_user,
        phone: user?.phone,
      });
      if (res.success || res.status) {
        toast.success(res.message || "Funds Withdrawn");
        // Swal.fire(
        //   "Withdrawal Successful!",
        //   "Your funds have been successfully withdrawn. You can now open the game in your default browser.",
        //   "success"
        // );

        setIsProcessing(false);
        mutate("/user/getUserInfo");
        onClose();
      }
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      toast.error(
        "Something Went Wrong!, Please check your network and token configuration."
      );
      setIsProcessing(false);
    }
  };
  const web3 = new Web3(window.ethereum);

  // =========test function ==========
  // const test = async () => {};

  //======== Deposit Token ========
  const depositToken = async (amount) => {
    console.log(amount, "amount line 421");
    if (!amount || !account || amount < 0) {
      toast.error("Invalid Input");
      return;
    }

    const networkData = networks[Cur === "usdt" ? "bep20" : "erc20"];
    console.log(networkData, "networkdata line 428");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(erc20Abi, networkData.tokenAddress);
    console.log(networkData.tokenAddress, "line 431");
    const amountInSmallestUnit = web3.utils.toWei(amount, "ether");
    const points =
      Cur === "REV"
        ? Number(amount) * (user?.rev || 0)
        : Number(amount) * (user?.usdt || 0);
    if (points < user?.mda) {
      return toast.warning(`Minimum deposit Amount is ${user?.mda} USD`);
    }
    // const gasPrice = await web3.eth.getGasPrice();
    // const gas = await contract.methods
    //   .transfer(user?.address, web3.utils.toWei(amount, "ether"))
    //   .estimateGas({ from: account });

    // const gasPrice = web3.utils.toWei("25", "gwei");
    let gasPrice = await web3.eth.getGasPrice();

    try {
      setIsProcessing(true);
      // const txParams = {
      //   to: networkData.tokenAddress,
      //   from: account,
      //   data: contract.methods
      //     .transfer(user?.address, amountInSmallestUnit)
      //     .encodeABI(),
      //   chainId: parseInt(networkData.chainId, 16),
      //   gasPrice,
      //   gas: 200000,
      // };
      // console.log(txParams, "txParams");
      // const receipt = await web3.eth.sendTransaction(txParams);
      // console.log(receipt, "reciept");

      const contract = new web3.eth.Contract(
        erc20Abi,
        networkData.tokenAddress
      );

      const receipt = await contract.methods
        .transfer(user?.address, amountInSmallestUnit)
        .send({ from: account });
      console.log(receipt);

      if (receipt.status) {
        const res = await postData("/user/depositfunds", {
          cur: Cur.toUpperCase(),
          points,
          type: "d",
          sender: account,
          receiver: user?.address,
          name_user: user?.name_user,
          phone: user?.phone,
          token: amount,
        });
        if (res.success || res.status) {
          toast.success(res.message || "Funds Successfull Deposited");
          // Swal.fire(
          //   "Deposit Successful!",
          //   "Your funds have been successfully deposited. You can now open the game in your default browser.",
          //   "success"
          // );

          mutate("/user/getUserInfo");
          onClose();
        }
      } else {
        toast.error("Transfer Failed: Transaction was reverted or failed");
      }
      setIsProcessing(false);
    } catch (error) {
      if (error?.data?.code == 3) {
        return toast.error(
          "Insufficient Gas or Token Amount, Please recharge Your Account"
        );
      } else if (
        error?.message ===
        "Returned error: MetaMask Tx Signature: User denied transaction signature."
      ) {
        return toast.warning(
          "You have declined the transaction, Please check and retry the transaction"
        );
      }
      toast.error("Please check Your Balance or Token/Network");
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
  };

  // console.log(user.rev);

  return (
    <div className={`popup-parent ${isOpen ? "" : "hidden"}`}>
      <div className="popup-container">
        <div className="popup-heading">
          <icon>
            <IoMdArrowRoundBack onClick={onClose} />
          </icon>
          <h2>
            {title} {Cur.toUpperCase()}
          </h2>
        </div>
        <div className="price-part">
          <h1>Price ${Cur.toUpperCase() === "REV" ? user?.rev : user?.usdt}</h1>
        </div>
        <div className="popup-child-part">
          <div className="input-field-popup">
            <input
              type="number"
              className="field-part-popup"
              value={number}
              onChange={handleInputChange}
            />
            <input
              type="reset"
              value="X"
              onClick={handleReset}
              className="clear-btn"
            />
            <span className="Cur-span">
              {title.toLowerCase() === "withdraw" ? "USD" : Cur.toUpperCase()}
            </span>
          </div>
          <div className="Amount-det">
            <div className="total-Quantity">
              <h1>Total Quantity</h1>
              <h3>
                {number}{" "}
                {title.toLowerCase() === "withdraw" ? "USD" : Cur.toUpperCase()}
              </h3>
            </div>
            <div className="total-Quantity">
              <h1>
                {title.toLowerCase() === "withdraw"
                  ? "You Will Get"
                  : "Flat Amount"}
              </h1>
              <h3>
                {title.toLowerCase() === "withdraw"
                  ? Cur.toUpperCase() === "REV"
                    ? "REV"
                    : "USDT"
                  : "USD"}{" "}
                {title.toLowerCase() === "withdraw"
                  ? dividedValue.toFixed(6)
                  : multipliedValue.toFixed(6)}
              </h3>
            </div>
            {/* <button
              className="DW-btn"
              onClick={() => {
                test();
              }}
            >
              revcoin
            </button> */}
            <div className="DW-button">
              <button
                className="DW-btn"
                onClick={() => {
                  const value =
                    title.toLowerCase() === "withdraw"
                      ? dividedValue.toFixed(6)
                      : multipliedValue.toFixed(6);
                  title.toLowerCase() === "withdraw"
                    ? withdrawToken(value)
                    : depositToken(number);
                }}
              >
                {title} {Cur.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DWPopup;
