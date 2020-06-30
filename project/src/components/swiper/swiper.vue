<template>
    <div class="section">
        <h2 v-if="movie==='now'">正在热映</h2>
        <h2 v-if="movie==='new'">即将上映</h2>
        <div class="content">
            <swiper :options="swiperOption" v-if="seen">
                <swiper-slide v-for="(item,idx) in nowList" :key="idx" class="block movie-list"  v-if="movie==='now'">
                    <div class="chart block" >
                        <img :src="item.images.small?item.images.small:item.images.large" class="mpic block" @click="minfo(item.id)" alt="">
                    </div>
                    <div class="detail clearfix">
                        <div class="score fl tc">
                            <p class="p1">总评分</p>
                            <p class="p2">{{item.rating.average}}</p>
                        </div>
                        <div class="minfo fl">
                            <p class="mname">{{item.title}}</p>
                            <p class="other">时长：{{item.durations[0]}}分钟 - 类型：{{item.genres[0]}}</p>
                            <p class="see">共有{{item.collect_count}}人收藏</p>
                        </div>
                    </div>
                    
                </swiper-slide>

                <swiper-slide v-for="(item,idx) in nowList" :key="idx" class="block movie-list"  v-if="movie==='new'">
                    <div class="chart block">
                        <img :src="item.images.small?item.images.small:item.images.large" class="mpic block" @click="minfo(item.id)" alt="" v-if="movie==='new'">
                    </div>
                    <p class="mtitle">{{item.title}}</p>
                    <p class="info"><em>类型：{{item.genres[0]}}</em> <em> 地区：{{item.pubdates[0]}}</em></p>
                    <p class="see">共有{{item.collect_count}}人收藏</p>
                </swiper-slide>

            </swiper>
            <div class="swiper-button-prev swiper-btn s1" slot="button-prev" v-if="movie==='now'">
                <div class="arrow-btn btn1"></div>
            </div>
            <div class="swiper-button-next swiper-btn s2" slot="button-next" v-if="movie==='now'">
                <div class="arrow-btn btn2"></div>
            </div>

            <div class="swiper-button-prev swiper-btn s3" slot="button-prev" v-if="movie==='new'">
                <div class="arrow-btn btn1"></div>
            </div>
            <div class="swiper-button-prev swiper-btn s4" slot="button-next" v-if="movie==='new'">
                <div class="arrow-btn btn2"></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props:{
        movie:''
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 30,
          slidesPerGroup: 5,
          loop: true,
          loopFillGroupWithBlank: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.s2',
            prevEl: '.s1'
          }
        },
        nowList:[],
        seen:false
      }
    },    
    created(){
        if(this.movie==='now'){
            // this.$axios.get('/apib/PageSubArea/HotPlayMovies.api?locationId=290')
            this.$axios.get('http://kolento.club/v2/movie/in_theaters')
            .then(res=>{
                this.nowList = res.data.subjects
                this.seen=true
            })
        }
        if(this.movie==='new'){
            this.$axios.get('http://kolento.club/v2/movie/coming_soon')
            .then(res=>{
                this.nowList = res.data.subjects
                this.swiperOption.navigation.nextEl='.s4'
                this.swiperOption.navigation.prevEl='.s3'
                this.seen=true
            })
        }
    }, 
    methods:{
        minfo(mid){
            this.$router.push(`/movie/mdetail/${mid}`);
        }
    }
  }
</script>

<style>
    .section {width: 1400px;margin:30px auto 60px;}
    .section h2{font-size: 26px;margin-bottom: 20px;}
    .chart {height: 350px;overflow: hidden;border-radius:10px;overflow: hidden;}
    .mpic {width: 100%;max-height:380px;overflow: hidden;transition:all ease 0.5s;transform:scale(1,1);filter:blur(0.3px);}
    .mpic:hover {transform: scale(1.05,1.05);}
    .score {width: 50px;height: 50px;background: #669c20;color:#fff;border-radius:8px;overflow: hidden;}
    .score .p1 {padding-top: 3px;}
    .score .p2 {font-size: 20px;margin-top: -2px;}
    .score .p3 {font-size: 14px;margin-top: 4px;}
    .detail {margin-top: 10px;}
    .minfo {color:#333;margin:-2px 0 0 10px;width: 70%;}
    .mname {font-size: 16px;}
    .other {font-size: 14px;}
    .comments {font-size: 16px;color:#669c20;margin-top: 3px;}
    .content {position: relative;margin-top: 50px;}
    .section .swiper-btn {width: 65px;height: 65px;border-radius:50%;background: rgba(0,0,0,0.5);overflow: hidden;opacity: 1;transition:all ease 0.5s;
    transform:scale(1,1);margin-top: -60px;}
    .section .swiper-btn .arrow-btn {width: 24px;}
    .section .swiper-btn:hover {opacity: 0.8;transform:scale(1.1,1.1);}
    .section .s1 {left: -150px;}
    .section .s2 {right: -150px;}
    .section .s3 {left: -150px;}
    .section .s4 {right: -150px;left:auto;}
    .section .swiper-btn .btn1 {background: url('../../public/images/arrow1.png') no-repeat;width: 24px;height: 26px;margin:19px 0 0 22px;}
    .section .swiper-btn .btn2 {background: url('../../public/images/arrow2.png') no-repeat;width: 24px;height: 26px;margin:19px 0 0 26px;}
    .mtitle {font-size: 16px;margin-top: 2px;}
    .mtitle i{color:#999;}
    .actor {font-size: 14px;}
    .info {font-size: 14px;}
    .see {font-size: 16px;color:#669c20;margin-top: 3px;}
    .movie-list {cursor:pointer;}
</style>