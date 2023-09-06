# 펨코 핫딜 자동검색기  
~~쿠팡~~ 펨코(핫딜)게시판에 원하는 물건을 윈도우, MAC 에서 1분마다 검색하는 프로그램
### 프로젝트 생성  
 - node 설치
 - yarn 설치
 - Vue-CLI 설치 (Vue 개발 환경을 설정해주는 도구)
 - Vue 프로젝트 생성 ```vue create 프로젝트명```  
 - 일렉트론 설치 ```vue add electron-builder```
 - Vuetify 설치 ```vue add vuetify``` (Vue UI 프레임워크)
  
### 명령어
 - 실행 : ```yarn electron:serve```  
 - 배포 : ```yarn electron:build```  

### 릴리즈
 - 단순히 개발서버에서 구동은 정상 동작됨, 웹팩 데브서버로 프록시서버를 세운뒤 접속하면 ```CORS``` 를 피할 수 있음
 - ```.exe``` 파일 실행 후 ```프록시서버```가 없기때문에 ```CORS``` 발생  
 - 별도의 node 서버를 만들어서 [클라이언트 -> node 서버 -> 쿠팡] 에 접속하려고 했으나, 쿠팡의 크롤링 감지 봇에 막힘   
 - ```header``` 값을 넣어서 성공한 사례가 있어서 ```User-Agent```, ```accept-language``` 등 추가했으나 실패  
 - 네이버, 11번가, 위메프는 크롤링을 허용하는것으로 확인됨 (쿠팡은안됨)
 - 쿠팡 -> 펨코(핫딜) 검색으로 변경 중 __~23/09/06__

### 참고자료  
 - https://diggingfun.tistory.com/225  
 - https://velog.io/@jeong_woo/Vue.js-build시-proxy-설정-axios-설정  
 - https://lifeandit.tistory.com/135  
 - https://www.dinolabs.ai/163  
 - https://www.inflearn.com/questions/622674/  
