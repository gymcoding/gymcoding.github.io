---
title: NODE - Forever로 Node App 백그라운드 실행 
date: 2020-10-14
tags: 
  - nodejs
author: SoRyong Han
featuredimg: '/assets/img/title/nodejs.png'
summary: NodeJS 무중단 관리도구인 Forever에 대해 알아보자!
---

## 들어가며
개발 서버에 Node App을 설치 할 업무가 생겨서 App을 배포하게 되었다. 배포 후 터미널로 접속하여 앱을 `node app.js`을 실행하니 포그라운드에서 실행되었다. 해당 터미널을 종료하면 포그라운드에서 실행되었던 App 서비스도 종료되었다. 그래서 Node App을 백그라운드에서 실행시켜주는 도구를 찾던 중 **Forever**라는 모듈을 알게되었다.

## [Forever](https://github.com/remy/nodemon/)란?
Node App이 지속적으로 실행되도록 도와주는 CLI 도구 입니다. Node App을 실행하는 `node`명령어 대신 `nodemon`을 사용하면 **App을 백그라운드에서 지속적으로 실행 시켜주며**, **코드가 변경 될 때 프로세스가 자동으로 다시시작 됩니다.**

## 설치
```sh
npm install -g nodemon
```

## 특징
- 애플리케이션 자동 재시작.
- 모니터링 할 기본 파일 확장자를 감지합니다.
- 노드 및 커피 스크립트에 대한 기본 지원이지만 실행 파일 (예 : python, make 등)을 실행하기 쉽습니다.
- 특정 파일 또는 디렉토리를 무시합니다.
- 특정 디렉토리를 확인하십시오.
- 서버 응용 프로그램 또는 일회성 실행 유틸리티 및 REPL과 함께 작동합니다.
- 노드 앱에서 필수입니다.
- 오픈 소스이며 github에서 사용 가능합니다.
