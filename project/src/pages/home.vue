<template>
  <div id="home">
    <div :class="['banner',{bannerChange:bannerChange}]" ref="banner">
        <navigation @bannerTop="bannerTop" @bannerBack="bannerBack"></navigation>
        <div class="title">
            <h1 :class="['h1',{on1:on1}]">让美好触手可及!</h1>
            <h2 :class="['h2',{on2:on2}]">Closer To Goodliness</h2>
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
            <dd>Connect with me on <a href="https://weibo.com/u/1921492471?refer_flag=1001030101_" target="_blank">Weibo</a></dd>
        </dl>
    </div>
  </div>
</template>

<script>
    import navigation from '../components/menu/menu';
    export default{
        data(){
            return{
                bannerChange:false,
                on1:false,
                on2:false
            }
        },
        created(){
            this.$nextTick(function(){
                let bHeight = document.documentElement.clientHeight;
                this.$refs.banner.style.height=bHeight+'px';
                this.on1=true;
                this.on2=true;
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
    #home .menu {position: fixed;}
    .banner {background:url(../public/images/banner.jpg) no-repeat center 65%;background-size:cover;transition:all ease 0.5s;position: relative;
    margin-top: 0;}
    .banner h1{padding-top: 460px;text-align: center;color:#fff;font-size: 55px;font-weight:bold;transition:all ease 0.8s;opacity: 0;}
    .banner h2{font-size: 40px;text-align: center;color:#fff;font-weight:bold;transition:all ease 1s;opacity: 0;margin-top: 60px;}
    .banner .on1 {padding-top: 420px;opacity: 1;}
    .banner .on2 {margin-top: 0;opacity: 1;}
    .bannerChange {margin-top: -550px;}
    .index-intro {width: 800px;margin:80px auto 0;padding-bottom: 80px;color: #4a4a4a;font-family: "open sans";}
    .index-intro h1 {font-size: 50px;font-weight:bold;line-height: 60px;}
    .index-intro dl{margin-top: 40px;}
    .index-intro dd{font-size: 18px;margin-bottom: 20px;}
</style>