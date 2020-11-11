// test.js
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

async function testFunction() {
    // Add a keyring to caver.wallet
    const private_key =
        "0x9ac77e0d4bdb53502183b374de430ba57384edb094930ec2306d9183f6e498a2";

    let sender = caver.wallet.keyring.createFromPrivateKey(`${private_key}`);
    caver.wallet.add(sender);

    const newPrivateKey = caver.wallet.keyring.generateSingleKey();
    console.log(`new private key string: ${newPrivateKey}`);
    const newKeyring = caver.wallet.keyring.createWithSingleKey(
        sender.address,
        newPrivateKey
    );

    // create an Account instance
    const account = newKeyring.toAccount();

    const updateTx = new caver.transaction.accountUpdate({
        from: sender.address,
        account: account,
        gas: 50000,
    });
    await caver.wallet.sign(sender.address, updateTx);
    const receipt = await caver.rpc.klay.sendRawTransaction(updateTx);
    console.log(receipt);

    // Update the keyring in caver.wallet for signing afterward.
    sender = caver.wallet.updateKeyring(newKeyring);
}

testFunction();
