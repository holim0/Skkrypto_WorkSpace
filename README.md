# 📘스크립토 정리

## 2020-09-12 세미나

- 블록 체인이란? → 중개자 없이 p2p 거래를 가능하게 해주는 기술 (합의 알고리즘(pow, pos)과 암호 알고리즘을 통해)

- 블록은 헤더와 바디로 구성되어 있다.

- 헤더는 논스 ,난이도, 머클루트로 이루어져 있다.

- 채굴(브루트 포스로 진행된다) → 거래 → 검증

- 트릴레마 (세가지 옵션을 모두를 받아들이기 힘든 것을 뜻함)

→ 확장성, 분산화, 보안성 (세 가지를 다 충족되기 어렵다)

- 토큰과 코인 :

→ 메인넷이 있으면 코인, 메인넷이 없으면 토큰

</br>

<img width="1143" alt="_2020-09-12__3 01 56" src="https://user-images.githubusercontent.com/48006103/93708028-17a6c080-fb6e-11ea-9dac-09b6f0e8ee21.png">

- DeFi (블록체인을 활용한 금융)

</br></br>

## [솔리디티 - Cryptozombies]

</br>

### Lesson 1

</br>

1. **contract 선언 방식** 

```jsx
pragma solidity ^0.4.19 

contract ZombieFactory{    //ZombieFactory 라는 컨트랙트 생성

    
}
```

→ 부호 없는 정수: uint 로 선언한다. 
</br>

2**. 구조체 선언   → c 랑 똑같다.**

```jsx
struct Zombie {
        string name;
        uint dna;
}
```

**3. 배열 선언 방식**

```jsx
// 2개의 원소를 담을 수 있는 고정 길이의 배열:
uint[2] fixedArray;
// 또다른 고정 배열으로 5개의 스트링을 담을 수 있다:
string[5] stringArray;
// 동적 배열은 고정된 크기가 없으며 계속 크기가 커질 수 있다:
uint[] dynamicArray;

Zombie[] public zombies; // 구조체 배열 선언. 
```

</br>

**4. Private 과Public**

- Private : 컨트랙트 내의 다른 함수들 만이 함수를 호출할 수 있다.  (private 함수의 함수 명은 앞에 _ 를 관례적으로 붙여 준다)
- Public : 외부 컨트랙트에서도 함수에 대해서 접근할 수 있다.

</br>

**5. View 와 Pure**

- View :  어떤 값을 변경시키지 않고 단지 보여주는 경우
- Pure : 함수가 앱에서 어떤 데이터도 접근하지 않는 경우

</br></br>

---

### Lesson 2

</br>

1. address

0x0cE446255506E92DF41614C46F1d6df9Cc969183 같은 형태의 주소를 뜻한다. 

  2. mapping 

- 매핑은 기본적으로 키-값 (key-value) 저장소를 뜻한다.

→ ex) *금융 앱용으로, 유저의 계좌 잔액을 보유하는 uint를 저장한다 :* 

`mapping (address => uint) public accountBalance;`  → 주소가 인트형에 매핑이 된다. 

```c
mapping (uint => address) public zombieToOwner;  // int형이 주소랑 매핑
mapping (address => uint) ownerZombieCount;  // 주소가 int형이랑 매핑.

zombieToOwner[id] = msg.sender;  // id => msg.sender
ownerZombieCount[msg.sender]++; // msg.sender => uint(count)
```



</br> </br>



### Lesson3

</br>



#### msg.sender

:arrow_right: 모든 함수에서 쓸 수 있는 전역변수, 현재 함수를 호출한 사람 또는 스마트 컨트랙트의 주소를 가리킨다. 



</br></br>

#### require 

:arrow_right: 특정 조건이 참이 아닐 때 에러 메시지를 표시하고 실행을 멈춘다. 

```c
function sayHiToVitalik(string _name) public returns (string) {
  // _name이 "Vitalik"인지 비교한다. 참이 아닐 경우 에러 메시지를 발생하고 함수를 벗어난다
  // (참고: 솔리디티는 고유의 스트링 비교 기능을 가지고 있지 않기 때문에 
  // 스트링의 keccak256 해시값을 비교하여 스트링 값이 같은지 판단한다)
  require(keccak256(_name) == keccak256("Vitalik"));
  // 참이면 함수 실행을 진행한다:
  return "Hi!";
}
```



</br></br>

#### 상속

```c
contract Doge {
  function catchphrase() public returns (string) {
    return "So Wow CryptoDoge";
  }
}

contract BabyDoge is Doge {           // BabyDoge는 Doge 를 상속받는다. 
  function anotherCatchphrase() public returns (string) {
    return "Such Moon BabyDoge";
  }
}
```

</br></br>



#### storage & memory

- storage : 블록체인 상에 영구적으로 저장되는 변수. (하드디스크)
- memory. : 임시적으로 저장되는 변수 (RAM)

</br>

```c
function eatSandwich(uint _index) public {
    // Sandwich mySandwich = sandwiches[_index];

    // ^ 꽤 간단해 보이나, 솔리디티는 여기서 
    // `storage`나 `memory`를 명시적으로 선언해야 한다는 경고 메시지를 발생한다. 
    // 그러므로 `storage` 키워드를 활용하여 다음과 같이 선언해야 한다:
    Sandwich storage mySandwich = sandwiches[_index];
    // ...이 경우, `mySandwich`는 저장된 `sandwiches[_index]`를 가리키는 포인터이다.
    // 그리고 
    mySandwich.status = "Eaten!";
    // ...이 코드는 블록체인 상에서 `sandwiches[_index]`을 영구적으로 변경한다. 

    // 단순히 복사를 하고자 한다면 `memory`를 이용하면 된다: 
    Sandwich memory anotherSandwich = sandwiches[_index + 1];
    // ...이 경우, `anotherSandwich`는 단순히 메모리에 데이터를 복사하는 것이 된다. 
    // 그리고 
    anotherSandwich.status = "Eaten!";
    // ...이 코드는 임시 변수인 `anotherSandwich`를 변경하는 것으로 
    // `sandwiches[_index + 1]`에는 아무런 영향을 끼치지 않는다. 그러나 다음과 같이 코드를 작성할 수 있다: 
    sandwiches[_index + 1] = anotherSandwich;
    // ...이는 임시 변경한 내용을 블록체인 저장소에 저장하고자 하는 경우이다.
  }
```



</br></br>



#### Internal & External

- internal : 함수가 정의된 컨트랙트를 상속하는 컨트랙트에서도 접근이 가능, 그리고 private 과 동일.
- external : 함수가 컨트랙트 바깥에서만 호출될 수 있고 컨트랙트 내의 다른 함수에 의해 호출될 수 없다 , 나머지는 public 과 동일.



</br></br>

#### Interface 

```c
contract NumberInterface {
  function getNum(address _myAddress) public view returns (uint);    // 인터페이스 선언 방식
}
```

</br>

:arrow_right: 인터페이스를 정의하는 것이 컨트랙트를 정의하는 것과 유사하다. 그러나 다른 컨트랙트와 상호작용하고자 하는 함수만 선언한다.  



</br></br>



#### 다수의 반환값 처리 

```c 
function multipleReturns() internal returns(uint a, uint b, uint c) {
  return (1, 2, 3);
}

function processMultipleReturns() external {
  uint a;    // unsigned int
  uint b;
  uint c;
  // 다음과 같이 다수 값을 할당한다:
  (a, b, c) = multipleReturns();
}

// 혹은 단 하나의 값에만 관심이 있을 경우: 
function getLastReturnValue() external {
  uint c;
  // 다른 필드는 빈칸으로 놓기만 하면 된다: 
  (,,c) = multipleReturns();
}
```



</br></br>



	### Lesson4



</br></br>

#### payable 제어자

</br>

:arrow_right: 이더를 받을 수 있는 함수 유형.

```c 
contract OnlineStore {
  function buySomething() external payable {
    // 함수 실행에 0.001이더가 보내졌는지 확실히 하기 위해 확인:
    require(msg.value == 0.001 ether);
    // 보내졌다면, 함수를 호출한 자에게 디지털 아이템을 전달하기 위한 내용 구성:
    transferThing(msg.sender);
  }
}
```

</br>

- msg.value 는 컨트랙트로 이더가 얼마나 보내졌는지 확인할 수 있게 해준다. 

- `transfer` 함수를 사용해서 이더를 특정 주소로 전달할 수 있다
- 그리고 `this.balance`는 컨트랙트에 저장돼있는 전체 잔액을 반환한다. 

