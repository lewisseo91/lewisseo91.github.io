---
layout: post
title: javascript 클래스와 closure의 차이
tags: [javascript]
---


### ** 아래 글은 Richard Marmorstein 님의 글 
#### [Javascript Classes v. Closures (1/3)](https://medium.com/engineering-livestream/javascript-classes-vs-closures-cf6d6c1473f) 
#### [Javascript Classes v. Closures (2/3)](https://medium.com/engineering-livestream/javascript-classes-v-closures-2-3-9fa3b1296b16) 
#### [Javascript Classes vs. Closures (3/3)](https://medium.com/engineering-livestream/javascript-classes-vs-closures-3-3-9d9233eb0a5c)
### 을 보고 정리한 글입니다.

<br />

#### JS는 class 와 closure 를 모두 지원하고, 두 개의 패턴 모두 "arguably" 같다. 적어도 비슷한 상황에서 비슷한 효과를 낸다고 말할 수 있다. 

#### 그래도 둘이 완벽히 같은 것은 아니다. 차이점을 알아보도록 하자.

<br />

#### <center>1. closure 패턴은 class 패턴보다 좀 더 lintable 하다.</center>
#### [Javascript Classes v. Closures (1/3)](https://medium.com/engineering-livestream/javascript-classes-vs-closures-cf6d6c1473f)

<br />

 - closure 패턴은 때때로 "factory class pattern" 이라고 불린다.
 
 - 같은 패턴 안에서 스펠링 오류가 발생할 경우 closure는 linter에서 잡을 수 있는 반면, class에서는 탐지하지 못한다.
 
 - 왜냐하면 javascript object(객체)가 anarchy 하기 때문.

 - class를 만약에 누가 스펠링 오류로 된 다른 객체를 생성할 경우 완벽하게 유효하게 된다. (그러나 잘못쓰이고 있는 것.)

 - closure는 반면에 보호되어 있다. closed 되어 있기 때문에 closures 라고 부르는 것.
  
 - 그 어떠한 것도 closures에 접근할 수 없다. (스펠링 오류로 된 다른 무언가가 침입할 여지가 없다는 뜻.)

 - 이러한 경우에 closures 가 linter에서 걸러낼 수 있다.

<br />

#### <center>2. class 패턴은 closure 패턴보다 좀 더 잘 작동한다.</center>
#### [Javascript Classes v. Closures (2/3)](https://medium.com/engineering-livestream/javascript-classes-v-closures-2-3-9fa3b1296b16)

<br />

 - 메모리 효율성과 CPU 효율성

 - Object Prototype 특징

         new 키워드를 통해 같은 prototype 객체를 여러개 만들 수 있다.
         prototype에 method를 넣을 수 있다.
         object에 직접적으로 연결되어 있다면 prototype method를 부를 수 있다.
         그리고 부르고 나면 this가 객체에 참조가 된다.

 - 메모리 효율성

         class는 class 내부에 method를 선언하면 같은 method 호출에 대해서는 literal function 을 한번 호출하면 되지만
         closure는 method 호출 횟수만큼 literal function 갯수가 늘어난다.
         따라서 메모리 안에서 class는 하나의 function이 돌아가고 있는 동안에 closure는 호출 횟수만큼 돌아가고 있다.
         class 패턴은 메모리 공간을 보존한다.

 - cpu 효율성 (Haverbeke & Egorov)

    Haverbeke은 **closure**가 좀 더 빠를 것이라 기대된다고 함.

        좀 더 간단 명료 해보이기 때문.
        scope 안에 있는 closure 내부의 variables는 고정된 숫자다.
        그들은 고정된 메모리 공간을 차지한다. 
        반면에 object 위의 properties는 고정된 숫자가 아니다.
        언제든지 변할 수 있음.
        따라서 closure 안에 정~~말 많은 인스턴스들이 있다면
        function 런타임이 좀 더 효율적일거라고 예상할 수 있다. 
        closure는 따라서 class 의 인스턴스들 보다 
        균일성(고정된 숫자이므로)이 강하게 보장되어 있다.

  - Egorov가 말한 것은 **v8**(구글이 만든 javascript engine)이 **class**가 하는 것을 흔들어놨다고 함.

         class의 인스턴스들이 균일성이 강하게 보장되는 게 없다고 하더라도, 그럼에도 불구하고 런타임은 균일화된 "hidden classes" 로 분류하는 것에 매우 능숙해서, 균일화의 이점을 가져가는 것과 똑같은 것이 존재한다.
         그래서 closure의 균일성에 대한 이점은 조금 부정된다.(effectively nagated)

         **그러므로 v8 런타임 엔진은 자주 부르는 메소드들을 최적화 하는 것이 가능하다.

         class 안 공통 method 의 인스턴스들(수 없이 많은 같은 method들)은 
         V8에서는 자주 최적화 될 것이다.(inline caching 이라는 것을 사용해서)
         반면에 closure들은 각각의 closure들은 제각각 method copy 한 것을 가지고 있다.
         그래서 수 없이 많은 같은 이름의 method 가지지만 이것은 같은 method가 아니다! 
         제각각 다른 method 인 것이다.
         그래서 v8은 효과적으로 최적화하지 않을 것이다.

  - 원론적으로 Egorov가 말한 것은 가능하다. V8이 조금 더 똑똑해지고 static analysis 를 한다면 closures 최적화도 실현가능 할 수 있다.

  - 그러나 적어도 [그가 글을 썼던 시점](https://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html)에선 구현가능하지 않았다.

  **그러나 댓글에 쓴 사람들 결과를 보면 closure가 같은 결과에서 더 빠른 경우도 있는 걸로 보임. (Chrome 76버전 테스트)**

<br />

#### <center>3. Mocking 과 Monkey-patchings</center>
#### [Javascript Classes vs. Closures (3/3)](https://medium.com/engineering-livestream/javascript-classes-vs-closures-3-3-9d9233eb0a5c)

<br />

 - mocking은 단위 테스트를 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법을 말함.

 - 일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기가 너무 부담스러운 경우(도달하기 까지 어렵거나 거의 불가능) mocking이 많이 사용됨.

 - 부담스러운 경우는 2가지 경우를 만족해야한다.

         DI(Dependency injection: 의존성 주입)를 사용하지 않는다. 
         DI를 계속 사용하면, 테스트 시작할 때 아무 mock이나 다 주입하면 되기 때문에.

         (DI : 의존성 주입은 객체를 직접 생성하는 것이 아닌 외부로부터 객체를 받아서 사용하는 것.)

         **class를 쓰면 모든 공통된 class 내부 prototype method의 인스턴스들이 테스트에서 참조가능하고 mock으로 덮어쓴다

         **closure는 접근할 수 없기 때문에 할 수 없다

 - Non DI closure 사용 시 mock function 을 주입할 수 없는데 이를 가능하게 하려면 mockery 라는 라이브러리를 쓰거나 엄청 복잡한 과정을 거쳐야 한다.

 - class는 깔끔하게 나온다. class는 그냥 method를 override 해서 쓰면 된다. 거기다 꽤나 직관적이다.


#### 기록 & 기억할 것.

 - 일단 제일 크게 기억 할 것 : closure는 prototype method 를 부르면 **method를 copy 해서 갯수만큼 만드는 것**이고 class는 **하나의 method 를 공유하는 것!**

 - 3번 테스트에 관해서는 예제코드들은 거의 알기 어려웠다. 한참을 보다가 겨우 문맥을 이해한 수준인데 조금 더 열심히 체크해보자!
