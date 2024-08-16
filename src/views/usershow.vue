<template>
  <div v-if="isShow">
    <el-skeleton style="width: 240px" :loading="true" animated :count="2">
      <template #template>
        <el-skeleton-item variant="image" style="width: 20rem; height: 20rem" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            ">
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
  <div v-else>
    <div class="title">
      <h3>成员风采</h3>
    </div>
    <el-divider />
    <div class="showarea">
      <usercard v-for="item, index in userList" :key="index" :user="item"></usercard>
    </div>
  </div>

</template>
<script setup>
import usercard from '@/components/usercard.vue';
import { onMounted, onBeforeMount,ref } from 'vue';
import { getAllUserList } from '@/api/userservice'
//控制骨架屏展示
let isShow = ref(true)
let userList = [{}]
function getAllUsers() {
  // console.log("onmounted")
  getAllUserList().then((res) => {
    // console.log(res.data)
    userList = res.data
    isShow.value = false
  })
}
onMounted(() => {
  // console.log("挂载")
  getAllUsers()
})
</script>
<style scoped>
.showarea {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  font-family: "ali_fang";
    font-size: 28px;
    background-image: linear-gradient(to top, #0fd850 0%, #f9f047 100%);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: maskedAnimation 4s infinite linear;
}
</style>