---
ID: 15963
post_title: >
  奋进社 Chinese Professional
  Mentorship
author: admin
post_excerpt: ""
layout: post
permalink: 'http://nextgenius.com.au/index.php/%e5%a5%8b%e8%bf%9b%e7%a4%be-chinese-professional-mentorship/'
published: true
post_date: 2018-02-08 23:52:25
---
<script src="http://rawgit.com/ethereum/web3.js/0.16.0/dist/web3.min.js"><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span></script>
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
			var amount = 20000;
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

奋进社 is striving to build an ecosystem for Chinese professionals in Australia to support each other for better career development. We have weekly online catch ups to discuss popular career development related topics. We also offer one on one mentoring program to students, graduate and young professionals.
<p class="p1">7 years plus banking experience across customer service, change management, and project management. Serviced in multiple teams within the Australian headquarters of a global financial institution. Have an extensive mentoring experience focused on graduates and young professionals to help them get clarity for their career.</p>
<!-- Calendly link widget begin -->
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript"></script>
<a>Schedule time with me</a>
<!-- Calendly link widget end -->

&nbsp;
<div>
<div>Your Wallet Address: <span id="accountAddr"></span></div>
<div>Contract Address: <span id="contractAddr"></span> (NGC)</div>
<div>Amount: 20000 NGC per 30 minutes</div>
<button id="buy" class="transferFunds">Book Now</button>

Please schedule the time slot above and send your token transaction id to info@nextgenius.com.au, thanks!

</div>