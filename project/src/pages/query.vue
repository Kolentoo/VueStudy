<template>
    <div class="other" ref="banner">
        <navigation></navigation>
        <div class="ocontent">
            <ul class="ocon">
                <li class="olist">
                    <p class="iname">Weather</p>
                    <input class="keyword block" type="text" placeholder="city" @keydown.enter="city()" ref="city">
                    <div class="weather tc">
                        <p class="city"><em class="position">{{weather.city}}</em> <i>{{weather.date}}</i> {{weather.week}}</p>
                        <p class="temp">
                            <b>{{weather.temp}}℃</b> <em>{{weather.templow}}℃ ~ {{weather.temphigh}}℃</em><em>{{weather.weather}}</em>
                            <em>{{weather.winddirect}} {{weather.windpower}}</em>
                            <!--<em>空气质量：{{weather.aqi.quality}}</em>-->
                        </p>
                    </div>
                    <div class="week-weather">
                        <ul class="wcon">
                            <li class="w-list tc" v-for="(slist,idx) in weather.daily" :key="idx">
                                <p class="wtime"><em>{{slist.date}}</em><br><em>{{slist.week}}</em></p>
                                <p class="day allday">
                                    <b>白天：</b><em>{{slist.day.temphigh}}℃</em><em>{{slist.day.weather}}</em>
                                </p>
                                <p class="night allday">
                                    <b>夜晚：</b><em>{{slist.night.templow}}℃</em><em>{{slist.night.weather}}</em>
                                </p>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="olist">
                    <p class="iname">Constellation</p>
                    <ul :class="['astro-con',{height:ok}]">
                        <li class="astro-list pointer" v-for="(item,idx) in constellation" :key="idx" @click="lucky(item.astroid)">
                            <img class="astro-pic" :src="item.pic" alt="">
                            <p class="astro-name">{{item.astroname}}</p>
                            <p class="astro-time">{{item.date}}</p>
                        </li>
                    </ul>
                    <div :class="['detail',{show:show}]">
                        <h2 class="b tc">一周运势 ( {{condetail.astroname}} ) </h2>
                        <p class="date"><b>date : </b>{{condetail.week.date}}</p>
                        <p class="p1" v-if="condetail.week.career!=''"><b>career : </b>{{condetail.week.career}}</p>
                        <p class="p1" v-if="condetail.week.health!=''"><b>health : </b>{{condetail.week.health}}</p>
                        <p class="p1" v-if="condetail.week.job!=''"><b>job : </b>{{condetail.week.job}}</p>
                        <p class="p1" v-if="condetail.week.love!=''"><b>love : </b>{{condetail.week.love}}</p>
                        <p class="p1" v-if="condetail.week.money!=''"><b>money : </b>{{condetail.week.money}}</p>
                        <img class="back block g10" @click="back()" src="../public/images/down.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu'
    export default{
        data(){
            return{
                constellation:[],
                condetail:{
                    week:[]
                },
                weather:{
                    result:{
                        aqi:{},
                        daily:{}
                    }
                },
                ok:false,
                show:false
            }
        },
        created(){

            this.$axios.get('/astro/all',{
                params:{
                    'appkey':'adfb0e1348ec0adf'
                }
            }).then(res=>{
                this.constellation = res.data.result
            });

            this.$axios({
                method:"get",
                url:'/weather/query',
                params:{
                    'appkey':'adfb0e1348ec0adf',
                    'city':'上海'
                }
            }).then(res=>{
                this.weather = res.data.result
            })
        },
        mounted(){
            let bHeight = document.documentElement.clientHeight;
            this.$refs.banner.style.height=bHeight+'px';
        },
        components:{
            navigation
        },
        methods:{
            search(){
                let words = this.$refs.words.value;
                this.$axios.get('/jzw/search',{
                    params:{
                        'keyword':words,
                        'pagenum':1,
                        'pagesize':2,
                        'appkey':'adfb0e1348ec0adf'
                    }
                }).then(res=>{
                    
                    if(res.data.result){
                        this.total =res.data.result.list 
                        this.test = res.data.result.list.map(item=>{
                            return {content:item.content,answer:'查看答案'}
                        });
                    }else{
                        alert('没有相关信息')
                    }
                    this.$refs.words.value='';
                })
            },
            findAnswer(idx){
                this.test[idx].answer = this.total[idx].answer
            },
            city(){
                let cityName = this.$refs.city.value;
                this.$axios({
                    method:"post",
                    url:'/weather/query',
                    params:{
                        'appkey':'adfb0e1348ec0adf',
                        'city':cityName
                    }
                }).then(res=>{
                    this.weather = res.data.result
                    cityName=''
                })
            },
            lucky(aid){
                this.$axios({
                    method:"post",
                    url:'/astro/fortune',
                    params:{
                        'appkey':'adfb0e1348ec0adf',
                        'astroid':aid
                    }
                }).then(res=>{
                    this.condetail = res.data.result
                    this.ok=true
                    this.show=true
                })
            },
            back(){
                this.ok=false
                this.show=false
            }
        }
    }
</script>

<style scoped>
    .other {background: url('../public/images/bj3.jpg') no-repeat;background-size: cover;}
    .ocontent {width: 1300px;margin:0 auto;padding-top: 250px;}
    .ocon {display: flex;justify-content: center;}
    .olist {background:rgba(0,0,0,0.5);padding: 30px;width: 40%;margin:0 3%;overflow: hidden;}
    .iname {font-size: 24px;font-weight:bold;color:#fff;text-align: center;}
    .keyword {width: 80%;text-align:center;height: 36px;line-height: 36px;font-size: 20px;background: rgba(255,255,255,0.5);border:none;
    border-radius:15px;outline:none;margin:30px auto 0;}
    .exam {font-size: 16px;color:#fff;margin:30px 0 5px 0;}
    .answer {margin-top: 5px;}
    .weather {color:#fff;margin-top: 30px;}
    .city {font-size: 16px;}
    .city i {margin:0 10px;}
    .city .position {font-size: 20px;}
    .temp b{font-size: 24px;}
    .temp em{font-size: 16px;margin-left: 10px;}
    .air {margin-top: 10px;}
    .air .p1 {margin-bottom: 5px;font-size: 16px;font-weight:bold;}
    .air .p2 {font-size: 14px;}
    .week-weather {color:#fff;}
    .wcon {display:flex;justify-content: center;width: 100%;flex-wrap:wrap;}
    .w-list {margin:20px 1% 0;width: 23%;}
    .w-list .wtime {font-weight:bold;margin-bottom: 10px;font-size: 18px;}
    .w-list .allday {font-size: 14px;}
    .w-list .allday em{margin-right: 10px;}
    .iname {margin-bottom: 25px;}
    .astro-con {display: flex;flex-wrap:wrap;transition:all ease 0.5s;margin-top: 0;position: relative;z-index:30;}
    .height {margin-top: -100%;}
    .astro-list {width: 22%;margin:15px 1.5%;text-align: center;}
    .astro-list img{margin-bottom: 5px;display: inline-block;transition:all ease 0.5s;transform:rotate(0deg);}
    .astro-list:hover img{transform:rotate(90deg);}
    .astro-list p{color:#fff;font-size: 16px;}
    .detail {font-size: 16px;color:#fff;transition:all ease 0.5s;opacity: 0;z-index:-50;margin-top: -50%;}
    .detail h2{font-size: 18px;margin-bottom: 25px;}
    .back {margin:30px auto 0;cursor: pointer;width: 26px;}
    .show {opacity: 1;z-index:5;margin-top: 100px;}
</style>