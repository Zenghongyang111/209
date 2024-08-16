<template>
    <div class="usercard">
        <el-card style="max-width: 35rem;min-width: 35rem" >
            <template #header>
                <div class="card-header">
                    <span>{{ userinfo.username }}</span>
                </div>
            </template>
            <div class="cardbody">
                <img class="userimg" :src="userinfo.userPic" />
                <div class="desc">
                    <el-descriptions :column="1" size="default">
                        <el-descriptions-item align="left" label="代号"><span>{{ userinfo.nickname }}</span></el-descriptions-item>
                        <el-descriptions-item align="left" label="职务"><span>{{ userinfo.job }}</span></el-descriptions-item>
                        <el-descriptions-item align="left" label="生日"><span>{{ userinfo.birthday }}</span></el-descriptions-item>
                        <!-- <el-descriptions-item align="left" label="生日">2000-6-1</el-descriptions-item> -->
                        <el-descriptions-item align="left" label="宣言">
                           <span> {{ userinfo.desc }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>


            <template #footer>
                <div class="footer">
                    <el-space wrap>
                        <!-- <el-tag type="info" size="small">加班狂魔</el-tag>
                        <el-tag type="success" size="small">计算机最后的希望</el-tag>
                        <el-tag size="small">等待正缘</el-tag> -->
                        <el-tag :type="type(item)" v-for="item in userinfo.tags" :key="item.userId">
                            <span>{{ item.tagText }}</span>
                        </el-tag>
                    </el-space>
                </div>
            </template>
        </el-card>
    </div>
</template>
<script setup>
import { computed } from 'vue';
let userinfo={}
const props = defineProps({
    user:{}
})
userinfo = props.user
// console.log(userinfo)
let typeList =['success','info','warning','danger','primary']
const type = computed(()=>{
    return(v)=>{
        const randomIndex = Math.floor(Math.random() * typeList.length);
        return typeList[randomIndex];
    }
})
</script>
<style scoped>
.usercard {
    /* border: 1px solid red; */
    width: auto;
    height: auto;
    margin-bottom: 1rem;
}

.userimg {
    height: 15rem;
    width: 15rem;
}

.cardbody {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.card-header span{
    color:black;
    /* font-weight:bold; */
    font-size: 22px;
    font-family: "ali_fang";
}
.desc {
  margin-left: 10px;
}
.desc span{
    font-family: "ali_fang";
    font-size: 16px;
}
:deep(.el-descriptions__label){
  font-family: "ali_fang";
}
.footer span{
    font-family: "ali_fang";
    font-size: 15px;
}
</style>