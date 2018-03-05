<template>
    <div class="kolento">
        <canvas id="canvas">
        </canvas>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        mounted(){
            let canvas = document.getElementById('canvas');
            let duola = canvas.getContext('2d');
            duola.beginPath();
            duola.moveTo(75,18);
            duola.bezierCurveTo(70,19,60,18,50,20);
            duola.bezierCurveTo(20,28,20,62.5,20,62.5);
            duola.bezierCurveTo(20,100,40,120,75,120);
            duola.bezierCurveTo(110,120,130,100,130,62.5);
            duola.bezierCurveTo(130,62.5,137,18,75,18);
            duola.closePath();
            duola.stroke();

            duola.beginPath();
            duola.moveTo(60,60);
            duola.bezierCurveTo(58,52,53,52,51,60);
            // duola.bezierCurveTo(20,28,20,62.5,20,62.5);
            duola.stroke();
        },
        methods:{
        }
    }
</script>

<style scoped>
    #canvas {width: 300;height: 300px;}
</style>