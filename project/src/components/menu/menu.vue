<template>
    <div class="menu clearfix">
        <ul class="menu-con fl clearfix">
            <li class="menu-list fl" @click="navto('home')">
                <p class="list1">Home</p>
                <p class="list2">Home</p>
            </li>
            <li class="menu-list fl" @click="navto('discover')">
                <p class="list1">Discover</p>
                <p class="list2">Discover</p>
            </li>
            <li class="menu-list fl" @click="navto('movie')">
                <p class="list1">Movie</p>
                <p class="list2">Movie</p>
            </li>
            <li class="menu-list fl" @click="navto('video')">
                <p class="list1">Video</p>
                <p class="list2">Video</p>
            </li>
            <li class="menu-list fl" @click="navto('weather')">
                <p class="list1">Weather</p>
                <p class="list2">Weather</p>
            </li>
        </ul>
        <div class="btn fr">
            <img class="icon1 block" v-show="icon1" @click="intro()" src="../menu/menu.png" alt="">
            <img class="icon2 block" v-show="icon2" @click="close()" src="../menu/close.png" alt="">
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                icon1:true,
                icon2:false
            }
        },
        methods:{
            intro(){
                this.$emit('bannerTop');
                this.icon1=false;
                this.icon2=true;
            },
            close(){
                this.$emit('bannerBack');
                this.icon1=true;
                this.icon2=false;
            },
            navto(direction){
                this.$router.push(`/${direction}`);
            }
        }
    }
</script>

<style>
    .menu {font-size: 22px;padding-top: 25px;z-index:500;position: absolute;top: 25px;left: 0;width: 100%;}
    .menu-con {margin-left: 40px;}
    .menu li {text-align: center;cursor:pointer;padding:0 20px;}
    .menu li {color:#fff;transition:all ease 0.5s;display: block;}
    .menu li p{transition:all ease 0.5s;display: block;}
    .menu li .list1 {margin-top: 0;opacity: 1;}
    .menu li .list2 {opacity: 0;}
    .menu li:hover .list1 {margin-top: -33px;opacity: 0;}
    .menu li:hover .list2 {opacity: 1;}
    .btn {margin-right: 40px;}
    .btn img{transition:all ease 0.5s;}
    .btn img{width: 29px;height: 29px;cursor:pointer;transform:rotate(0deg);}
    .btn img:hover {transform:rotate(90deg);}
</style>