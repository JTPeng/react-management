/**
 * Created by JTPeng on 2019-06-22 12:16.
 * Description：各个接口文件,对ajax进一步优化
 */
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
/**
 *
 * @param username 用户名
 * @param password 密码
 * @returns {Q.Promise<any>|Promise<T|never>} 成功状态下返回一个Promise对象,失败不返回Promise对象
 */
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST');

/**
 *
 * @param id 验证的用户id
 * @returns {Q.Promise<any>|Promise<T|never>}
 */
export const reqValidateUser = (id) => ajax('/validate/user',{id},'POST');

/**
 * 获取天气
 * @returns {Promise<any>}
 */
export const reqWeather = function() {
  let cancel = null;

  const promise = new Promise((resolve, reject) => {
    cancel = jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{},(err,data) =>{
      try {
        if (!err){
          const { dayPictureUrl,weather } = data.results[0].weather_data[0];
          resolve({
            weatherImg: dayPictureUrl,
            weather
          });
        } else{
          message.error(`请求数据失败~请刷新重试!`);
          resolve();
        }
      }catch (e) {
        message.error('请求天气信息失败~请刷新试试~');
        resolve();
      }
    });
  });
  return {
    cancel,
    promise
  }
};
/**
 * 查询分类功能
 * @param parentId
 * @returns {Q.Promise<any>|Promise<T|never>}
 */
export const reqCategory = (parentId) => ajax('/manage/category/list',{parentId});

/**
 * 新增品类
 * @param parentId
 * @param categoryName
 * @returns {Q.Promise<any>|Promise<T|never>}
 */
export const reqAddCategory = (parentId,categoryName) =>
  ajax('/manage/category/add',{parentId,categoryName},'POST');

/**
 * 修改商品名称
 * @param categoryId
 * @param categoryName
 * @returns {Q.Promise<any>|Promise<T|never>}
 */
export const reqUpdateCategory = (categoryId,categoryName) =>
  ajax('/manage/category/update',{categoryId,categoryName},'POST');

/**
 * 获取商品分类列表
 * @param pageNum
 * @param pageSize
 * @returns {Q.Promise<any>|Promise<T|never>}
 */
export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize});