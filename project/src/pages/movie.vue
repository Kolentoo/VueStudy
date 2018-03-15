<template>
    <div class="movie">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <div :class="['mbanner',{'bannerChange':bannerChange}]" ref="banner">
          <h1 class="htitle">Get inspired</h1>
          <h2 class="htitle">share your best life</h2>
        </div>
        <div class="content">
            <swiper :movie="type1"></swiper>
            <swiper :movie="type2"></swiper>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu'
    import swiper from '../components/swiper/swiper'
    export default{
        data(){
          return{
            bannerChange:false,
            type1:'now',
            type2:'new',
            type3:'good'
          }
        },
        components:{
          navigation,swiper
        },
        created(){
            this.$nextTick(function(){
                let bHeight = document.documentElement.clientHeight;
                this.$refs.banner.style.height=bHeight+'px';
            })
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

<style>
    #swiper .swiper-pagination-bullet-active {background: #669c20;}
    .mbanner {background: url('../public/images/mbanner1.jpg') no-repeat center 65%;;background-size: cover;transition:all ease 0.5s;margin-top: 0;
    position: relative;}
    .bannerChange {margin-top: -550px;}
    .mbanner h1{padding-top: 410px;text-align: center;color:#fff;font-size: 55px;font-weight:bold;}
    .mbanner h2{font-size: 40px;text-align: center;color:#fff;font-weight:bold;}

    .htitle {
        animation:zoomIn 0.8s;
    }
    @keyframes zoomIn {
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            -ms-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3)
        }
        50% {
            opacity: 1
        }
    }


</style>