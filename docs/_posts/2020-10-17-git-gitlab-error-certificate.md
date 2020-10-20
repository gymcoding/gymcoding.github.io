---
title: Git - gitlab server certificate verification failed
date: 2020-10-17
tags: 
  - gitlab
  - git
  - error
author: SoRyong Han
featuredimg: '/assets/img/title/gitlab.jpeg'
summary: gitlab server certificate verification failed 에러 처리
---

## Gitlab Certificate Verification failed 에러
gitlab에서 git clone 하다가 server certificate verification failed 라고 error가 발생하였다.

## 해결
단순히  git config --global http.sslverify false 를 설정해서 해결.
```sh
git config --global http.sslverify false
```