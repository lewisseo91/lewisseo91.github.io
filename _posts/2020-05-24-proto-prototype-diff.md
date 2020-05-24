---
layout: post
title: prototype과 __proto__의 차이
tags: [javascript, prototype]
---

#### 프로토타입을 이해하려고 하는 중입니다.
 
 <br />

 - **js**는 **prototype based language** 다.

 - 해당 사실을 이제야 안 자신이 부끄럽다. js base 개발을 3년이나 하면서 자신이 사용하는 언어의 base도 신경쓰지 않았다니..

 - **prototype** 과 **\_\_proto\_\_** 의 차이  
    
    프로토타입(prototype)은 new 생성자로 생성 시 프로토(\_\_proto\_\_)를 생성하는데 사용되는 객체다.

    프로토(\_\_proto\_\_)는 메서드를 사용가능하게 하는 체인을 사용하는 실제 객체다.

 - **프로토타입(prototype)**은, **클래스 원형을 확장**할 때 쓰이고 **프로토(proto)**는 **해당 클래스에서 파생된 객체**에 **담기는 정보**다.


#### 참고

[https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript](https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)

[https://blog.naver.com/PostView.nhn?blogId=izure&logNo=221036755518&parentCategoryNo=&categoryNo=23&viewDate=&isShowPopularPosts=true&from=search](https://blog.naver.com/PostView.nhn?blogId=izure&logNo=221036755518&parentCategoryNo=&categoryNo=23&viewDate=&isShowPopularPosts=true&from=search)

[https://stackoverflow.com/questions/186244/what-does-it-mean-that-javascript-is-a-prototype-based-language](https://stackoverflow.com/questions/186244/what-does-it-mean-that-javascript-is-a-prototype-based-language)