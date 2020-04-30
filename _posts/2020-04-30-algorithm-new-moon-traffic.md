---
layout: post
title: 추석 트래픽
tags: [algorithm]
---

**아래 알고리즘은 프로그래머스 레벨3 [추석 트래픽](https://programmers.co.kr/learn/courses/30/lessons/17676?language=javascript) 문제 입니다.**

### 문제 설명

#### 추석 트래픽

이번 추석에도 시스템 장애가 없는 명절을 보내고 싶은 어피치는 서버를 증설해야 할지 고민이다. 장애 대비용 서버 증설 여부를 결정하기 위해 작년 추석 기간인 9월 15일 로그 데이터를 분석한 후 초당 최대 처리량을 계산해보기로 했다. 초당 최대 처리량은 요청의 응답 완료 여부에 관계없이 임의 시간부터 1초(=1,000밀리초)간 처리하는 요청의 최대 개수를 의미한다.

#### 입력 형식

solution 함수에 전달되는 lines 배열은 N(1 ≦ N ≦ 2,000)개의 로그 문자열로 되어 있으며, 각 로그 문자열마다 요청에 대한 응답완료시간 S와 처리시간 T가 공백으로 구분되어 있다.
응답완료시간 S는 작년 추석인 2016년 9월 15일만 포함하여 고정 길이 2016-09-15 hh:mm:ss.sss 형식으로 되어 있다.
처리시간 T는 0.1s, 0.312s, 2s 와 같이 최대 소수점 셋째 자리까지 기록하며 뒤에는 초 단위를 의미하는 s로 끝난다.
예를 들어, 로그 문자열 2016-09-15 03:10:33.020 0.011s은 2016년 9월 15일 오전 3시 10분 **33.010초**부터 2016년 9월 15일 오전 3시 10분 **33.020초**까지 **0.011초** 동안 처리된 요청을 의미한다. (처리시간은 시작시간과 끝시간을 포함)
서버에는 타임아웃이 3초로 적용되어 있기 때문에 처리시간은 0.001 ≦ T ≦ 3.000이다.
lines 배열은 응답완료시간 S를 기준으로 오름차순 정렬되어 있다.

#### 출력 형식

solution 함수에서는 로그 데이터 lines 배열에 대해 초당 최대 처리량을 리턴한다.

### 풀이

해당 문제는 문제에 필요한 조건을 잘 정리하느냐 였다고 생각합니다.

열심히하다가 문제가 풀리지 않아서 해답을 보고 힌트를 얻어 작성하게 되었습니다.

**1. 해당 lines 의 로그들을 시작시간 - 종료 시간으로 나눈다.**

**2. 이후 시간 관리 배열에 넣고 차례대로 돌면서 처리량의 최대값을 찾는다.**

**3. 최대값은 어떻게?** 시작 지점 - 종료 지점, 종료지점 +1초 전, 후 다른 지점들이 포함하고 있는 지 확인. (시작지점 종료지점 사이, 종료지점 + 1초에 무언가가 있으면 그것은 겹치는 것.)

**4. 시작 지점 - 종료 지점을 둘 다 통과하는 않는 값 제외하고는 모두 더해 준다.**(시작 지점만 걸쳐있든, 종료 지점만 걸쳐있든, 둘다 걸쳐있든 더해주어야 하므로)

{% highlight javascript linenos %}
function solution(lines) {
    var answer = 0;
    lines = lines.sort( (a, b) => a - b);
    let time_stack = [];
    let max_traffic = 0;
    for(let i=0;i<lines.length;i++) {
        let time = lines[i].split(' ')[1];
        let duration = lines[i].split(' ')[2];
        let second = Number(time.split(":")[0]*60*60) + Number(time.split(":")[1]*60)+Number(time.split(":")[2]);
        let duration_num = Number(duration.replace('s',''));
        let sec_start = Math.round((second - duration_num + 0.001)*1000)/1000;
        let sec_finish = second;
        time_stack.push([sec_start, sec_finish]);
    }
    
    for(let i=0;i<time_stack.length;i++) {
        let begin = time_stack[i][1];
        let end = begin+1;
        
        let temp = 0;
        for(let j=0;j<time_stack.length;j++) {
              if( (time_stack[j][0] > begin && time_stack[j][0] >= end) || (time_stack[j][1] < begin && time_stack[j][1] <= end) ) {
                  // 예외
                } else {
                    temp++;
                }
        }
        if(max_traffic < temp) {
            max_traffic = temp;
        }
    }
    answer = max_traffic;
    return answer;
}
{% endhighlight %}