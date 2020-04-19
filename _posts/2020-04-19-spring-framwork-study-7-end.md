---
layout: post
title: 예제로 배우는 스프링 프레임워크 입문 (2019.02 버전) 7일차 - 마지막
tags: [spring]
---

스프링 공부 7일차 - 마지막 스프링 프레임워크 

petclinic
    AOP, PSA 에 대하여
    
AOP
 - Aspect Oriented Programming
  -> 관심사 기준 프로그래밍 & 관점 지향 프로그래밍 정도로 해석될 수 있다.
  -> 코드에서 같은 일을 하는 여러개의 코드를 전부 수정할 때 유용
  -> 부가적 공통의 일을 모으는 역할

 - ex) @transactional (Spring AOP) Annotation 형태
  -> stopwatch 를 통해 언제 얼마나 실행 되었는지 알고 싶을 때 모든 곳에 복사해서 넣는 것은 비효율적.

 - AOP 방법
  -> 1. 컴파일
    - A.java --(AOP 끼워넣음)--> A.class 로 탑재됨. (compiler 가 끼워줌)
  -> 2. 바이트코드
    - A.java -----> A.class ---(클래스 로더가 읽어 본 후)--> -- 클래스 로딩시점에 바이트 코드 조정(AOP) ---> 메모리에서 적용됨.
  -> 3. 프록시 패턴 
    - 디자인 패턴을 사용해 AOP 효과를 낸다. 

 - AOP는 기존의 코드를 건드리지 않고 새 코드를 넣는 방법. (annotatar) 
 - 스프링 AOP @LogExecution, @Target(Method), @Retention(Runtime), @Aspect, @Around

 - Annotation 을 사용한 방법은 좀 더 명시적인 방법이다.
 
 PSA
  - Portable Service Abstration
   -> 서비스 추상화
   -> 기존의 코드기반을 변경하지 않은 채로 사용 기술에 따라 바꿔 끼울 수 있는 것.
  - do get, do post 와 같은 요청들 -> getMapping 으로 추상화 한다.
  - 톰캣 기반인 프로젝트를 코드 기반을 그대로 두고 다른 것으로 사용이 가능.
  - @cacheable 같은 것. 