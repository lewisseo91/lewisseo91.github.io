---
layout: post
title: javascript 클래스와 closure의 차이 1/3
tags: [javascript]
---


### ** 아래 글은 Richard Marmorstein 님의 글 [Javascript Classes v. Closures (1/3)](https://medium.com/engineering-livestream/javascript-classes-vs-closures-cf6d6c1473f) 을 보고 정리한 글입니다.

<br />

#### JS는 class 와 closure 를 모두 지원하고, 두 개의 패턴 모두 "arguably" 같다. 적어도 비슷한 상황에서 비슷한 효과를 낸다고 말할 수 있다. 

#### 그래도 둘이 완벽히 같은 것은 아니다. 차이점을 알아보도록 하자.

<br />

#### <center>1. closure 패턴은 class 패턴보다 좀 더 lintable 하다.</center>

<br />

 - closure 패턴은 때때로 "factory class pattern" 이라고 불린다.
 
 - 같은 패턴 안에서 스펠링 오류가 발생할 경우 closure는 linter에서 잡을 수 있는 반면, class에서는 탐지하지 못한다.
 
 - 왜냐하면 javascript object(객체)가 anarchy 하기 때문.

 - class를 만약에 누가 스펠링 오류로 된 다른 객체를 생성할 경우 완벽하게 유효하게 된다. (그러나 잘못쓰이고 있는 것.)

 - closure는 반면에 보호되어 있다. closed 되어 있기 때문에 closures 라고 부르는 것.
  
 - 그 어떠한 것도 closures에 접근할 수 없다. (스펠링 오류로 된 다른 무언가가 침입할 여지가 없다는 뜻.)

 - 이러한 경우에 closures 가 linter에서 걸러낼 수 있다.