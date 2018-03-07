<template>
    <div class="other" ref="banner">
        <navigation></navigation>
        <div class="ocontent">
            <ul class="ocon">
                <!--<li class="olist">
                    <p class="iname">Question</p>
                    <input class="keyword block" type="text" placeholder="your question" @keydown.enter="search()" ref="words">
                    <div class="exam" v-for="(item,idx) in test" :key="idx">
                        <p class="question"><b>问题：</b>{{item.content}}</p>
                        <p class="answer" @click="findAnswer(idx)">
                            <b>答案：</b>
                            <em class="pointer" >{{item.answer}}</em>
                        </p>
                    </div>
                </li>-->
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
            </ul>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu'
    export default{
        data(){
            return{
                test:[],
                weather:{
                    result:{
                        aqi:{},
                        daily:{}
                    }
                }
            }
        },
        created(){
            // 问题
            // this.$axios.get('apid/jzw/search',{
            //     params:{
            //         'keyword':'水',
            //         'pagenum':1,
            //         'pagesize':2,
            //         'appkey':'adfb0e1348ec0adf'
            //     }
            // }).then(res=>{
            //     if(res.data.result){
            //         this.total =res.data.result.list 
            //         this.test = res.data.result.list.map(item=>{
            //             return {content:item.content,answer:'查看答案'}
            //         });
            //     }
            // });

            // 天气
            this.$axios({
                method:"post",
                url:'apid/weather/query',
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
                this.$axios.get('apid/jzw/search',{
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
            }
        }
    }
</script>

<style scoped>
    .other {background: url('../public/images/bj3.jpg') no-repeat;background-size: cover;}
    .ocontent {width: 1300px;margin:0 auto;padding-top: 200px;}
    .ocon {display: flex;justify-content: center;}
    .olist {background:rgba(0,0,0,0.5);padding: 30px;width: 40%;margin:0 3%;}
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
</style>