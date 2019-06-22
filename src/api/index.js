/**
 * Created by JTPeng on 2019-06-22 12:16.
 * Description：各个接口文件,对ajax进一步优化
 */
import ajax from './ajax';

export const reqLogin = (username,password) => ajax('/login',{username,password},'post');
