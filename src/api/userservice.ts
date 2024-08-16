import service from '@/api/request';
 
// 获取用户列表

 export function getAllUserList(){
  return service.get("/user/allUser")
 }
//用户登录
export function loginUser(data:any) {
   return  service.post('/user/login', data)
}
 

