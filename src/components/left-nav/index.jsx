/**
 * Created by JTPeng on 2019-06-22 15:12.
 * Description：
 */
import React,{ Component } from 'react';
import {Icon, Menu} from "antd";
import {Link,withRouter} from 'react-router-dom';
import logo from '../../asset/images/logo.png';
import MenuList from '../../config/menu-list';
import './index.less';
const {SubMenu,Item} = Menu;

class LeftNav extends Component{
  changMenu = (menu) =>{
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
  };
  componentWillMount() {
    const { pathname } = this.props.location;
    this.menuList = MenuList.map((menu) => {
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
                }
                return this.changMenu(item)
              })
            }
          </SubMenu>
        )
      } else {
        return this.changMenu(menu);
      }
    });

    this.selectKey = pathname;
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
            this.menuList
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