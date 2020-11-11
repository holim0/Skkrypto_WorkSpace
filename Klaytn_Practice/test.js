// test.js
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

async function testFunction() {
    // Add a keyring to caver.wallet

    const private_key =
        "8d7b30525c2c85ec1c78850d0fc96a524aaaa2a0e183f2f14c938b626e9f2cfc";
    const keyring = caver.wallet.keyring.createFromPrivateKey(
        `0x${private_key}`
    );
    caver.wallet.add(keyring);

    // Create a value transfer transaction
    const valueTransfer = new caver.transaction.valueTransfer({
        from: keyring.address,
        to: "0x176ff0344de49c04be577a3512b6991507647f72",
        value: 1,
        gas: 30000,
    });

    // Sign the transaction via caver.wallet.sign
    await caver.wallet.sign(keyring.address, valueTransfer);

    const rlpEncoded = valueTransfer.getRLPEncoding();
    console.log(`RLP-encoded string: ${rlpEncoded}`);
}

testFunction();
