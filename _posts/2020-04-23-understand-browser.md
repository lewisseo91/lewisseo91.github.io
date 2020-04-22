---
layout: post
title: 브라우저 URL 입력 시 일어나는 일 
tags: [basicCS]
---

브라우저 URL 입력 시 일어나는 일 

### ** 아래 글은 owlgwang 님의 글 [웹 브라우저에 URL을 입력하면 어떤 일이 일어날까]](https://owlgwang.tistory.com/1) 을 보고 정리한 글입니다.

URL 엔터 후 일어나는 일

 0. 엔터 입력
 1. 웹 브라우저가 URL을 해석함. ( "Scheme: [//[user:password@]host[:port]][/]path[?query][#fragment]")
 2. 문법에 맞으면 punycode encoding 을 url 부분에 적용. ( punycode : 유니코드 문자열을 호스트 이름에서 허용된 문자만으로 인코딩하는 방법 RFC 3492)
 3. HSTS 목록을 로드해서 확인. (HTTP Strict Transport Security : http 대신 https 만을 사용하여 통신해야한다고 웹사이트가 브라우저에 알리는 보안 기능)
 4. DNS 조회 (요청 보내기 전 Domain cache 되어 있는지 확인 --> 없으면 로컬 hosts 파일에서 참조 가능한 Domain 있는지 확인 --> 1,2 둘 다 없으면 network stack에 구성돼 있는 DNS로 요청을 보냄. 일반적으로 Local router, ISP 캐싱 DNS)
 5. ARP로 대상 IP & MAC Address를 알아낸다.(ARP broadcast를 보내 확인해야 함. --> ARP broadcast : ARP 를 broadcast 하는 것 = mac address 통신 시도 , broadcast : 로컬 랜 상 붙어 있는 네트워크 통신을 하는 것.)
 6. 대상과 TCP 통신을 통해 socket을 연다.
 7. HTTPS인 경우 TLS Handshake
 8. http 프로토콜로 요청한다. (http라면 connection set-up 이후, https라면 handshake 한 이후)
 9. http 서버가 응답한다. (httpd 서버가 요청을 수신 --> 요청을 매개변수로 구분(ex. http method(get,put), 도메인, 요청 경로) --> 가상 호스트 있는 지 확인 --> get 요청 수락 가능 확인 --> 클라이언트가 ip, 인증을 통해 method가 사용가능한 지 확인 --> rewrite module 이 설치 되어 있으면 요청 rule 중 하나와 일치하도록 시도 --> 서버 요청에 해당하는 콘텐츠 가져옴 --> 핸들러에 따라 파일 구문 해석)
 10. 웹 브라우저가 그린다. 랜더링
 11. 렌더링이 완료 후 브라우저는 Javascript 실행을 통해 DOM과 CSSOM이 변경 될 수 있는데, 레이아웃이 수정 되는 경우 페이지 렌더링 및 페인팅을 다시 수행함.


 추가 설명 중 기억하고 싶은 것.

    *5. ARP broadcast를 보내 확인. [ARP broadcast : ARP 를 broadcast 하는 것 = mac address 통신 시도 (broadcast : 로컬 랜 상 붙어 있는 네트워크 통신을 하는 것.)]
            ARP cache 있는 경우 --> MAC 주소 반환 
            ARP cahce 없는 경우 --> 1. 대상 IP address가 local subnet 에 있는 지 확인하기 위해 routing table 조회 
            ARP cahce 없는 경우 --> 2. 있으면 subnet 연관 interface 사용, 없으면 기본 gateway subnet 과 연관된 interface 사용 
            ARP cahce 없는 경우 --> 3. network libary 가 link layer(2)에 ARP 요청을 보냄. 
            ARP cahce 없는 경우 --> 4. 응답에서 target의 MAC address와 IP address 로 DNS 프로세스 다시 시작
            ARP cahce 없는 경우 --> 5. DNS 53번 포트 열어 UDP 요청 [응답 데이터가 크면 TCP]
            ARP cahce 없는 경우 --> 6. Local router/ ISP DNS 에 없는 경우 SOA에 도달할 때까지 재귀요청을 보내 응답을 받는다.)

    *6. 브라우저가 TCP 통신 시도
            1. 브라우저가 대상 서버 IP주소를 받아 URL에서 해당 포트 번호를 가져와 TCP socket stream 요청
            2. TCP segment가 만들어지는 Transport Layer(4)로 전달. 대상포트 header에 추가, source port 가 동적 포트 범위내에서 임의 지정됨.
            3. tcp segment를 Network Layer(3)로 전달. segment header에 대상 컴퓨터 IP주소, 현재 컴퓨터 IP주소가 삽입된 packet 구성.
            4. packet이 Link Layer(2)로 전달. MAC address 와 gateway MAC Address를 포함하는 Frame header 추가 (gateway MAC address 모르면 ARP로 찾아야함.)
            5. packet이 ethernet, wifi, cellular data network 중 하나로 전송
            6. packet local subnet router 도착, as 경계 router들을 통과 --> router에서는 packet IP header에서 target address 추출해 적당하고 hop으로 routing IP header의 TTL 필드는 통과하는 라우터에 대해 하나씩 감소 --> TTL 필드가 0이 되거나 현재 router 대기열에 공간 없으면 네트워크 정체로 packet 삭제
            7. TCP 통신. Connection Set-Up --> Data Transfer --> Connection Close

    *10-1. 서버가 리소스(HTML, CSS, JS, Image 등)를 브라우저에 제공
            - 구문 분석 - HTML, CSS, JS
            - 랜더링 --> DOM Tree 구성 (dynamic object model) --> 렌더 트리 구성 --> 렌더트리 레이아웃 배치 --> 렌더 트리 그리기.
    *10-2. 브라우저 구조
            - User Interface : 주소 표시줄, 뒤/앞 버튼, 북마크 등등 (요청 페이지가 표시도니 창 제외한 모든 부분)
            - Rendering Engine : 요청된 콘텐츠를 표시함.
            - Browser Engine : UI와 Rendering Engine사이 작업 통제
            - Networking : 독립적 구현, http 요청과 같은 network 호출을 처리
            - UI backend : 콤보 상자, 창과 같은 기본 위젯을 그리는데 사용, 운영체제 사용자 인터페이스 method 사용
            - Jacascript Engine : Javascript 코드를 구문 분석하고 실행하는 데 사용.
            - Data Storage : 쿠키같이 로컬 저장해야하는 데이터들, localStorage, indexedDB, webSQL, FileSystem 같은 수단이 있음.
    *10-3-1. HTML parsing
            - 렌더링 엔진이 요청된 문서의 내용을 네트워킹 계층에서 가져옴. 8kb 단위로 이루어짐.
            - HTML 마크업을 parse tree로 만드는 HTML parser 기본 작업
            - 생성된 parse tree는 DOM노드와 속성 노드의 트리. HTML 문서의 객체 표현과 HTML 요소의 인터페이스, 트리 root는 "Document" 객체이다.
            - 스크립팅 조작전에는 마크업, DOM은 거의 일대일 관계를 유지한다.
    *10-3-2. HTML parsing 알고리즘
            - HTML은 regular top-down 방식이나 bottom-up parsers를 사용할 수 없음. (이유 : 1. 관대한 언어, 2. 브라우저가 일반적 오류 허용 범위를 갖고 있다. 3. HTML 파싱되는 동안 변경 가능성이 있음.)
            - 일반적 parsing 기술을 사용할 수 없어 사용자 정의 parser를 사용한다.
            - 토큰화, 트리구조화 2단계로 구성.
    *10-4. CSS parsing
            - CSS lexical and syntax grammar를 사용해 css 파일, style 속성 값을 parsing 함.
            - 각 css file이 stylesheet object로 parsing 됨. 각 object에는 css syntax에 해당하는 선택자, 객체가 일치하는 css syntax이 있다.
            - css 는 regular top-down 또는 bottom-up parsers 가능
    *10-5. Page Rendering
            1. DOM 노드 탐색, 각 노드에 대한 css값 계싼해 "frame tree" 또는 "render tree"를 만듬.
            2. 자식 노드 width와 수평 margin, border, padding을 함해 frame tree 아래 쪽 각 노드 기본 너비를 계산.
            3. 각 노드의 사용 가능한 너비를 자식 노드에 할당하여 각 노드 실제 width 값 계산
            4. 텍스트 배치 적용 하위 노드 height, margin, border, padding 을 합해 각 노드 높이 상향식 계산. (자식 -> 부모)
            5. 각 노드 좌표 계산.
            6. float, absolutely, relatively 같은 속성이 있을 경우 더 복잡하게 적용 됨.
            7. 페이지 어느 부분을 그룹으로 애니메이션 화 할 수 있는지 설명하는 레이어를 만듬. frame object/render object는 레이어에 할당.
            8. 텍스처가 페이지 각 레이어에 할당
            9. frame object/render object를 통해 각 레이어 별로 그리기 명령 실행
            10. 1-9 모든 단계를 웹페이지 렌더링 된 마지막 시간에 계산 된 값을 재사용할 수 있기에 점진적 변경을하면 작업이 덜 필요해짐.
            11. 페이지 레이어가 합성 프로세스로 보내져 시각적 레이어(chrome, iframe,addon panels 등)와 결합됨.
            12. 최종 레이어위치가 계산되고 direct3D / OpenGL을 통해 합성 명령이 실행됨. GPU 명령 버퍼가 비동기 렌더링을 위해 GPU로 출력, frame은 window server로 전송됨.
    *10-6. GPU Rendering
            - 렌더링 프로세스 동안에 graphical computing layers가 CPU나 GPU 사용 가능.
            - graphical rendering 계산에 GPU를 사용하는 경우 그래픽 소프트웨어 레이어에서 작업을 여러조각으로 분할하여 렌더링 프로세스에 필요한 부동 소수점 계산을 위해 GPU 대용량 병렬 처리 사용 가능.

        