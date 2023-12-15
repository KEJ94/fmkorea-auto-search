# 펨코 핫딜 자동검색기  
~~쿠팡~~ 펨코(핫딜)게시판에 원하는 물건을 윈도우, MAC 에서 1분마다 검색하는 애플리케이션
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

### ~ 2023-09-06
 - 로컬서버에서 정상 동작됨, 웹팩 데브서버로 프록시서버를 실행 후 접속하면 ```CORS``` 를 피할 수 있음
 - ```.exe``` 파일 실행 후 ```프록시서버```가 없기 때문에 ```CORS``` 발생  
 - 별도의 node 서버를 만들어서 [클라이언트 → node 서버 → 쿠팡] 에 접속하려고 했으나, 쿠팡의 크롤링 감지 봇에 막힘   
 - ```header``` 값을 넣어서 성공한 사례가 있어서 ```User-Agent```, ```accept-language``` 등 추가 했으나 실패  
 - 네이버, 11번가, 위메프는 크롤링을 허용하는것으로 확인됨 (쿠팡은 안됨)
 - 쿠팡 → 펨코(핫딜) 검색으로 변경 중

### 참고
 - https://diggingfun.tistory.com/225  
 - https://velog.io/@jeong_woo/Vue.js-build시-proxy-설정-axios-설정  
 - https://lifeandit.tistory.com/135  
 - https://www.dinolabs.ai/163  
 - https://www.inflearn.com/questions/622674/  

### node 서버
```.js
const express = require('express');
const axios = require('axios');
const cheerio = require("cheerio");
const app = express();
const coupang = "https://www.coupang.com/"
const port = process.env.PORT || 3000;
const config = {
    headers: {
        'Referer': 'https://www.google.com/',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'ko,th;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6,ko-KR;q=0.5,la;q=0.4',
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
    },
};
const getCoupangHtml = async (keyword) => {
    try {
        //await axios.get("https://www.coupang.com/np/search?component=&q="+keyword+"&channel=user");
        await axios.get(coupang, config);
        console.log("응답받음");
    } catch (error) {
        console.error(error);
    }
};

app.use(express.json());

app.post('/coupang', async (req, res) => {
    const html = await getCoupangHtml(req.body.keyword)
})

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
```
