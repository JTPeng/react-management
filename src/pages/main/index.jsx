/**
 * Created by JTPeng on 2019-06-21 16:10.
 * Description：
 */
import React,{ Component } from 'react';
import { Layout } from 'antd';

import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/storage-tools';
import { reqValidateUser } from '../../api';
const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component{
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentWillMount() {
    const result = getItem();
    if (!result || !result._id){
      const user = reqValidateUser(result._id);
      if (!user) return;
      this.props.history.replace('/login');
    }
  }

  render() {
    const { collapsed } = this.state;
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LeftNav collapsed={ collapsed }/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0,minHeight:100 }} >
            <HeaderMain/>
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>欢迎登录！</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    );
  }
}