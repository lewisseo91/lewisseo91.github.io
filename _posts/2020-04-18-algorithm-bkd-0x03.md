---
layout: post
title: 바킹독 알고리즘 공부 0x03
tags: [basicCS, algorithm]
---

JS로만 공부를 하다보니 메모리에 대한 이해, 조금 더 컴퓨터의 본질적인 부분들에 접근하고 싶은 마음이 커져서 시작하게된 바킹독님의 c++알고리즘 공부. 코딩테스트를 위한, 효율적 코딩 작성을 위해 알려주는 부분들이 많아 좋다.

Note : 배열 
        - O(1)에 K번째 원소를 확인/변경 가능 
        - 추가 소모 메모리 양(overhead)가 거의 없음.
        - cache hit rate 가 높음.
        - 메모리 상에 연속한 구간을 잡아야해서 할당 제약이 있음.
       벡터(Vector)
        - 크기를 자유 자재로 줄 일수 있다.
        - push_back, pop_back 함수가 있음.
        - vector 에서 = 은 deep copy 다
        - 중간에 insert or erase 시 v.begin() 을 기준으로 +1 ~ +n까지 설정한다.
        - for 구문에서 < i <= v.size() -1 > 로 되는 코드를 사용 할 시 size 가 0 인 배열 일 때 unsigned_int 0 - int 1 이 되어 값이 잘못 나오기 때문에 < v.size() 를 사용하는 편이 현명하다.

원본 자료 : https://blog.encrypted.gg/927