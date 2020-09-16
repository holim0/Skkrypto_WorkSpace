# 스크립토 정리 (2020-09-12 세미나)

- 블록 체인이란? → 중개자 없이 p2p 거래를 가능하게 해주는 기술 (합의 알고리즘(pow, pos)과 암호 알고리즘을 통해)

- 블록은 헤더와 바디로 구성되어 있다.

- 헤더는 논스 ,난이도, 머클루트로 이루어져 있다.

- 채굴(브루트 포스로 진행된다) → 거래 → 검증

- 트릴레마 (세가지 옵션을 모두를 받아들이기 힘든 것을 뜻함)

→ 확장성, 분산화, 보안성 (세 가지를 다 충족되기 어렵다)

- 토큰과 코인 :

→ 메인넷이 있으면 코인, 메인넷이 없으면 토큰

<img width="1143" alt="_2020-09-12__3 01 56" src="https://user-images.githubusercontent.com/48006103/92989097-7041e200-f50c-11ea-9588-78d863576301.png">


- DeFi (블록체인을 활용한 금융)



## [솔리디티 - Cryptozombies]

- Lesson 1

1. **contract 선언 방식** 

```jsx
pragma solidity ^0.4.19 

contract ZombieFactory{    //ZombieFactory 라는 컨트랙트 생성

    
}
```

→ 부호 없는 정수: uint 로 선언한다. 

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

- Lesson 2
