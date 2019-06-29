/**
 * Created by JTPeng on 2019-06-21 16:10.
 * Description：
 */
import React,{ Component,Fragment } from 'react';
import { Layout } from 'antd';
import Category from '../category';
import Pie from '../charts/pie';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Home from '../home';
import Product from '../product';
import Role from '../role';
import User from '../user';

import { Switch,Route,Redirect } from 'react-router-dom';
import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/storage-tools';
import { reqValidateUser } from '../../api';
const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component{
  state = {
    collapsed: false,
    isLoading:true,
    success:[],
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  async componentWillMount() {
    const user = getItem();
    /*if (!result || !result._id){
      // 没有返回数据或者id就返回login登录页
      this.props.history.replace('/login');
    } else {
      // 登录成功仍需验证，验证其id是否是被修改过的
      const user = reqValidateUser(result._id);
      if (!user){
        this.props.history.replace('/login');
      }
    }*/
    if (user && user._id){
      const result = await reqValidateUser(user._id);
      // 设置状态。防止不必要的页面进行多次跳转
      if (result) {
        let menus = user.role.menus;
        if (user.username === 'admin'){
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
        return this.setState({
          isLoading:false,
          success:menus.reverse(),
        })
      }
    }
    this.setState({
      isLoading:false,
      success:[],
    })
  }

  render() {
    const { collapsed,success,isLoading } = this.state;
    if (isLoading) return  null;
    return success.length ? <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LeftNav collapsed={ collapsed }/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0,minHeight:100 }} >
            <HeaderMain/>
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                {/*<Route path="/home" component={Home}/>
                <Route path="/category" component={Category}/>
                <Route path="/product" component={Product}/>
                <Route path="/user" component={User}/>
                <Route path="/role" component={Role}/>
                <Route path="/charts/line" component={Line}/>
                <Route path="/charts/bar" component={Bar}/>
                <Route path="/charts/pie" component={Pie}/>
                <Redirect to="/home"/>*/}
                {
                  success.map((item) => {
                    switch (item) {
                      case '/category':
                        return <Route  key={item} path="/category" component={Category}/>;
                      case '/product':
                        return <Route  key={item} path="/product" component={Product}/>;
                      case '/user' :
                        return <Route key={item} path="/user" component={User}/>;
                      case '/role' :
                        return <Route key={item} path="/role" component={Role}/>;
                      case '/charts/line' :
                        return <Route key={item} path="/charts/line" component={Line}/>;
                      case '/charts/bar' :
                        return <Route key={item} path="/charts/bar" component={Bar}/>;
                      case '/charts/pie' :
                        return <Route key={item} path="/charts/pie" component={Pie}/>;
                      case '/home' :
                        return <Fragment key={item}><Route path="/home" component={Home}/><Redirect to="/home"/></Fragment>;
                    }
                  })
                }
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout> : <Redirect to="/login" />;

  }
}