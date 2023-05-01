import Web3 from 'web3';
import contractAbi from "../contracts/VendoMachine.json";

const web3 = new Web3(window.ethereum);
const contractAddress = '0xe972d0C46040447129C855e98b7915c4fD07D9f4'; // replace with your contract address everytime you change something in the .sol file;
const myContract = new web3.eth.Contract(contractAbi.abi, contractAddress);

export default myContract;