<template>
    <div class="container">

        <div class="right_container">
            <img class="menunav_img" src="../assets/logo.png" />
            <!-- <img src="../assets/209bg.png" /> -->
            <span class="slogon">WELCOME TO <span>209</span></span>
            <div class="login_area">
                <div class="login_title">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane name="first">
                            <template #label><span class="myLabel">账户登录</span></template>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <template #label><span class="myLabel">第三方登录</span></template>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div login_form>
                    <router-view></router-view>
                </div>
               
            </div>
            <div class="icpcode">
                <a href=" www.zenghongyang.cn ">蜀ICP备2024092846号-1</a>
            </div>
        </div>

    </div>




</template>
<script lang="ts" setup>

import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
// import router from '@/router';
import { useRouter } from 'vue-router';
const activeName = ref('first')
const router = useRouter()
const handleClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab.index, event)
    if (tab.index == "0") {
        router.push("/")
    } else {
        router.push("/code")
    }

}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: left;
    height: 100vh;
    width: 100%;
}



.right_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 1.2rem;
    /* border: 1px solid red; */
    /* background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%); */
    background-image: url("../assets/loginbg3.jpg");
    background-size: cover;
    /* background-color:whitesmoke */
}

.slogon {
    font-family: "ali_fang";
    font-size: 4.5rem;
    font-weight: bold;
    color: black
}

.slogon span {
    font-size: 6.5rem;
    /* color: rgb(29, 168, 233); */
    font-family: "ali_fang";
}

.menunav_img {
    width: 12rem;
}

.login_area {
    padding: 1rem;
    height: 32%;
    width: 25%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    box-shadow: 1px 1px 1px transparent;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(4px);
    /* align-items: self-start; */
}

.login_title {
    padding: 1rem;
    display: flex;
    justify-content: center;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

/* 去掉eltabs长下划线 */
:deep(.el-tabs__nav-wrap::after) {
    position: static !important;
}

.login_form {
    padding: 2rem;
}

.myLabel {
    font-size: 19px;
    font-family: 'ali_fang';
    color: white;
    /* font-weight: bold; */
}

.myLabel.active {
    color: black
}


.slogon {
    font-family: "ali_fang";
    letter-spacing: 0.2rem;
    font-size: 5rem;
    /* background-image: linear-gradient(left, #fc6076 0%, #ff9a44 100%); */
    /* background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96); */
    /* -webkit-text-fill-color: transparent;
     */
    color: white;
    /* background-clip: text;
    background-size: 200% 100%;
    animation: maskedAnimation 4s infinite linear; */

}

.icpcode a {
    text-decoration: none;
    color: white
}
</style>