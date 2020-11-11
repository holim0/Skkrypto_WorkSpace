# Klaytn Practice



#### 클레이튼 공식 문서를 참고하면서 실습해봤습니다. 부족하지만 조금이라도 도움이 되셨으면 좋겠습니다. 😃



#### caver-js 

- HTTP 또는 웹소켓 연결을 사용하여 Klaytn 노드와 상호작용할 수 있도록 하는 자바스크립트 API 라이브러리

- npm 이용 가능





```javascript
const Caver = require("caver-js");   // caver-js 모듈을 가지고 온다. 
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

async function testFunction() {
    const version = await caver.rpc.klay.getClientVersion();
    console.log(version);
}

testFunction();

```

</br></br>



#### KeyRing 관리

- KeyRing 은 address of the Klaytn account 과 private key(s) 를 포함하고 있습니다.

- keyring 을 가지고 오는 코드 예시입니다. 

```javascript
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

async function testFunction() {
    const keyring = caver.wallet.keyring.generate();
    console.log(keyring);
}

testFunction();
```



</br>



```js
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

async function testFunction() {
    // Create a keyring with an address and a private key
    const keyring = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
    console.log(keyring)

    // Create a keyring from a KlaytnWalletKey
    const keyringFromKlaytnWalletKey = caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
    console.log(keyringFromKlaytnWalletKey)
}

testFunction()
```

- Address 와 private_key 를 통해서 keyring 을 생성하거나 walletKey로도 생성이 가능합니다. 

</br>

:arrow_right: Klaytn baobab 에서 확인할 수 있습니다. 

<img width="1055" alt="스크린샷 2020-11-11 오후 10 37 29" src="https://user-images.githubusercontent.com/48006103/98818203-8f0e1780-246e-11eb-9da5-5da8cd057cbd.png">



</br></br>





#### caver-js에 Keyring 추가하기 



```js 
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

async function testFunction() {
    // Using a keyring instance
    const keyring = caver.wallet.keyring.generate();
    caver.wallet.add(keyring);
    console.log(caver.wallet.getKeyring(keyring.address));

    // Using a keystore file
    const decrypted = caver.wallet.keyring.decrypt(
        {
            version: 4,
            id: "9c12de05-0153-41c7-a8b7-849472eb5de7",
            address: "0xc02cec4d0346bf4124deeb55c5216a4138a40a8c",
            keyring: [
                {
                    ciphertext:
                        "eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15",
                    cipherparams: { iv: "d688a4319342e872cefcf51aef3ec2da" },
                    cipher: "aes-128-ctr",
                    kdf: "scrypt",
                    kdfparams: {
                        dklen: 32,
                        salt:
                            "c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40",
                        n: 4096,
                        r: 8,
                        p: 1,
                    },
                    mac:
                        "4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26",
                },
            ],
        },
        "password"
    );

    caver.wallet.add(decrypted);
    console.log(caver.wallet.getKeyring(decrypted.address));
}

testFunction();

```



</br></br>



#### 트랜잭션 전송

- Klaytn 에 트랜젝션을 보내기 전에 트랜젝션에 서명을 우선 해야 됩니다. 
- Value 의 단위는 peb 입니다. 

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

async function testFunction() {
    // Add a keyring to caver.wallet
    const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')  //개인키로 keyring 생성.
    caver.wallet.add(keyring)  // 지갑에 추가. 

    // Create a value transfer transaction
    const valueTransfer = new caver.transaction.valueTransfer({
        from: keyring.address,
        to: '0x176ff0344de49c04be577a3512b6991507647f72',
        value: 1,   //
        gas: 30000,
    })  // 트랜젝션 생성.

    // Sign the transaction via caver.wallet.sign
    await caver.wallet.sign(keyring.address, valueTransfer)

    const rlpEncoded = valueTransfer.getRLPEncoding()  // 인코딩하고 전송한다. 
    const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded);

    console.log(receipt);
}

testFunction()
```

</br>

**[결과창]**

- 트랜젝션 후 영수증을 사진과 같이 확인할 수 있습니다. 

<img width="1174" alt="스크린샷 2020-11-11 오후 11 18 47" src="https://user-images.githubusercontent.com/48006103/98822504-48232080-2474-11eb-8f8e-55bed7d646c4.png">



</br>

#### 계정 업데이트

```js
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

async function testFunction() {
    let sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(sender)

    const newPrivateKey = caver.wallet.keyring.generateSingleKey()
    console.log(`new private key string: ${newPrivateKey}`)
    const newKeyring = caver.wallet.keyring.createWithSingleKey(sender.address, newPrivateKey)

    // create an Account instance
    const account = newKeyring.toAccount()

    const updateTx = new caver.transaction.accountUpdate({
        from: sender.address,
        account: account,
        gas: 50000,
    })
    await caver.wallet.sign(sender.address, updateTx)
    const receipt = await caver.rpc.klay.sendRawTransaction(updateTx)
    console.log(receipt)

    // Update the keyring in caver.wallet for signing afterward.
    sender = caver.wallet.updateKeyring(newKeyring)
}

testFunction()
```





</br></br>