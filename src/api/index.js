/**
 * Created by JTPeng on 2019-06-22 12:16.
 * Description：各个接口文件,对ajax进一步优化
 */
import ajax from './ajax';

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