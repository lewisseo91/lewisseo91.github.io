---
layout: post
title: 예제로 배우는 스프링 프레임워크 입문 (2019.02 버전) 4일차
tags: [spring]
---

스프링 공부 4일차 스프링 프레임워크 

 - petclinic 으로 시작
 - src/resources -> application.properties 에서 logging level을 INFO 레벨에서 DEBUG로 변경하면 더 자세한 LOG를 볼 수 있음.
 - org.springframework.servlet.DispatcherServlet 패키지가 실행됨. (스프링이 제공하는 DispatcherServlet 이 초기화가 됨. refresh하면 안 보일 것임. -> spring mvc에서 공부할 것.)
 - GetMapping에서는 요청한 url을 받아줌.
 - intelliJ에서 디버그 클릭하고 debug run 하면 break point 찍은 곳은 다 걸림.
 - 넘기려면 f8 또는 f9 


 과제 
 - Lastname 검색 -> FirstName 검색으로
 - 같은 단어가 아니라 포함하는 단어면 검색 결과 도출되게
 - owner에 age 추가