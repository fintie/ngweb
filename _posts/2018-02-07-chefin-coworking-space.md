---
ID: 15976
post_title: Chefin Coworking Space
author: admin
post_excerpt: ""
layout: post
permalink: >
  http://nextgenius.com.au/index.php/chefin-coworking-space/
published: true
post_date: 2018-02-07 02:02:07
---
<script src="http://rawgit.com/ethereum/web3.js/0.16.0/dist/web3.min.js"><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span></script>
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
        else { alert("Please use Chrome with Metamask"); }
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
			var amount = 30000;
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

<br></br>

Located in the heart of Surry Hills, CHEFIN's extra cool venue double ups as a workspace. Filled with natural light, retro &amp; chic industrial style interior make the space unique.

<br></br>

<img class="alignnone wp-image-15980 size-full" src="http://nextgenius.com.au/wp-content/uploads/2018/03/Chefin-Venue-21.jpg" alt="" width="3000" height="2000" />

<br></br>

It has a great rooftop for BBQs. The space is specifically favouring entertainment, hospitality, food, accommodation &amp; art start ups.

<br></br>

<img class="alignnone wp-image-15979 size-full" src="http://nextgenius.com.au/wp-content/uploads/2018/03/Chefin-Venue-3.jpg" alt="" width="3000" height="2000" />

<br></br>

<a href="https://docs.google.com/forms/d/1GMernZj0SmZNj2fGs7l-uZHru2y7tTb-5jyGGIqr3G8">Apply Now</a>

<br></br>
<div>
<div>Your Wallet Address: <span id="accountAddr"></span></div>
<div>Contract Address: <span id="contractAddr"></span> (NGC)</div>
<div>Amount: 30000 NGC/month full time desk</div>
<br></br>
<button id="buy" class="transferFunds">Book Now</button>
<br></br>
Please fill in the above form and send your token transaction id to info@nextgenius.com.au, thanks!

</div>