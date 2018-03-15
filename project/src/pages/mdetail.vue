<template>
    <div class="mdetail" ref="mdetail">
        <img class="mbj block g10" :src="movieDetail.images[0]" alt="" ref="mbj">
        <div class="mcontent">
            <div class="mcon clearfix">
                <img class="mimg block fl" :src="movieDetail.image" alt="">
                <div class="info fr">
                    <p class="title"><b>{{movieDetail.titleCn}}</b> ({{movieDetail.titleEn}})</p>
                    <p class="year">年份：{{movieDetail.year}} 评分：{{movieDetail.rating}} {{movieDetail.scoreCount}}人评价</p>
                    <p class="length">片长：{{movieDetail.runTime}} 类型：{{movieDetail.type}}</p>
                    <p class="txt">{{movieDetail.content}}</p>
                </div>
            </div>
            <div class="photo">
                <ul class="photo-con">
                    <li class="photo-list pointer" v-for="(photo,idx) in photos" :key="idx" @click="bjChange(photo,idx)">
                        <img class="block photo-pic" :src="photo" alt="">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                movieDetail:{
                    images:[]
                },
                photos:[],
                location:0
            }
        },
        created(){
            this.$nextTick(function(){
                let bHeight = document.documentElement.clientHeight;
                this.$refs.mdetail.style.height=bHeight+'px';
            })
            let movieId = this.$route.params.mid;
            // this.$axios.get('apib/movie/detail.api?locationId=290',{
            this.$axios.get(`/movie/detail.api/${movieId}`,{
                params:{
                    movieId:movieId
                }
            }).then(res=>{
                this.movieDetail=res.data
                this.photos = res.data.images
            })
        },
        methods:{
            bjChange(picUrl,idx){
                this.$refs.mbj.src=picUrl
            }
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar{width:0px}
    ::-moz-scrollbar{width:0px}
    .mdetail {overflow: hidden;width: 100%;position: relative;}
    .mbj {height: 100%;filter:blur(3px);}
    .mcontent {width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index:50;}
    .mcon {width: 780px;padding:20px;background: rgba(0,0,0,0.5);color:#fff;margin:100px auto 0;}
    .mimg {width: 230px;}
    .info {width: 530px;}
    .title {font-size: 30px;margin-bottom: 10px;}
    .year {font-size: 14px;}
    .length {font-size: 14px;}
    .txt {font-size: 14px;margin-top: 10px;height: 210px;overflow-y: scroll;}
    .photo {margin-top: 100px;}
    .photo-con {display: flex;justify-content:center;align-items: stretch;margin:0 10%;}
    .photo-list {width: 20%;margin:0 2%;box-shadow:0 0 20px rgba(0,0,0,0.3);max-height:220px;}
    .photo-list img{width: 100%;height: 100%;}

    /*base code*/
.photo-list:hover img{
  animation:flipInX 1s;
}

@keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -ms-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
    opacity: 0
  }
  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -ms-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-transition-timing-function: ease-in;
    transition-timing-function: ease-in
  }
  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    -ms-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1
  }
  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    -ms-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg)
  }
  100% {
    -webkit-transform: perspective(400px);
    -ms-transform: perspective(400px);
    transform: perspective(400px)
  }
}

/*base code*/
.mcon {
  animation:fadeInDown 0.6s;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -20%, 0);
    -ms-transform: translate3d(0, -20%, 0);
    transform: translate3d(0, -20%, 0)
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  }
}

/*base code*/
.photo {
  animation:fadeInUp 0.6s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 30%, 0);
    -ms-transform: translate3d(0, 30%, 0);
    transform: translate3d(0, 30%, 0)
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  }
}



</style>