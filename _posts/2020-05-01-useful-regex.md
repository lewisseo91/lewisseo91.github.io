---
layout: post
title: 유용한 regex
tags: [javascript, regex]
---

#### 아래 분문은
#### - [https://welchsy.tistory.com/22](https://welchsy.tistory.com/22)
#### - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
#### 글을 참조하였습니다.

<br />

    정규표현식은 실무에서도 일정한 패턴의 무언가를
    검사(test), 치환(replace), 찾기(match)를 할 때 속도도 빠르고
    (string을 다 split해서 method를 적용시키는 것보다)
    코딩테스트에서도 복잡해 보이는 걸 간단하게 만들어준다. 
    **물론 정규표현식에 대한 이해도가 높을 경우에 간단해 보이는 것이다.

<br />

### 쓸만한 정규표현식(regex)

<br />


### 시작, 종료

 - ^ : 시작

 - $ : 종료

{% highlight javascript%}
    var string = 'abcdabcd';
    var match_arr = string.match(/^b/);
    console.log(match_arr);
    /* 결과값 : null */
    match_arr = string.match(/^a/);
    console.log(match_arr);
    /* 결과값 : ["a"] */

    match_arr = string.match(/b$/);
    console.log(match_arr);
    /* 결과값 : null */
    match_arr = string.match(/d$/);
    console.log(match_arr);
    /* 결과값 : ["d"] */
{% endhighlight %}

<br />


### []

<br />


 - [<문자 : ex) abc, ㄱㄴㄷ>] : 괄호안의 문자와 맞는 것. (abc : a or b or c)

 - [^<문자 : ex) abc, ㄱㄴㄷ>] : 괄호안의 문자가 아닌것. (abc : !a and !b and !c)

 - [문자1-문자2] : 문자1 부터 문자2 까지 (a-z : a부터 z까지, 0-9 : 0부터 9까지)

{% highlight javascript%}
    var string = 'abcdabcd';
    var match_arr = string.match(/[abc]/);
    console.log(match_arr);
    /* 결과값 : ["abc"] */
    match_arr = string.match(/[^abc]/);
    console.log(match_arr);
    /* 결과값 : ["d"] */
    match_arr = string.match(/[a-c]/);
    console.log(match_arr);
    /* 결과값 : ["abc"] */
{% endhighlight %}

<br />

### |

<br />

 - (abc\|abcd) : \|의 좌측, 우측 문자 중 맞는 것. (abc or abcd)


{% highlight javascript%}
    var string = 'abcdabcd';
    var match_arr = string.match(/(abc|efg)/);
    console.log(match_arr);
    /* 결과값 : ["abc", "abc"] */
{% endhighlight %}

<br />


### 반복 (*, +, ? , {n}, {n,}, {n,m})

<br />

 - ?     : 앞 패턴이 0회 또는 1회 반복되는 것을 찾음.

 - \*     : 앞 패턴이 0회 또는 그 이상 반복되는 것을 찾음.

 - \+     : 앞 패턴이 1회 또는 그 이상 반복되는 것을 찾음.

{% highlight javascript%}
    var string = 'abcdeabcdabcabcd';
    var match_arr = string.match(/(abc)*/g);
    console.log(match_arr);
    /* 결과값 : ["abc", "", "", "abc", "", "abcabc", "", ""] 0회부터 그 이상 */

    match_arr = string.match(/(abc)+/g);
    console.log(match_arr);
    /* 결과값 : ["abc", "abc", "abcabc"] 1회 이상만 */

    match_arr = string.match(/(abc)?/g);
    console.log(match_arr);
    /* 결과값 : ["abc", "", "", "abc", "", "abc", "abc", "", ""] 0회 또는 1회만 */
{% endhighlight %}

 - {n}   : 앞 패턴이 n회 반복되는 것을 찾음.

 - {n,}  : 앞 패턴이 n회이상 반복되는 것을 찾음.

 - {n,m} : 앞 패턴이 n회이상부터 m회 이하까지 반복되는 것을 찾음.

{% highlight javascript%}
    match_arr = string.match(/(abc){2}/);
    console.log(match_arr);
    /* 결과값 : ["abcabc"] 2회반복 (현 string 에서는 3회 반복이므로 짤려서 match_arr[1] 에도 들어감.) */

    match_arr = string.match(/(abc){3,}/);
    console.log(match_arr);
    /* 결과값 : null 3회이상 반복 (abc<b>d</b>abcabc 이므로 null) */

    match_arr = string.match(/(abc){1,2}/g);
    console.log(match_arr);
    /* 결과값 : ["abc", "abc", "abcabc"] 1회이상 2회이하 반복 */
{% endhighlight %}

<br />


### 모든 한개

<br />


 - . : 모든 것 하나(다음 것이라든지 . 찍는 위치에 따라)

{% highlight javascript%}
    var string = 'abcdabcd';
    match_arr = string.match(/^a./);
    console.log(match_arr);
    /* 결과값 : ["ab"] */
{% endhighlight %}

<br />

#### 특수문자

<br />

- \\ : []와 같이 패턴으로 정립되어있는 문자들을 진짜 string 안의 문자로 찾고 싶을 때 \\[\\] 과 같은 형태로 만들어 줌.

- \\s : 공백 문자.

- \\S : 공백 문자 빼고 전부.

- \\w : 알파백문자,숫자,_

- \\W : 알파백문자,숫자,_ 빼고 전부.

- \\d : 정수

- \\D : 정수 빼고 전부.

<br />

#### 플래그 (flag) 

<br />


 - g(global) : 패턴에 맞는 모든 문자를 찾는다.

 - i(ignore case) : 대소문자 가리지 않는다.

{% highlight javascript%}
    var string = 'abcdabcd';
    var match_arr = string.match(/a/**g**);
    console.log(match_arr);
    /* 결과값 : ["a","a"] */
    string = 'abcdAbcd';
    match_arr = string.match(/a/**gi**);
    console.log(match_arr);
    /* 결과값 : ["a","A"] */
{% endhighlight %}