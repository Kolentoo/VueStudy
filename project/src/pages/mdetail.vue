<template>
    <div class="mdetail" ref="mdetail">
        <img class="mbj block g10" :src="item" alt="" v-for="(item,idx) in movieDetail.images" v-if="idx==1">
        <div class="mcontent">
            
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                movieDetail:[],
                idx:1
            }
        },
        created(){
            
            this.$nextTick(function(){
                let bHeight = document.documentElement.clientHeight;
                this.$refs.mdetail.style.height=bHeight+'px';
                console.log(this.$refs.mdetail)
            })
            let mid = this.$route.params.mid;
            this.$axios.get('api/movie/detail.api?locationId=290',{
                params:{
                    movieId:mid
                }
            }).then(res=>{
                this.movieDetail=res.data
                // console.log(this.movieDetail))
            })
            
        }
    }
</script>

<style>
    .mdetail {overflow: hidden;width: 100%;}
    /*.mbj {filter:blur(0px);}*/
</style>