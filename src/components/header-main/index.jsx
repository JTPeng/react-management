/**
 * Created by JTPeng on 2019-06-22 15:30.
 * Description：
 */
import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { getItem,removeItem } from '../../utils/storage-tools'
import MyButton from '../my-button';
import { reqWeather } from "../../api";
import menuList from '../../config/menu-list';
// dayJS插件
import dayjs from 'dayjs';

import './index.less';
const { confirm } = Modal;
class HeaderMain extends Component{
  state = {
    sysName:'',
    sysTime:Date.now(),
    weather: '阴',
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
  };
  logoOut = () =>{
    confirm({
      title:'你确定要登出吗?',
      okText:'确认',
      cancelText:'取消',
      onOk:() => {
        // 清空本地数据
        removeItem();
        // 登出
        this.props.history.replace('/login');
      },
    });
  };
  componentWillMount() {
    const sysName = getItem().username;
    this.setState({
      sysName
    });
    this.title = this.getTitle(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.title = this.getTitle(nextProps);
  }

  async componentDidMount() {
    this.timeId = setInterval(() => {
      this.setState({
        sysTime:Date.now()
      })
    },1000);
    // 返回的是一个函数
     const {promise,cancel} =  reqWeather();
     this.cancel = cancel;
     const result = await promise;
     if (result){
        this.setState(result);
     }
  }
    componentWillUnmount() {
    // 取消ajax请求
    this.cancel();
    // 清除定时器
    clearInterval(this.timeId);
  }

  getTitle = (nextProps) => {
/*    console.log('getTitle()');*/
    const { pathname }  = nextProps.location;
    for (let i = 0; i < menuList.length ; i++) {
      const menu = menuList[i];
      if (menu.children){
        for (let j = 0; j < menu.children.length ; j++) {
          const item = menu.children[j];
          if (item.key === pathname) {
            return item.title;
          }
        }
      } else{
        if (menu.key === pathname){
          return menu.title;
        }
      }
    }
  };
  render() {
    const { sysName,sysTime,weatherImg,weather } = this.state;
    return(
      <div>
        <div className="header-main-top">
          <span>欢迎, { sysName }</span>
          <MyButton onClick={this.logoOut}>退出</MyButton>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">{ this.title }</span>
          <div className="header-main-right">
            <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            <img src={weatherImg} alt="weatherImg"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(HeaderMain);