</br>

```c
contract GetPaid is Ownable {
  function withdraw() external onlyOwner {
    owner.transfer(this.balance);    // transfer 로 이더를 전송한다. 
  }
}
```



</br></br>

#### 난수 생성 

</br>

:arrow_right: `keccak256` 해시 함수를 써서 만들 수 있다. 

</br>

```c
// Generate a random number between 1 and 100:
uint randNonce = 0;  
uint random = uint(keccak256(now, msg.sender, randNonce)) % 100;  
randNonce++;
uint random2 = uint(keccak256(now, msg.sender, randNonce)) % 100;


/// now: 타임스탬프 값
```





</br></br>



### Lesson5

</br></br>



#### ERC20 토큰

</br>

- 몇몇 공통 규약을 따르는 스마트 컨트랙트
- 하나의 컨트랙트로  그 안에서 누가 얼마나 많은 토큰을 가지고 있는지 기록하고, 몇몇 함수를 가지고 사용자들이 그들의 토큰을 다른 주소로 전송할 수 있게 해준다. 





</br></br>

#### SafeMath 

</br>

:arrow_right: 오퍼 플로우를 방지할 수 있다. 

</br>

**ex)**

```c
using SafeMath for uint256;

uint256 a = 5;
uint256 b = a.add(3); // 5 + 3 = 8
uint256 c = a.mul(2); // 5 * 2 = 10
```



</br>

**SafeMath 내부 코드**

</br>

```c
library SafeMath {   // mul, div, sub, add 의 연산을 한다. 

  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);      // 조건을 걸어서 오버 플로우를 방지한다. 
    return c;
  }
}
```

</br>

- `assert` : 조건을 만족하지 않으면 에러를 발생시킨다. `require`는 함수 실행이 실패하면 남은 가스를 사용자에게 되돌려 주지만, `assert`는 그렇지 않다.





</br></br>









# 2020/09/19 세미나 - 상세히 정리 필요.

## [합의 알고리즘]

- 블록체인 시스템은 분산화 되어 있다.

 but 문제점이 있다

→ 비자틴 장군 문제: 

해결책 : 메세지를 모든 장군들에게 전달. 

- 합의 알고리즘: 다수의 참여자들이 통일된 의사결정을 하기 위해서 사용하는 알고리즘이다.

특정 2가지 : safety- 노드간의 합의가 발생했다면, 어느 노드가 접근하든 그 값은 동일, 

liveness- 합의 대상에 문제가 없다면, 네트워크 내에서 반드시 합의가 성립.

목표: 탈중앙 환경에서 모든 노드가 동일한 분산 원장을 가질 수 있도록 한다. 

작업증명 (PoW)

포크(분기) 발생 시 하나의 체인을 선택. (메인 체인을 결정해야 한다- 가장 긴 체인을 선택)

<프로토콜 vs 합의 알고리즘>

- 프로토콜

1) 규칙이 무엇인지 규정

2) 노드가 상호작용하는 방법, 전송되는 방법

- 합의 알고리즘

1) 프로토콜이 규정한 규칙을 준수하고 ~~ 어떤 절차를 거쳐야하는지 제시. 

2)

<합의 알고리즘의 종류>

- PoW(proof of work) : 해당 작업에 참여했음을 증명하는 알고리즘.

특징:

1) 해시 값을 찾는 과정을 계속해서 반복. 

장점 :  분권형 경제 민주주의, 높은 보안성, 비가역성(거래 취소 불가)

단점: 낮은 거리 처리 속도, 많은 에너지 소비 

- PoS (지분 증명) : 코인을 많이 가지고 있으면 블록에 대한 유효성 검증 확률이 높아진다.

특징:

1) 보유한 지분의 크기가 다음 블록의 검증자 노드로 선택될 확률을 결정. 

2) 자신의 지분을 스테이킹 한다. 

3)

4)

장점:  빠른 속도, 적은 에너지 소비

단점: 빈익빈 부익부. nothing at stake. 

- DPoS(위임지분증명)

장점: 소수의 합의 과정에 빠른 거래 처리 속도

단점: 상대적으로 취약한 보안성, 제한된 탈중앙화

- PBFT

원리: 

- PoA(권위증명):

## [암호 알고리즘]

목표: 

