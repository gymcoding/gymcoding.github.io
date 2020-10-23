---
title: Nginx - Docker로 Nginx 설치하고 실행하기
date: 2020-10-15
tags: 
  - nginx
author: SoRyong Han
featuredimg: '/assets/img/title/nginx.png'
summary: Nginx를 Docker로 설치하여 간단하게 웹 서비스를 운영해보자.
---

## 들어가며
개발서버에 테스트용 웹을 배포할 업무가 주어지게 되어 간단하게 Docker로 Nginx를 구성해보기로 하였다.

## Nginx 란?
Nginx는 웹 서버 소프트웨어로, 높은 성능을 목표로 개발 되었다. 또한 잘 사용하지 않는 기능은 과감하게 제외하여 매우 가볍다. 웹 서버, 리버스 프록시 및 메일 프록시 기능을 가진다.

## Docker Nginx 설치하기
이번 포스팅에서는 Docker Compose를 기반으로 Nginx를 설치해보겠다.

### 1. docker-compose.yml 구성
- docker-compose.yml 생성
  ```sh
  mkdir nginx-docker-app
  cd nginx-docker-app
  touch docker-compose.yml
  vi docker-compose.yml
  ```

- docker-compose.yml 작성
  ```yaml
  web:
    image: nginx
    volumes:
    - ./templates:/etc/nginx/templates
    - ./nginx.conf:/etc/nginx/nginx.conf
    - ./conf.d:/etc/nginx/conf.d
    - ./html:/usr/share/nginx/html
    ports:
    - "8080:80"
    environment:
    - NGINX_PORT=80
  ```

### 2. Volumn 폴더 및 설정 파일 생성
docker-compose.yml에 volumns 폴더와 파일을 지정하였으므로, 미리 생성해두자! 단, 폴더는 미리생성 해두지 않아도 자동으로 생성되지만 파일은 미리 생성해 놓지 않으면 Error가 발생되니 꼭 생성하자!
디렉토리구조는 다음과 같다
```sh
- ${Docker App}
  - templates
    - default.conf.template
  - conf.d
  - html
    - index.html  # Web
  - nginx.conf
  - docker-compose.yml
```
- templates 폴더 밑 설정 파일 생성
  ```sh
  mkdir templates
  cd templates
  touch default.conf.template
  vi default.conf.template
  ```
  ```sh
  # default.conf.template 파일
  server {
    listen       ${NGINX_PORT}; # docker-compose.yml에서 환경변수로 치환 가능
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    #error_page   500 502 503 504  /50x.html;
    #location = /50x.html {
    #    root   /usr/share/nginx/html;
    #}

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
  }
  ```

- conf.d 폴더 생성
  ```sh
  mkdir conf.d
  ```

- html 폴더 및 index.html 파일 생성
  ```sh
  mkdir html
  cd html
  touch index.html
  vi index.html
  ```
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    Hello World!
  </body>
  </html>
  ```

- nginx.conf 파일 설정 및 생성
  ```sh
  touch nginx.conf
  vi nginx.conf
  ```
  ```yaml
  # Docker Nginx 기본 구성시 nginx.conf 설정
  user  nginx;
  worker_processes  1;

  error_log  /var/log/nginx/error.log warn;
  pid        /var/run/nginx.pid;

  events {
      worker_connections  1024;
  }
  
  http {
      include       /etc/nginx/mime.types;
      default_type  application/octet-stream;
      log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';

      access_log  /var/log/nginx/access.log  main;

      sendfile        on;
      #tcp_nopush     on;

      keepalive_timeout  65;

      #gzip  on;

      include /etc/nginx/conf.d/*.conf;
  }
  ```

### 3. 도커 이미지 다운로드 및 컨테이너 실행
```sh
docker-compose pull
docker-compose up
```

지금까지 Nginx를 Docker로 실행시킨 후 Hello World 페이지를 띄어 보았다. 다음에 제대로 서비스를 운영하게 된다고 매우~ 많이 Nginx 스팩에 대해서 깊게 알아보고 싶다 :)