<template>
    <div :class="['weather',{bannerChange:bannerChange}]" ref="wbanner">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <h2 class="htitle tc">Get motivated to share your best work</h2>
        <div :class="['recommend']">
            <ul :class="['recom-con','recomStyle1']">
                <li :class="['recom-list']" v-for="(recom,idx) in recommend" :key="idx" v-if="recom.hasOwnProperty('images')">
                    <div class="chart clearix">
                        <a class="block" :href="recom.url" target="_blank">
                            <img class="pic fl" :src="recom.images[0]" alt="" >
                        </a>
                    </div>
                    <p class="desc">{{recom.desc}}</p>
                    <p class="author txt" v-if="recom.who-0!=0">作者：{{recom.who}}</p>
                    <p class="ctime txt">创建时间：{{recom.publishedAt}}</p>
                </li>
            </ul>
        </div>
        <div class="arrow-box">
            <div class="arrow1 arrow" @click="prev()">
                <img src="../public/images/left.png" alt="">
            </div>
            <div class="arrow2 arrow" @click="next()">
                <img src="../public/images/right.png" alt="">
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
                recommend:[],
                newGroup:[],
                pages:1
            }
        },
        created(){
            let pages = this.pages;
            this.$axios.get(`apic//api/data/Android/10/${pages}`,{
                params:{
                }
            }).then(res=>{
                let newRecom = res.data.results.filter((value,key,array)=>{
                    return value.hasOwnProperty('images');
                })
                this.newGroup = [...newRecom]
                this.recommend = newRecom.slice(pages,pages+3);
            })
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
            },
            next(){
                let pages = this.pages;
                pages++;
                this.pages = pages;
                this.recommend = this.newGroup.slice(pages,pages+3);
                this.$axios.get(`apic//api/data/Android/10/${pages}`,{
                    params:{
                    }
                }).then(res=>{
                    let newRecom = res.data.results.filter((value,key,array)=>{
                        return value.hasOwnProperty('images');
                    })
                    this.newGroup = [...this.newGroup,...newRecom]
                })
            },
            prev(){
                let pages = this.pages;
                if(pages>=2){
                    pages--;
                    this.pages = pages;
                    this.recommend = this.newGroup.slice(pages,pages+3);
                }else{
                    alert('已经是第一页了！');
                }

            }
        }
    }
</script>

<style scoped>
    .weather {background: url('../public/images/weather3.jpg') no-repeat;background-size: cover;transition:all ease 0.5s;margin-top: 0;}
    .bannerChange {margin-top: -550px;}
    .htitle {font-size: 36px;color:#fff;font-weight:bold;padding:150px 0 50px 0;}
    .recommend {width: 1300px;margin:0 auto;}
    .recom-con {display:flex;justify-content: center;}
    .recomStyle2 {flex-direction: column;}
    .recomStyle1 {flex-direction: row;}
    .recom-list {width: 25%;margin:0 2.5%;background: rgba(0,0,0,0.5);padding:25px;transition:all ease 2s;}
    .recom-list .chart {overflow: hidden;max-height:400px;}
    .recom-list .pic {width: 100%;height:100%;}
    .recom-list .desc {font-size: 16px;font-weight:bold;color:#fff;margin: 12px 0 8px 0;}
    .recom-list .txt {font-size: 14px;color:#fff;}
    .arrow {position: absolute;top: 50%;margin-top: -35px;cursor: pointer;background: rgba(0,0,0,0.5);width: 110px;height: 110px;border-radius:50%;}
    .arrow img{width: 70px;height: 70px;display: block;margin:0 auto;padding-top: 20px;}
    .arrow1 img{position: relative;left: 10px;}
    .arrow2 img{position: relative;right: 10px;}
    .arrow1 {left: 50px;}
    .arrow2 {right:50px;}
</style>    