import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import login from '@/views/login.vue'
import accountlogin from "@/components/accountlogin.vue"
import codelogin from '@/components/codelogin.vue'
import homepage from '@/views/homepage.vue'
import usershow from '@/views/usershow.vue'
import Talkshow from '@/views/talkshow.vue'
import albums from '@/views/albums.vue'
import photos from '@/views/photos.vue'
import Usercenter from '@/views/usercenter.vue'
import Commentmanagement from '@/components/commentmanagement.vue'
import Photomanagement from '@/components/photomanagement.vue'
import defaultPage from '@/components/default.vue'
const router =createRouter({
    
    history:createWebHashHistory(),
    routes:[{
        path:'/',
        component:login,
        children:[{
            path:"/",
            component:accountlogin
        },{
            path:"/code",
            component:codelogin 
        }]
    },{
        path:'/home',
        component:homepage,
        redirect:'/userinfo',
        children:[{
            path:'/userinfo',
            component:usershow
        },{
            path:'/talk',
            component:Talkshow
        },{
            path:'/albums',
            component:albums
        },{
            path:'/photos',
            component:photos
        }]
    },{
        path:'/usercenter',
        component:Usercenter,
        children:[{
            path:'/managecomment',
            component:Commentmanagement
        },{
           path:'/managephoto',
           component:Photomanagement 
        },{
            path:'/usercenter',
            component:defaultPage
        }]
    }]
})
export default router