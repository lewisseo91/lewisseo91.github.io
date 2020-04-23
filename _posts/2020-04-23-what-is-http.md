---
layout: post
title: HTTP 란
tags: [basicCS, network, developerRoadMap]
---

HTTP 란 무엇인가?

### ** 아래 글은 surim014 님의 글 [HTTP란 무엇인가?](https://velog.io/@surim014/HTTP%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80) 을 보고 정리한 글입니다.

 **HTTP (HyperText Transfer Protocol)**

 - 텍스트 기반 통신 규약으로 인터넷에서 데이터를 주고 받을 수 있는 프로토콜.

 **HTTP의 동작**

 - 요청과 응답. (요청 : client -> server, 응답 : server -> client)

 - HTML 문서만이 HTTP 정보 통신을 위한 유일한 정보 문서가 아님 (JSON, XML 등등)

 **HTTP 특징**

 - HTTP 메시지는 HTTP 서버, 클라이언트에 의해 해석됨.

 - TCP/IP를 이용하는 응용 프로토콜이다.

 - HTTP는 연결 상태를 유지하지 않는 비연결성 프로토콜이다. (응답과 요청으로 이루어짐, Cookie & session 으로 관리)

 **Request 종류**

 - GET, POST, PUT, DELETE, HEAD 등등

 - 시작줄 : \<HTTP Method\> \<사이트 주소\> \<HTTP 버전\>

 - 헤더 : 요청 정보 Ex) User-Agent, Upgrade-Insecure-Requests, Cache-Control ......

 - 본문 : 헤더 밑에 한 줄 띄우고 작성, 요청 시 함꼐 보낼 데이터 

 **Response**

 - Status Code : 
 
    - 1xx(조건부 응답) : 요청 받았고 작업을 계속한다.

    - 2xx(성공) : 성공적 처리

    - 3xx(리다이렉션 완료) : 요청 마칠 때 추가 동작을 해야한다.

    - 4xx(요청 오류) : 클라이언트에 오류가 있음.

    - 5xx(서버 오류) : 서버가 유요한 요청을 명백하게 수행하지 못함.

 - 시작줄 : \<HTTP 버전\> \<Status Code\> \<Status Message\>

 - 헤더 : 응답 정보 Ex) Connection, Content-Encoding, Content-Length ......

 - 본문 : 응답 메시지에 데이터를 담아서 보내줌.