---
layout: post
title: 프로그래머스 - 네트워크 dfs/bfs
tags: [algorithm]
---

이해 가지 않았던 부분 손으로 풀어본 부분 (해답은 그냥 일반적인 dfs)

for 

  computers[0][0] => 물론 1
 dfs(computers, 0)

 !computers[0][0]  => 0 false => return 안함.

  computers[0][0] = 0 시작전에 0으로 만들어 줌
  for
  노드 수만큼 돌아가면서 computers[0][0] => [0][1]=> [0][2] 체크
  computers[0][0] = 0
  computers[0][1] = 1 됨 => dfs(computers, 1)
  computers[0][2] = 0 
  return true
  => answer ++ 
  연결된 1번 노드로 이동
  dfs(computers, 1)
  ... 반복 진행 -> 진행 할 것이 없으면 끝

  computers[1][1] 진행 => 이미 한번 진행해서 자동 0 
  ... 쭉쭉쭉