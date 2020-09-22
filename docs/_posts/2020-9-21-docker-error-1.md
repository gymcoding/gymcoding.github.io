---
title: Docker - Container 접속시 /bin/bash 에러
date: 2020-9-21
tags: 
  - docker
author: SoRyong Han
featuredimg: '/assets/img/docker-logo.webp'
summary: Docker Container에 Shell 접속시 starting container process caused exec /bin/bash Error
---
## 문제상황
Docker Container에 접속시 아래와 같은 에러가 발생하는 경우가 있다.

##### Container 접속
```bash
docker exec -it 285c3f2a0024 /bin/bash
```
##### Error 발생
`starting container process caused "exec: \"/bin/bash\"` 에러발생
```bash
OCI runtime exec failed: exec failed: container_linux.go:349: starting container process caused "exec: \"/bin/bash\": stat /bin/bash: no such file or directory": unknown
```

## 해결
Docker Image가 [Alpine](https://ko.wikipedia.org/wiki/%EC%95%8C%ED%8C%8C%EC%9D%B8_%EB%A6%AC%EB%88%85%EC%8A%A4)이라면 **/bin/bash**를 지원하지 않을 수 있다.<br>
대신 **/bin/sh**를 사용해보자.
##### /bin/sh로 Container 접속
```bash
docker exec -it 285c3f2a0024 /bin/sh
```
