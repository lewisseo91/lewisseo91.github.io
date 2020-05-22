---
layout: post
title: 실행 컨텍스트
tags: [javascript, corejavascript]
---

#### 코어자바스크립트 책을 보고 기억할 부분만 쓴 글입니다.
 
 <br />
  
 - 실행 컨텍스트 : **실행할 코드**에 **제공할 환경 정보**들을 **모아놓은 객체**
 
 <br />

 - 실행 컨텍스트 구성 방법 : es5 -> **함수 실행하면** es6+ -> **함수 실행하면 + 블록 {}에 의해서도**
 
 <br />

 - js 파일 열리는 순간 **전역 컨텍스트가 활성화** 된다.
 
 <br />

 - 이후 다른 함수의 실행이 있다면 **콜 스택**에 함수에 관련한 **실행 컨텍스트를 생성하고 담는다.**
 
 <br />

 - 실행 컨텍스트의 **구성**

   - **VariableEnvironment** : 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보, 선언시점의 LexicalEnvironment 스냅샷
   - **LexicalEnvironment(L.E)** : 초기는 VariableEnvironment와 같지만 변경 사항이 실시간으로 반영.
   - **ThisBinding** : this가 바라봐야 할 대상 객체.
 
 <br />

 - **VariableEnvironment** : environmentRecord (스냅샷), outerEnvironmentReference (스냅샷)

        최소 실행 시의 스냅샷을 유지.
 
 <br />

 - **LexicalEnvironment** : environmentRecord, outerEnvironmentReference

        environmentRecord 는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.  
        컨텍스트 내부 전체를 쭉 훑어나가 순서대로 수집한다.  
        그 과정에서 *호이스팅*을 수행한다. (호이스팅 : 끌어올리다 hoist + ing)  
        호이스팅의 의미대로 js엔진이 실제로 끌어올리는 것은 아니다!  
        개념을 이해하기 위해 끌어올린 것으로 간주하는 것.  

        outerEnvironmentReference 는 *선언될 당시*의 LexicalEnvironment를 참조한다.  
        따라서 scope의 유효범위가 생기게 된다. (선언 시의 범위 생성)  
        스코프는 내부에서 외부접근은 가능하지만 외부에서 내부 접근이 불가능한 것을 말하고,  
        스코프를 내부에서 외부로 차례로 검색해 나가는 것을 스코프 체인이라고 한다.  
        이를 가능케 하는 것이 outerEnvironmentReference이다.  
 
 <br />

  - 모든 코드는 **실행 컨텍스트가 활성화 상태**일 때 **실행**된다.
 
 <br />

 - 외부에서 내부의 함수 or 변수에 접근할 수 없기 때문에 **변수 은닉화**가 가능하다.

        변수 은닉화가 중요한 것은 남에 의해 
        모르는 사이에 코드가 변경될 여지를 줄여주기 때문
 
 <br />

#### 다른 블로그 보고 참고로 더 정리한 부분

 - IIFE 중 클로저 활용 패턴(모든 IIFE가 클로저 인 것은 아니기 때문에)에서 **비공개 변수**를 가질 수 있음.
 
 <br />

 - 클로저 내부의 변수들은 비공개 변수(closure는 closed기 때문에 closure 다)기 때문에 **변수 은닉화**가 가능하다.
 
 <br />

 - 실행 컨텍스트의 기초 : 실행 컨텍스트는 **Creation Phase** 와 **Execution Phase**로 나뉘어진다.
 
 <br />
 
 - 모든 실행 컨텍스트는 같은 형태(feature)를 가진다. 같은 형태들은 **Creation Phase**에서 만들어 진다.
 
 <br />

 - **Creation Phase**  

    1. function에 의해 불린 **객체에 대한 참조**가 메모리에 저장된다. 

    2. **this**가 생성되고 메모리에 저장된다. **function 내**에서, function에 의해 불린 **객체가 참조** 된다. (function 안의 function)

    3. **outerEnvironmentReference** 즉, 스코프 체인이 생성된다.

    4. **environmentRecord** 메모리 컨테이너에 variables, arguments, function declarations 가 생성된다.  
        모든 variables, arguments 는 초기값 'undefined'로 생성된다.
 
 <br />

 - **Execution Phase**

    1. Creation Phase 후, JS Engine은 function 내의 코드를 동기적으로 실행한다. (한번에 한 줄, 위에서 아래로)
 
 <br />

 - **Execution Phase**는 값들(values)을 return 하는 것에 대한 것이다.
 
 <br />

 - **Execution Phase**는 호이스팅이 일어나고 undefined 였던 값을 메모리 공간에서 **값의 참조**에 대해 찾는다. (스코프 체인도 여기서 적용)
 
 <br />

 - 변수에 값이 할당 된다면 해당 값을 'undefined'에서 '해당 값'으로 변경해 준다.

<br /> 

#### 참고

#### [Functions & Execution Contexts](https://medium.com/@olinations/functions-execution-contexts-6d5d71b74d51)
#### [제로초 실행 컨텍스트 강좌](https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0)