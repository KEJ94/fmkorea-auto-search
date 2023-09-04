<template>
  <v-banner>
    R230830.001
  </v-banner>
  <v-row>
    <v-col cols="12">
      <v-text-field v-model="keyword" label="키워드"></v-text-field>
      <v-text-field v-model="minPrice" label="최저가"></v-text-field>
      <v-text-field v-model="maxPrice" label="최대가"></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn @click="start" v-if="!this.running">검색</v-btn>
      <v-btn @click="stop" v-if="this.running">중지</v-btn>
      <span v-if="this.running"> 
        &emsp; {{ count }} 초 후 재검색
        <br/><br/>
        {{ date }}
      </span>
    </v-col>
  </v-row>
  <v-col cols="12">
    <div class="terminal-theme">
        {{ this.logMsg }}
    </div>
  </v-col>
  <v-table v-if="this.running">
    <thead>
      <tr>
        <th class="text-left">가격</th>
        <th class="text-left">상품명</th>
        <th class="text-left">링크</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in result" :key="item.key">
        <td>{{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} 원</td>
        <td>{{ item.name }}</td>
        <td><a target="_blank" :href='"https://www.coupang.com/" + item.link'>이동</a></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    keyword: "아이폰14pro",
    minPrice: 1300000,
    maxPrice: 1500000,
    result: [],
    logMsg: "",
    count: 60,
    research: 60,
    interval: Function,
    running: false,
    date: "",
  }),

  methods: {
    start(){
      this.running = true
      this.interval = setInterval(() => {
        if(this.count === this.research) this.coupangCrawling()
        this.count-- 
        if(this.count < 0){
          this.count = this.research
        } 
        
      }, 1000)
    },
    stop(){
      clearInterval(this.interval)
      this.count = this.research
      this.running = false
    },
    async coupangCrawling(){
      this.date = new Date();
      try{
        this.result.length = 0
        const res = await this.$axios.get(
          // `http://localhost:8080/api/np/search?component=&q=${this.keyword}&channel=user`
          "http://localhost:8080/api"
        );

        const cheerio = require('cheerio')
        const $ = cheerio.load(res.data)
        let key = 0;
        // 가격 
        let prices = [];
        $('.strong').each((idx, el) => prices.push(Number($(el).text().replaceAll(",",""))))
        // 상품명
        let names = [];
        $('.hotdeal_var8').each((idx, el) => names.push($(el).text()))
        // 링크
        let links = [];
        $('.hotdeal_var8').each((idx, el) => { 
          links.push($(el)[0].attribs.href) 
        })
        // List
        for(let i=0; i<prices.length; i++){
          if(prices[i] > this.minPrice && prices[i] < this.maxPrice) {
            this.result.push({
              key: key++, 
              price: prices[i],
              name: names[i],
              link: links[i],
            })
          }
        }

        if(this.result.length > 0) {
          alert("제품이 조회 되었습니다.");
        }

      }catch(error) {
        this.logMsg = error
      }
    }
  }
}
</script>
<style scoped>
  .terminal-theme {
    background: black;
    color: aqua;
    white-space:pre;
  }
</style>