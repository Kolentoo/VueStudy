<template>
    <div class="discover" ref="banner">
        <navigation></navigation>
        <div class="dcontent">
            <ul class="dgroup">
                <li :class="['dlist pointer dlist1',{listOn:animation1}]" @click="dismenu('movie')">
                    <img class="ipic block g10" src="../public/images/item1.jpg" alt="">
                    <div class="dtxt">
                        <p class="dtitle b">Movie</p>
                        <p class="desc">GET INSPRIED</p>
                    </div>
                </li>
                <li :class="['dlist pointer dlist2',{listOn:animation2}]" @click="dismenu('video')">
                    <img class="ipic block g10" src="../public/images/item2.jpg" alt="">
                    <div class="dtxt">
                        <p class="dtitle b">Video</p>
                        <p class="desc">FOR CREATIVES</p>
                    </div>
                </li>
            </ul>
            <ul class="dgroup">
                <li :class="['dlist pointer dlist3',{listOn:animation3}]" @click="dismenu('Reading')">
                    <img class="ipic block g10" src="../public/images/item3.jpg" alt="">
                    <div class="dtxt">
                        <p class="dtitle b">Reading</p>
                        <p class="desc">GET MOTIVATED</p>
                    </div>
                </li>
                <li :class="['dlist pointer dlist4',{listOn:animation4}]" @click="dismenu('fun')">
                    <img class="ipic block g10" src="../public/images/item4.jpg" alt="">
                    <div class="dtxt">
                        <p class="dtitle b">FUNNY</p>
                        <p class="desc">FOR YOU</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu'
    export default{
        data(){
            return{
                animation1:false,
                animation2:false,
                animation3:false,
                animation4:false
            }
        },
        created(){
            let self = this;
            setTimeout(function() {
                self.animation1=true;
            }, 200);
            setTimeout(function() {
                self.animation2=true;
            }, 400);
            setTimeout(function() {
                self.animation3=true;
            }, 600);
            setTimeout(function() {
                self.animation4=true;
            }, 800);
        },
        mounted(){
            // let bHeight = document.documentElement.clientHeight;
            // this.$refs.banner.style.height=bHeight+'px';
        },
        components:{
            navigation
        },
        methods:{
            dismenu(position){
                this.$router.push(position);
            }
        }
    }
</script>

<style>
    .discover {background: url('../public/images/discover.jpg') no-repeat;background-size: cover;height:100vh;}
    .dcontent {width: 1200px;margin:0 auto;padding-top: 140px;}
    .dgroup {display: flex;justify-content: center;width: 100%;}
    .dlist {width: 40%;position: relative;margin:20px 40px;height: 350px;overflow: hidden;box-shadow:0 0 20px rgba(0,0,0,0.5);}
    .dlist .ipic {height: 100%;transition:all ease 0.5s;transform:scale(1,1);}
    .dlist:hover .ipic {transform:scale(1.1,1.1);}
    .dlist .dtxt {position: absolute;width: 100%;height: 100%;color:#fff;top: 0;left: 0;text-align: center;}
    .dlist .dtitle {font-size: 30px;padding-top: 140px;}
    .dlist .desc {font-size: 18px;}
    .dlist {transition:all ease 0.5s;}
    .dlist1 {transform: translate3d(0, -20%, 0);opacity: 0;}
    .dlist2 {opacity: 0;transform: translate3d(-20%, 0, 0);}
    .dlist3 {transform: translate3d(0, 20%, 0);opacity: 0;}
    .dlist4 {opacity: 0;transform: translate3d(20%, 0, 0);}
    .listOn {opacity: 1;transform: none;}

</style>