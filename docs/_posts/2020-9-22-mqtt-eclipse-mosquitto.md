---
title: MQTT - Docker eclipse-mosquitto로 MQTT Broker 설치
date: 2020-9-22
tags: 
  - mqtt
  - mosquitto
author: SoRyong Han
featuredimg: '/assets/img/title/mosquitto-logo.jpg'
summary: docker hub에서 제공하는 eclipse-mosquitto로 MQTT Broker를 구성해보자.
---

## 들어가며
최근 진행하는 IoT Platform에서 MQTT 기반 데이터 수집이라는 미션을 받게되었다. 수집 모듈은 MQTT Broker의 Topic을 구독하는 모듈이다. 이 모듈의 테스트를 위해 MQTT Broker를 Docker로 간단히 구성해보자.
## MQTT란?
MQTT(메시지 큐잉 텔레메트리 트랜스포트, Message Queuing Telemetry Transport)는 ISO 표준 발행-구독(Pub-Sub) 기반의 메시징 프로토콜이다.<br>
TCP/IP 프로토콜 위에서 동작하며, 사물인터넷(임베디드)을 사용하기 위해 개발된 프로토콜 이다. TCP 기반의 프로토콜로서 낮은 전력 낮은 대역폭 낮은 성능의 환경에서도 사용이 가능하다.
### MQTT 구성요소
MQTT는 메시지를 발행하는 발행자(Publisher)와 메시지를 구독하는 구독자(Subscriber) 그리고 이 둘을 중계하는 브로커(Broker)로 구성되며, 메시지는 Topic으로 분류 된다.
- Publisher (발행자)
- Topic (메시지 분류 그룹)
- Broker (중계자)
- Subscriber (구독자)

## eclipse-mosquitto란?
Eclipse Mosquitto는 MQTT 버전 5, 3.1.1 및 3.1을 구현하는 **오픈 소스 메시지 브로커**입니다.
- [공식 사이트](https://mosquitto.org/)
- [github](https://github.com/eclipse/mosquitto)
- [docker hub](https://hub.docker.com/_/eclipse-mosquitto)

## eclipse-mosquitto 설치하기
1. Docker Image 환경설정 폴더 생성
```sh
mkdir eclipse-mosquitto
cd eclipse-mosquitto
```

2. [Docker Compose](https://docs.docker.com/compose/) 환경설정 파일 생성
```sh
touch docker-compose.yml
```

3. Docker Compose 환경구성
- docker-compose.yml 파일생성
```sh
vi docker-compose.yml
```
- docker-compose.yml 파일에 서비스 환경구성
```yaml
version: '2.2'
services:
  mosquitto:
    restart: always
    image: "eclipse-mosquitto"
    ports:
      - "1883:1883"
      - "9001:9001"
    volumes:
      - /${USER_DIR}/${MOSQUITTO_DIR}/config/mosquitto.conf:/mosquitto/config/mosquitto.conf
      - /${USER_DIR}/${MOSQUITTO_DIR}/data:/mosquitto/data
      - /${USER_DIR}/${MOSQUITTO_DIR}/log:/mosquitto/log
```
4. 환경설정 파일 및 로그, 데이터 디렉토리 생성
- 환경구성, 저장소 및 로그에 사용할 이미지에 세 개의 디렉터리 생성
```sh
# 테스트를 위해 eclipse-mosquitto 폴더 하위에 생성하였습니다.
mkdir config
mkdir data
mkdir log
```
- ./config/mosquitto.conf 파일 생성
```sh
touch ./config/mosquitto.conf
```
<!-- - mosquitto.conf 파일내 작성
```yaml
persistence true
persistence_location /${USER_DIR}/${MOSQUITTO_DIR}/data/
log_dest file /${USER_DIR}/${MOSQUITTO_DIR}/log/mosquitto.log
```
- 로그파일 생성
```sh
touch ./log/mosquitto.log
``` -->
6. 서비스를 위하여 컨테이너를 빌드-생성-시작 합니다.
  ```sh
  docker-compose up
  ```
<!-- ---
**Docker Error: Unable to open log file ERROR 발생시 참고**

[Docker Error: Unable to open log file /mqtt/logs/mosquitto.log for writing](https://github.com/eclipse/mosquitto/issues/1078)

--- -->

## 테스트 진행
MQTT Pub-Sub을 테스트 하기 위해서는 mosquitto-clients 모듈을 설치해야 한다.
```sh
sudo apt install mosquitto-clients
```
### Publish 테스트
```sh
mosquitto_pub -h localhost -p 1883 -t test -m 'message2'
```
### Subscribe 테스트
```sh
mosquitto_sub -p 1883 -t test
```
### Broker(Container) 로그 확인
```sh
# 컨테이너 ID 확인
docker ps
# Container 로그 출력
docker logs -t -f ${컨테이너 ID}
```

지금까지 Docker로 MQTT 브로커를 설치한 후 mosquitto-clients를 설치하여 Publish(발행)와 Subscribe(구독)을 간단히 테스트 해보았다.


