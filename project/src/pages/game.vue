<template>
    <div class="game" ref="banner">
        <navigation></navigation>
        <div class="gcontent">
            <canvas id="chess" width="450px" height="450px" @click="go"></canvas>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu';
    export default{
        data(){
            return{
                me:true,
                chessBoard:[]
            }
        },
        created(){
            this.$nextTick(function(){
                let bHeight = document.documentElement.clientHeight;
                this.$refs.banner.style.height=bHeight+'px';
                this.e = this.$refs.chessBoard;
            });
        },
        mounted(){
            var chess =document.getElementById('chess');
            var context  = chess.getContext('2d');
            context.strokeStyle = 'rgb(157,157,157)';

            var logo = new Image();
            logo.src = '../public/images/K.jpg';
            // logo.onload = function(){
            //     context.drawImage(logo,0,0,450,450);
            //     for(let i = 0;i<15;i++){
            //         context.moveTo(15+ i*30,15);
            //         context.lineTo(15+ i*30,435);
            //         context.stroke();
            //         context.moveTo(15,15+i*30);
            //         context.lineTo(435,15+i*30);
            //         context.stroke();
            //     }
            // }
            // 棋盘
            for(let i = 0;i<15;i++){
                context.moveTo(15+ i*30,15);
                context.lineTo(15+ i*30,435);
                context.stroke();
                context.moveTo(15,15+i*30);
                context.lineTo(435,15+i*30);
                context.stroke();
            }

            for(let i = 0;i<15;i++){
                this.chessBoard[i] = [];
                for(let j = 0;j<15;j++){
                    this.chessBoard[i][j] = 0;
                }
            }

        },
        components:{
            navigation
        },
        methods:{
            oneStep(i,j,me){
                var chess =document.getElementById('chess');
                var context  = chess.getContext('2d');
                context.beginPath();
                context.arc(15+ i*30,15+ j*30,13,0,2*Math.PI);
                context.closePath();
                var gradient = context.createRadialGradient(15+ i*30+2,15+ i*30-2,13,15+ i*30+2,15+ i*30-2,0);
                if(this.me){
                    gradient.addColorStop(0,'#0a0a0a');
                    gradient.addColorStop(1,'#636766');
                }else{
                    gradient.addColorStop(0,'#d1d1d1');
                    gradient.addColorStop(1,'#f9f9f9');
                }
                context.fillStyle = gradient;
                context.fill();
            },
            go(e){
                let x = e.offsetX;
                let y = e.offsetY;
                let i = Math.floor(x/30);
                let j = Math.floor(y/30);
                if(this.chessBoard[i][j]===0){
                    this.oneStep(i,j,this.me);
                    this.me = !this.me;
                    if(this.me){
                        this.chessBoard[i][j]=1;
                    }else{
                        this.chessBoard[i][j]=2;
                    }
                    console.log(this.me)
                }else{
                    alert('此处已经有子')
                }
            }
        }
    }
</script>

<style scoped>
    .game {background: url('../public/images/bj4.jpg') no-repeat;background-size: cover;}
    .gcontent {padding-top: 250px;}
    #chess {margin:0 auto;box-shadow:-3px -3px 3px rgba(157,157,157,0.4);box-shadow:5px 5px 5px rgba(157,157,157,0.4);
    background: #fff;display: block;}
</style>