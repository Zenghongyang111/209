<template>
    <el-table v-loading="loading" :cell-style="{ fontSize: '18px', fontFamily: 'ali_fang' }" :data="filterTableData" style="width: 100%"
        :stripe="true">
        <el-table-column prop="uploadDate">
            <template #header>
                <span class="tablehead">发布日期</span>
            </template>
        </el-table-column>
        <el-table-column prop="albumName">
            <template #header>
                <span class="tablehead">所属相册</span>
            </template>
        </el-table-column>
        <el-table-column label="photo" prop="photoUrl">
            <template #header>
                <span class="tablehead">照片内容</span>
            </template>
            <!-- scope.row.photo -->
            <template #default="photo">
                <el-image style="width: 100px; height: 100px" :src="photo.row.photoUrl" fit="fit">
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                            <span>照片不在了~</span>
                        </div>
                    </template>
                </el-image>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-dropdown   @command="handleCommand" @visible-change="handleGetId(scope.row)">
                    <el-button size="large">
                        更改相册
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="ArrowRight" v-for="item in album.list" :key="item.id" :command="item.albumId"><span class="dropitemtext">{{ item.albumName }}</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-button size="large" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    删除相片
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pages">
        <el-pagination @change="handleChange" background :page-size="pageSize" :pager-count="11"
            layout="prev, pager, next" :total="total" />
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { getPhotoByAlUserId, deletePhotoById,changePhotoAlbum} from '@/api/photoservice';
import { getAllAlbums } from '@/api/albumservice';
import { userStore } from '@/store/userstore';
import { ElMessageBox, ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
let currentPageNum = 1
let pageSize = 8
let total = ref(50)
let photoId = 0;
let loading =ref(true)
let tableData = reactive({
    list: []
})
let album=reactive({
    list:[]
})
const store = userStore()
const search = ref('')
const filterTableData = computed(() =>
    tableData.list.filter(
        (data) =>
            !search.value ||
            data.albumName.includes(search.value) || data.uploadDate.includes(search.value)
    )
)
const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '确定要删除该照片吗?',
        '确认删除',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }
    )
        .then(() => {
            console.log(row)
            deletePhotoById(row.id).then((res) => {
                if (res.code == 0) {
                    init(store.user.id, currentPageNum, pageSize)
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    })
                }
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
const handleGetId = (row) => {
    photoId = row.id
    console.log("当前相片id为：",photoId)
}

const handleCommand=(command)=>{
    console.log("更换的相册id是:",command)
    changePhotoAlbum(photoId,command).then((res)=>{
        if(res.code == 0){
            ElMessage({
                type:'success',
                message:"更换成功"
            })
        }
        init(store.user.id, currentPageNum, pageSize)
    })
}
const handleChange = (pageNum) => {
    currentPageNum = pageNum
    init(store.user.id, pageNum, pageSize)
}
const init = (id, pageNum, pageSize) => {
    getPhotoByAlUserId(id, pageNum, pageSize).then((res) => {
        total.value = res.data.total
        tableData.list = res.data.items
        loading.value = false
    })
    if(store.album.list.length!=0){
        album.list = store.album.list
    }else{
        console.log("store中没有album")
        getAllAlbums().then((res)=>{
            album.list = res.data
        })
    }
}
onMounted(() => {
    init(store.user.id, currentPageNum, pageSize)
})
</script>
<style scoped>
.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgb(231, 231, 231);
    color: var(--el-text-color-secondary);
    font-size: 15px;
}

.pages {
    display: flex;
    justify-content: center;
    margin: 2rem;
}

.el-button {
    font-family: "ali_fang";
    font-size: 1rem;
    margin: 2px;
}

.tablehead {
    font-family: "ali_fang";
    font-size: large;
    color: rgb(88, 87, 87);
}
.dropitemtext{
    color: black;
    font-size: 14px;
    font-family: "ali_Fang";
}
</style>