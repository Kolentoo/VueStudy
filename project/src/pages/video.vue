<template>
    <div class="video">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <div :class="['video-top',{bannerChange:bannerChange}]">
            <video src="http://static.paixin.com/nossr/static/media/a3bce81e7ed152b290a46a505a9bfd8f.17682ef.mp4" autoplay="autoplay" loop="loop">
            </video>
            <div class="video-title">
                <h1>FOR CREATIVES</h1>
                <h2>Discover The World's Best Life</h2>
                <div class="search-box">
                <input type="text" class="search" placeholder="Search For Free Videos">
                <img class="sbtn block" src="../public/images/search.png" alt="">
                </div>
            </div>
        </div>
        <div class="vcontent">
            <h2 class="tc title">— Daily appetizers for your eyes —</h2>
            <p class="tips tc">每日精选 视频推荐</p>
            <ul class="vcon content">
                <li class="vlist clearfix pointer" v-for="(item,idx) in items" :key="idx" v-if="item.type==='video'" @click="play(idx)" @mouseenter="menter(item,idx)" 
                @mouseleave="mleave(item,idx)">
                    <div :class="['chart clearfix tc fl',{chartChange:location===idx}]">
                        <img class="g10 block fl pic" :src="pic.bgPicture" alt="" v-for="(pic,index) in item.data.tags" :key="index" v-if="index===0">
                        <div class="mask">
                            <div class="title-box">
                                <p class="ctitle">{{item.data.title}}</p>
                                <p class="desc">{{item.data.description}}</p>
                                <div class="info"  v-if="item.data.author-0!=0">
                                    <img :class="['icon',{iconRotate:position===idx}]" :src="item.data.author.icon" alt="">
                                    <span class="author">{{item.data.author.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="['video-box fr',{videoOn:location===idx}]">
                        <video controls="controls" class="video-con" :src="item.data.playUrl" :id="'video'+idx"></video>
                    </div>
                    
                </li>
            </ul>
        </div>
        <p class="more tc">— {{loading}} —</p>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu';
    export default{
        data(){
            return{
                bannerChange:false,
                items:[{
                    data:{
                        tags:[]
                    }
                }],
                change:true,
                location:-1,
                position:-1,
                status:'pause',
                loading:'More',
                nextPage:'',
                playidx:''
            }
        },
        components:{
            navigation
        },
        mounted(){

        },
        created(){
            let num = 5;
            // this.$axios.get('apia/v4/discovery/hot',{
            this.$axios.get(`/v4/discovery/hot/${num}`,{
                params:{
                    num:5
                }
            }).then(res=>{
                this.items = res.data.itemList.filter((value,key,array)=>{
                   return value.type==='video'
                });
                this.nextPage = res.data.nextPageUrl
            })
            let sw=true;
            let self = this;
            window.addEventListener('scroll',function(){  
                // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
                // console.log(document.body.scrollTop); // 滚动高度  
                // console.log(document.body.offsetHeight); // 文档高度  
                // 判断是否滚动到底部  
                if(document.documentElement.scrollTop + window.innerHeight - document.body.offsetHeight >= -50) { 
                    if(sw==true){  
                        self.loading = 'Loading'
                        sw = false;
                        let xurl = self.nextPage.replace('http://baobab.kaiyanapp.com/api','');
                        self.$axios.get(xurl,{
                        }).then(res=>{
                            let newItem = res.data.itemList.filter((value,key,array)=>{
                                return value.type==='video'
                            });
                            newItem.forEach((value,key,array)=>{
                                self.items.push(value);
                            });
                            if(res.data.nextPageUrl-0!=0){
                                self.nextPage = res.data.nextPageUrl;
                                self.loading='More'
                                sw = true;
                            }else{
                                sw = false;
                                self.loading='End'
                            }

                        })
                             
                    }  
                }  
            }); 
        },
        methods:{
            bannerTop(){
                this.bannerChange=true
            },
            bannerBack(){
                this.bannerChange=false
            },
            play(x){
                this.location=x
                if(this.playidx){
                    let vid2 = `video${this.playidx}`;
                    let videoBefore = document.getElementById(vid2);
                    videoBefore.pause();
                }
                this.playidx=x
                let vid = `video${x}`;
                let video = document.getElementById(vid);
                video.play();
            },
            menter(i,x){
                if(this.position===-1){
                    this.position=x
                }else{
                    this.position=-1
                }
            },
            mleave(i,x){
                if(this.position===-1){
                    this.position=x
                }else{
                    this.position=-1
                }
            }
            
        }
    }
</script>

<style scoped>
  body,html{overflow: visible;}
  .video {padding-bottom: 60px;}
  .navigation {position: absolute;top: 0;left: 0;width: 100%;z-index:100;}
  .video-top {width: 100%;background-size: cover;margin-top: 0;transition:all ease 0.5s;}
  .bannerChange {margin-top: -450px;}
  .video video{width: 100%;height:100%;cursor: inherit;object-fit: cover;}
  .video-title {position: absolute;width: 100%;top: 0;left: 0;}
  .video h1{text-align: center;color:#fff;font-size: 65px;font-weight:bold;padding-top: 300px;transition:all ease 0.5s;}
  .bannerChange h1{padding-top: 100px;transition:all ease 0.5s;}
  .video h2{text-align: center;font-size: 38px;color:#fff;}
  .search-box {width: 850px;margin:50px auto 0;position: relative;}
  .search-box input{background: rgba(255,255,255,0.7);border-radius:10px;width: 100%;height: 75px;line-height: 75px;
  color:#333;font-size:24px;padding-left: 30px;outline:none;text-align: center;}
  .search-box .sbtn {position: absolute;width:34px;cursor: pointer;top: 3px;right: -20px;padding:20px;}
  .video .title {font-size: 32px;color:#333;margin-top: 100px;line-height: 32px;}
  .video .tips {font-size: 24px;color:#333;margin:10px 0 50px 0;}
  .vlist {height: 500px;overflow: hidden;position: relative;}
  .vlist .chart {transition:all ease 0.5s;width:100%;position: relative;height: 500px;}
  .vlist .chartChange {width:50%;}
  .vlist .pic {filter:blur(2px);}
  .vlist .mask {position: absolute;width: 100%;height: 100%;background:rgba(157,157,157,0.1);top: 0;left: 0;}
  .vlist .ctitle {font-size: 24px;color:#fff;font-weight:bold;margin-top: 170px;text-shadow: 0 0 5px rgb(157,157,157);}
  .vlist .desc {font-size: 18px;color:#fff;width: 600px;margin:15px auto 0;text-shadow: 0 0 5px rgb(157,157,157);}
  .vlist .info {margin-top: 30px;}
  .vlist .info {display: flex;justify-content: center;color:#fff;font-size: 14px;}
  .vlist .info .icon {width: 50px;height: 50px;border-radius:50%;}
  .vlist .info .iconRotate {animation: iconRotate 5s linear infinite;}
  .vlist .info .author {line-height: 50px;margin-left: 50px;}
  .vlist .video-box {width: 50%;height: 500px;position: relative;margin-right: -50%;transition:all ease 0.5s;}
  .vlist .videoOn {margin-right: 0;}
  .more {font-size: 24px;margin-top: 60px;}
  @keyframes iconRotate {
      0%{transform:rotate(0deg);}
      50%{transform:rotate(180deg);}
      100%{transform:rotate(360deg);}
  }
</style>