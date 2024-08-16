<template>
    <div class="container">
        <el-card style="width: 85%;">
            <template #header>
                <div class="card-header">
                    <el-avatar size="large" :src="comment.userImg" />
                    <div class="info">
                        <div class="info_detail">
                            <span>{{ comment.userNickName }}</span>
                            <div class="vip"><img src="../assets/vip.png" /><span>{{ comment.userJob }}</span></div>
                        </div>
                        <span>发布于:{{ comment.commentIdTime }}</span>
                    </div>
                </div>
            </template>
            <p class="detail_text">
                {{ comment.comment }}
            </p>

            <el-image class="detail_pic" :src="comment.commentImg" v-if="isImgShow.value = comment.commentImg"
                :preview-src-list="list" >
                <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                        <span>图片消失在了历史的长河中</span>
                    </div>
                </template>
            </el-image>
            <!-- <img class="detail_pic" :src="comment.commentImg" alt="图片丢了" v-if="isImgShow.value = comment.commentImg" /> -->
            <template #footer>
                <div @click="dothumbUp" class="goodarea"><img class="good_img" :src="isThumbUp.img" /><span>{{
                    isThumbUp.slogon }}</span></div>
            </template>
        </el-card>
    </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { userStore } from '@/store/userstore';
import { changeCommentState } from '@/api/commentservice';
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const ustore = userStore()
const props = defineProps({
    comment: {}
})
let imgShow = ref(true)
const comment = props.comment
let list = []
list.push(comment.commentImg)
const isImgShow = computed({
    get() {
        return imgShow
    },
    set(value) {
        imgShow = (value == null) ? false : true
        return imgShow
    }
})
// console.log(comment)
let stateInfo = {
    state: "",
    userId: ustore.user.id,
    commentId: comment.id
}
stateInfo.state = comment.state
let thumbUp = reactive({
    slogon: "",
    img: ""
})
let isThumbUp = computed({
    get() {
        if (stateInfo.state == null || stateInfo.state == 0) {
            thumbUp.slogon = "赞一下"
            thumbUp.img = "http://47.121.199.127/assets/未赞.png"
        } else {
            thumbUp.slogon = "取消点赞"
            thumbUp.img = "http://47.121.199.127/assets/点赞.png"

        }
        return thumbUp
    },
    set(state) {
        if (stateInfo.state == null || stateInfo.state == 0) {
            thumbUp.slogon = "赞一下"
            thumbUp.img = "http://47.121.199.127/assets/未赞.png"
        } else {
            thumbUp.slogon = "取消点赞"
            thumbUp.img = "http://47.121.199.127/assets/点赞.png"

        }
    }
})
let dothumbUp = () => {
    changeCommentState(stateInfo).then(() => {
        stateInfo.state = (stateInfo.state == null || stateInfo.state == 0) ? 1 : 0
        if (stateInfo.state == 1) {
            ElMessage({
                message: '点赞成功',
                type: 'success',
            })
        } else {
            ElMessage({
                message: '已取消点赞',
                type: 'warning',
            })
        }
        isThumbUp.value = stateInfo.state
    })

}
// onMounted(()=>{
//     isThumbUp.value = state
// })

</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.card-header {
    display: flex;
    align-items: center;
}

.info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    gap: 0.5rem;

}

.info_detail>span:first-of-type {
    font-size: 24px;
    font-family: "ali_fang";
}

.info>span:last-of-type {
    font-size: 14px;
    font-family: "ali_fang";
    color: gray;
}

.info_detail {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
}

.vip {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
}

.vip span {
    font-size: 14px;
    font-family: "ali_fang";
    color: gray;
}

.vip img {
    height: 1rem;
}

.good_img {
    width: 1.5rem;
}

.goodarea {
    display: flex;
    gap: 0.5rem;
    justify-content: right;
    align-items: center;
}

.goodarea :hover {
    cursor: pointer;
}

.goodarea span {
    font-size: 16px;
    font-family: "ali_fang";
}

.detail_text {
    font-family: "ali_fang";
}

.detail_pic {
    width: 20rem;

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
    font-size: 1rem;
    font-family: "ali_fang";
    gap: 0.5rem;
}

.el-icon {
    font-size: 2.5rem;
}
</style>