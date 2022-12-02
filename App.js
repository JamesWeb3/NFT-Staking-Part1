import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const ABI = [
	[
    {
      "inputs": [
        {
          "internalType": "contract Collection",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "contract N2DRewards",
          "name": "_token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Claimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "NFTStaked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "NFTUnstaked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "claimForAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "earningInfo",
      "outputs": [
        {
          "internalType": "uint256[2]",
          "name": "info",
          "type": "uint256[2]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "tokensOfOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "ownerTokens",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "unstake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "vault",
      "outputs": [
        {
          "internalType": "uint24",
          "name": "tokenId",
          "type": "uint24"
        },
        {
          "internalType": "uint48",
          "name": "timestamp",
          "type": "uint48"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
]

const VAULTABI = [
  [
    {
      "inputs": [
        {
          "internalType": "contract Collection",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "contract N2DRewards",
          "name": "_token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Claimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "NFTStaked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "NFTUnstaked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "claimForAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "earningInfo",
      "outputs": [
        {
          "internalType": "uint256[2]",
          "name": "info",
          "type": "uint256[2]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "tokensOfOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "ownerTokens",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "unstake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "vault",
      "outputs": [
        {
          "internalType": "uint24",
          "name": "tokenId",
          "type": "uint24"
        },
        {
          "internalType": "uint48",
          "name": "timestamp",
          "type": "uint48"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

]
	
var account = null;
var contract = null;
var vaultcontract = null;


const NFTCONTRACT = "0x8DaA4CcE5ACDbEd2E7bf32249f2a7e1C0Bd80c14"; //contract for the collection.sol
const STAKINGCONTRACT = "0x9E456754e3bFD18ac8e393c0E9e724246404028E" //contract for the Staking contract.sol
const apikey = "SDN967229SW1ZPW6SSIRRNPDKCMR96231R"; //Etherscan API Key
const endpoint = "https://api-goerli.etherscan.io/api"
const nftpng = "https://ipfs.io/ipfs/QmQ142siBRH3jEgw58GR6zUwptjrm88XhMvTu5kvjyNm8U/"; //IPFS CID

const providerOptions = {
	binancechainwallet: {
		package: true
	  },
	  walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "8b905c20e69447faad6e68815e576140" //Infura API Key
		}
	},
	walletlink: {
		package: WalletLink, 
		options: {
		  appName: "Net2Dev NFT Minter", 
		  infuraId: "8b905c20e69447faad6e68815e576140", //Infura API Key
		  rpc: "", 
		  chainId: 4, 
		  appLogoUrl: null, 
		  darkMode: true 
		}
	  },
};

const web3Modal = new Web3Modal({
	network: "goerli",
	theme: "dark",
	cacheProvider: true,
	providerOptions 
  });

//here begins all the frontend logic
async function connectwallet() { 
      var provider = await web3Modal.connect();
      var web3 = new Web3(provider); 
      await provider.send('eth_requestAccounts'); 
      var accounts = await web3.eth.getAccounts(); 
      account = accounts[0]; 
      document.getElementById('wallet-address').textContent = account; 
      contract = new web3.eth.Contract(ABI, NFTCONTRACT); //This is the line saying to interact with our NFTContract and the ABI
	  vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT); //This is the line to interact with our Staking contract and staking contract ABI.
} //we are storing all this information in  .Contract

async function mint() {
        var _mintAmount = Number(document.querySelector("[name=amount]").value); 
        var mintRate = Number(await contract.methods.cost().call()); 
        var totalAmount = mintRate * _mintAmount; 
      contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); //we are calling to the .methods.mint
    } 

async function stakeit() {
	var tokenids = Number(document.querySelector("[name=stkid]").value); //Here we are taking the tokenids variable and storing a number that will be pulled from a field that we invoke in HTML. stkid (stakeid) is the name we made up. Make sure to put it in brackets as the smart contract is expecting an array.
	vaultcontract.methods.stake([tokenids]).send({from: account}); //You can use remix to help you wiht this. E.g for the function stake in remix what does it expect .... tokenID
}

async function unstakeit() {
	var tokenids = Number(document.querySelector("[name=stkid]").value); 
	vaultcontract.methods.unstake([tokenids]).send({from: account});
}

async function claimit() {
	var tokenids = Number(document.querySelector("[name=claimid]").value);
	vaultcontract.methods.claim([tokenids]).send({from: account});
}


async function verify() {
	var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
	document.getElementById('stakedbalance').textContent = getbalance; 
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			nftdata: [],
		};
	}

	async componentDidMount() {
		
		await axios.get((endpoint + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${apikey}`))
		.then(outputa => {
            this.setState({
                balance:outputa.data
            })
            console.log(outputa.data)
        })

		await axios.get((endpoint + `?module=account&action=tokennfttx&contractaddress=${NFTCONTRACT}&page=1&offset=100&tag=latest&apikey=${apikey}`))
		.then(outputb => {
			const { result } = outputb.data
            this.setState({
                nftdata:result
            })
            console.log(outputb.data)
        })
	}
  
  render() {
	const {balance} = this.state;
	const {nftdata} = this.state;

    return (
      <div className="App">
        <Button onClick={connectwallet} style={{ marginBottom: "5px", marginTop: "5px", color: "#FFFFFF" }}>Connect Wallet</Button>
        <div className='container'>
          <div className='row'>
            <form class="gradient col-lg-5 mt-5" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #000000", marginRight: "5px" }}>
              <h4 style={{ color: "#FFFFFF" }}>Mint Portal</h4>
              <h5 style={{ color: "#FFFFFF" }}>Please connect your wallet</h5>

              <div class="card" id='wallet-address' style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                <label for="floatingInput">Wallet Address</label>
              </div>
              <div class="card" style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                <input type="number" name="amount" defaultValue="1" min="1" max="5" />
                <label >Please select the amount of NFTs to mint.</label>
                <Button onClick={mint}>Buy/Mint!</Button>
              </div>
              <label style={{ color: "#FFFFFF" }}>Price 0.05 ETH each mint.</label>
              <h5 style={{ color: "white", textShadow: "1px 1px 3px #000000" }}> Tokens Minted so far= {balance.result}/1000</h5>
            </form>
            <form class="gradient col-lg-3 mt-5 mr-3" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #000000", marginRight: "5px" }}>
              <h4 style={{ color: "#FFFFFF" }}>Staking Vault</h4>
              <h5 style={{ color: "#FFFFFF" }}>Please connect your wallet</h5>
              <div class="card" style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                <input type="number" name="stkid" />
                <label >Input NFT ID</label>
                <Button onClick={stakeit}>STAKE</Button>
                <Button onClick={unstakeit}>UNSTAKE</Button>
              </div>
            </form>
            <form class="gradient col-lg-3 mt-5" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #000000", marginRight: "5px" }}>
              <h4 style={{ color: "#FFFFFF" }}>NFT Vault Options</h4>
              <h5 style={{ color: "#FFFFFF" }}>Verify Amount Staked</h5>
              <Button onClick={verify}>Verify</Button>
              <div class="card" id='stakedbalance' style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                <label for="floatingInput">NFT Balance</label>
              </div>
              <div class="card" style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                <input type="number" name="claimid" />
                <label >Input NFT ID</label>
                <Button onClick={claimit}>Claim Rewards</Button>
              </div>
            </form>
            <div className="row items mt-3">
              <div className="ml-3 mr-3" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4, 5fr)", columnGap: "10px" }}>
                {nftdata.map(result => {
                  return (
                    <div className="card">
                      <div className="image-over">
                        <img className="card-img-top" src={nftpng + result.tokenID + '.png'} alt="" />
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <h5 className="mb-0">Net2Dev Collection NFT #{result.tokenID}</h5>
                          <h5 className="mb-0 mt-2">Owner Wallet:<p style={{ color: "#39FF14", fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}>{result.to}</p></h5>
                          <div className="card-bottom d-flex justify-content-between">
                            <Button className="btn btn-bordered-white btn-smaller mt-3">
                              <i className="mr-2" />Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default App;