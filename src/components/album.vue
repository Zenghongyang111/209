<template>
    <div>
        <el-card>
            <!-- <template #header> -->
                <div class="header"><span>{{ props.albumName }}</span><span class="photonum">{{props.total}}张</span></div>
            <!-- </template> -->
            <!-- <img :src="props.img" /> -->
            <el-image class="cover_img" :src="props.img">
                <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                        <span>封面走丢了</span>
                    </div>
                </template>
            </el-image>
        </el-card>
    </div>
</template>
<script setup>
const props = defineProps({
    albumName:{
        type:String
    },
    total:{
        type:String
    },
    img:{
        type:String
    }
})
console.log(props)
</script>
<style scoped>
.cover_img {
    width: 15rem;
    height: 12rem;
    /* height: rem; */
}

.el-card {
    width: 17rem;
    height: 17rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    margin-top: 1rem;
}

.el-card :hover {
    cursor: pointer;
}

.el-card span:first-of-type {
    font-size: 1.1rem;
    font-family: "ali_fang";
}
.header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
}
.photonum {
    font-family: "ali_fang";
    font-size:0.9rem;
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
    font-size: 1rem;
    font-family: "ali_fang";
    gap: 0.5rem;
}

</style>