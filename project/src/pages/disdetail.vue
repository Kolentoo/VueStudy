<template>
    <div class="disdetail">
        <div class="banner-box" ref="bbox">
            <img class="pic-banner g10" :src="detail.cover" alt="">
            <div class="story" v-if="option==='music'">
                <p class="title tc">{{detail.story_title}}</p>
                <div class="author tc">
                    <p class="p1">{{detail.author.user_name}}</p>
                    <p class="p2">{{detail.author.desc}}</p>
                </div>
                <div class="inner clearfix">
                    <img class="cover block fl" :src="detail.cover" alt="">
                    <div class="txt">
                        <p class="lyric"><b>歌词：</b><br><span class="lyric-con">{{detail.lyric}}</span></p>
                        <p class="info"><b>作者：</b><br><span>{{detail.info}}</span></p>
                    </div>
                </div>
                <div class="story-info clearfix tc">
                    <img class="spic vm" :src="detail.story_author.web_url" alt="">
                    <div class="sinfo tc">
                        <p class="p3 b">{{detail.story_author.user_name}}</p>
                        <p class="p4">{{detail.story_author.desc}}</p>
                    </div>
                </div>
                
            </div>
            <div class="movie" v-if="option==='movie'">
                123
            </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        data(){
            return{
                detail:{
                    author:'',
                    story_author:'',
                    option:''
                }
            }
        },
        mounted(){
            this.$nextTick(function(){
                let bHeight = document.documentElement.clientHeight;
                this.$refs.bbox.style.height=bHeight+'px';
            });
        },
        created(){
            let type = this.$route.params.key
            let itemid =this.$route.params.id;
            this.option = type;
            if(type==='music'){
                this.$axios.get(`http://v3.wufazhuce.com:8000/api/music/detail/${itemid}?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`).then((res)=>{
                    this.detail=res.data.data
                })
            }else if(type==='movie'){
                this.$axios.get(`http://v3.wufazhuce.com:8000/api/movie/${itemid}/story/1/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`).then((res)=>{
                    this.detail=res.data.data
                })
            }else{
                this.$axios.get(`http://v3.wufazhuce.com:8000/api/essay/${itemid}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`).then((res)=>{
                    this.detail=res.data.data
                })
            }
        },
        computed:{
            
        }
    }
</script>

<style scoped>
    body,html{overflow: hidden;}
    .banner-box {width: 100%;overflow: hidden;position: relative;}
    .pic-banner {background-size: cover;filter:blur(30px);}
    .story {position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index:50;}
    .title {font-size: 40px;font-weight:bold;margin-top: 100px;}
    .author {font-size: 14px;margin:30px 0;font-weight:bold;}
    .inner {width: 1000px;margin:50px auto 0;}
    .cover {width: 400px;}
    .lyric {margin-bottom: 20px;}
    .lyric-con {height: 270px;overflow-y: scroll;}
    .txt {margin:5px 0 0 450px;font-size: 16px;}
    .txt span{display: block;margin-top: 5px;}
    .story-info {margin-top: 70px;}
    .story-info .spic {width: 80px;height:80px;border-radius:100%;margin-bottom: 20px;}
    .story-info .sinfo {font-size: 14px;}
</style>