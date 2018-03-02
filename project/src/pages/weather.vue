<template>
    <div :class="['weather',{bannerChange:bannerChange}]" ref="wbanner">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <div class="wcontent">
            <div class="con-box">
                <p class="wtime">发布时间：{{nowWeather.last_update}}</p>
                <p class="location">位置：{{nowWeather.location.name}} （{{nowWeather.location.timezone}}）</p>
                <p class="temp"><i>{{nowWeather.now.temperature}}°</i> {{nowWeather.now.text}}</p>
                <!--<p class="stitle b">建议：</p>-->
                <!--<ul class="suggestion clearfix hide">
                    <li class="s-list fl">
                        <span class="s1">洗车 : {{life.suggestion.car_washing.brief}}</span>
                    </li>
                    <li class="s-list fl">
                        <span class="s1">穿衣 : {{life.suggestion.dressing.brief}}</span>
                    </li>
                    <li class="s-list fl">
                        <span class="s1">感冒 : {{life.suggestion.flu.brief}}</span>
                    </li>
                    <li class="s-list fl">
                        <span class="s1">运动 : {{life.suggestion.sport.brief}}</span>
                    </li>
                    <li class="s-list fl">
                        <span class="s1">旅行 : {{life.suggestion.travel.brief}}</span>
                    </li>
                    <li class="s-list fl">
                        <span class="s1">紫外线 : {{life.suggestion.uv.brief}}</span>
                    </li>
                </ul>-->
            </div>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu'
    export default{
        data(){
            return{
                bannerChange:false,
                nowWeather:{
                    location:{},
                    now:{}
                },
                life:{
                    suggestion:{}
                }
            }
        },
        created(){
            this.$axios.get('apic/v3/weather/now.json?key=u68lgahmwhmgrrn7&language=zh-Hans&unit=c',{
                params:{
                    location:'shanghai'
                }
            }).then(res=>{
                this.nowWeather = res.data.results[0];
            })

            // this.$axios.get('apic/v3/life/suggestion.json?key=u68lgahmwhmgrrn7&language=zh-Hans',{
            //     params:{
            //         location:'shanghai'
            //     }
            // }).then(res=>{
            //     this.life = res.data.results[0];    
            //     console.log(this.life)
            // })
            this.$nextTick(()=>{
                let bHeight = document.documentElement.clientHeight;
                this.$refs.wbanner.style.height=bHeight+'px';
            })
        },
        components:{
            navigation
        },
        methods:{
            bannerTop(){
                this.bannerChange=true;
            },
            bannerBack(){
                this.bannerChange=false;
            }
        }
    }
</script>

<style scoped>
    .weather {background: url('../public/images/weather1.jpg') no-repeat;background-size: cover;transition:all ease 0.5s;margin-top: 0;}
    .bannerChange {margin-top: -550px;}
    .wcontent {width: 1300px;color:#fff;margin:0 auto;padding-top: 150px;}
    .con-box {background: rgba(0,0,0,0.5);padding:20px;display: inline-block;}
    .wtime {font-size: 16px;}
    .location {font-size: 16px;margin:5px 0 5px 0;}
    .temp {font-size: 16px;}
    .temp i{font-size: 30px;margin-right: 10px;}
    .stitle {font-size: 16px;margin:15px 0 5px 0;}
    .s-list {width: 30%;font-size: 14px;}
</style>