/**
 * Created by JTPeng on 2019-06-22 11:27.
 * Description：封装ajax请求
 */
import  axios from 'axios';
import {message} from "antd";

/**
 *
 * @param url  请求地址
 * @param data 传输数据 默认是post格式
 * @param method 请求方式 默认是get请求
 * @returns {Q.Promise<any> | Promise<T | never>} 成功状态下返回值是一个Promise对象,失败状态不会返回Promise对象
 */
export default function ajax(url,data = {},method = 'get') {
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
        return data.data || {};
      } else{
        message.error(`${data.msg}`);
      }
    })
    .catch((err) => {
      message.error(`网络丢失了,请刷新重试`,2);
    })
}