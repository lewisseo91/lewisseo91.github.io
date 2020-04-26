---
layout: post
title: node 필요했던 또는 유용했던 모듈들
tags: [nodejs]
---

 nodejs express 프레임 워크 사용 시 필요했던 또는 유용했던 모듈들입니다.

### 본문

 1. helmet

  - 웹 서버 http header 설정 모듈
  - http header 설정을 적절히 해 웹 취약성으로부터 보호
  - http response header 들의 보안 관련 세팅을 위한 미들웨어 function

     csp : Content-Security-Policy 해더로 cross-site scripting attacks (사이트에 스크립트 코드를 삽입하는 공격기법), cross-site injection(사이트에 쿼리를 통해 공격)
     hidePoweredBy : X-Powered-By 해더를 숨김 (X-Powered-By : 웹서버가 어떤 베이스를 가지고 돌아가고 있는지 보여주는 해더)
     hsts : Strict-Transport-Security 해더로 Secure Connection(TLS/SSL) 으로 하게 함.
     ieNoOpen : X-Download-Options IE 유저들이 내 사이트 내용들 다운로드 실행을 못하게 하기 위함. (IE 8 이상)
     noCache : Cache-Control, Pragma 해더를 설정. client-side caching을 disable시킴.
     noSniff : X-Content-Type-Options 해더로 선언된 content-type에서 벗어난 MIME-sniffing(훔쳐보기)를 막음.
     frameguard : X-Frame-Options 해더로 clickjacking 보호 를 제공한다. (clickjacking : 감춰진 링크를 사용자가 클릭함으로써 의도되지 않은 행동을 수행하게 속이는 것 - 가짜 페이지에서 행동을 하게 만들 수 있음.)
     xssFilter : X-XSS-Protection 로 cross-site scripting(사이트에 스크립트 코드/ 쿼리를 삽입하는 공격기법) 을 하지 못하게 막는 필터.

 2. session (express-session or cookie-session)
  
   - 세션 데이터 저장 모듈
   - express-session vs cookie-session
   - express-session
    - 세션 데이터를 서버에 저장하는 미들웨어
    - 세션ID가 세션 데이터가 아닌 쿠키 자체에만 저장된다.
    - 기본값으로 in-memory storage 이고 production 환경을 위해 디자인되어 있지 않다.
    - scalable session store를 설정(set-up)하는 것이 필요.
    - [https://github.com/expressjs/session#compatible-session-stores](https://github.com/expressjs/session#compatible-session-stores) 참고!
   - cookie-session
    - cookie-backed storage가 구현된 미들웨어
    - 세션 키만 serialize하는 것이 아니라 전체 세션을 cookie에 serialize 한다. ( serialize(직렬화) : 메모리나 저장공간에 담을 수 있도록 직렬로 만드는 것)
    - 세션 데이터가 상대적으로 적거나 primitive values로 encode 되어 있을 경우에만! 사용.
    - 브라우저가 쿠키마다 4096 bytes를 제공하고 있을 지라도 limit를 넘고 있는 지 확실히 해야하며, 도메인마다는 4093 bytes를 넘겨서는 안된다. cookie data는 클라이언트에 보여지게 될 것이므로 보안상 이슈가 생기게 된다.

    *express-session 에서 절대 기본 이름으로 session cookie 이름 쓰면 안됩니다. 다 뚫립니다.

 3. JWT 모듈 (토큰 베이스)
  
  - 인증, 정보교류시에 token으로 확인한다.
  - 토큰 베이스 일시에 세션유지가 필요 없고 필요한 타이밍 때마다 토큰 유효, 인증 검증, 권한 확인만 필요해짐.
  - 자가 수용적 (self-contained) 방식으로 정보를 안정성 있게 전달해준다.
  - header/payload/signature 3부분으로 나뉘어져있다.
  - header : typ (토큰 타입), alg (해싱 알고리즘 HMAC SHA256 또는 RSA)가 사용, signature에서 토큰 검증 시에 사용된다.
  - payload : 토큰에 담을 정보가 들어 있음. 1 piece = 1 claim, name : value 한 쌍. 
  - signature : header 인코딩 값과 payload 의 인코딩 값을 합친 후에 비밀키로 해쉬를 생성.

   pseudo code 구조 : HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret key)

 4. morgan (logger)

  - 로그 기록을 남겨준다.

 5. body-Parser

  - req.body가 bodyParser 사용 전에 디폴트 값 Undefined로 설정됨.
  - 그러나 express v4.16.0이상 부터 빌트인이므로 혹~~시나 이전버전 사용하시는 분들은 체크해보시면 좋음.
  

 6. pm2 (프로세스 매니저)

  - 서버 인스턴스들에 대한 로드 밸런싱, 스케일 업 또는 스케일 다운을 돕는다. 
  - 프로세스들이 계속 실행할 수 있는 환경을 제공. 
  - nodejs를 하다보면 한번에 에러로 서버가 모두 다 터져버리는 경험을 하게 되는데, pm2에 인스턴스가 2개이상으로 유지하게 된다면 단일 인스턴스가 터져도 다른 인스턴스가 유지되게 만들 수 있다.

 7. passport.js
  
  - 인증 미들웨어
   - passport-local : 쿠키-세션으로 인증
   - passport-jwt : jwt 인증
   ... 등등 (passport-github)
  - 순서 : 유저 모델 생성 -> passport 선언 -> passport-local, passport-jwt 설정 -> 사용 

### 참고 자료 
 - helmet, session[https://m.blog.naver.com/PostView.nhn?blogId=cck223&logNo=221019399455](https://m.blog.naver.com/PostView.nhn?blogId=cck223&logNo=221019399455&proxyReferer=https:%2F%2Fwww.google.com%2F)
 - helmet, session [https://expressjs.com/en/advanced/best-practice-security.html](https://expressjs.com/en/advanced/best-practice-security.html)
 - body-parser [https://medium.com/@chullino/1분-패키지-소개-body-parser를-소개합니다-하지만-body-parser를-쓰지-마세요-bc3cbe0b2fd](https://medium.com/@chullino/1%EB%B6%84-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%86%8C%EA%B0%9C-body-parser%EB%A5%BC-%EC%86%8C%EA%B0%9C%ED%95%A9%EB%8B%88%EB%8B%A4-%ED%95%98%EC%A7%80%EB%A7%8C-body-parser%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94-bc3cbe0b2fd)
 - jwt [https://velopert.com/2389](https://velopert.com/2389)
 - jwt [https://velopert.com/2448](https://velopert.com/2448)
 - passport 인증[https://velog.io/@ground4ekd/nodejs-passport](https://velog.io/@ground4ekd/nodejs-passport)
 - passport-jwt [https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)