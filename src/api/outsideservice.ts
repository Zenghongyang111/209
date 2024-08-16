
import service from "./request";
const key = "72e49039f6b05100f70dc4cebf07c6e3"
//获取每日鸡汤
export function getSoup(){
    return service.get("/api/soup",{ params: {key:key}})
}