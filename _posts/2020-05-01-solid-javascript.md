---
layout: post
title: 객체지향 자바스크립트 (1회차) 코드스피츠
tags: [javascript]
---

#### [코드스피츠 86 객체지향 자바스크립트 - 1회차](https://www.youtube.com/watch?v=E9NZ0YEZrYU)를 보고 정리하고 기억하려고 쓴 글입니다.
 
  
    객체 지향 5가지 원리 핵심내용.
    SOLID!
    Js 는 정적 바인딩을 지원하는 언어다. (컴파일 시간에 성격이 결정 되는 것)

- SRP : 단일책임 

    하나의 객체는 하나의 기능을 담당

- OCP : 개방폐쇄 

    요구사항 변경이 일어나도 기존 구성요소가 수정되어서는 안 된다.
  

- LSP : 리스코프 치환의 원칙

    업캐스팅 안전 : 추상층 정의가 너무 구체적일 때 
    구상층 구현에서 모순이 발생하기 때문에 공통된 것을 잘 뽑아내야 함.

- ISP : 인터페이스 분리의 원칙 

    자신이 사용하지 않는 인터페이스는 구현하지 않아야 한다. 
    = 어떤 객체가 다른 객체에 종속될 때 가능한한 최소한의 인터페이스가 되도록 해야 함.

- DIP : 의존성 역전의 원칙

    다운캐스팅 금지 : 고차원 모듈이 저차원 모듈에 의존해서는 안 된다.
    두 모듈 모두 추상화된 것에 의존 해야 함.
    
<br />

### SRP에서 책임 이상의 업무를 부여하게되면?
    
<br />

  **1. 만능 객체**
  
      해당 객체는 요구사항 변화 시 코드 수정하기 정말 까다로워진다.

  **2. 다른 객체에게 의뢰**
    
<br />

### 다른 객체에게 의뢰 => 다른 객체에게 메시지를 보내는 것.
    
<br />

  **1. 메시지 - 의뢰 내용 보냄**

  **2. 오퍼레이션 - 메시지를 수신할 객체가 제공하는 서비스**

  **3. 메소드 - 오퍼레이션이 연결될 실제 처리기**
  
      오퍼레이터 실제 작동 => 메시징으로 하는 것!
      오퍼레이션 중 매핑 되는 것 메소드가 된다. 하지만 오퍼레이션 != 메소드 (같지 않다.)
    
<br />

### Dependency (의존성)

      중요하다. 왜냐하면 다른 사람이 영향을 주는 것이기 때문에 
      의존성이 강하면 영향을 너무 많이 받게되고 코드 수정이 어려워진다.
    
<br />

 - 한 객체가 너무 많이 알아도 (만능 객체) 안된다.

 - 또한 너무 적게 알아도 (너무 몰라서 하나가 중간에 빠지면 큰일난다.) 안된다.
    
<br />

### 의존성
    
<br />

  - 상속 (강력한 의존)

  - 연관 (필드 객체를 참조하는 것!)

  - 의존 (dependency : 철자는 같지만 명사형, 오퍼레이션 실행 시 임시적인 의존성)
    
<br />

### 의존성을 조심해야하는 이유
    
<br />

  1. 수정 여파 규모 증가

  2. 수정하기 어려운 구조 생성 (어디까지 고쳐야할 지 감이 안오게 됨.)

  3. 순환 의존성 (A -> B -> C -> A 를 의존하는 경우. B의 무언가가 A에 다시 영향을 주게 됨.)

    **따라서 변화에 대한 격리가 필요하다.

<br />

### Dependency Inversion : 의존성 역전의 법칙 (DIP)

      어떠한 경우에도 다운 캐스팅 금지, 추상 인터페이스(폴리모피즘) 사용
      IoC(제어역전) : 위임과 비슷한 것. 내가 안하고 시키는 것 (*개인적으로 OLOO 방식이 생각이 났었음)

<br />

