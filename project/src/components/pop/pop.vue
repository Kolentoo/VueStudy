<template>
    <div class="pop">
        <div :class="['pop-con',{popin:popin}]">
            {{popmsg}}
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                popin:false
            }
        },
        created(){
            let self = this;
            setTimeout(function() {
                self.popin=true
            }, 200);
            setTimeout(function() {
                self.popin=false;
            }, 3200);
        },
        props:{
            popmsg:''
        }
    }
</script>

<style>    
    .pop-con {background:rgba(0,0,0,0.5);color:#fff;width: 360px;height: 160px;position: fixed;left: 50%;top: 50%;margin:-110px 0 0 -180px;
    font-size: 20px;text-align: center;display: flex;justify-content: center;align-items:center;opacity: 0;z-index:-1;transition:all ease 0.5s;}
    .popin {opacity: 1;z-index:500;margin:-80px 0 0 -180px;}
</style>