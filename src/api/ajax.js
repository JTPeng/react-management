/**
 * Created by JTPeng on 2019-06-22 11:27.
 * Description：封装ajax请求
 */
import  axios from 'axios';
import {message} from "antd";

/**
 *
 * @param url  请求地址
 * @param data 参数
 * @param method 请求方式
 */
export default function ajax(url,data = {},method = 'get') {
  let reqParams = data;
  // 将接受的请求方式全部转换成大写
  method = method.toLowerCase();
  // 对请求方式处理
  if (method === 'get'){
    data = {
      params:data
    }
  }
 return axios[method](url,data)
    .then((res) => {
      const { data } = res;
      if (data.status === 0){
        return data.data;
      } else{
        message.error(`${data.msg}`);
      }
    })
    .catch((err) => {
      message.error(`网络丢失了,请刷新重试`,2);
    })
}