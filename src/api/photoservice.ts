import service from '@/api/request';
 
// 获取相册内照片列表

export function getPhotoByAlbumId(id:any,pageNum:any,pageSize:any){
    return service.get("/photo",{ params: {id:id,pageNum:pageNum,pageSize:pageSize}})
}
export function getPhotoByAlUserId(id:any,pageNum:any,pageSize:any){
    return service.get("/photo/byUserId",{ params: {id:id,pageNum:pageNum,pageSize:pageSize}})
}
export function deletePhotoById(id:any){
    return service.post("/photo",{id:id})
}
export function changePhotoAlbum(photoId:any,albumId:any){
    return service.post("/photo/update",{photoId:photoId,albumId:albumId})
}