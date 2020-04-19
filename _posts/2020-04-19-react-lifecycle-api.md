---
layout: post
title: 리액트 라이프 사이클 API
tags: [react]
---

리액트 라이프 사이클 API

### ** 아래 글은 벨로퍼트님 블로그 [누구든지 하는 리액트 5편](https://velopert.com/3631) 을 보고 기록한 글입니다.

컴포넌트 초기 생성 (브라우저에 나타나기 전)
 - constructor(props) : 컴포넌트 생성자 함수
 - componentWillMount() : 화면이 나가기 직저넹 호출 (리액트 v16.3 이후 Deprecated 됨.)
 - componentDidMount() : 화면에 나타났을 때 (D3, masonry) 와 같은 외부라이브러리 연동, axios, fetch를 통해 ajax를 요청하거나 DOM 속성을 읽거나 직접 변경하는 작업을 주로 함.

컴포넌트 업데이트 (props & state 변화에 따라)
 - componentWillReceiveProps(nextProps) : 새로운 props를 받았을 때 (새로 받을 props가 nextProps로 조회됨. 이전은 this.props) (리액트 v16.3 이후 Deprecated 됨.)
 - static getDerivedStateFromProps(nextProps, prevState) : props로 받아온 값을 state로 동기화 하는 작업을 해야하는 경우에 사용됨. ( 변경하고 싶은 state값은 setState가 아니라 return {key: value} 를 통해 전달 없으면 return null)
 - shouldComponentUpdate(nextProps, prevState) : 컴포넌트 최적화 작업에서 주로 사용 (변화를 발생하는 부분에서 업데이트를 해줄 때 Virtual DOM에 데이터를 한번 그려줘야 하는데 그때 한번 더 랜더링이 되기 떄문에 cpu 자원을 어느정도 소모하게 됩니다. 이를 줄여주기 위해 사용합니다.)
 - componentWillUpdate(nextProps, prevState) : shouldComponentUpdate 에서 true 를 반환했을 때만 호출 됨. false를 반환했었다면 호출 되지 않음. 주로 애니메이션 효과, 리스너 없애는 작업을 함. 이 함수 호출 이후에 render()가 호출됨.
 - getSnapshotBeforUpdate(nextProps, prevState) : 발생 시점 render() 이후, 실제 DOM 변화 발생 전에 발생
  render() -> getSnapshotBeforUpdate(nextProps, prevState) -> 실제 DOM 변화
 - componentDidUpdate(nextProps, prevState, snapshot) : render()를 호출하고난 다음에 발생, 이 시점에선 this.props 와 this.state가 바뀌어 있음. 파라미터를 통해 prevProps 와 prevState 조회 가능 getSnapshotBeforUpdate 에서 반환한 snapshot 값이 세번째 값으로 받아짐.

 컴포넌트 제거
 - componentWillUnmount() : 주로 등록했었던 이벤트, 외부 라이브러리 인스터스를 제거 (외부라이브러리에 dispose 기능이 있다면 여기서 호출)
 
 컴포넌트 에러

 - componentDidCatch(error, info) : 에러가 발생하면 DidCatch가 실행되고 setState에서 error: true로 설정하고, render에서 에러를 띄워주면 됨. (주의! : 자신의 render 함수 에러는 잡아낼 수 없지만, 자식 컴포넌트 내부에서 발생하는 에러들을 잡아낼 수는 있다.) (개발자모드에서는 에러메시지가 나올지라도 프로덕션에서는 나오지 않을 것임.)

 * 컴포넌트 에러 발생 이유 : 
  1. 존재하지 않는 함수 호출 (ex, props로 받았을 줄 알았던 함수가 전달되지 않았을 때)
  2. 배열이나 객체가 올 줄 알았는데, 해당 객체나 배열이 존재하지 않을 때. (undefined, render에서 !this.props.obj, this.props.array, this.props.array.length == 0 return null 로 막아줄 수 있음.)