1) 고유한 소유자와 자산을 식별

2) 허가된 사람만 그 자산에 접근하도록 보장

→ 키를 활용한 암호화와 복호화

대칭 암호화 기법(키가 동일)과 비대칭 암호화 기법(키가 다름)

블록체인에서는 비대칭형 암호화 기법을 사용한다. 

암호화는 개인키로 하고 복호화는 공개키로 한다. 

지갑: 개인키를 보관?









</br>

</br>





# [2020/09/26]- 개발팀 스터디



**< smart contract >**

- 서면으로 이루어지던 계약을 코드로 구현하고 특정 조건이 충족되었을 때 계약이 이행되게 하는 스크립트.

- 블록체인에 저장되어 있는 프로그램



< solidity >

- 컨트랙트를 만드는 언어이다. 
- 다른 언어와 비슷하지만 포인터가 없다. 



실행되기 전에 EVM(기계어 코드로 생각)로 바꿔 준다. -> bytecode , ABI



EVM : 이더리움 가상 머신, 스택 기반 머신, 튜링 완전 언어-



-> remix 이더리움 사이트.



스마트 컨트랙트 과정: 



이더스캔.







컨트랙트의 한계점 

- 외부의 정보를 가지고 오지 못한다. 
- 배포 이후에 작동을 수정할 수 없다.

-> 이런 문제점은 해결되고 있다. 





정수형 : int, uint(unsigned), bool, address, bytes, string, struct





view - read only, 가스 비용 없음



Pure - 그냥 인자값만 활용해서 반환값을 정함, 가스비용 없음,



payable - 함수가 이더를 받을 수 있게함, 가스비용 있음



- msg.sender : 현재 함수를 호출한 사람의 주소를 가르킴.











- require -> 조건문이라고 생각하면 된다.





다음주 할 거 -> 디앱 디플로잉까지.(크립토 좀비) : 주제는 다양하게 : testing 





## 전체 세미나 내용 







[DID detail]



- 신원 관리 모델의 진화
  1. 개별 신원 모델 : 각각 회원가입을 해서 id/pw를 발급 받아서 사용.
  2. 연합 신원 모델 : sns 계정을 연동해서 사이트에 로그인.
  3. 자기 주권 신원 모델 : 개인 단말로 신원 증명 제출을 통해 서비스 이용, 개인 정보를 본인이 직접 단말 내에 관리 but 단말 분실 시 위험 존재.



[SSI-**자기주권신원(Self-sovereign Identity)**] ==> DID 를 통해서 얻을 수 있는 신원.

- DID 소유자는 자신의 단말에 자격 증명을 저장, 요청자에게 필요한만큼만 제출.





-------------



[DID 실생활 use case]

- 자격인증 (성인 혹은 나이 인증 필요한 경우)
- P2p 인증
- 출입 인증





1. DID system architecture 



issuer가 vc 를 한 번 발급해주면 사용자는 이를 통해서 vp(vc의 모음)를 만들어 사용한다. 

vc(verifiable credential)







# [2020/10/09]





# Truffle Framework란?

Truffle Famework는 솔리디티 코드(스마트 컨트랙트)를 로컬 환경에서 보다 쉽게 컴파일하고 배포할 수 있는 프레임워크입니다.



contract()라는 함수를 호출하여 그룹 테스트를 한다. 테스트에 대한 계정 목록을 제공하고 일부 정리를 수행함으로써 Mocha의 기술()을 확장한다.

계약은 두 가지 주장을 취한다. 첫 번째 끈은 우리가 무엇을 테스트할 것인지를 표시해야 한다. 두 번째 변수, 콜백은 우리가 실제로 시험을 칠 지점이다.

실행: 우리가 이것을 하는 방법은 it라는 이름의 함수를 호출하는 것이다. 이 함수는 또한 두 가지 주장을 취한다: 테스트가 실제로 무엇을 하는지 설명하는 문자열과 콜백.









``` js
 context("with the single-step transfer scenario", async () => {
        it("should transfer a zombie", async () => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
          	//
            const zombieId = result.logs[0].args.zombieId.toNumber();
            await contractInstance.transferFrom(alice, bob, zombieId, {from: alice});
            const newOwner = await contractInstance.ownerOf(zombieId);
            assert.equal(newOwner, bob);
        })
    })
```













