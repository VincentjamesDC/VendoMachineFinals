// web3.js

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // connect to Ganache on localhost

export default web3;