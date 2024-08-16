<template>

  <div>
    <el-card class="photo">
      <el-image style="width: 13rem; height: 13rem" :src="props.photoInfo.photoUrl" :zoom-rate="1.2" :max-scale="7"
        :min-scale="0.2" :preview-src-list="srcList" :initial-index="4" fit="cover">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
            <span>照片消失在了历史的长河中</span>
          </div>
        </template>

      </el-image>
      <div class="uploadInfo">
        <el-avatar :size="35" :src="props.photoInfo.avatar" />
        <span>{{ props.photoInfo.uploadDate }} 上传</span>
      </div>

    </el-card>

  </div>




</template>
<script setup>
const props = defineProps({
  photoInfo: {}
})
let srcList = []
srcList.push(props.photoInfo.photoUrl)
</script>
<style scoped>
.photo {
  width: 16rem;
  height: 18rem;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}

.uploadInfo {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.uploadInfo span {
  font-size: 0.7rem;
  font-family: "ali_fang";
  color: gray;
}
.image-slot {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 13rem;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 0.8rem;
    font-family: "ali_fang";
    gap: 0.5rem;
}

</style>