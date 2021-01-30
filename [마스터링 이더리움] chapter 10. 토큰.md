# [마스터링 이더리움] chapter 10. 토큰





이번 시간에는 토큰에 대해서 살펴보겠습니다. 



---

## 토큰은 어떻게 사용되는가?

➡ 토큰의 가장 분명한 사용처는 디지털 개인 화폐입니다.

아래 목록에서 확인할 수 있듯이 다양한 기능을 제공합니다. 

- **화폐(currency)**: 토큰은 사적인 트레이딩으로 가치가 결정되는 화폐의 한 형태로 작동할 수 있다.
- **자원(resource)**: 공유 경제 또는 자원 공유 환경에서 획득되거나 생산된 자원을 나타낼 수 있다.
- **자산(asset)**: 내재적 또는 외적, 유형 또는 무형 자산의 소유권을 나타낼 수 있다.
- **접근(access)**: 접근 권한을 나타낼 수 있다.
- **지분(equity)**: 디지털 조직 또는 법인의 주주 지분을 나타낼 수 있다.
- **투표(voting)**: 디지털 또는 법률 시스템에서 투표권을 나타낼 수 있다.
- **수집(collectible)**: 디지털 수집물 또는 물리적인 수집물을 나타낼 수 있다.
- **신원(identify)**: 디지털 신원 또는 법적 신원을 나타낼 수 있다.
- **증명(attestation)**: 일부 기관이나 탈중앙화된 평판 시스템에 의한 사실 증명서 또는 인증서를 나타낼 수 있다.
- **유틸리티(utility)**: 서비스에 접근하거나 사용료를 지불하는 데 사용될 수 있다.

➡ 단일 토큰이 위와 같은 여러 기능을 포함할 수도 있습니다. 

---

## 토큰과 대체성

✔ 토큰은 단일 단위를 값이나 기능의 차이 없이 다른 토큰으로 대체할 수 있는 경우에 대체 가능합니다.

토큰의 과거 출처를 추적 관리할 수 있다면 그러한 토큰은 완전히 대체 가능하지 않습니다.

---

## 거래상대방 위험

거래상대방 위험은 트랜잭션에서 상대방이 자신의 의무를 이행하지 못하는 위험입니다.

---

## 토큰과 내재성 

일부 토큰은 블록체인에 내재적인 디지털 아이템을 나타냅니다. 이러한 디지털 자산은 토큰 자체와 마찬가지로 합의 규칙에 의해 관리됩니다. 

이는 내재적 자산을 나타내는 토큰에는 추가적인 거래상대발 위험이 없다는 것을 의미합니다. 

---


## 토큰 사용: 유틸리티 또는 지분


---
## 이더리움 토큰 

➡ 블록체인 토큰은 이더리움 이전부터 존재했지만 이더리움에서 첫 번째 토큰 표준이 소개되고 나서 토큰이 폭발적으로 증가했습니다.



### ERC 토큰 표준

➡ 첫 번째 표준은 2015년 11월 파비안 보겔스텔러가 ERC(Ethereum Request for Comments)로 발표했습니다. 

대다수의 토큰은 현재 ERC20 표준을 기반으로 합니다. 

ERC20은 **대체 가능한 토큰(fungible token)**의 표준으로, ERC20 토큰의 다른 단위가 상호 교환이 가능하고 고유한 특성이 없음을 의미합니다. 

</br>

#### ERC20 필요 함수와 이벤트

✅ ERC20을 준수한 토큰 컨트랙트는 최소한 다음 함수 및 이벤트를 제공해야 합니다. 

- **`totalSupply` **  : 현재 존재하는 이 토큰의 전체 개수를 리턴한다. 


- **`balanceOf`** : 주소가 주어지면 해당 주소의 토큰 잔액을 반환한다. 

- **`transfer`** : 주소와 금액이 주어지면 해당 주소로 토큰의 양을 전송한다. 전송을 실행하는 주소의 잔액에서 전송을 실행한다. 

- **`transferFrom`** : 보낸 사람, 받는 사람 및 금액이 주어지면 한 계정에서 다른 계정으로 토큰을 전송한다. `approve` 와 함께 조합하여 사용한다.

- **`approve`** : 수취인 주소와 금액이 주어지면 그 주소가 승인을 한 계정에서 최대 금액까지 여러 번 송금할 수 있도록 승인한다. 

- **`allowance`** : 소유자 주소와 지출자(spender) 주소가 주어지면, 지출자가 출금할 수 있도록 소유자가 승인한 잔액을 리턴한다.

- **`Transfer`** : 전송이 성공하면(`transfer` 또는 `transferFrom` 호출) 이벤트가 트리거 된다. 

- **`Approval`** : `approve` 를 성공적으로 호출하면 이벤트가 기록된다. 


</br>

#### ERC 선택적 함수 

- **`name` **  : 사람이 읽을 수 있는 토큰의 이름을 반환한다. 

- **`symbol` **  : 사람이 읽을 수 있는 기호를 반환한다.

- **`decimals` **  : 토큰 양을 나눌 수 있는 소수 자릿수를 반환한다. 
</br>

#### 솔리디티에서 ERC20 인터페이스 정의

```js
contract ERC20 {
   function totalSupply() constant returns (uint theTotalSupply);
   function balanceOf(address _owner) constant returns (uint balance);
   function transfer(address _to, uint _value) returns (bool success);
   function transferFrom(address _from, address _to, uint _value) returns
      (bool success);
   function approve(address _spender, uint _value) returns (bool success);
   function allowance(address _owner, address _spender) constant returns
      (uint remaining);
   event Transfer(address indexed _from, address indexed _to, uint _value);
   event Approval(address indexed _owner, address indexed _spender, uint _value);
}

```
</br>

#### ERC20 데이터 구조

✅ ERC20 구현을 보면 2개의 테이터 구조를 포함하고 있는데 하나는 잔고를 추적하고, 나머지 하나는 허용량을 추적하는 것입니다. 솔리디티에서는 **데이터 매핑(mapping)**으로 구현됩니다.

- 첫 번째 데이터 매핑은 소유자별로 토큰 잔액을 내부 테이블로 구현합니다. 

`mapping(address => uint256) balances;`

</br>

- 두 번째 데이터 구조는 허용량의 데이터 매핑입니다. ERC20 컨트랙트는 기본 키가 토큰 소유자의 주소이고, 지출자 주소와 허용 한도에 매핑되는 2차원 매핑으로 허용량을 추적합니다. 

`mapping (address => mapping (address => uint256)) public allowed;`

</br>

---

## 마무리

이번 시간는 토큰에 대해 알아보았습니다. 

이론적인 내용이 많아 확실히 공부하기 어렵습니다.😂

조만간 내용을 더 보충하도록 하겠습니다. 