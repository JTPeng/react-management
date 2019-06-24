/**
 * Created by JTPeng on 2019-06-24 10:04.
 * Description：
 */
const USER_KEY = 'USER_KEY';
const START_TIME = 'START_TIME';
// 过期时间
const DEADLINE = 1000 * 3600 * 24 * 7;
// 测试过期能否移除登录信息
// const DEADLINE = 1000;
export const getItem = function () {
  const startTime = localStorage.getItem(START_TIME);
  if (Date.now() - startTime > DEADLINE){
    // 过期了
    removeItem();
    return {};
  }
  // 未过期
  return JSON.parse(localStorage.getItem(USER_KEY));
};
export const setItem = function (data) {
  localStorage.setItem(USER_KEY,JSON.stringify(data));
  localStorage.setItem(START_TIME,Date.now());
};
export const removeItem = function () {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(START_TIME);
};