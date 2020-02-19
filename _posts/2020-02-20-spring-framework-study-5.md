---
layout: post
title: 예제로 배우는 스프링 프레임워크 입문 (2019.02 버전) 5일차
tags: [spring]
---

스프링 공부 5일차 스프링 프레임워크 

 - petclinic

 
 - 지난 과제 
 - Lastname 검색 -> FirstName 검색으로
 - 같은 단어가 아니라 포함하는 단어면 검색 결과 도출되게
 - owner에 age 추가


 - 풀이 
 - lastName -> firstName 검색으로 변경 
        -> lastName으로 검색하는 부분을 먼저 찾자  
        -> view 단을 들어가야겠네? (mvc 구조니까~)  
        -> resources/templates 들어감  
        -> findOwners.html 찾음 (오!)  
        -> 검색 field input 부분에 lastName value  
        -> firstName으로 일단 변경  
        -> 화면으로 돌아가서 application stop and restart -> 검색  
        -> 나오긴 하는데 firstName & lastName 에 모두 들어간 a를 찾고 있었다.  
        -> firstName 만 LIKE SEARCH하게 해야겠네 
        -> 그렇다면 controller에서 조정하는 무언가가 있다는 뜻이군 (mapper 와 연관된 무언가가 말이야.) 
        -> main/java/org.springframework.samples.petclinic 들어가서 OwnerController 접속 
        -> findOwner 버튼 누를 시에 (/owners 로 post를 보내고 있으니) @getMapping("/owners")를 찾아본다.  
        -> results에서 받을 때 this.owners.findBylastName(owner.getLastName())으로 받고 있는 걸 알게 됨.  
        -> 아하 일단 owners의 메소드를 findBylastName으로 받는 것을 firstName으로 변경하거나 추가해준 후에 firstName으로 검색하는 기능을 추가해야겠구나 아이디어를 얻음  
        -> OwnerRepository에 접속 -> Collection<Owner> findByLastName(@Param("lastName") String lastName); 에서 sql로 like search로 lastName 기준으로 결과를 뽑아오고 있다는 것을 알게 됨.  
        -> Collection<Owner> findByfirstName(@Param("firstName") String firstName); 을 만들고 동일 쿼리에서 firstName 기준으로 query 하도록 만듬  
        -> 테스트 -> 성공  
    
 - 같은 단어가 아니라 포함하는 단어면 검색 결과 도출되게  
        -> 어? 이미 포함하는 단어로 LIKE SEARCH 하고 있으니까 더 쉽게 됨.  
        -> 그렇다면 EQUAL은? = 연산자 겠지. LIKE SEARCH를 EXACT SEARCH로 변경해 봄  
        -> 테스트 -> 성공  
        
 - owner에 age 추가
        -> owner라는 객체는 column으로 항상 age를 가지고 있겠군  
        -> owner 모델부분 찾음 -> owner 모델에서 owner age column 추가 하고 getter & setter 메소드 추가  
        -> 추가는 됐는데 오류가 엄청 발생 (오잉 머지?)  
        -> 아하 db가 그냥 유연한 오브젝트 객체가 아니라 정해져 있구나 깨달음  
        -> resources/db/hsqldb -> schema.sql을 찾음  
        -> 그렇지 schema에 내가 age를 column으로 쓰겠다고 선언했었어야지 생각하며 추가 -> 에러  
        -> 에러 로그를 자세히 읽어보니 example data가 존재하고 그 존재한 데이터에 age가 없는 것을 알아냄  
        -> data.sql 접속 후 age 수정  
        -> stop and restart  
        -> 테스트 -> 성공  