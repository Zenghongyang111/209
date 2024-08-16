import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
   // 配置前端服务地址和端口
  //  server: {
  //   cors:true,
  //   host: '127.0.0.1',
  //   // 端口
  //   port: 5173,
  //   // 是否开启 https
  //   proxy: {
  //     '/api': {
  //       // 后台地址
  //       target: 'http://47.121.199.127:8080/',
  //       changeOrigin: true,
  //       ws:true,
  //       rewrite: path => path.replace(/^\/api/, '') // 重定向删除'/api'
  //     }
  //   }
  // }
})
