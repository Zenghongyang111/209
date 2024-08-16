<template>
    <el-card>
        <div class="head">
            <iframe width="300" height="300" frameborder="0" scrolling="no" hspace="0"
                src="https://i.tianqi.com/?c=code&a=getcode&id=55&icon=1"></iframe>
            <div style="border-right: 1px solid whitesmoke;"></div>
            <div class="slogon">
                <span> 每日一碗毒鸡汤</span>
                <span> "{{soup}}"</span>
            </div>

        </div>
    </el-card>
</template>
<script setup>
import { getSoup } from '@/api/outsideservice';
import { onMounted, ref } from 'vue';
import { userStore } from '@/store/userstore';
const store = userStore()
let soup = ref(store.soup)
const excuteOnceDay = (callback) => {
    const ONE_DAY = 12 * 60 * 60 * 1000; // 一天的毫秒数
    const storageKey = 'lastExecutionTime';
    // 获取本地存储中的上次执行时间
    let lastExecutionTime = localStorage.getItem(storageKey);
    // 如果没有上次执行时间记录，或者已经过了24小时，执行回调函数
    if (!lastExecutionTime || Date.now() - parseInt(lastExecutionTime) > ONE_DAY) {
        // 执行函数
        callback();
        // 更新本地存储中的上次执行时间
        localStorage.setItem(storageKey, Date.now().toString());
    }
}
onMounted(()=>{
    excuteOnceDay(()=>{
        getSoup().then((res)=>{
            let data = JSON.parse(res.data)
            soup.value = data.result.text
            console.log("获取鸡汤",data)
            store.savesoup(data.result.text)
        })
    })  
})
</script>
<style scoped>
.head {
    display: flex;
    justify-content: stretch;
}

.slogon {
    padding: 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
}

.slogon :nth-child(1) {
    font-family: "ali_hei";
    color: grey;
    font-size: 1.5rem;
}

.slogon :nth-child(2) {
    font-family: "ali_fang";
    font-weight: bold;
    font-size: 2rem;
}
</style>