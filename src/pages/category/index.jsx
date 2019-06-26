/**
 * Created by JTPeng on 2019-06-25 10:29.
 * Description：
 */
import React,{ Component } from 'react';
import { Table,Card,Icon,Button,Modal,message  } from 'antd';
import  MyButton  from '../../components/my-button';
import { reqCategory,reqAddCategory } from '../../api'
import './index.less';
import AddCategoryFrom from './add-category-from';
export default class Category extends Component{
  state = {
    categoryList:[],  // 一级分类列表
    isShowAddCategory:false // 显示添加分类
  };
  async componentDidMount() {
   const result = await reqCategory('0');
   if (result){
     this.setState({
       categoryList:result
     })
   }
  }

  /**
   * 显示添加分类
   */
  showAddCategory = () => {
    this.setState({
      isShowAddCategory:true,
    })
  };
  /**
   * 隐藏添加分类
   */
  hideAddCategory = () =>{
    this.setState({
      isShowAddCategory:false,
    })
  };
  /**
   * 添加品类
   */
  addCategory = () => {
    // 需要表单校验和收集表单数据
    const { form } = this.addCategoryForm.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        // 校验通过
        console.log(values);
        const { parentId, categoryName } = values;
        const result = await reqAddCategory(parentId, categoryName);

        if (result) {
          // 添加分类成功~
          message.success('添加分类成功~', 2);
          const options = {
            isShowAddCategory: false
          };
          if (result.parentId === '0'){
            options.categoryList = [...this.state.categoryList,result]
          }
          // 清空表单数据
          form.resetFields(['parentId','categoryName']);
          this.setState(options)
        }
      }
    });
  };
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
    const {categoryList,isShowAddCategory} = this.state;
    return(
      <Card title="一级分类列表" extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={categoryList}
        bordered
        pagination={{
          showSizeChanger:true,  // 显示大小转换器
          pageSizeOptions:['3','6','9','12'],   // 页面大小选项
          defaultPageSize:3,  // 默认页面大小
          showQuickJumper:true  // 显示快速跳转
        }}
          rowKey="_id"
      />
        <Modal
          title="添加分类"
          visible={isShowAddCategory}
          onOk={this.addCategory}
          onCancel={this.hideAddCategory}
          okText="确认"
          cancelText="取消"
        >
          <AddCategoryFrom categoryList={categoryList} wrappedComponentRef={(form) => this.addCategoryForm = form} />
        </Modal>
      </Card>
    );
  }
}