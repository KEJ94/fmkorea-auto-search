프로젝트 생성
https://diggingfun.tistory.com/225

[Vue] CORS 에러 해결하기
https://velog.io/@martinalee94/Vue-CORS-에러-해결하기 

개발 클라이언트
yarn electron:serve

배포
yarn electron:build

프록시서버
node server.js

그 외 참고자료
https://velog.io/@jeong_woo/Vue.js-build시-proxy-설정-axios-설정
https://lifeandit.tistory.com/135
https://www.dinolabs.ai/163
https://www.inflearn.com/questions/622674/


개발서버 : 웹팩 데브서버로 프록시서버를 세운뒤 접속하면 CORS 를 피할 수 있음 (정상구동) 
배포환경 : .exe 파일 실행 후 Proxy 서버가 없기때문에 CORS 발생
-> 별도의 node 서버를 만들어서 [클라이언트 -> node 서버 -> 쿠팡] 에 접속하려고 했으나, 쿠팡의 크롤링 감지 봇에 막힘 
-> header 값을 넣어서 성공한 사례가 있어서 'User-Agent', 'accept-language' 등 추가했으나 실패
-> 네이버, 11번가, 위메프는 크롤링을 허용하는것으로 확인