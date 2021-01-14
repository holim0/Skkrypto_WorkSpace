안녕하세요. 스크립토 6기 이희제입니다.

이번 시간에는 이더리움 기반으로 개발하기 위해서 필수적인 스마트 컨트랙트와 솔리디티에 대해서 알아보겠습니다.

![](https://images.velog.io/images/holim0/post/9d9d09eb-4c08-4cc8-b3d6-6192a7f7c479/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80.jpeg)

---

> 이더리움에는 외부 소유 계정(EOA)과 컨트랙트 계정 이렇게 두 가지 유형의 계정이 있습니다.</br>
> 컨트랙트 계정은 이더리움 가상 머신에 의해 실행되는 프로그램 코드가 제어합니다. 즉 관련 코드와 데이터 저장소를 모두 가지고 있습니다.

# 스마트 컨트랙트란 무엇인가?

 ➡️ **스마트 컨트랙트(smart  contract)**의 정의는 다음과 같습니다.


 - **컴퓨터 프로그램(computer programs)**: 

 스마트 컨트랙트는 단순히 컴퓨터 프로그램입니다. 


 - **불변의(immutable)**: 

 스마트 컨트랙트 코드는 일단 배포되면, 변경할 수 없습니다. 스마트 컨트랙트를 수정하기 유해서는 무조건 새로운 인스터스를 배포해야 합니다.


 - **결정론적(deterministic)**: 

 스마트 컨트랙트를 실행한 결과물은 그것을 실행한 모든이에게 동일합니다. 이는 실행을 시작한 트랜잭션의 컨텍스트와 실행 시점에 이더리움 블록체인의 상태가 동일하다는 전제가 있기 때문입니다.

 - **EVM 컨텍스트(EVM context)**:

 스마트 컨트랙트는 매우 제한적인 실행 컨텍스트에서 작동됩니다. 이들은 자신의 상태, 호출한 트랜잭션의 컨텍스트 및 가장 최근 블록의 일부 정보에 접근할 수 있습니다.


 - **탈중앙화된 월드 컴퓨터(decentralized world computer)**:

 EVM의 모든 인스터스는 동일한 초기 상태에서 작동하고 동일한 최종 상태를 생성하기 때문에 시스템 전체가 단일 월드 컴퓨터로 작동합니다.


---
# 스마트 컨트랙트의 생명주기

✅ 스미트 컨트랙트는 보통 솔디디티와 같은 고급 언어로 작성됩니다. 컨트랙트를 실행하기 위해서는 EVM에서 실행되는 바이트코드로 컴파일되어야 합니다.

**[바이트코드 예시]**
![](https://images.velog.io/images/holim0/post/85f8938b-159a-415f-a354-0ad32b2f5b17/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-01-14%20%EC%98%A4%ED%9B%84%206.33.06.png)




컨트랙트가 컴파일되면 고유한 컨트랙트 생성 트랜잭션을 사용하여 이더리움 플랫폼에 배포되면, 이 트랜잭션은 고유한 컨트랙트 생성 주소(0x0)으로 전송됩니다.

컨트랙트는 이더리움 주소로 식별되고, 이 주소는 원래 계정 및 논스의 함수로 컨트랙트 생성 트랜잭션에서 파생됩니다.

컨트랙트의 이더리움 주소는 트랜잭션에서 수신자로 사용되거나 컨트랙트에 자금을 보내거나 컨트랙트 함수를 호출하는 데 사용할 수 있습니다.


> 💡** 컨트랙트는 트랜잭션에 의해 호출된 경우에만 실행되는 것이 중요합니다!
> **

- 이더리움의 모든 스마트 컨트랙트는 EOA에서 시작된 트랜잭션으로 인해 실행됩니다.


- 컨트랙트는 다른 컨트랙트를 호출할 수 있고 그 컨트랙트는 또 다른 컨트랙트를 호출할 수 있지만, 이 체인에서 첫 번째 컨트랙트 실행은 항상 EOA로부터 트랜잭션이 호출됩니다.


> 💡 **트랜잭션은 원자성(atomic)의 특징을 지닙니다.**

- 트랜잭션은 모든 실행이 성공적으로 종료된 경우에만 글로벌 상태(컨트랙트, 계정 등)의 모든 변경사항이 기록되고 전체가 실행됩니다.


- 오류로 인해 실행이 실패하면 모든 영향은 트랜잭션이 실행되지 않은 것처럼 '롤백(rollback)'됩니다.

- 실패한 트랜잭션은 여전히 시도된 것으로 기록되며, 실행을 위해 가스로 소비된 이더는 원 계정에서 차감되지만, 컨트랙트 또는 계좌 상태에는 영향을 미치지 않는다.

</br>

**[실패 예시]**

![](https://images.velog.io/images/holim0/post/3286b67b-d763-4c24-bb10-7be0d13acafc/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-01-14%20%EC%98%A4%ED%9B%84%206.58.44.png)


----

# 솔리디티로 스마트 컨트랙트 생성

## 다운로드 및 설치

- 우분투/데이비안 운영체제에서의 솔리디티 설치

```
$ sudo add-apt-repository ppa:ethereum/ethereum
$ sudo apt update
$ sudo apt install solc
```



- Mac 에서의 솔리디티 설치(homebrew 이용)

```
$ brew update
$ brew upgrade
$ brew tap ethereum/ethereum
$ brew install solidity
```


- 버전 확인

![](https://images.velog.io/images/holim0/post/d4cad294-a071-492e-beff-42d7804e3546/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-01-14%20%EC%98%A4%ED%9B%84%207.17.35.png)

</br>

## 단순한 솔리디티 프로그램 작성

➡️ 솔리디티를 설치를 했으니 간단하게 솔리디티 프로그램을 작성해 봅니다.

- Faucet을 구현하는 솔리디티 컨트랙트입니다.
![](https://images.velog.io/images/holim0/post/96ca2e59-f6f3-453e-ba83-fea42728ba10/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-01-14%20%EC%98%A4%ED%9B%84%207.28.09.png)

</br>

## 솔리디티 컴파일러(solc)로 컴파일

- `solc`의 인수 `--bin`, `--optimize`를 이용하여 예저 컨트랙트의 최적화된 바이너리를 생성합니다.

![](https://images.velog.io/images/holim0/post/3ff5ae85-0da8-47d6-bc20-915ba1985581/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-01-14%20%EC%98%A4%ED%9B%84%207.29.13.png)

➡️ `solc`가 생성하는 결과는 이더리움 블록체인에서 실행될 수 있는 시리얼라이즈된 16진수 바이너리입니다.

-----

# 이더리움 컨트랙트 ABI

✅ 컴퓨터 소트프웨어에서 **애플리케이션 바이너리 인터페이스(ABI)**는 두 프로그램 모듈 간 또는 운영체제와 사용자 프로그램 간의 인터페이스입니다.


컨트랙트의 ABI는 함수 설명 및 이벤트의 json 배열로 지정됩니다. 

- 함수는 type, name, inputs, outputs, constant, payable 필드가 있는 json 객체입니다.
- 이벤트 객체에는 type, name, inputs, anonymous 필드가 있습니다.

</br>

`--abi` 옵션을 이용해 컨트랙트의 ABI를 아래와 같이 생성했습니다.
![](https://images.velog.io/images/holim0/post/b07b4484-10db-489d-b4d4-2e131f6f8f2d/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-01-14%20%EC%98%A4%ED%9B%84%207.45.15.png)


➡️ 결과값을 보면 fauset.sol에서 정의된 함수를 설명하는 json 배열인 것을 확인할 수 있습니다.![](https://images.velog.io/images/holim0/post/880554ed-1170-472c-9885-8b3389023147/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-01-14%20%EC%98%A4%ED%9B%84%207.54.57.png)


> 애플리케이션이 컨트랙트와 상호작용하는 데 필요한 것은 **ABI**와 **컨트랙트가 배포된 주소**입니다.

---

# 솔리디티로 프로그래밍 하기

✅ 솔리디티에 대해서 기본적인 것에 알아보겠습니다.

## <데이터 타입>

➡️ 솔리디티에서 제공되는 기본 데이터 타입을 살펴보겠습니다.


> ### 1. bool
- 논리 연산자 ! (not), && (and), || (or), == (equal), and != (not equal) 가 있는 부울 값 true 또는 false
### 2. 정수(int,uint)
- int8에서 uint256까지 8까지 증가하여 선언된 부호 있는(int) 정수 및 부호 없는(uint) 정수. 크기 접미어가 없으면 EVM의 단어 크기를 맞추기 위해 256비트가 사용된다.
### 3. 고정소수점
- `(u)fixedMxN`으로 선언된 고정소수점 숫자. 여기서 M은 비트 단위의 크기이고, N은 소수점 이하 자릿수이다.
ex) ufixed32x2
### 4. 주소(address)
- 20바이트 이더리움 주소. address 객체에는 유요한 멤버 함수가 많이 있으며, 주요 함수는 balance(계정 잔액 반환)와 transfer(이더를 계정으로 전송)이다.
### 5. 바이트 배열(고정 크기)
- 고정 크기의 바이트 배열로, bytes1에서 bytes32까지 선언된다.
### 6. 바이트 배열(가변 크기)
- bytes 또는 string으로 선언된 가변 크기의 바이트 배열
### 7. 열거형(enum)
- 이산 값을 열거하기 위한 사용자 정의 유형
ex) 
`enum NAME {HEEJE 1, HEEJE 2, ...}`
### 8. 배열(array)
- 모든 유형의 고정 또는 동적 배열. 예를 들어, uint32[][5]는 부호가 없는 정수의 동적 배열 5개로 이루어진 고정 크기 배열이다.
### 9. 구조체(struct)
- 변수를 그룹화를 위한 사용자 정의 데이터 컨테이너
ex) 
```c
struct Peson {
	uint age;
    	uint birthday;
}
```
### 10. 매핑(mapping)
- 키 => 값 쌍에 대한 해시 조회 테이블. 
ex) `mapping(KEY_TYPE => VALUE_TYPE) NAME`
### 11. 시간 단위(time units)
- 단위 seconds, minutes, hours, days를 기본 단위인 seconds의 배수로 변환하여 접미어로 사용할 수 있다.
### 12. 이더 단위(ether units)
- 단위 wei, finney, szabo, and ether를 기본 단위인 wei의 배수로 변환하여 접미어로 사용할 수 있다.</br>
>>`require(amount <= 100000000000000000);` </br>
>>변경 후 : `require(amount <= 0.1 ether);`






</br>


## <사전 정의된 글로벌 변수 및 함수>


### 1. 트랜잭션/메세지 콜 컨텍스트

➡️ msg 객체는 이 컨트랙트 실행을 시작한 트랜잭션 호출(EOA) 또는 메시지 호출(컨트랙트 발신)입니다.


>#### 1. msg.sender
- 이 컨트랙트 호출을 시작한 주소를 나타낸다. 
#### 2. msg.value
- 이 호출과 함계 전송된 이더의 값(wei)이다.
#### 3. gasleft() returns (uint256) - solidity v0.8.0
- 이 실행 환경의 가스 공급에 남은 가스의 양이다.
#### 4. msg.data
- 이 호출의 데이터 페이로드가 컨트랙트에 포함된다.
#### 5. msg.sig
- 함수 선택자인 데이터 페이로드의 처음 4바이트다.

</br>

### 2. 트랜잭션 컨텍스트 

➡️ tx 객체는 트랜잭션 관련 정보에 접근하는 방법을 제공합니다.

>#### 1. tx.gasprice
- 트랜잭션을 호출하는 데 필요한 가스 가격이다.
#### 2. tx.origin
- 이 트랜잭션에 대한 원래 EOA 주소다.


</br>

### 3. 블록 컨텍스트

➡️ block 객체에는 현재 블록에 대한 정보가 포함되어 있습니다.

>#### 1. blockhash(uint blockNumber) returns (bytes32)
- 지정된 블록 번호의 블록 해시
#### 2. block.coinbase
- 현재 블록 수수료 및 보상의 수취인 주소
#### 3. block.difficulty
- 현재 블록의 난이도(작업증명)
#### 4. block.gaslimit
- 현재 블록에 포함된 모든 트랜잭션에 소요될 수 있는 최대 가스양
#### 5. block.number
- 현재 블록 번호(블록체인의 높이)
#### 6. block.timestamp
- 채굴자가 현재블록에 넣은 타임스탬프(유닉스 에포크 이후의 초 수)

</br>

### 4. address 객체

아래와 같이 address 는 여러가지 객체를 가지고 있습니다.

>**address.balance, address.transfer(amount), address.send(amount), address.call(_payload_), address.callcode(_payload_), address.delegatecall()**

> 자세한 설명: https://docs.soliditylang.org/en/v0.8.0/units-and-global-variables.html?highlight=msg.gas#block-and-transaction-properties 

</br>

### 5. 내장 함수

>#### 1. addmod, mulmod
- 모듈로(modulo) 더하기 및 곱하기.
#### 2. keccak256, sha256, sha3, ripemd160
- 다양한 표준 해시 알고리즘을 사용하여 해시를 계산하는 함수이다.
#### 3. ecrecover
- 서명에서 메세지 서명에 사용된 주소를 복구한다.
#### 4. selfdestruct(_recipient_address_)
- 현재 컨트랙트를 삭제하고 계정의 나머지 이더를 받는 사람 주소로 보낸다.
#### 5. this
- 현재 실행 중인 컨트랙트 계정의 주소다.


----


# 마무리

 7장은 양이 많은 관계로 2개의 파트로 나눠서 글을 올리려고 합니다. 
다음 글에 이어서 솔리디틴의 함수부터 시작하도록 하겠습니다. 👍🏻