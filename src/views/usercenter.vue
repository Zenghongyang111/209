<template>
   
    <el-container class="total_container">
        <!-- <el-affix :offset="120"> -->
        <el-header class="header">
            <img class="menunav_img" src="../assets/logo.png"/>
            <h3>welcome</h3>
            <div class="weather">
                <iframe width="500" height="20" frameborder="0" scrolling="no" hspace="0"
                    src="https://i.tianqi.com/?c=code&a=getcode&id=173&icon=1"></iframe>
            </div>
            <div class="menudiv">
                <el-menu class="menu" :router="true">
                    <el-menu-item index="/home">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>主页</span>
                        </template>
                    </el-menu-item>
                    <!-- <el-menu-item index="2">
                        <el-icon>
                            <Camera />
                        </el-icon>
                        <span>个人相册</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        <span>留言板</span>
                    </el-menu-item> -->
                </el-menu>
            </div>
            <!-- 头像组件 -->
            <avatar></avatar>
        </el-header>
     <!-- </el-affix> -->
        <!-- 走马灯组件 -->
        <el-container class="infocontainer">
            <el-aside class="leftnav">
                <img src="../assets/客户.png" />
                <span> 个人中心</span>
                <el-divider />
                <el-menu :router="true"  class="el-menu-vertical-demo">
                    <el-menu-item index="/managecomment" @click="handleMenuItem">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>吐槽管理</span>
                    </el-menu-item>
                    <el-menu-item @click="handleMenuItem" index="/managephoto">
                        <el-icon>
                            <Camera />
                        </el-icon>
                        <span>相片管理</span>
                    </el-menu-item>
                    <el-menu-item @click="handleMenuItem" index="3">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item @click="handleMenuItem" index="/usercenter">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>关于今天</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="infoDiv">
                <router-view></router-view>

            </el-main>


        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import carousel from '@/components/carousel.vue';
import avatar from '@/components/avatar.vue';
import { ref } from 'vue';
let defaultUrl = ref("/userinfo")
const handleMenuItem = (menu:any) => {
//   console.log(menu)
//   defaultUrl.value = menu.index
}
</script>
<style scoped>
a{
    text-decoration: none;
    /* color: black; */
}

.total_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
   
}
h3{
    font-family: "ali_fang";
    font-size: 2.5rem;
    background-image: linear-gradient(to top, #e14fad 0%, #f9d423 100%);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: maskedAnimation 4s infinite linear;

}
.header {
    /* box-shadow: 1px 1px 1px #aaa; */
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin-top: 1rem;
    background-color: #fff;
    /* position: fixed; */
    display: flex;
    /* flex-direction: row */
    justify-content: right;
    height: 10vh;
    width: 80%;
    /* border: 1px solid red; */
    align-items: center;
    padding-right: 5rem;
    border-radius: 10px;
}
.menunav_img{
    width: 6rem;
}
.carouselDiv {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin-top: 0.5rem;
    background-color: #fff;
    width: 80%;
    height: auto;
    /* border: 1px solid green; */
    border-radius: 10px;
}

.infocontainer {
    width: 80%;
    border-radius: 10px;
    /* border: 1px solid yellow; */
}

.infoDiv {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin-top: 0.5rem;
    background-color: #fff;
    width: 80%;
    /* height: auto; */
    height: auto;
    min-height: 80vh;
    margin-left: 0.5rem;
    border-radius: 10px;
}

.menu {
    padding-right: 1rem;
    display: flex;
    justify-content: right;
}
/* ::v-deep .el-form-item__label{
  color: white;
  font-size: 18px;
} */
.menu span{
    color:rgba(0, 0, 0, 0.89);
    /* font-weight:bold; */
    font-size: 19px;
    font-family: "ali_fang";
}
.menudiv {
    flex: 1;
}

.leftnav {
    /* border: 1px solid red; */
    margin-top: 0.5rem;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    height: 42vh;
    border-radius: 10px;
}
.leftnav span{
    font-size: 1rem;
    font-family: "ali_fang";
    font-size: 20px;
    /* font-weight: bold; */
}
.leftnav img{
    width: 3rem;
}
:deep(.el-tabs__nav-wrap::after) {
    position: static !important;
}

.el-menu--horizontal.el-menu {
    border-bottom: 0;
}

.el-menu--vertical.el-menu {
    border-right: 0;
}
</style>