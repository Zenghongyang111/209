<template>
    <div class="avatar">
        <div class="avatarimg" @click="menuToggle">
            <!-- <el-avatar shape="square" size="default" src="http://47.121.199.127/avatarGjj.jpg" fit="fill"
                        alt="无" /> -->
            <img :src='ustore.user.avatar' />
        </div>
        <div class="avatar_menu">
            <h4>{{ ustore.user.username }}</h4>
            <span>{{ ustore.user.nickname }}</span>
            <ul>
              
                <li @click="goToCenter"><img src="../assets/角色权限.png"/><span>个人中心</span></li>
                <!-- <li><img src="../assets/投诉建议.png"/><span>内容管理</span></li>  -->
                <li><img src="../assets/登录授权.png"/><span>退出登录</span></li>
                
            </ul>
        </div>
    </div>
</template>
<script setup>
import { userStore } from '@/store/userstore';
import { useRouter } from 'vue-router';
const router = useRouter()
const ustore = userStore()
// console.log(ustore)
// console.log("avatar")
// console.log(ustore.test)
// console.log(ustore.user.nickname)
    function menuToggle(){
        const toggleMenu = document.querySelector(".avatar_menu")
        toggleMenu.classList.toggle('active')
    }
    const goToCenter=()=>{
        router.push('/usercenter')
    }
</script>
<style scoped>
.avatar{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* align-items: flex-end; */
    position: relative;
    top: 6.5rem;
}
.avatarimg img {
    width: 3.5rem;
    /* height: 4rem; */
}
.avatar_menu{

    position: relative;
    top: 0.2rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    box-shadow: 1px 1px 1px #aaa;
    width: 10rem;
    display: flex;
    flex-direction:column ;
    justify-content: center;
    align-items: center;
    background-color:white;
    visibility: hidden;
    transition: 0.2s;
    opacity: 0;
    z-index: 9;
}
.avatar_menu.active{
    position: relative;
    top: 1rem;
    visibility: visible;
    opacity: 1;
    z-index: 9;
}
.avatar_menu span,h4,li{
    font-size: 14px;
    font-family: "ali_fang";
    color: gray;
    
}
.avatar_menu h4{
    font-size: 18px;
    color: black;
}
.avatar_menu li>span{
    font-size: 16px;
    color: black;
}
.avatar_menu li>img{
    width: 20px;
}
ul{
    margin-top: 2rem;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center ; */
    /* border: 1px solid red; */
}
ul li{
    font: 14px sans-serif;
    width: 80%;
    text-align:left;
    /* border: 1px solid red; */
    list-style: none;
    padding: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;

    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}
</style>