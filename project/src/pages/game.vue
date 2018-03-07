<template>
    <div class="game" ref="banner">
        <navigation></navigation>
        <div class="gcontent">
            <canvas id="chess" width="610px" height="610px" @click="go"></canvas>
        </div>
    </div>
</template>

<script>
    import navigation from '../components/menu/menu';
    export default{
        data(){
            return{
                me:true,
                chessBoard:[],
                winsGroup:[],
                countGroup:0,
                mywinGroup:[],
                cupwinGroup:[],
                mys:[],
                cups:[],
                maxGroup:0,
                uGroup:0,
                vGroup:0,
                over:false
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
            context.strokeStyle = 'rgb(93,58,30)';

            // 棋盘
            for(let i = 0;i<20;i++){
                context.moveTo(20+ i*30,20);
                context.lineTo(20+ i*30,590);
                context.stroke();
                context.moveTo(20,20+i*30);
                context.lineTo(590,20+i*30);
                context.stroke();
            }

            for(let i = 0;i<15;i++){
                this.chessBoard[i] = [];
                for(let j = 0;j<15;j++){
                    this.chessBoard[i][j] = 0;
                }
            }

            // 赢法
            var wins = []
            for(let i = 0;i<15;i++){
                wins[i]=[];
                for(let j = 0;j<15;j++){
                    wins[i][j]=[]
                }
            }
            this.winsGroup = wins;
            var count = 0;
            // 横线
            for(let i = 0;i<15;i++){
                for(let j =0;j<11;j++){
                    for(let k =0;k<5;k++){
                        wins[i][j+k][count] = true;
                    }
                    count++;
                }
            }
            // 竖线
            for(let i = 0;i<15;i++){
                for(let j =0;j<11;j++){
                    for(let k =0;k<5;k++){
                        wins[j+k][i][count] = true;
                    }
                    count++;
                }
            }
            // 斜线
            for(let i = 0;i<11;i++){
                for(let j =0;j<11;j++){
                    for(let k =0;k<5;k++){
                        wins[i+k][j+k][count] = true;
                    }
                    count++;
                }
            }
            // 散斜线
            for(let i = 0;i<11;i++){
                for(let j =14;j>3;j--){
                    for(let k =0;k<5;k++){
                        wins[i+k][j-k][count] = true;
                    }
                    count++;
                }
            }
            this.countGroup = count;

            var myWin = [];
            var computerWin = [];
            for(let i=0;i<count;i++){
                myWin[i]=0;
                computerWin[i]=0;
            }
            this.mywinGroup = myWin;
            this.cupwinGroup = computerWin;

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
            computerAI(){
                var myScore = [];
                var cupScore = [];

                for(let i =0;i<15;i++){
                    myScore[i]=[];
                    cupScore[i]=[];
                    for(let j =0;j<15;j++){
                        myScore[i][j]=[];
                        cupScore[i][j]=[];
                    }
                }
                this.mys = myScore;
                this.cups = cupScore;
                for(let i=0;i<15;i++){
                    for(let j =0;j<15;j++){
                        if(this.chessBoard[i][j]==0){
                            for(let k=0;k<this.countGroup;k++){
                                if(this.winsGroup[i][j][k]){
                                    if(this.mywinGroup[k]==1){
                                        this.mys[i][j]+=200
                                    }else if(this.mywinGroup[k]==2){
                                        this.mys[i][j]+=400
                                    }else if(this.mywinGroup[k]==3){
                                        this.mys[i][j]+=2000
                                    }else if(this.mywinGroup[k]==4){
                                        this.mys[i][j]+=10000
                                    }

                                    if(this.cupwinGroup[k]==1){
                                        this.cups[i][j]+=300
                                    }else if(this.cupwinGroup[k]==2){
                                        this.cups[i][j]+=800
                                    }else if(this.cupwinGroup[k]==3){
                                        this.cups[i][j]+=3000
                                    }else if(this.cupwinGroup[k]==4){
                                        this.cups[i][j]+=20000
                                    }
                                }
                            }
                            if(this.mys[i][j]>this.maxGroup){
                                this.maxGroup=this.mys[i][j];
                                this.uGroup=i;
                                this.vGroup=j;
                            }else{
                                if(this.cups[i][j]>this.cups[this.uGroup][this.vGroup]){
                                    this.uGroup=i;
                                    this.vGroup=j;
                                }
                            }
                            if(this.cups[i][j]>this.maxGroup){
                                this.maxGroup=this.cups[i][j];
                                this.uGroup=i;
                                this.vGroup=j;
                            }else if(this.cups[i][j]==this.maxGroup){
                                if(this.mys[i][j]>this.mys[this.uGroup][this.vGroup]){
                                    this.uGroup=i;
                                    this.vGroup=j;
                                }
                            }
                        }
                    }
                }
                this.oneStep(this.uGroup,this.vGroup,false);
                this.chessBoard[this.uGroup][this.vGroup]=2;
                for(let k = 0;k<this.countGroup;k++){
                    if(this.winsGroup[this.uGroup][this.vGroup][k]){
                        this.cupwinGroup[k]++;
                        this.mywinGroup[k] = 6;
                        if(this.cupwinGroup[k] == 5){
                            alert('cup win')
                            this.over = true;
                        }
                    }
                }
                if(!this.over){
                    this.me = !this.me;
                }
            },
            go(e){
                if(this.over){
                    return
                }else{
                    if(!this.me){
                        return;
                    }
                    let x = e.offsetX;
                    let y = e.offsetY;
                    let i = Math.floor(x/30);
                    let j = Math.floor(y/30);
                    if(this.chessBoard[i][j]==0){
                        this.oneStep(i,j,this.me);
                        this.chessBoard[i][j]=1;
                        for(let k = 0;k<this.countGroup;k++){
                            if(this.winsGroup[i][j][k]){
                                this.mywinGroup[k]++;
                                this.cupwinGroup[k] = 6;
                                if(this.mywinGroup[k] == 5){
                                    alert('win')
                                    this.over = true;
                                }
                            }
                        }

                        if(!this.over){
                            this.me = !this.me;
                            this.computerAI();
                        }
                    }else{
                        alert('此处已经有子')
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .game {background: url('../public/images/bj4.jpg') no-repeat;background-size: cover;}
    .gcontent {padding-top: 250px;}
    #chess {margin:0 auto;box-shadow:-3px -3px 3px rgba(0,0,0,0.4);box-shadow:5px 5px 5px rgba(0,0,0,0.4);
    background: rgb(215,176,147);display: block;}
</style>