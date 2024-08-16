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
            <h3>相册集</h3>
        </div>
        <el-divider />
        <div class="album_area">

            <album v-for="item in albums.list" :key="item.id" @click="handleAlbumsDetails($event)" :id="item.albumId"
                :albumName="item.albumName" :album="item.albumName" :img="item.albumCover" :total="item.totalPhotos">
            </album>
        </div>
        <div class="addAlbum">
            <el-button type="primary" size="large" @click="dialogFormVisible = true">
                新建相册<el-icon class="el-icon--right">
                    <DocumentAdd />
                </el-icon>
            </el-button>
        </div>
        <!-- 新建对话框 -->
        <el-dialog :center="true" v-model="dialogFormVisible"  width="700">
            <template #header>
                <span>新建相册</span>
            </template>
            <el-form :model="form">
                <el-form-item label="相册名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="相册封面" prop="attachment" class="upload-item">
                    <el-upload name="file" :action="url" v-model:file-list="fileList" :auto-upload="false"
                        list-type="picture-card" :limit="1" ref="uploadRef" :on-success="handleSuccess"
                        :data="{albumName: form.name }">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="submit">
                        创建相册
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>
<script setup>
import { baseURL } from '@/api/request';
import router from '@/router';
import { onMounted, reactive, ref } from 'vue'
import album from '@/components/album.vue';
import { getAllAlbums } from '@/api/albumservice';
import { ElMessage } from 'element-plus';
import { userStore } from '@/store/userstore';
const store = userStore()
let albums = reactive({
    list: []
})
let form = reactive({
    name: "",
})
const url = baseURL+"upload/albumUpload"
let fileList = []
let uploadRef = ref(null)
let dialogFormVisible = ref(false)
let isShow = ref(true)
const findAllAlbums = () => {
    getAllAlbums().then((res) => {
        // console.log(res)
        isShow.value = false
        albums.list = res.data
        console.log(albums.list)
        store.savealbum(res.data)
    })
}
onMounted(() => {
    findAllAlbums()
})

//点击相册传递数据
const handleAlbumsDetails = (event) => {
    router.push({
        path: "/photos",
        query: {
            albumId: event.currentTarget.attributes.id.value,
            albumName: event.currentTarget.attributes.album.value
        }
    })
}
const beforeUpload = (file) => {
    console.log(file)
    if (rawFile == null) {
        ElMessage.error("封面不能为空")
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const handleSuccess = (response) => {
  if (response.code == 0) {
    ElMessage({
      message: '新相册创建成功',
      type: 'success',
    })
    findAllAlbums()
    dialogFormVisible.value = false
  }

}

const submit = () => {
    if (fileList.length == 0) {
        ElMessage.error("请设置相册封面")
    } else {
        console.log(url)
        uploadRef.value.submit();
        dialogFormVisible.value = false
    }

}
</script>
<style scoped>
h3 {
    font-family: "ali_fang";
    font-size: 28px;
    background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
    /* background-image: -webkit-linear-gradient(left,#d5dee7 0%, #ffafbd 0%, #c9ffbf 100%); */
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: maskedAnimation 4s infinite linear;
}

.title {
    display: flex;
    justify-content: center;
    /* background-image: linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%); */
}

.album_area {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start
}

.addAlbum {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
}

.el-button {
    font-family: "ali_fang";
    width: 12rem;
    font-size: 1.2rem;
}

:deep(.el-form-item__label),
::placeholder {
    font-family: "ali_fang";
    font-size: 1rem;
}
.el-dialog span {
  font-family: "ali_fang";
  font-size: 1.2rem;
}

</style>