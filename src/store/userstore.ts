
import { defineStore } from "pinia";
export const userStore = defineStore('user', {
    // 动作
    actions: {

    },
    // 状态
    state() {
        return {
            user: {

            },
            album:{
                list:[]
            },
            soup:""
            
        }
    },
    persist: {
        storage: localStorage,
        paths: ['user','test','album','soup']
    },
    getters: {
        saveuser: (state) => (user: object) => state.user = user,
        savealbum: (state) => (album: any) => state.album.list = album,
        savesoup:(state)=>(soup:string) => state.soup = soup
    }

})