---
title: MQTT - Mosquitto Broker Authentication 설정
date: 2020-9-23
tags: 
  - mqtt
  - mosquitto
author: SoRyong Han
featuredimg: '/assets/img/title/mosquitto-logo.jpg'
summary: Mosquitto Broker Authentication Setting Guide / MQTT Broker 인증 설정
---

## 들어가며
지난 포스팅을 통하여 [MQTT Broker 설치](./2020-9-22-mqtt-eclipse-mosquitto.md)를 완료했다. 다른 서버도 마찬가지지만 Broker 서버에 메시지 발행(Publish)이나 구독(Subscribe)시에 인증(Authentication)되지 않은 클라이언트의 요청은 차단해야한다. 이번 포스팅에서는 [Mosquitto Eclipse MQTT 오픈소스](https://mosquitto.org/)를 활용하여 Broker username/password기반 인증(Authentication)하는 방법에 대해 알아보자.

## mosquitto_passwd란?
mosquitto_passwd는 mosquitto MQTT 브로커의 비밀번호 파일을 관리하기위한 도구입니다.
username 생성시 `:`가 포함되지 않아야합니다.

## 인증설정
mosquitto_passwd 도구로 새로운 사용자를 추가(파일)하고 새롭게 생성된 파일을 mosquitto.conf파일에 적용해보자.

#### 1. 새로운 비밀번호 파일에 사용자 추가
  ```sh
  mosquitto_passwd -c /etc/mosquitto/passwd ral
  ```
  - passwd 파일명의 새로운 비밀번호 파일이 생성됩니다.
  - passwd 파일안에 ral사용자와 암호화된 비밀번호가 추가되었습니다.

#### 2. mosquitto.conf 파일 속성변경
  ```sh
  vi /etc/mosquitto/config/mosquitto.conf
  ```
  ```json
  // mosquitto.conf file
  // ...
  allow_anonymous false // 추가
  password_file /etc/mosquitto/passwd // 추가
  ```

#### 3. mosquitto 재시작
  ```sh
  # -c 옵션은 환경설정 파일 경로이며 default는 mosquitto.conf이다.
  mosquitto -c /etc/mosquitto/config/mosquitto.conf -v 
  ```
  - [참고] Broker가 Docker Container인 경우 Container를 재시작 해야할 수 있다.
  - [참고] Docker 재시작시 passwd파일이 날라가지 않도록 주의하자. (Volumn 설정)

## 옵션
### -b
  - 배치 모드로 실행합니다. 이렇게하면 편리 할 수있는 명령 줄에서 암호를 제공 할 수 있지만 암호는 명령 줄과 명령 기록에서 볼 수 있으므로주의해서 사용해야합니다.

### -c
  - 새 암호 파일을 만듭니다. 파일이 이미 있으면 덮어 씁니다.

### -D
  - 비밀번호 파일에서 지정된 사용자를 삭제하십시오.

### -U
  - 이 옵션은 일반 텍스트 암호가있는 암호 파일을 해시 된 암호를 사용하는 파일로 업그레이드 / 변환하는 데 사용할 수 있습니다. 지정된 파일을 수정합니다. 암호가 이미 해시되었는지 여부를 감지하지 않으므로 이미 해시 된 암호가 포함 된 암호 파일에서 암호를 사용하면 이전 해시를 기반으로 새 해시가 생성되고 암호 파일을 사용할 수 없게됩니다.

## 예시
- 새로운 비밀번호 파일에 사용자 추가
  ```sh
  mosquitto_passwd -c /etc/mosquitto/passwd ral
  ```

- 기존 비밀번호 파일에 사용자 추가
  ```sh
  mosquitto_passwd -b /etc/mosquitto/passwd test test
  ```

- 암호 파일에서 사용자 삭제
  ```sh
  mosquitto_passwd -c /etc/mosquitto/passwd ral
  ```

지금까지 mosquitto broker의 username/password기반 인증설정 방법을 알아보았다.