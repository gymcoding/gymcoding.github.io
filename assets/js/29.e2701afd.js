(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{469:function(t,r,a){"use strict";a.r(r);var e=a(7),n=Object(e.a)({},(function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"들어가며"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#들어가며"}},[t._v("#")]),t._v(" 들어가며")]),t._v(" "),a("p",[t._v("2020년 9월 최근 "),a("a",{attrs:{href:"https://thingsboard.io/",target:"_blank",rel:"noopener noreferrer"}},[a("strong",[t._v("ThingsBoard 오픈소스 플랫폼")]),a("OutboundLink")],1),t._v(" 기반의 IoT 데이터 수집 및 시각화 프로젝트를 맡게되었다.\n프로젝트 업무 중 디바이스로부터 데이터를 수집하는 구간인 "),a("a",{attrs:{href:"https://thingsboard.io/docs/iot-gateway/what-is-iot-gateway/",target:"_blank",rel:"noopener noreferrer"}},[a("strong",[t._v("ThingsBoard IoT Gateway")]),a("OutboundLink")],1),t._v("에서 "),a("strong",[t._v("Apache Kafka를 통하여 데이터 수집")]),t._v("이라는 미션을 받았다.\n카프카는 대용량 메시지 처리에는 특화된 오픈소스로 알고 있었으며 이번 기회에 카프카를 자세히 이해하고, 이를 기반으로 Kafka Comsumer를 개발하여 데이터를 원활하게 수집하고자 한다.")]),t._v(" "),a("h2",{attrs:{id:"아파치-카프카란"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#아파치-카프카란"}},[t._v("#")]),t._v(" 아파치 카프카란?")]),t._v(" "),a("p",[t._v("Apache Kafka는 "),a("strong",[t._v("고성능 데이터 파이프 라인")]),t._v(", "),a("strong",[t._v("스트리밍 분석")]),t._v(", "),a("strong",[t._v("데이터 통합")]),t._v(" ​​및 "),a("strong",[t._v("미션 크리티컬 애플리케이션")]),t._v("을 위해 수천 개의 회사에서 사용하는 오픈 소스 분산 이벤트 스트리밍 플랫폼이다."),a("br")]),t._v(" "),a("h3",{attrs:{id:"역사"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#역사"}},[t._v("#")]),t._v(" 역사")]),t._v(" "),a("p",[t._v("아파치 카프카는 원래 링크드인이 개발한 것으로, 2011년 초에 최종적으로 오픈 소스화되었다. 2012년 10월 23일에는 아파치 인큐베이터로부터 완전히 빠져나왔다. 2014년 11월 링크드인에서 카프카를 만들던 일부 엔지니어들이 카프카에 집중하기 위해 "),a("a",{attrs:{href:"https://www.confluent.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Confluent"),a("OutboundLink")],1),t._v("라는 새로운 회사를 창립하였다.")]),t._v(" "),a("h2",{attrs:{id:"카프카를-사용해야-하는-이유"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#카프카를-사용해야-하는-이유"}},[t._v("#")]),t._v(" 카프카를 사용해야 하는 이유?")]),t._v(" "),a("p",[t._v("새로운 기술을 접할 때에는 그 기술의 등장배경이 굉장히 중요하다. 왜냐하면 등장배경을 이해하면 내가 이 기술을 왜 사용해야 하는지 더 잘알 수 있고 이 기술을 습득하는데 더 많은 모티베이션을 주기 때문이다.")]),t._v(" "),a("h3",{attrs:{id:"탄생배경"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#탄생배경"}},[t._v("#")]),t._v(" 탄생배경")]),t._v(" "),a("p",[t._v("아파치 카프카는 링크드인에서 발생하는 이슈를 해결하고자 개발된 기술이다. 링크드인에서 사용하던 기존 아키텍쳐에서는 "),a("strong",[t._v("데이터 처리의 복잡도가 증가")]),t._v("했고, "),a("strong",[t._v("데이터 파이프라인의 관리")]),t._v("가 어려웠다는 문제점이 있었다."),a("br"),t._v("\n다음 예를보자 하나의 Source에서 Destination으로 Data를 전송하게 된다면 큰 문제없이 데이터를 전송할 수 있다. 만약 문제가 발생한다고 하더라도 원인파악이나 트러블슈팅이 어렵지 않다.")]),t._v(" "),a("p",[a("img",{attrs:{src:"/assets/img/kafka1.png",alt:"이미지"}})]),t._v(" "),a("p",[t._v("그런데 오늘날 시스템은 데이터를 생산하는 곳(Source)이 굉장히 많아지고 있으며, 이러한 데이터(Data)를 활용하는 애플리케이션(Destination)들도 굉장히 많아지고 있다. 이렇게 Source와 Destination이 늘어나면서 이 둘을 연결해주는 데이터 파이프라인의 복잡도도 증가하고, 중간에 데이터 손실이나 데이터 정합성 이슈 그리고 관리의 효율성도 떨어지게 되었다.")]),t._v(" "),a("h4",{attrs:{id:"레거시-시스템-문제점"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#레거시-시스템-문제점"}},[t._v("#")]),t._v(" 레거시 시스템 문제점")]),t._v(" "),a("ol",[a("li",[t._v("엔드ㅡ투엔드(end-to-end) 연결 방식의 아키텍쳐")]),t._v(" "),a("li",[t._v("데이터 연동의 복잡도 증가(하드웨어, 운영체제, 장애 등)")]),t._v(" "),a("li",[t._v("각기 다른 데이터 파이프라인 연결구조")]),t._v(" "),a("li",[t._v("데이터 정합성 이슈")]),t._v(" "),a("li",[t._v("관리의 비효율성(확장에 엄청난 노력 필요)")])]),t._v(" "),a("p",[a("img",{attrs:{src:"/assets/img/kafka2.png",alt:"이미지"}})]),t._v(" "),a("p",[t._v("그래서 이러한 복합적인 문제를 해결하기 위해서 카프카가 등장하게 되었다. 앞의 복잡한 구조에서 중앙 센터에 카프카를 위치시킴으로써 구조가 굉장히 단순해진다.\n이렇게 구조 자체가 단순해졌기 때문에 얻을 수 있는 여러가지 장점들이 있습니다.")]),t._v(" "),a("p",[a("img",{attrs:{src:"/assets/img/kafka3.png",alt:"이미지"}})]),t._v(" "),a("h4",{attrs:{id:"장점"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#장점"}},[t._v("#")]),t._v(" 장점")]),t._v(" "),a("ol",[a("li",[a("strong",[t._v("이상적인 구조(프로듀서, 컨슈머 분리)")]),a("br"),t._v("\n앞에서 본 그림처럼 카프카는 기존 레거시 시스템보다 단순하며 이상적인 구조를 취하고 있습니다.")]),t._v(" "),a("li",[a("strong",[t._v("장애에 대한 대응")]),a("br"),t._v("\n하나의 Source가 문제가 발생하더라도 중앙 카프카 클러스터는 견고하게 버티고 있기 때문에 전체적인 시스템에 영향을 주지 않습니다. Destination 또한 마찬가지 입니다.")]),t._v(" "),a("li",[a("strong",[t._v("변화에 유연하다")]),a("br"),t._v("\n만약 기존 레거시 시스템에서 Source나 Destination을 추가하게 된다면, 각각을 연결해주는 데이터 파이프라인이 새롭게 필요하게 됩니다. 그런데 카프카 구조에서는 필요한 Source 또는 Destination만 추가하면 되기 때문에 시스템의 변화에 유연합니다.")]),t._v(" "),a("li",[a("strong",[t._v("재처리가 가능하다")]),a("br"),t._v("\n전통적인 "),a("a",{attrs:{href:"https://ko.wikipedia.org/wiki/AMQP",target:"_blank",rel:"noopener noreferrer"}},[t._v("AMQP"),a("OutboundLink")],1),t._v(" 기반의 메시지 시스템에서는 컨슈머(Consumer)가 메시지는 소비(Comsume)함과 동시에 브로커(Broker)에서 메시지를 삭제(Delete) 합니다. 하지만 카프카는 데이터를 삭제하지 않고 특정 기간동안 로컬 디스크에 보관합니다."),a("br"),t._v("\n최근 빅데이터는 데이터를 소비 하더라도, 브로커에 그대로 데이터를 보관하는 기능을 선택하는 추세입니다.")]),t._v(" "),a("li",[a("strong",[t._v("실시간 처리")]),a("br"),t._v("\n카프카는 Source에서 보낸 데이터를 높은 성능으로 실시간으로 받을 수 있는 능력이 있습니다. 그렇기 때문에 컨슈머에서는 실시간으로 폴링하여 데이터를 가져갈 수 있습니다.")])]),t._v(" "),a("p",[t._v("이렇게 카프카는 기존 메시치 처리의 복잡함을 해결 하기 위해 태어났습니다. 그렇다면 이제 카프카의 구조에 대해 살펴보도록 하겠습니다.")]),t._v(" "),a("h2",{attrs:{id:"참고링크"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#참고링크"}},[t._v("#")]),t._v(" 참고링크")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://kafka.apache.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Apache Kafka"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://ko.wikipedia.org/wiki/%EC%95%84%ED%8C%8C%EC%B9%98_%EC%B9%B4%ED%94%84%EC%B9%B4",target:"_blank",rel:"noopener noreferrer"}},[t._v("아카치 카프카 위키백과"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.youtube.com/watch?v=VJKZvOASvUA",target:"_blank",rel:"noopener noreferrer"}},[t._v("T아카데미 카프카 By 데브원영"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);r.default=n.exports}}]);