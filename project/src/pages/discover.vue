<template>
    <div class="video">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <div :class="['video-top',{bannerChange:bannerChange}]" ref="video">
            <video src="http://static.paixin.com/nossr/static/media/a3bce81e7ed152b290a46a505a9bfd8f.17682ef.mp4" autoplay="autoplay" loop="loop">
            </video>
            <div class="video-title">
                <h1>FOR CREATIVES</h1>
                <h2>Discover The World's Best Video</h2>
                <div class="search-box">
                <input type="text" class="search" placeholder="Search For Free Videos">
                <img class="sbtn block" src="../public/images/search.png" alt="">
                </div>
            </div>
        </div>
        <div class="video-content">
            <div class="content-title tc">
                <h3>The top videos, chosen by you</h3>
                <h4>Discover what’s trending according to photographers around the world.</h4>
            </div>
            <div class="content-body">
                <ul class="hd">
                    <li class="hd-list pointer on">Hot</li>
                    <li class="hd-list pointer">Recommend</li>
                </ul>
                <ul class="bd">
                    <li class="video-list clearfix" v-for="item in movieList">
                        <img class="img-url fl" :src="item.img_url" alt="">
                        <div class="detail fr">
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu';
    export default{
        data(){
            return{
                bannerChange:false,
                movieList:[]
            }
        },
        components:{
            navigation
        },
        created(){
            this.$axios.get('http://v3.wufazhuce.com:8000/api/channel/movie/more/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`').then((res)=>{
                this.movieList = res.data.data;
                console.log(this.movieList)
            })
        },
        methods:{
            bannerTop(){
                this.bannerChange=true
            },
            bannerBack(){
                this.bannerChange=false
            }
        }
    }
</script>

<style>
  ::-webkit-scrollbar{width:0px}
  .video {padding-bottom: 120px;}
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
  .content-title {margin-top: 75px;}
  .content-title h3{color:#333;font-size: 36px;}
  .content-title h4{font-size: 18px;margin-top: 5px;}
  .video-con {display: flex;justify-content:center;width: 80%;margin:50px auto 0;flex-wrap:wrap;}
  .video-list {width: 47%;margin:40px 1.5% 0;}
  .list-con {position: relative;}
  .video-list img{width: 100%;height: 100%;}
  .video-list .mask {position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);display: flex;
  justify-content:center;align-items:center;}
  .video-list .video-icon {width: 60px;height: 60px;}
  .video-list .vname {font-size: 24px;padding-top: 5px;}
  .content-body {margin-top: 30px;}
  .hd {display:flex;justify-content: center;}
  .hd .hd-list {margin:0 60px;font-size: 20px;border-bottom: 2px solid #333;line-height: 40px;}
  .hd .on {color:#0099e5;border-color:#0099e5;}
  .content-body {width: 1200px;margin:0 auto;}
</style>