<template>
    <div :class="['weather',{bannerChange:bannerChange}]" ref="wbanner">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <h2 class="htitle tc">Get motivated to share your best work</h2>
        <div :class="['recommend']">
            <ul :class="['recom-con','recomStyle1',{rechange:rechange},{recomok:recomok}]">
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
        <pop :popmsg="pmsg" v-if="showPop"></pop>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu'
    import pop from '../components/pop/pop'
    export default{
        data(){
            return{
                bannerChange:false,
                recommend:[],
                newGroup:[],
                pages:1,
                pmsg:'已经是第一页了',
                showPop:false,
                rechange:false,
                recomok:true
            }
        },
        created(){
            let pages = this.pages;
            // this.$axios.get(`apic/api/data/Android/10/${pages}`,{
            this.$axios.get(`/api/data/Android/10/${pages}`,{
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
            let self = this;
            setTimeout(function() {
                self.recomok=false
            }, 1000);
        },
        components:{
            navigation,pop
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
                this.rechange=true;
                pages++;
                this.pages = pages;
                
                this.recommend = this.newGroup.slice(pages,pages+3);
                this.$axios.get(`/api/data/Android/10/${pages}`,{
                // this.$axios.get(`apic//api/data/Android/10/${pages}`,{
                    params:{
                    }
                }).then(res=>{
                    let newRecom = res.data.results.filter((value,key,array)=>{
                        return value.hasOwnProperty('images');
                    })
                    this.newGroup = [...this.newGroup,...newRecom]
                })
                let self = this;
                setTimeout(function() {
                    self.rechange=false;
                }, 1000);
            },
            prev(){
                let pages = this.pages;
                this.rechange=true;
                if(pages>=2){
                    pages--;
                    this.pages = pages;
                    this.recommend = this.newGroup.slice(pages,pages+3);
                }else{
                    this.showPop=true
                }
                let self = this;
                setTimeout(function() {
                    self.rechange=false;
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    .weather {background: url('../public/images/weather3.jpg') no-repeat;background-size: cover;transition:all ease 0.5s;margin-top: 0;}
    .bannerChange {margin-top: 0px;}
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

    /*base code*/
    .rechange {
        animation:bounceIn 0.8s;
    }

    .recomok {animation:bounceInDown 1s;}

    @keyframes bounceInDown {
    0%, 100%, 60%, 75%, 90% {
        -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
        transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0);
        -ms-transform: translate3d(0, -3000px, 0);
        transform: translate3d(0, -3000px, 0)
    }
    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0);
        -ms-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0)
    }
    75% {
        -webkit-transform: translate3d(0, -10px, 0);
        -ms-transform: translate3d(0, -10px, 0);
        transform: translate3d(0, -10px, 0)
    }
    90% {
        -webkit-transform: translate3d(0, 5px, 0);
        -ms-transform: translate3d(0, 5px, 0);
        transform: translate3d(0, 5px, 0)
    }
    100% {
        -webkit-transform: none;
        -ms-transform: none;
        transform: none
    }
    }


    @keyframes bounceIn {
    0%, 100%, 20%, 40%, 60%, 80% {
        -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
        transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        -ms-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3)
    }
    20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        -ms-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1)
    }
    40% {
        -webkit-transform: scale3d(.9, .9, .9);
        -ms-transform: scale3d(.9, .9, .9);
        transform: scale3d(.9, .9, .9)
    }
    60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        -ms-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03)
    }
    80% {
        -webkit-transform: scale3d(.97, .97, .97);
        -ms-transform: scale3d(.97, .97, .97);
        transform: scale3d(.97, .97, .97)
    }
    100% {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        -ms-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1)
    }
    }



</style>    