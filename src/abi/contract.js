import Web3 from 'web3';
import contractAbi from "../contracts/VendoMachine.json";

const web3 = new Web3(window.ethereum);
const contractAddress = '0x4bF92a4eC5DD63AF997741E481a997e2dd113519'; // replace with your contract address everytime you change something in the .sol file;
const myContract = new web3.eth.Contract(contractAbi.abi, contractAddress);

export default myContract;