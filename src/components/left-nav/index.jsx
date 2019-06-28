/**
 * Created by JTPeng on 2019-06-22 15:12.
 * Description：
 */
import React,{ Component } from 'react';
import {Icon, Menu} from "antd";
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../../utils/storage-tools';

import logo from '../../asset/images/logo.png';
import menuList from '../../config/menu-list';
import './index.less';
const {SubMenu,Item} = Menu;

class LeftNav extends Component{
  static propTypes = {
    collapsed:PropTypes.bool.isRequired,
  };
  createMenu = (menu) =>{
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
  };
  componentWillMount() {
    let { pathname } = this.props.location;
    let { role : { menus }, username } = getItem();
    if (username === 'admin') {
      // 就是admin
      menus = [
        '/home',
        '/products',
        '/category',
        '/product',
        '/user',
        '/role',
        '/charts',
        '/charts/line',
        '/charts/bar',
        '/charts/pie',
      ]
    }
    // 匹配product后的三级路由
    const productReg = /^\/product\//;
    if (productReg.test(pathname)){
      pathname = pathname.slice(0,8);
    }
    let isHome = true;
    this.menus = menuList.reduce((pre,curr) => {
      // 判断是一级菜单还是二级菜单
      const children = curr.children;
      if (children){
        // 二级菜单
        let isShowSubMenu = false;
        const subMenu = <SubMenu
          key={curr.key}
          title={
            <span>
              <Icon type={curr.icon} />
              <span>{curr.title}</span>
            </span>
          }
        >
          {
            children.reduce((prev,current) => {
              const menu = menus.find((menu) => menu === current.key);
              if (menu){
                if (current.key === pathname){ // 说明当前地址是一个二级菜单，需要展开一级菜单
                  this.openKey =curr.key;
                  isHome = false;
                }
                // 找到了显示
                isShowSubMenu = true;
                return [...prev, this.createMenu(current)];
              }else{
                return prev;
              }
            }, [])
          }
        </SubMenu>;
        return isShowSubMenu ? [...pre, subMenu] : pre;
      } else {
        // 一级菜单
        const menu =menus.find(menu => menu === curr.key);
        if (menu){
          if (curr.key === pathname) isHome = false;
          return [...pre,this.createMenu(curr)]
        } else {
          return pre;
        }
      }
    },[]);
    /*this.menus = menus.map((menu) => {
      if (menu.children){
        // 二级菜单与一级菜单区别是拥有children属性
        return (
          <SubMenu
            key={menu.key}
            title={
              <span>
                <Icon type={ menu.icon } />
                <span>{ menu.title }</span>
              </span>
            }
          >
            {
              menu.children.map((item) => {
                // 二级菜单展开
                if (item.key === pathname){
                  this.openKey = menu.key;
                  isHome = false;
                }
                return this.createMenu(item)
              })
            }
          </SubMenu>
        )
      } else {
        if (menu.key === pathname) isHome = false;
        return this.createMenu(menu);
      }
    });*/
    // this.selectKey = pathname;
    // 初始化选中菜单
    this.selectKey = isHome ? '/home' :  pathname;
  }

  render() {
    const { collapsed } = this.props;
    return(
      <div>
        <Link className="left-nav-logo" to='/home'>
          <img src={ logo } alt="logo"/>
          <h1 style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</h1>
        </Link>
        <Menu theme="dark" defaultSelectedKeys={[this.selectKey]} defaultOpenKeys={[ this.openKey ]} mode="inline">
          {
            this.menus
          }
          {/*<Item key="1">
            <Icon type="home" />
            <span>首页</span>
          </Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
            </span>
            }
          >
            <Item key="2">
              <Icon type="bars" />
              <span>品类管理</span>
            </Item>
            <Item key="3">
              <Icon type="tool" />
              <span>商品管理</span>
            </Item>
          </SubMenu>
          <Item key="4">
            <Icon type="user" />
            <span>用户管理</span>
          </Item>
          <Item key="5">
            <Icon type="safety" />
            <span>权限管理</span>
          </Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                    <Icon type="area-chart" />
                    <span>图形图表</span>
                  </span>
            }
          >
            <Item key="6">
              <Icon type="bar-chart" />
              <span>柱形图</span>
            </Item>
            <Item key="7">
              <Icon type="line-chart" />
              <span>折线图</span>
            </Item>
            <Item key="8">
              <Icon type="pie-chart" />
              <span>饼图</span>
            </Item>
          </SubMenu>*/}
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNav);