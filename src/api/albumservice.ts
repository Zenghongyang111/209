import service from '@/api/request';
 
// 获取相册列表

 export function getAllAlbums(){
  return service.get("/album")
 }
