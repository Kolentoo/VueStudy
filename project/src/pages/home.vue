<template>
  <div id="home">
    <div :class="['banner',{bannerChange:bannerChange}]" ref="banner">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <div class="title">
            <transition name="h1">
                <h1 class="h1">让美好触手可及!</h1>
            </transition>
            <transition name="h2">
                <h2 class="h2">Closer To Goodliness</h2>
            </transition>
        </div>
    </div>
    <div class="index-intro">
        <h1>WHAT YOU HAVE</h1>
        <h1>TO KNOW ABOUT ME.</h1>
        <dl>
            <dd>I am an Front-end Engineer focused on digital user experiences. Currently living in Shanghai, WA and working at Shanghai, 
                an automotive advertising agency.</dd>
            <dd>My hobbies and passions include User Experience, Web Development, Digital Marketing and Photography. 
                My goal is to solve problems through thoughtful ideas that translate into designs for various mediums.</dd>
            <dd>Connect with me on <a href="">Weibo</a></dd>
        </dl>
    </div>
  </div>
</template>

<script>
    import navigation from '../components/menu/menu';
    export default{
        data(){
            return{
                bannerChange:false
            }
        },
        created(){
            this.$nextTick(function(){
                let bHeight = document.documentElement.clientHeight;
                this.$refs.banner.style.height=bHeight+'px';
            });
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
    body,html{overflow: hidden;}
    .banner {background:url(../public/images/banner.jpg) no-repeat center 65%;background-size:cover;transition:all ease 0.5s;position: relative;
    margin-top: 0;}
    .banner h1{padding-top: 320px;text-align: center;color:#fff;font-size: 55px;font-weight:bold;}
    .banner h2{font-size: 40px;text-align: center;color:#fff;font-weight:bold;}
    .bannerChange {margin-top: -550px;}
    .index-intro {width: 800px;margin:80px auto 0;padding-bottom: 80px;color: #4a4a4a;font-family: "open sans";}
    .index-intro h1 {font-size: 50px;font-weight:bold;line-height: 60px;}
    .index-intro dl{margin-top: 40px;}
    .index-intro dd{font-size: 18px;margin-bottom: 20px;}
</style>