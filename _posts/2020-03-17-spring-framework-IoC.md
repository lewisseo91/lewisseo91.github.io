---
layout: post
title: 예제로 배우는 스프링 프레임워크 입문 (2019.02 버전) 6일차
tags: [spring]
---

스프링 공부 6일차 스프링 프레임워크 

petclinic

IoC(의존성 주입)

Bean은 Ioc 객체이다. (자바로 작성된 소프트웨어 컴포넌트를 의미)

@autowired는 생성자를 변환해서 상황의 타입에 맞는 IoC 컨테이너 안에 존재하는
Bean을 자동으로 주입해주게 됨.

spring 4.3 이후 부터는 Bean이 자동으로 주입되는 것이 약속됨.(autowired 생략 가능)


이 의존성을 주입하는 방법이 3가지가 있는데
1. Field 수준에서 바인딩,
2. getter, setter 를 이용,
3. @autowired를 통해