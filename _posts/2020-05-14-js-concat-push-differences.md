---
layout: post
title: 자바스크립트 concat & push 차이
tags: [javascript]
---

#### [https://velog.io/@smooth97/-CHAPTER-4-](https://velog.io/@smooth97/-CHAPTER-4-)를 보고 참고하였습니다.
 
 <br />
  

 - 개발할 때 주로 concat 과 push 중 어떤걸 자주 쓸까 고민할 때가 있는데 해당사항을 정리하고자 썼습니다.

 - push는 배열 자체를 수정 arr.push 할 때 배열에 추가

 - concat은 이전 배열에 새로운 것을 합쳐서 새 배열을 반환

 - 테스트 해봤을 때 신기했던 점은 
   사이즈가 적을 경우에는 push가 조금 더 느리고 
   사이즈가 클 경우에는 concat이 훨씬 느렸다.

   그래프로 치면 concat은 시작은 천천히 그렇지만 크기가 커지면 커질수록 복사하고 새로운 배열을 반환하는 것으로 시간이 기하급수적으로 늘어났다.


 - 사진은 추후에 업데이트 할 예정입니다.


 #### 참고

 #### [https://stackoverflow.com/questions/44572026/difference-between-concat-and-push](https://stackoverflow.com/questions/44572026/difference-between-concat-and-push)
 #### [https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki](https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki)