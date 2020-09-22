---
title: MQTT - mosquitto_pub 설치 및 사용법
date: 2020-9-22
tags: 
  - mqtt
  - mosquitto
author: SoRyong Han
featuredimg: '/assets/img/eclipse-mosquitto-logo.jpeg'
summary: mosquitto-clients를 설치하고 mosquitto_pub 사용법에 대해 알아보자.
---

## 들어가며
[MQTT Broker 설치](./2020-9-22-mqtt-eclipse-mosquitto.md)가 완료 되었다면, 메시지 발행 클라이언트인 `mosquitto_pub`의 사용법에 대해 자세히 알아보자.

## 사전설치
```sh
# mosquitto 클라이언트 설치
sudo apt install mosquitto-clients
```
## mosquitto_pub 란?
[mosquitto_pub](https://mosquitto.org/man/mosquitto_pub-1.html) 는 토픽에 대한 단일 메시지를 발행하고 종료하는 간단한 MQTT 클라이언트입니다.

## mosquitto_pub 옵션
mosquitto_pub에서 자주 사용하는 옵션에 대해 살펴보자.

### -h, --host
- 연결할 호스트를 지정하십시오. 기본값은 `localhost`입니다.

### -p, --port
- 지정된 포트에 연결하십시오. 지정되지 않은 경우 일반 `MQTT는 1883`이 기본값이며, `TLS를 통한 MQTT의 경우 8883`이 사용됩니다.

### -t, --topic
- 메시지를 게시 할 MQTT 주제입니다.

### -m, --message
- 명령줄에서 단일 메시지를 보냅니다.

### -u, --username
- 브로커 인증에 사용할 사용자 이름을 제공하세요. `--pw`인수도 참고하세요

### -P, --pw
- 브로커 인증에 사용할 비밀번호를 제공하십시오. 사용자 이름을 지정하지 않고이 인수를 사용하는 것은 MQTT v3.1 또는 v3.1.1을 사용할 때 유효하지 않습니다. `--username`옵션 도 참조하십시오 .

### -q, --qos
- 메시지에 사용할 서비스 품질 (0, 1, 2)을 지정합니다. 기본값은 `0`입니다.

### -d, --debug
- 디버그 메시지를 활성화합니다.

### -f, --file
- 파일의 내용을 메시지로 보냅니다.

## 예시
- QoS 1을 사용하여 온도 정보를 localhost에 게시합니다.
  ```sh
  mosquitto_pub -t sensors/temperature -m 32 -q 1
  ```

- 비표준 포트 및 QoS 0의 원격 호스트에 타임 스탬프 및 온도 정보를 게시합니다.
  ```sh
  mosquitto_pub -h 192.168.1.1 -p 1885 -t sensors/temperature -m "1266193804 32"
  ```

- 전등 스위치 상태를 게시합니다. 전등 스위치 이벤트 사이에 오랜 시간이있을 수 있으므로 메시지가 유지되도록 설정됩니다.
  ```sh
  mosquitto_pub -r -t switches/kitchen_lights/status -m "on"
  ```

- 다음 두 가지 방법으로 파일 내용을 보냅니다.
  ```sh
  mosquitto_pub -t my/topic -f ./data
  mosquitto_pub -t my/topic -s < ./data
  ```

- 현재 비용 측정기에서 파싱 된 전기 사용량 데이터를 전송하여 표준 입력에서 한 줄로 읽거나 하나의 메시지로 읽습니다.
  ```sh
  read_cc128.pl | mosquitto_pub -t sensors/cc128 -l
  ```


