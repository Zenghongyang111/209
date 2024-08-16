<template>
    <div class="container">
        <!-- <span>一些最近</span> -->
    </div>
        <el-carousel :interval="2000" type="card" height="22rem" :motion-blur=true>
            <el-carousel-item v-for="item in imagelist" :key="item">
                <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
                <img :src="item.src" style="height:100% ;width: 100%;" alt="图片丢失了" :title="item.name" />
            </el-carousel-item>
        </el-carousel>
    
</template>
<script setup>
let imagelist = [{
    name: 1,
    src: "http://47.121.199.127/image/1.jpg"
},
{
    name: 2,
    src: "http://47.121.199.127/image/2.jpg"
},
{
    name: 3,
    src: "http://47.121.199.127/image/3.jpg"
},
{
    name: 4,
    src: "http://47.121.199.127/image/4.jpg"
}, {
    name: 5,
    src: "http://47.121.199.127/image/5.jpg"
}
]

</script>
<style scoped>
.container{
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
}
span{
    font-size: 30px;
    font-family: "PingFang SC";
    font-weight: bold;
    border-bottom: 1px solid black;
}

.el-carousel__item{
    border-radius: 0.5rem;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>