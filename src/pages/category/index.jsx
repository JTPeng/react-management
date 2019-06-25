/**
 * Created by JTPeng on 2019-06-25 10:29.
 * Description：
 */
import React,{ Component } from 'react';
import { Table,Card,Icon,Button } from 'antd';
import  MyButton  from '../../components/my-button';
import { reqCategory } from '../../api'
import './index.less';
export default class Category extends Component{
  state = {
    categoryList:[],
  };
  async componentDidMount() {
   const result = await reqCategory('0');
   if (result){
     this.setState({
       categoryList:result
     })
   }
  }

  render() {
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        className: 'category-operation',
        render: text => {
          return <div>
            <MyButton>修改名称</MyButton>
            <MyButton>查看其子品类</MyButton>
          </div>
        }
      },
    ];

    /*const data = [
      {
        key: '1',
        name: '电脑',
        money: '修改名称',
      },
      {
        key: '2',
        name: '电脑',
        money: '修改名称',
      },
      {
        key: '3',
        name: '电脑',
        money: '修改名称',
      },
      {
        key: '4',
        name: '手机',
        money: '修改名称',
      },
    ];*/
    return(
      <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={this.state.categoryList}
        bordered
        pagination={{
          showSizeChanger:true,  // 显示大小转换器
          pageSizeOptions:['3','6','9','12'],   // 页面大小选项
          defaultPageSize:3,  // 默认页面大小
          showQuickJumper:true  // 显示快速跳转
        }}
          rowKey="_id"
      />
      </Card>
    );
  }
}