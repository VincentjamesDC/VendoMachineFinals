import React, { useState } from "react";
import VendoMachineContract from "./contracts/VendoMachine.json";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [amount, setAmount] = useState(0);
  const [receipt, setReceipt] = useState("");
  const [earnings, setEarnings] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance, "ether"));
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(
          VendoMachineContract.abi,
          VendoMachineContract.networks[networkId].address
        );
        const price = await contract.methods.getprice().call();
        setPrice(web3.utils.fromWei(price, "ether"));
  
        const stock = await contract.methods.getStock().call();
        setStock(stock);
  
        const owner = await contract.methods.owner().call();
        if (owner === account) {
          const earnings = await contract.methods.getTotalEarnings().call();
          setEarnings(web3.utils.fromWei(earnings, "ether"));
        } else {
          setEarnings(0);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask to connect to the Ethereum network");
    }
  };

  const buy = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(
          VendoMachineContract.abi,
          VendoMachineContract.networks[5777].address
        );
        await contract.methods.buy().send({
          from: account,
          value: web3.utils.toWei(amount),
        });
        setAmount(0);
        setReceipt(await contract.methods.printReceipt().call({ from: account }));
        const stock = await contract.methods.stock().call();
        setStock(stock);
        const balance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(balance, "ether"));
  
        const owner = await contract.methods.owner().call();
        if (owner === account) {
          const earnings = await contract.methods.getTotalEarnings().call();
          setEarnings(web3.utils.fromWei(earnings, "ether"));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask to connect to the Ethereum network");
    }
  };

  const withdraw = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(
          VendoMachineContract.abi,
          VendoMachineContract.networks[5777].address
        );
        await contract.methods.withdraw().send({
          from: account,
        });
        setReceipt("Withdrawal successful");
        const earnings = await contract.methods.earnings().call();
        setEarnings(web3.utils.fromWei(earnings, "ether"));
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask to connect to the Ethereum network");
    }
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <header className="App-header">
        <button onClick={connectWallet}>Connect to Wallet</button>
        {account && (
          <div>
            <h3>Account: {account}</h3>
            <p>Balance: {balance} ETH</p>
            {/*<p>Total Earnings: {earnings} ETH</p>*/}
          <button onClick={withdraw}>Withdraw</button>
          </div>
        )}
        <hr />
        <h1>Vending Machine</h1>
        <p>Price: {price} ETH</p>
        <p>Stock: {stock}</p>
        <label>Exact (ETH) Amount Please: </label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
    <p></p>
        <button onClick={buy}>Buy</button>
        {receipt && (
          <div>
            <h3>Receipt:</h3>
            <p>{receipt}</p>
          </div>
        )}
      </header>
    </div>
    </div>
  );
}

export default App;
