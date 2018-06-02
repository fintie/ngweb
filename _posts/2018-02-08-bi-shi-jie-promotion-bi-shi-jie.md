---
ID: 15859
post_title: BI SHI JIE Promotion
author: admin
post_excerpt: ""
layout: post
permalink: >
  http://nextgenius.com.au/index.php/bi-shi-jie-promotion-bi-shi-jie/
published: true
post_date: 2018-02-08 01:27:04
---
<script src="http://rawgit.com/ethereum/web3.js/0.16.0/dist/web3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ethjs@0.3.0/dist/ethjs.min.js"></script>
<script>
    const abi = [
	{
		"constant": true, "inputs": [], "name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,		"stateMutability": "view",		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fundsWallet",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "version",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "unitsOneEthCanBuy",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalEthInWei",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
]


    const contract_address = '0x97E0d16620A781b5FBd51054c67E955AB5D51A34';
	const toAccount = '0xea3Dd3cC5F4AF2b6adD5A6bCF77bc05d1C1800a0';


    $(document).ready(function(){
        if (typeof web3 !== 'undefined') { startApp(); } 
        else { alert("No hay web3"); }
    });

    function startApp(){


        web3 = new Web3(web3.currentProvider);
        const contract = web3.eth.contract(abi).at(contract_address);
		
		$("#contractAddr").text(contract_address);
		$("#toAddress").text(toAccount);

		contract.decimals.call(function(error, result){
			$("#decimals").text(result.toFixed());
		});
		



        ShowAccount();
		
		$("#buy").click(function(){
			var currentSelected = $("#accountAddr").text();
			var amount = 200000;
			var decimals= 0;
			fromaddress = currentSelected;
			toaddress = toAccount;
			TransferToken(contract, fromaddress, toaddress, amount, decimals);
		});
        

    }

    function ShowAccount(){
        web3.eth.getAccounts(function(err, accounts) { 
            console.log(accounts); 
            if (Array.isArray(accounts)){
                if (accounts.length==0){
                    alert("please login to your metamask");
                    return;
                }
                $("#accountAddr").text(accounts[0]);
            }
        });
    }

	function TransferToken(contract, fromaddress, toaddress, amount, decimal){
		var strNum = amount +'e+'+decimal;
		var realAmount = new web3.BigNumber(strNum);
		contract.transfer(toaddress, realAmount, {from: fromaddress}, 
				function(error, txHash){
					console.log('Transaction sent')
						console.dir(txHash)
						setInterval(function(){waitForTxToBeMined(txHash)}, 1000);
						
				})
	}

	function waitForTxToBeMined (txHash) {
		try {
				txReceipt = web3.eth.getTransactionReceipt(txHash, function(error, data){
				console.log("get transaction receipt");
			});
		} catch (err) {
			return setState(err);
		}
 		setState("token transfered");
	}

	function setState(msg){
		$("#state").text(msg);
	}
</script>

Blockchain and cryptocurrency news platform In China.

<br></br>

币世界<em>bishijie</em>.com，数字货币投资世界。致力于为比特币btc、比特现金bcc/bch、<wbr />莱特币ltc、以太坊eth等数字货币资产投资者提供及时、全面、专业、准确的币圈动态、币种实时行情、区块链行业新闻、区块链知识科普及交易平台（火币网、OK、币安等）攻略等，帮助大家了解区块链发展趋势及做出正确的投资决策。

<br></br>

<div>Your Wallet Address: <span id="accountAddr"></span></div>
<div>Contract Address: <span id="contractAddr"></span> (NGC)</div>
<div>Amount: 200000 NGC per month</div>
<br>
<button id="buy" class="transferFunds">Book Now</button>

</div>