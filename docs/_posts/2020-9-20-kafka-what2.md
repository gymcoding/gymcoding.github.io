---
title: 아파치 카프카(2) - 구조
date: 2020-9-20
tags: 
  - apache
  - kafka
author: SoRyong Han
featuredimg: '/assets/img/apache-kafka.png'
summary: 아파치 카프카의 구조, 동작방식 그리고 구성요소에 대해 자세히 알아보자.
prev: true
next: https://vuepress.vuejs.org/
---
## 들어가며
카프카의 모델인 Pub-Sub모델을 알아보고 topic, partition, broker 등 구성요소에 대해서 자세히 알아보자

## Pub-Sub 모델
카프카는 Pub-Sub(발행-구독)모델을 사용하고 있다. 카프카 구성요소를 살펴보기전에 Pub-Sub모델에 대해 먼저 살펴보도록 하자.<br>
Pub-Sub모델은 Publish/Subscribe의 줄임말로 메시지 기반의 미들웨어 시스템을 말한다. 일반적으로 메시지를 전송할 때는 Publisher가 보내며, 받을 때는 Subscriber가 받는다.<br>
Pub-Sub은 메시지를 특정 수신자에게 보낼때 직접 보내지 않고 중계자(Broker)를 통해서 메시지를 보낸다.
![이미지](/assets/img/pub-sub.png)[AWS Pub-Sub Messaging](https://aws.amazon.com/ko/pub-sub-messaging/)

Publisher는 메시지를 Topic을 통해서 카테고리화 한다. 분류된 메시지를 받기를 원하는 Subscriber는 해당 Topic을 구독(Subscribe)함으로써 메시지를 읽어 올 수 있다. 즉, Publisher는 Topic에 대한 정보만 알고 있고, 마찬가지로 Subscriber도 Topic만 바라본다. Publisher와 Subscriber는 서로 모르는 상태로 느슨한 결합([loose coupling](https://en.wikipedia.org/wiki/Loose_coupling)) 구조를 취하고 있다.

## 카프카의 구성요소
- [Topic, Partition, Offset](#topic-partition-offset)
- [Producer, Consumer, Consumer group](#producer-consumer-consumer-group)
- [Broker, Zookeeper](#broker-zookeeper)
- [Replication](#replication)


### Topic, Partition, Offset
카프카에 저장된 메시지는 Topic으로 분류되고, Topic은 여러개의 Partition으로 나뉘어 저장될 수 있다. Partition안에는 메시지의 상대적 위치를 나타내는 Offset이 있는데 이 Offset정보를 이용해 이전에 가져간 메시지의 위치 정보를 알 수 있다.
![이미지](/assets/img/kafka-topic-partition.png)

##### 여러개의 Partition으로 나누어 저장하는 이유는 무엇일까?
- 여러개의 Partition에 나누어 저장하기 때문에 병렬로 **빠르게 메시지를 처리**할 수 있다.
##### 운영중에 Partition 개수를 늘릴 수 있을까?
- Partition 개수를 운영중 늘릴 수 있다. 그러나!! **한번 늘린 파티션은 다시 줄일 수 없으므로(주의)**, 파티션을 늘릴때는 충분히 고민해 봐야 한다.
##### Partition 데이터 처리 순서는?
- 메시지 처리순서는 파티션 별로 유지 관리됨. (파티션이 여러개일 경우 메시지 처리순서를 보장할 수 없다.)


### Producer, Consumer, Consumer Group
##### Producer
Producer는 메시지를 생산(Write)하는 주체이며, 메시지를 만들고 Topic에 메시지를 쓴다. Producer는 Consumer의 존재를 알지 못하며 그냥 카프카에 메시지를 쓴다.

##### Consumer
Consumer는 메시지를 소비(Read)하는 주체이다. 필요한 Topic을 카프카에서 구독함으로써 메시지를 소비한다. Consumer는 해당 Topic의 소비한 Offset위치를 기억하고 관리함으로써 어디까지 Topic메시지를 소비했는지 기억할 수 있다. 그렇기 때문에 Consumer가 다운됐을 경우 마지막으로 읽었던 위치에서 부터 다시 읽어들일 수 있다. 즉 fail-over에 대한 신뢰가 존재한다.

![이미지](/assets/img/producer-consumer.png)

##### Consumer Group
카프카 Topic - Partition에 나뉘어 저장된 메시지들은 컨슈머(Consumer)에 의해 읽혀진다. 하나 이상의 카프카 컨슈머들은 컨슈머 그룹(Consumer Group)을 형성한다. 컨슈머 그룹은 말그대로 컨슈머들의 묶음이며, 하나의 목표를 위해 소비를 하는 그룹이라고도 할 수 있다. 즉, 하나의 토픽을 읽어가기 위한 컨슈머들을 컨슈머 그룹이라 한다.
<br>
컨슈머 그룹에는 한가지 룰이 있다. Topic의 Partition은 그 Topic을 소비하고 있는 Consumer Group과 1:N 매칭을 해야 한다. 더 간단히 말하자면 Consumer Group의 Consumer 개수는 해당 Topic의 파티션 개수보다 작거나 같아야 한다.
<br>
왜냐하면 예를들어 Partition 개수가 3개이고, Consumer Group의 Consumer 개수가 3개 라면, Consumer는 Partition에서 메시지를 소비할 때 1:1 관계를 맺게 되지만, Consumer 개수가 Partition개수보다 더 많을 경우 그 수많큼 Consumer는 대기(할일 없음) 상태가 된다.

- Partition수와 Consumer수가 동일한 경우 1:1 할당됨
![이미지](/assets/img/partition-consumer-3-3.png)

- Partition수가 Consumer수보다 많은 경우 1:N 할당됨
![이미지](/assets/img/partition-consumer-4-3.png)

- Consumer수가 더 많은경우에는 초과 Consumer 수만큼 대기 상태가 됨
![이미지](/assets/img/partition-consumer-3-4.png)

컨슈머그룹이 존재하는 또 다른 이유가 있다. 물론 이러한 구조로 데이터를 병렬로 읽게 되어 빠른처리가 가능하다는 부분도 있겠지만, 특정 컨슈머에 문제가 생겼을 경우 다른 그룹내 컨슈머가 대신 읽을 수 있게 **리벨런싱이 되어 장애 상황에서도 문제 없이 대처**할 수 있게 된다.

### Broker, Zookeeper
broker는 카프카 서버를 칭한다. Kafka 서버 환경설정 파일인 `config/server.properties` 파일내 `broker.id=1...n`으로 설정 함으로써 동일한 노드내에서 여러개의 broker서버를 띄울 수 있고, 카프카는 Broker의 리소스를 최대한 활용하기 위해 각 Topic들을 균등하기 Broker들에게 분산하도록 설계되어 있다. 만약 Broker들에게 분산되어 있는 파티션의 위치가 마음에 들지 않는다면 관리자가 수동으로 조정할 수 있다.
![이미지](/assets/img/brokers.jpeg)

Zookeeper는 이러한 분산 메시지큐의 정보를 관리해주는 역할을 한다. 카프카를 띄우기 위해서는 반드시 주키퍼가 실행되어야 한다.

### Replication
카프카 Replication이란 메시지의 유실을 방지하기 위해서, 여러개의 Kafka Broker로 메시지를 복제하는 기능을말한다.
##### Replication 관련 용어
- Leader&Follower<br>
메시지가 복제되는 경우 원본 메시지는 **Leader**라 하고, 복제된 메시지를 **Follower**라 한다.
- ISP (In-Sync Replication)<br>
메시지 복제가 정상적으로 지연없이 복제되는 경우
- OSR(Out of Sync Replication)<br>
원본 메시지보다 너무 늦게 복제되는 경우 카프카에서는 replication 수를 임의로 지정하여 topic를 만들 수 있다. replication-factor에 지정하는데 만약 3으로 하면 replication 수가 3이 된다.

Topic으로 통하는 모든 데이터는 오직 Leader에서 이루어지고 Follower는 Leader와 Sync를 유지함으로써 Leader가 문제가 생겼을 경우 Follower들 중 하나가 Leader역할을 하게 되는 것이다.<br>
복제된 데이터가 Follower들에게 있으니, 메시지의 유실이 없다는 장점이 있지만, 복제를 하기 위한 시간과 네트워크 비용이 들기 때문에 데이터의 중요도에 따라 Ack옵션으로 성능과 데이터의 중요도에 따라 다음과 같이 세부설정이 가능하다.
##### Ack 옵션(default: 1)
- 0: 프로듀서는 자신이 보낸 메시지에 대해 카프카로부터 확인을 기다리지 않습니다.
- 1: 프로듀서는 자신이 보낸 메시지에 대해 카프카의 leader가 메시지를 받았는지 기다립니다. follower들은 확인하지 않습니다. leader가 확인응답을 보내고, follower에게 복제가 되기 전에 leader가 fail되면, 해당 메시지는 손실될 수 있습니다.
- -1(또는 all): 프로듀서는 자신이 보낸 메시지에 대해 카프카의 leader와 follower까지 받았는지 기다립니다. 최소 하나의 복제본까지 처리된 것을 확인하므로 메시지가 손실될 확률은 거의 없습니다.

지금까지 카프카의 구성요소와 동작 매커니즘에 대해 살펴봤다. 카프카를 운영하기에 앞서 기본적인 구성요소나 매커니즘에 대해 충분히 이해를 하면 운영하는데 많은 도움이 될 것이다.