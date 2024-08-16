<template>
    <el-table v-loading="loading" :data="filterTableData" style="width: 100%" :highlight-current-row="true"
        :stripe="true" :cell-style="{ fontSize: '18px', fontFamily: 'ali_fang' }" :show-overflow-tooltip="true">
        <!-- <el-table-column label="发布日期" prop="commentIdTime"  /> -->
        <el-table-column prop="commentIdTime">
            <template #header>
                <span class="tablehead">发布日期</span>
            </template>
        </el-table-column>
        <el-table-column prop="comment">
            <template #header>
                <span class="tablehead">吐槽内容</span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="Addr" prop="address" /> -->
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="default" placeholder="输入搜索内容" />
            </template>
            <template #default="scope">
                    <el-button size="larger" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除吐槽
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
import { getAllComentsByUserId } from '@/api/commentservice';
import { userStore } from '@/store/userstore';
import { delComment } from '@/api/commentservice';
import { ElMessage, ElMessageBox } from 'element-plus';
const store = userStore()
const loading = ref(true)
const pageSize = 3
const currentPageNum = ref(1)
let total = ref(1)
const search = ref('')
const filterTableData = computed(() =>
    tableData.list.filter(
        (data) =>
            !search.value ||
            data.comment.includes(search.value) || data.commentIdTime.includes(search.value)
    )


)


const handleDelete = (index,row) => {
    ElMessageBox.confirm(
        '确定要删除该吐槽吗?',
        '确认删除',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }
    )
        .then(() => {
            delComment(row.id).then((res) => {
                if (res.code == 0) {
                    getAllComentsByUId(store.user.id, currentPageNum.value, pageSize)
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

let tableData = reactive({
    list: []
})
const getAllComentsByUId = (id, pageSize, pageNum) => {
    getAllComentsByUserId(id, pageSize, pageNum).then((res) => {
        // console.log(res.data)
        tableData.list = res.data.items
        total.value = res.data.total
        loading.value = false
    })
}
onMounted(() => {
    getAllComentsByUId(store.user.id, currentPageNum.value, pageSize)
})
const handleChange = (pageNum) => {
    currentPageNum.value = pageNum
    // console.log(currentPageNum.value)
    getAllComentsByUId(store.user.id, pageNum, pageSize)
}
</script>
<style scoped>
.pages {
    display: flex;
    justify-content: center;
    margin: 2rem;
}

.el-button {
    font-family: "ali_fang";
}

.tablehead {
    font-family: "ali_fang";
    font-size: large;
    color: rgb(88, 87, 87);
}

.el-popconfirm__title {
    color: #df0e0e;
}
</style>