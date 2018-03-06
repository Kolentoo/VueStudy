<template>
    <div class="video">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <div :class="['video-top',{bannerChange:bannerChange}]" ref="video">
            <div class="video-title">
                <h1>FOR YOU</h1>
                <h2>Hand-picked by our editors</h2>
            </div>
        </div>
        <div class="video-content">
            <div class="content-title tc">
                <h3>The top life, chosen by you</h3>
                <h4>Discover what’s trending according to photographers around the world.</h4>
            </div>
            <div class="content-body">
                <ul class="hd">
                    <li :class="['hd-list','pointer',{on:location===idx}]" v-for="(item,idx) in lilist" @click="tab(idx)">{{item}}</li>
                </ul>
                <div class="bd">
                    <ul class="bd-con" v-show="location===0">
                        <li class="video-list" v-for="(item,index) in movieList">
                            <div class="list-con clearfix">
                                <div class="chart img-url fl">
                                    <img class="block" :src="item.img_url" alt="">
                                </div>
                                <div class="detail fr">
                                    <p class="title">{{item.title}}</p>
                                    <p class="desc">{{item.forward}}</p>
                                    <div class="info clearfix">
                                        <p class="subtitle fl">来源：{{item.subtitle}}</p>
                                        <p class="time fr">{{item.last_update_date}}</p>
                                    </div>
                                    <p class="reading" @click="indetail(item.content_id,item,index)">Keep Reading</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="bd-con" v-show="location===1">
                        <li class="video-list" v-for="(item,index) in musicList">
                            <div class="list-con clearfix">
                                <div class="chart img-url fl">
                                    <img class="block" :src="item.img_url" alt="">
                                </div>
                                <div class="detail fr">
                                    <p class="title">{{item.title}}</p>
                                    <p class="desc">{{item.forward}}</p>
                                    <div class="info clearfix">
                                        <p class="subtitle fl">来源：{{item.subtitle}}</p>
                                        <p class="time fr">{{item.last_update_date}}</p>
                                    </div>
                                    <p class="reading" @click="indetail(item.content_id,item,index)" v-show="number!=index">Keep Reading</p>
                                    <p class="reading" @click="outdetail(item.content_id,item,index)" v-show="number==index">Close</p>
                                    <span class="itemid hide">{{item.id}}</span>
                                </div>
                            </div>
                            <div :class="['pop-box',{'pop-on':number==index}]">
                                <div class="pop-con">
                                    <h2 class="tc">{{item.share_info.title}}</h2>
                                    <p class="p1">{{item.share_info.content}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
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
                lilist:['Musics','Movies'],
                location:0,
                musicList:[],
                movieList:[],
                readList:[],
                itemid:'',
                off:false,
                number:-1
            }
        },
        components:{
            navigation
        },
        mounted(){

        },
        created(){
            this.$nextTick(()=>{
                let bHeight = document.documentElement.clientHeight;
                this.$refs.video.style.height=bHeight+'px';
            })
            this.$axios.get('http://v3.wufazhuce.com:8000/api/channel/music/more/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android').then((res)=>{
                this.movieList = res.data.data;
            })
            this.$axios.get('http://v3.wufazhuce.com:8000/api/channel/movie/more/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`').then((res)=>{
                this.musicList = res.data.data;
            })
        },
        methods:{
            bannerTop(){
                this.bannerChange=true
            },
            bannerBack(){
                this.bannerChange=false
            },
            tab(idx){
                this.location=idx;  
            },
            indetail(content_id,self,idx){
                if(this.location===0){
                    this.$router.push(`/disdetail/${content_id}/music`);
                }else if(this.location===1){
                     this.off=true
                     this.number = idx
                }else {
                    // this.$router.push(`/disdetail/${content_id}/read`);
                }
            },
            outdetail(){
                this.off=false
                this.number = -1
            }
        }
    }
</script>

<style scoped>
  body,html{overflow: visible;}
  .video {margin-bottom: 120px;}
  .navigation {position: absolute;top: 0;left: 0;width: 100%;z-index:100;}
  .video-top {margin-top: 0;transition:all ease 0.5s;background: url('../public/images/mbanner2.jpg') no-repeat;background-size: cover;}
  .bannerChange {margin-top: -450px;}
  .video-title {position: absolute;width: 100%;top: 0;left: 0;}
  .video h1{text-align: center;color:#fff;font-size: 65px;font-weight:bold;padding-top: 380px;transition:all ease 0.5s;}
  .bannerChange h1{padding-top: 100px;transition:all ease 0.5s;}
  .video h2{text-align: center;font-size: 38px;color:#fff;}
  .search-box .sbtn {position: absolute;width:34px;cursor: pointer;top: 3px;right: -20px;padding:20px;}
  .content-title {margin-top: 75px;}
  .content-title h3{color:#333;font-size: 36px;}
  .content-title h4{font-size: 18px;margin-top: 5px;}
  .content-body {margin-top: 30px;}
  .hd {display:flex;justify-content: center;margin-top: 20px;}
  .hd .hd-list {margin:0 60px;font-size: 20px;border-bottom: 2px solid #333;line-height: 40px;transition:all ease 0.3s;}
  .hd .hd-list:hover {color:#0099e5;border-color:#0099e5;}
  .hd .on {color:#0099e5;border-color:#0099e5;}
  .content-body {width: 1200px;margin:0 auto;}
  .video-list {width: 1200px;margin-top: 50px;}
  .img-url {width: 550px;overflow: hidden;}
  .img-url img{width: 100%;transition:all ease 0.5s;transform:scale(1,1);max-height:450px;border-radius:10px;}
  .img-url img:hover {transform:scale(1.13,1.13);}
  .detail {width: 600px;}
  .detail .title {font-size: 28px;font-weight:bold;}
  .detail .desc {font-size: 18px;margin-top: 5px;}
  .detail .info {font-size: 18px;margin-top: 20px;}
  .reading {background: #02a3de;box-shadow:inset 0px 1px 0px rgba(255,255,255,0.2);color:#fff;text-shadow: rgb(104, 104, 104) 0px 1px 0px;
  font-size: 16px !important;padding:12px 20px 11px;font-weight:800;display: inline-block;border-radius:3px;margin-top: 50px;cursor: pointer;
  transition:all ease 0.5s;}
  .reading:hover {background: rgba(9,189,257,1);}
  .pop-box {position: fixed;z-index:200;height: 600px;width: 30%;height:100%;right: -100%;top: 0;background: #fff;
  box-shadow:0 0 10px rgba(157,157,157,0.5);transition:all ease 0.5s;opacity: 0;z-index:-1;}
  .pop-on {opacity: 1;z-index:50;right: 0;}
  .pop-con {padding:30px;}
  .pop-con h2{font-size: 30px;color:#333;margin:20px 0;}
  .pop-con .p1 {font-size: 14px;text-indent: 2em;width: 450px;margin:0 auto;overflow-y: scroll;height:800px;}
</style>