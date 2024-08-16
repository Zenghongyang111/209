<template>
    <div>
        <el-form :model="form">
            <el-space wrap :size="size" fill="true">
                <div>
                    <el-input class="name" size="large" v-model="form.name" placeholder="经过209董事会审核的用户名">
                        <template #prepend> <el-icon style="vertical-align: middle">
                                <User />
                            </el-icon></template>
                    </el-input>
                </div>
                <div class="mt-4">
                    <el-input class="password" size="large" v-model="form.pwd" show-password placeholder="不可告人的密码">
                        <template #prepend> <el-icon style="vertical-align: middle">
                                <Key />
                            </el-icon></template>
                    </el-input>
                </div>
                <el-button type="primary" @click="onSubmit"><span class="login">登 录</span></el-button>
            </el-space>
        </el-form>
    </div>
</template>
<script setup>
import { userStore } from '@/store/userstore';
import { ElForm } from 'element-plus';
import { loginUser } from '@/api/userservice';
import { User, Key } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
// import { error } from 'console';
const router = useRouter()
const ustore = userStore()
const form = reactive({
    name: "",
    pwd: ""
})
const size = 30
function onSubmit() {
    let param = new URLSearchParams()
    for (const [key, value] of Object.entries(form)) {
        param.append(key, value);
    }
    loginUser(param).then((res) => {
        ustore.saveuser(res.data.user)
        // ustore.test = 2
        if (res.code == 0) {
            router.push("/home")
        }
    }).catch((err) => {
        ElMessage.error('用户名或密码错误')
    })
}
</script>
<style scoped>
/* :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
   
  } */
.login {
    font-family: "ali_fang";
    font-size: 18px;
}

:deep(.el-input-group__prepend) {
    background-color:transparent;
    color: white;
    /* border: 1px solid #1296db; */
}
:deep(.el-input){
    --el-input-border-color:transparent;
    --el-input-bg-color:transparent;
    --el-input-placeholder-color:white;
    --el-input-focus-border-color:transparent;
    --el-input-hover-border-color:transparent;
    --el-input-text-color:white;
    font-size: 16px;
    border-bottom: 1px solid rgb(231, 230, 230);
}
:deep(.el-icon){
    font-size: 15px; 
}
 </style>