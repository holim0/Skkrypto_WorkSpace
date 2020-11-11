// test.js
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

async function testFunction() {
    // Add a keyring to caver.wallet
    const abi = [
        {
            inputs: [{ internalType: "string", name: "key", type: "string" }],
            name: "get",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "string", name: "key", type: "string" },
                { internalType: "string", name: "value", type: "string" },
            ],
            name: "set",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const contractInstance = new caver.contract(abi);
    console.log(contractInstance);
    console.log(contractInstance.options.address);
}

testFunction();