- Control : 흐름제어
            
      flow control을 뜻함 
      넓은 의미의 흐름제어 : 프로그램 실행 통제 (if, for 같은 것들)
      동기 흐름제어, 비동기 흐름제어 (요청, 응답)

- IoC (제어역전) 문제점

      흐름제어가 상태와 결합하여 진행됨.
      상태통제 & 흐름제어 = 알고리즘 (굉장히 어려운 부분, 내 머리가 컴퓨터라 생각하고 훈련해야 함.)
      변화에 취약하고 구현하기 어려움.

- 대안

      제어를 추상화
      개별 제어의 차이점만 외부에서 주입받기.
      그래서 비슷한 제어인데 차이가 있는 것을 인식할 수 있어야 함.
      귀납적 사고 필요 : 현상을 원리로 원리를 현상으로!

      흐름 처리 <--- IoC -- 실제책임 (흐름 처리에 실제책임을 맡기는 것.)

<br />

### 라이브러리와 프레임워크의 차이

<br />

- 라이브러리는 제어역전 개념이 없다. (완성되어 있어서 수정할게 없음)

      특징
        단순 활용가능한 도구들의 집합.
        개발자가 만든 클래스에서 호출하여 사용
        클래스들의 나열로 필요한 클래스를 불러서 사용하는 방식

- 프레임워크는 제어역전 개념이 적용되어 있는 것. (완성된 어플리케이션 x, 프로그래머가 완성)

      특징
        특정 개념들의 추상화를 제공하는 여러 클래스나 컴포넌트로 구성
        추상적인 개념들이 문제를 해결하기 위해 같이 작업하는 방법을 정의
        컴포넌트들 재사용 가능
        높은 수준에서 패턴 조직화 가능

    ****궁금했던 점 : 왜 리액트는 라이브러리고 앵귤러는 프레임워크일까? [https://programmingwithmosh.com/react/react-vs-angular/](https://programmingwithmosh.com/react/react-vs-angular/)**

    - 앵귤러 : javasciprt 프레임워크

      - typescript로 쓰여짐
      - MVW Framework
      - Full-fleged MVC(완전한 mvc) framework를 사용 중
      - 적은 융통성

    - 리액트 : javascript 라이브러리. 유저 인터페이스 빌딩.

      - view를 위한 라이브러리
      - 더 많은 자유를 가지고 있다.
      - MVC 중에 view만 제공한다.
      - M과 C는 스스로 찾아 선택해야 한다.
      - 그래서 결국엔 더 독립적이고 빠르게 움직이는 라이브러리다.
      - 스스로 migrations, update를 다 관리해줘야 한다.
      - 리액트 프로젝트마다 폴더 구조, 아키텍처의 결정을 요구한다.

<br />

### 제어 역전 실제 구현

<br />

- 전략 패턴 & 템플릿 메소드 패턴 < 컴포지트 패턴 < 비지터 패턴 

      오른쪽으로 갈수록 더 넓은 범위의 제어 역전을 실현.
      전략 - 호출 제어
      템플릿 - 상속
      컴포지트 - 광범위
      비지터 - 광범위

- 근데 메시징을 주는 것만 역할을 하니까 나중에 객체와 비슷한 객체2를 생성하는게 좋을 경우에 곤란함.

- 이때 추상 팩토리 메소드 패턴과 함께 사용하게 됨.

- 추상 팩토리 메소드 패턴 - 객체 생성을 위해 제어역전 시 호출할 때 만들어진 객체를 끼워넣음.

- 그래서 보통 **비지터 패턴** + **추상 팩토리 메소드 패턴**을 같이 사용

<br />

### 참고

#### 객체지향 개발 5대 원리 [http://www.nextree.co.kr/p6960/](http://www.nextree.co.kr/p6960/)
#### 프레임워크 & 라이브러리 차이 [https://webclub.tistory.com/458](https://webclub.tistory.com/458)

  
  