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
        <div class="header">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text">{{ albumName }} </span>
                </template>
            </el-page-header>
            <el-button type="primary" size="large" @click="dialogFormVisible = true">
                上传照片<el-icon class="el-icon--right">
                    <Upload />
                </el-icon>
            </el-button>
        </div>
        <el-divider></el-divider>
        <div class="photoList">
            <div>
                <photo v-for="item in photos.list" :key="item.id" :photoInfo="item"></photo>

            </div>
        </div>
        <!-- 新建对话框 -->
        <el-dialog :center="true" v-model="dialogFormVisible" width="700">
            <template #header>
                <span>上传照片</span>
            </template>
            <!-- <el-divider></el-divider> -->
            <el-form :model="form">
                <el-form-item label="选择照片" prop="attachment" class="upload-item">
                    <el-upload name="file" :action="url" v-model:file-list="fileList" :auto-upload="false"
                        list-type="picture-card" :limit="3" ref="uploadRef" :on-success="handleSuccess"
                        :data="{ userId: ustore.user.id, albumId: albumId }">
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
                        上传
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <div class="pages">
            <el-pagination background :page-size="pageSize" :pager-count="11" layout="prev, pager, next" :total="total"
                @change="handleChange" />
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPhotoByAlbumId } from '@/api/photoservice';
import { userStore } from '@/store/userstore';
import { baseURL } from '@/api/request';
import { ElMessage } from 'element-plus';
import router from '@/router';
import photo from '@/components/photo.vue';
const ustore = userStore()
const route = useRoute()
const url = baseURL + "upload/photoUpload"
let dialogFormVisible = ref(false)
let photos = reactive({
    list: []
})
let uploadRef = ref(null)
let isShow = ref(true)
let albumId = ref("0");
let albumName = ref("")
let pageNum = 1
let pageSize = ref(12)
let total = ref(0)
onMounted(() => {
    albumId.value = route.query.albumId
    albumName.value = route.query.albumName
    getPhotosByid(albumId.value, pageNum)
})
//分页获取照片的方法
const getPhotosByid = (id, pageNum) => {
    getPhotoByAlbumId(id, pageNum, pageSize.value).then((res) => {
        photos.list = res.data.items
        total.value = res.data.total
        isShow.value = false
        console.log(photos.list)
    })
}
const goBack = () => {
    router.push("/albums")
}
const handleChange = (pageNum) => {
    getPhotosByid(albumId.value, pageNum)
}
const submit = () => {
    uploadRef.value.submit();
    dialogFormVisible.value = false
}

const handleSuccess = (response) => {
    if (response.code == 0) {
        ElMessage({
            message: "照片上传成功",
            type: 'success',
        })
        dialogFormVisible.value = false
    }

}
</script>
<style scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.el-page-header {
    font-family: "ali_fang";
}

.text {
    font-size: 1.2rem;
    font-weight: bold;
}

.photoList {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.photoList>div {
    /* border: 1px solid red; */
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 6px;

}

.el-button {
    font-family: "ali_fang";
    font-size: 1rem;
}

.pages {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}

:deep .el-form-item__label,
::placeholder {
    font-family: "ali_fang";
    font-size: 1rem;
}

.el-dialog span {
    font-family: "ali_fang";
    font-size: 1.2rem;
}
</style>