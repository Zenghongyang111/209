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
  <div  v-else>
    <div class="title">
      <h3>吐槽墙</h3>
    </div>
    <el-divider />
    <div class="showarea">
      <talkcard v-for="item in commentList.list " :key="item.id" :comment="item"></talkcard>
    </div>
    <div class="pages">
      <el-pagination background :page-size="pageSize" :pager-count="11" layout="prev, pager, next" :total="total"
        @change="handleChange" />
    </div>
    <!-- 发表吐槽 -->

    <el-dialog :center="true" v-model="dialogFormVisible" width="800">
      <template #header>
        <span>发表吐槽</span>
      </template>
      <el-form :model="form">
        <el-form-item label="吐槽内容" :label-width="formLabelWidth">
          <el-input v-model="form.desc" style="width: 50rem" :autosize="{ minRows: 7, maxRows: 7 }" type="textarea"
            placeholder="说点儿什么" />
        </el-form-item>
        <el-form-item label="上传附件" prop="attachment" class="upload-item">
          <el-upload name="file" v-model:file-list="fileList" :action="url"
            :auto-upload="false" list-type="picture-card" :on-success="handleSuccess"
           :limit="1" ref="uploadRef"
            :data="{ desc: form.desc, id: ustore.user.id }">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">再忍一下</el-button>
          <el-button type="primary" @click="submit">
            必须吐槽
          </el-button>
        </div>
      </template>
    </el-dialog>
    <div class="writecomment">
      <el-button :icon="Edit" :size="large" type="primary" plain @click="dialogFormVisible = true">
        说点儿什么
      </el-button>
    </div>
  </div>
</template>
<script setup>
import talkcard from '@/components/talkcard.vue';
import { getAllComents, addNewComment } from '@/api/commentservice';
import { userStore } from '@/store/userstore';
import { onMounted, ref, reactive, computed } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import { baseURL } from '@/api/request';
const ustore = userStore()
const url = baseURL+"upload"
//分页
let pageSize = 3
let currentpageNum = 1
let total = ref(10)
//
let commentList = reactive({
  list: []
})
let fileList = []
let isShow = ref(true)
let dialogFormVisible = ref(false)
//获取el upload组件
let uploadRef = ref(null)
//上传状态
let state = ref(1)
const form = reactive({
  desc: "",
  id: ustore.user.id
})
function init(id, currentpageNum) {
  getAllComents(id, currentpageNum, pageSize).then((res) => {
    // console.log(res)
    commentList.list = res.data.items
    total.value = res.data.total
    isShow.value = false
    // console.log(commentList.list)
  })
}
onMounted(() => {
  init(ustore.user.id, currentpageNum)
})
let submit = () => {
  if (fileList.length == 0) {
    submitWithOutImg()
  } else {
    console.log(fileList)
    uploadRef.value.submit();
  }
   init(ustore.user.id,currentpageNum)
}
function submitWithOutImg() {
  let param = new URLSearchParams()
  for (const [key, value] of Object.entries(form)) {
    param.append(key, value);
  }
  addNewComment(param).then((res) => {
    console.log(res)
    if (res.code == 0) {
      ElMessage({
        message: '吐槽成功',
        type: 'success',
      })
      dialogFormVisible.value = false
    }
  })
}
const handleSuccess = (response, file, fileList) => {
  if (response.code == 0) {
    ElMessage({
      message: '吐槽成功',
      type: 'success',
    })
    dialogFormVisible.value = false
  }

}
function handleChange(pageNum) {
  currentpageNum = pageNum
  // console.log("page:",pageNum)
  init(ustore.user.id, pageNum)

}
</script>
<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  font-family: "ali_fang";
  font-size: 28px;
  background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%);
  /* background-image: -webkit-linear-gradient(left,#d5dee7 0%, #ffafbd 0%, #c9ffbf 100%); */
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: maskedAnimation 4s infinite linear;
}

.writecomment {
  display: flex;
  justify-content: center;
  margin: 2rem;
}

.writecomment .el-button {
  width: 20rem;
  height: 3rem;
  font-size: large;
  font-family: "ali_fang";
}

.pages {
  display: flex;
  justify-content: center;
  margin: 2rem;
}

.el-dialog span {
  font-family: "ali_fang";
  font-size: 1.2rem;
}

:deep .el-form-item__label,
::placeholder {
  font-family: "ali_fang";
  font-size: 1rem;
}

.el-pagination {
  font-family: "ali_fang";
}
</style>