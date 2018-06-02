---
ID: 15799
post_title: Javascript
author: admin
post_excerpt: ""
layout: page
permalink: >
  http://nextgenius.com.au/index.php/javascript
published: true
post_date: 2018-03-17 12:42:54
---
<script src="http://rawgit.com/ethereum/web3.js/0.16.0/dist/web3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ethjs@0.3.0/dist/ethjs.min.js"></script>
<script>
    window.addEventListener('load', function() {
    // Check if Web3 has been injected by the browser:
    if (typeof web3 !== 'undefined') {
        // You have a web3 browser! Continue below!
        startApp(web3);
        //alert("Web3");
    } else {
        //alert("No hay web3");
        // Warn the user that they need to get a web3 browser
        // Or install MetaMask, maybe with a nice graphic.
    }
})
const abi = [{
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
    "type": "function"
}]
const contract_address = '0xf035755df96ad968a7ad52c968dbe86d52927f5b'
const etherValue = web3.toWei(10, 'ether');
var address = '0x91612055A68aD74A6e756615941Ac59e9220A940'
function startApp(web3) {
    //alert("entro");
    const eth = new Eth(web3.currentProvider)
    const token = eth.contract(abi).at(contract_address);
    listenForClicks(token,web3)
    //alert("llego");
}
function listenForClicks (miniToken, web3) {
    var button = document.querySelector('button.transferFunds')
    web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
    button.addEventListener('click', function() {
        miniToken.transfer(contract_address, '88888888888888888888', { from: address })
            .then(function (txHash) {
            console.log('Transaction sent')
            console.dir(txHash)
            waitForTxToBeMined(txHash)
        })
            .catch(console.error)
    })
}
async function waitForTxToBeMined (txHash) {
    let txReceipt
    while (!txReceipt) {
        try {
            txReceipt = await eth.getTransactionReceipt(txHash)
        } catch (err) {
            return indicateFailure(err)
        }
    }
    indicateSuccess()
}
</script>

<button class="transferFunds">Send Money!</button>