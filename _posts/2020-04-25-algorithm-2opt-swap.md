---
layout: post
title: 2opt-swap
tags: [algorithm]
---

 최근에 봤던 코딩 테스트 문제에서 물론 그리디로 푸는 문제였지만 알아채는게 너무 늦어서 시간부족으로 못 풀었던 문제의 키를 정리 해 보았습니다.

### 본문

 - 수학적 최적화에서 2-OPT는 외판원 문제(외판원이 여러 집을 들러서 설명해야 할 경우 최소비용으로 도달해야하는 루트를 구하는 문제)를 해결하기 위해 Croes가 제안한 지역 탐색 알고리즘.

 - 2-OPT를 통해 비용 개선이 가능하다는 것이 주요 아이디어. (경로가 꼬인 노선 재정렬을 통해)
 
 - 모든 유효한 조합을 비교하고 swap한다.

#### <center>swap</center>

{% highlight liquid linenos %}
    2optSwap(route, i, k) {
      1. route[1]에서 route[i-1]까지 순서대로 new_route에 추가
      2. route[i]에서 route[k]까지 역순으로 new_route에 추가
      3. route[K + 1]에서 끝까지 순서대로 new_route에 추가
      return new_route;
    }
{% endhighlight %}

#### <center>예제</center>

{% highlight liquid linenos %}
  example route: A ==> B ==> C ==> D ==> E ==> F ==> G ==> H ==> A
  example i = 4, example k = 7
  new_route:
      1. (A ==> B ==> C) // route[0] ~ route[3]
      2. A ==> B ==> C ==> (G ==> F ==> E ==> D) // route[0] ~ route[3] + (route[4] ~  route[7]).reverse 
      3. A ==> B ==> C ==> G ==> F ==> E ==> D ==> (H ==> A) // route[0] ~ route[3] + (route[4] ~  route[7]).reverse + route[rest]
{% endhighlight %}

#### <center>정리</center>

{% highlight liquid linenos %}
  repeat until no improvement is made { // 새로운 향상이 없을 때까지 계속 반복
      start_again: // 시작
      best_distance = calculateTotalDistance(existing_route) // 최적 거리 = 총 거리 (현재 길들)
      for (i = 0; i < number of nodes eligible to be swapped - 1; i++) { // 0부터 시작 swap 가능한 노드 숫자 만큼 진행
          for (k = i + 1; k < number of nodes eligible to be swapped; k++) { // i+1 부터 시작 (0이면 1, 1이면 2) swap 가능한 노드 숫자 만큼 진행
              new_route = 2optSwap(existing_route, i, k) // 2opt 스왑 진행 (위 설명 참조)
              new_distance = calculateTotalDistance(new_route) // 새로운 거리 = 총 거리(새로만든 길들)
              if (new_distance < best_distance) { // 새로운 거리가 더 최소면
                  existing_route = new_route // 적용
                  goto start_again // 다시 시작.
              }
          }
      }
  }
{% endhighlight %}

 - 특정 노드에서 출발/도착하는 경우라면 해당 점을 swap 후보에서 제외하여야 한다. (순환 문제 발생 가능성이 있음.)


 - 외판원 문제는 새로운 향상이 없을 떄까지 반복하므로 NP-난해 (다항 시간에 다대 일로 환산가능한 문제, 다항 시간안에 풀기 힘들다는 뜻)
   따라서 X 값이 주어지고 X값보다 비용이 적게 드는 회로가 있는 지 검색할 경우 NP-완전(다항 시간 안에 풀 수 있는 문제)가 된다.


### Javascript 2-OPT Swap

 - Javascript 에서 작동 시키기 위한 코드.

{% highlight javascript linenos %}
    function 2optSwap(array) {
        var i, j,
            temp,
            result = [];

        for (i = 0; i < array.length - 1; i++) {
            for (j = i + 1; j < array.length; j++) {
                temp = array.slice();
                temp[i] = array[j];
                temp[j] = array[i];
                result.push(temp);
            }
        }
        return result;
    }
{% endhighlight %}

 - 해당 코드를 적용시키면 array 내부 swap의 결과를 얻을 수 있게 되고, x 값이 주어졌을 경우에 x 값보다 비용이 적게 드는 회로를 구하거나 최소값을 구하면 된다.

 - 그리디는 array 안의 갯수도 적어서 이렇게 풀었다면 좋았을 것 같다!

### 참고 자료 
 - [https://ko.wikipedia.org/wiki/2-OPT](https://ko.wikipedia.org/wiki/2-OPT)
 - [https://ko.wikipedia.org/wiki/외판원_문제](https://ko.wikipedia.org/wiki/%EC%99%B8%ED%8C%90%EC%9B%90_%EB%AC%B8%EC%A0%9C)
 - [https://stackoverflow.com/questions/47114430/generating-a-2-opt-swap-neighborhood-from-a-javascript-array](https://stackoverflow.com/questions/47114430/generating-a-2-opt-swap-neighborhood-from-a-javascript-array)