---
title: MQTT - mosquitto_sub 설치 및 사용법
date: 2020-9-22
tags: 
  - mqtt
  - mosquitto
author: SoRyong Han
featuredimg: '/assets/img/eclipse-mosquitto-logo.jpeg'
summary: mosquitto-clients를 설치하고 mosquitto_sub 사용법에 대해 알아보자.
---

## 들어가며
[MQTT Broker 설치](./2020-9-22-mqtt-eclipse-mosquitto.md)가 완료 되었다면, 메시지 구독 클라이언트인 `mosquitto_sub`의 사용법에 대해 자세히 알아보자.

## 사전설치
```sh
# mosquitto 클라이언트 설치
sudo apt install mosquitto-clients
```
## mosquitto_sub 란?
[mosquitto_sub](https://mosquitto.org/man/mosquitto_sub-1.html)는 토픽을 구독하고 수신하여 메시지를 인쇄하는 MQTT 클라이언트입니다.<br>
토픽을 구독하는 것 외에도 mosquitto_sub는 수신 된 메시지를 필터링하여 인쇄되지 않도록 하며 ( -T옵션 참조 ) 또는 토픽 구독 취소를 ( -U옵션 참조) 할 수 있습니다. 토픽 구독 취소는 clean session 을 false로 설정하여 연결하는 클라이언트에 유용합니다.

## mosquitto_sub 옵션
mosquitto_sub에서 자주 사용하는 옵션에 대해 살펴보자.

### -h, --host
- 연결할 호스트를 지정하십시오. 기본값은 `localhost`입니다.

### -p, --port
- 지정된 포트에 연결하십시오. 지정되지 않은 경우 일반 `MQTT는 1883`이 기본값이며, `TLS를 통한 MQTT의 경우 8883`이 사용됩니다.

### -t, --topic
- 구독 할 MQTT 주제입니다. 이 옵션을 반복하여 여러 주제를 구독 할 수 있습니다.

### -u, --username
- 브로커 인증에 사용할 사용자 이름을 제공하세요. `--pw`인수도 참고하세요

### -P, --pw
- 브로커 인증에 사용할 비밀번호를 제공하십시오. 사용자 이름을 지정하지 않고이 인수를 사용하는 것은 MQTT v3.1 또는 v3.1.1을 사용할 때 유효하지 않습니다. `--username`옵션 도 참조하십시오 .

### -q, --qos
- 수신 메시지에 대해 원하는 서비스 품질 (0, 1 및 2 ) 을 지정 하십시오. 기본값은 0 입니다.
QoS는 mosquitto_sub의 단일 인스턴스에서 구독하는 모든 주제에 대해 동일합니다.

### -d, --debug
- 디버그 메시지를 활성화합니다.

### -F
- [출력 인쇄 형식](https://mosquitto.org/man/mosquitto_sub-1.html#outputformat)을 지정합니다. 이 옵션을 사용하면 각 메시지에서 화면에 인쇄되는 정보를 선택할 수 있습니다.

## 예시
- QoS 1을 사용하여 localhost의 온도 정보를 구독하십시오.
  ```sh
  mosquitto_sub -t sensors/temperature -q 1
  ```

- 여러 컴퓨터 / 하드 드라이브에서 하드 드라이브 온도 업데이트를 구독하십시오. 이는 각 컴퓨터가 센서 / 컴퓨터 / HOSTNAME / 온도 / HD_NAME에 하드 드라이브 온도를 게시 할 것으로 예상합니다.
  ```sh
  mosquitto_sub -t sensors/machines/+/temperature/+
  ```

- 모든 브로커 상태 메시지를 구독합니다.
  ```sh
  mosquitto_sub -v -t \$SYS/#
  ```

- 출력 형식을 "ISO-8601 날짜 : 주제 : 16 진수 페이로드"로 지정합니다.
  ```sh
  mosquitto_sub -F '@Y-@m-@dT@H:@M:@S@z : %t : %x' -t '#'
  ```

- 출력 형식을 "epoch.nanoseconds 이후 초 : 보유 플래그 : qos : mid : 페이로드 길이"로 지정하십시오.
  ```sh
  mosquitto_sub -F '%@s.@N : %r : %q : %m : %l' -q 2 -t '#'
  ```

- 토픽 및 페이로드 출력 (지원되는 경우 색상 포함)
  ```sh
  mosquitto_sub -F '\e[92m%t \e[96m%p\e[0m' -q 2 -t '#'
  ```


