
import service from "./request";


//获取所有吐槽并返回当前用户点赞状态
export function getAllComents(id:any,pageNum:any,pageSize:any){
    return service.get("/comment",{ params: {id:id,pageNum:pageNum,pageSize:pageSize}})
}
//获取某用户的全部吐槽
export function getAllComentsByUserId(id:any,pageNum:any,pageSize:any){
    return service.get("/comment/byUserId",{ params: {id:id,pageNum:pageNum,pageSize:pageSize}})
}
//更新点赞状态
export function changeCommentState(data:Object){
    return service.post("/comment",data)
}
//新增吐槽
export function addNewComment(data:object){
    return service.post("/upload/withOutImg",data)
}
//删除吐槽
export function delComment(id:any){
    return service.get("/comment/delComment",{ params: {id:id}})
}