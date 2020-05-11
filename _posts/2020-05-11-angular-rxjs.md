---
layout: post
title: Angular rxjs
tags: [angular]
---

#### [Angular 환경에서 RxJS 100% 활용하기](https://medium.com/coinone-official/angular-환경에서-rxjs-100-활용하기-afe43c434c8)를 보고 정리할 부분만 기록한 글입니다.
 
 <br />
  
 - Angular의 묘미 : **DI**가 가능한 Frontend Framwork이다.

  <br />

 - **DI**? 의존성 주입을 통해 코드를 효율적으로 만들고 **코드간 의존성을 낮춰준다.**

  <br />

 - **RxJS**는 **functional Reactice Programming(FRP) 라이브러리** 이다.

  <br />

 - **Functional Reactice Programming(FRP)**란? - **Reactive Programming(RP)** 먼저 알아야 함.
 
  <br />

 - **Reactive Programming(RP)**란? - **_Reactive Programming is programming with asynchronous data streams._**
 
  <br />

 - 즉, **비동기적 데이터 스트림**을 처리하는 프로그래밍(Asynchronous Dataflow Programming)
 
  <br />

 - **callback** 보다 **Observer** : 둘 다 비동기 이벤트 처리 방식. **Callback**은 async 처리하다보면 **callback hell**이 될 가능성이 있음.(콜백에 콜백에 콜백에 콜백..)
 
  <br />

 - **callback hell**보다 **observation** 이 비동기 작업 처리에 있어서 **효율적인 경우가 많음.**
 
  <br />

 - 그래서 **Functional Reactice Programming(FRP)**? **Reactive Programming(RP)**를 **Function Programming(FP)** 으로 구현하는 것.
 
  <br />

 - **Functional Programming(FP)**는 함수 안에 숨어있는 input 과 output이 없도록 만드는 것.
 
  <br />

 - **비동기 데이터 처리를 간단한 함수를 통해 수행하는 프로그래밍(RP + FP)!**
 
  <br />

 - **Functional Reactice Programming(FRP)**의 큰 장점은 **'what I do(무엇을 하느냐)'**가 아니라 **'what I am (무엇이다)'**라고 표현하는 것.
 
  <br />

 - 그래서 **RxJS** ? JS 환경에서 이 **Functional Reactice Programming(FRP)**를 가능하게 하는 JS Library.
 
  <br />

 - 즉, Angualr 뿐만 아니라 다른 framework에서도 사용가능
 
  <br />

 - **RxJS** 의 다른 **FRP Library** 와의 **차별점** : **OOP(객체 지향 프로그래밍)과 조화를 이루면서 쓸 수 있다는 것**
 
  <br />

 - **Functional Reactice Programming(FRP)**는 모든 것을 **스트림(Stream)**으로 생각한다.
 
  <br />

 - **RxJS**는 개발할 때 썼던 모든 코드들을 전부 **스트림(Stream)**으로 보낸다. 심지어 **스트림(Stream)이 아닌 요소들을 올리는 게 되는데** 이를 **Lifting**이라고도 한다.
 
  <br />

 - 이 요소들을 **어떻게 조합**하는 지가 **개발의 중점**이 된다. 
 
  <br />

 - 이 스트림들의 변화를 감지하고 해당 스트림과 대응하는 스트림들이 변하는 것으로 **state 관리를 최적화**할 수 있게 된다.
 
  <br />

#### RxJS 사용하기 위해 알아야할 FRP 3가지 요소
 
  <br />

 1. **Stream** : 근본

 2. **Cell** : 데이터를 저장하는 공간

 3. **Operator** : data 변경 operator, stream 변경 operator (명령자)

         stream과 data로 표현하고 Operator를 사용해 **조합** 함으로써 
         비동기 코드와 동기 코드를 같은 stream & cell 방식으로 개발 가능.
 
  <br />

#### Generalized Pattern 일반화 패턴 규칙
 
  <br />

 1. 모든 **Stream & Cell**은 Stream 뜻인 **$**를 post-fix로 사용. **unsubscribe**이 예외로 **_**가 있음. (ex. _unsubscribe)

 2. **User Action (click, input)**은 **Subject**로 구현, **Action Stream** 을 뜻하는 **A$**를 post-fix로 사용
 

 3. **Template에 바인딩 되는 값**들은 **Cell**로 구현, **View 로 가는 Stream**를 뜻하는 **V$**를 POST-FIX로 사용

 4. **Stream을 input으로 받아 새로운 Stream이 만들어지는 행위**는 **constructor 안**에서 한다. **pipe**로 **건설(construct)**하는 행위들 이기 때문

 5. **Subscribe해서 Stream을 흐르게 하는 행위**는 **ngOnInit에서** 한다. **constructor는 한번만 실행**되지만 **ngOnInit은 여러번 실행**이 가능하기 때문

 6. **Component가 없어질 때** 기존 Subscribe 되어있는 Stream을 닫기 위해 **Stream을 막아주는 로직**이 필요. **takeUntil(unsub$)** --> component destroy 시 **unsub$ 로 값을 닫아야 함**
 
  <br />









### 참고 (References)

#### [Reactive Programming 과 Rx](https://m.blog.naver.com/jdub7138/220983291803)
#### [Functional Reactive Programming for Angular Developers - RxJs and Observables](https://blog.angular-university.io/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/)