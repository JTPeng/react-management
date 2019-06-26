/**
 * Created by JTPeng on 2019-06-25 10:29.
 * Description：
 */
import React,{ Component } from 'react';
import { Table,Card,Icon,Button,Modal,message  } from 'antd';
import  MyButton  from '../../components/my-button';
import { reqCategory,reqAddCategory,reqUpdateCategory } from '../../api'
import './index.less';
import AddCategoryFrom from './add-category-from';
import UpdateCategoryNameForm from './update-category-name';
export default class Category extends Component{
  state = {
    categoryList:[],  // 一级分类列表
    subCategoryList:[], // 二级分类列表
    isShowSubCategoryList:false, // 是否显示二级分类列表
    isShowAddCategory:false, // 显示添加分类
    isShowUpdateCategoryName:false, // 显示更新分类名称
    loading:true,
  };
  category = {};  // 初始化category
  componentDidMount() {
   this.fetchCategory('0');
  }
  fetchCategory = async (parentId) => {
    this.setState({
      loading:true
    });
    const result = await reqCategory(parentId);
    if (result){
      if (parentId === '0'){
        this.setState({
          categoryList:result
        })
      }else{
        this.setState({
          subCategoryList:result,
          isShowSubCategoryList:true,
        })
      }
    }
    this.setState({
      loading:false
    });
  };
  /*// 显示添加分类
  showAddCategory = () => {
    this.setState({
      isShowAddCategory:true,
    })
  };
  // 隐藏添加分类
  hideAddCategory = () =>{
    this.setState({
      isShowAddCategory:false,
    })
  };*/
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
          const {isShowSubCategoryList} = this.state;
          /*
          一级分类就在一级分类列表中展示
          二级分类：不在一级分类列表中展示
          当前显示的二级分类还需要满足添加分类的一级分类和当前显示的一级分裂一致,才显示,否则不显示
          */

          if (result.parentId === '0'){
            options.categoryList = [...this.state.categoryList,result]
          } else if (isShowSubCategoryList && result.parentId === this.parentCategory._id){
            options.subCategoryList = [...this.state.subCategoryList,result]
          }
          // 清空表单数据
          form.resetFields(['parentId','categoryName']);
          this.setState(options)
        }
      }
    });
  };

   /*// 显示修改分类名称
  showUpdateCategoryName = () => {
    this.setState({
      isShowUpdateCategoryName:true,
    })
  };
  // 隐藏修改分类名称
  hideUpdateCategoryName = () =>{
    this.setState({
      isShowUpdateCategoryName:false,
    })
  };*/

  // 切换显示
  toggleDisplay = (stateName,stateValue) => {
    return () => {
      this.setState({
        [stateName]:stateValue
      })
    }
  };

  hideUpdateCategoryName = () => {
    // 清空表单项 => 保证每次点击修改时使用的都是初始化值
    this.updateCategoryNameForm.props.form.resetFields(['categoryName']);
    // 隐藏对话框
    this.setState({
      isShowUpdateCategoryName:false,
    })
  };
  // 缓存category
  saveCategory = (category) => {
    return () => {
      this.category = category;
      this.setState({
        isShowUpdateCategoryName:true,
      });
    }
  };
  // 更新分类名称
  updateCategoryName = () => {
    const { form } = this.updateCategoryNameForm.props;

    // 校验表单收集表单数据 最后发送请求
    form.validateFields(async (err,value) =>{
      if (!err){
        // 发送请求
        /*console.log(this.category);
        console.log(value);*/
        const { categoryName } = value;
        const categoryId = this.category._id;
        const result = await reqUpdateCategory(categoryId,categoryName);
        if (result){
          const { parentId } = this.category;
          let categoryData = this.state.categoryList;
          let setDataName = 'categoryList';
          if (parentId !== '0'){
          //  二级分类菜单
            categoryData = this.state.subCategoryList;
            setDataName = 'subCategoryList';
          }
          // 确认提交则清空表单项
          const categoryList = categoryData.map((category) =>{
             let { _id,name,parentId } = category;
             if (_id === categoryId){
               name = categoryName;
               return {
                 _id,
                 name,
                 parentId
               }
             }
             // 没有修改则不需要创建一个新的对象
             return category;
          });
          form.resetFields(['categoryName']);
          message.success('修改分类名称成功',2);
          // 隐藏表单项
          this.setState({
            isShowUpdateCategoryName:false,
            [setDataName]:categoryList
          })
        }
      }
    });

  };

  showSubCategory = (category) => {
    // 请求二级分类
    return async () =>{
      this.parentCategory = category;
      this.fetchCategory(category._id);
    }
  };

  goBack = () => {
    this.setState({
      isShowSubCategoryList:false,
    })
  };
  render() {
    const {
      categoryList,
      isShowAddCategory,
      isShowUpdateCategoryName,
      subCategoryList,
      isShowSubCategoryList,
      loading
    } = this.state;
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
       // dataIndex:'operation',  // 数据冲存在dataIndex 才会显示数据
        className: 'category-operation',
        render: category => {
          // category将整个遍历的对象返回
          // console.log(category);
          return <div>
            <MyButton onClick={this.saveCategory(category)}>修改名称</MyButton>
            {
              isShowSubCategoryList ? null : <MyButton
                onClick={this.showSubCategory(category)}>查看其子品类</MyButton>
            }
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
      <Card
        title={isShowSubCategoryList ? <div><MyButton onClick={this.goBack}>一级分类列表</MyButton><Icon type="arrow-right"/>&nbsp;{this.parentCategory.name}</div>:'一级分类列表'}
        extra={<Button type="primary" onClick={this.toggleDisplay('isShowAddCategory',true)}><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={isShowSubCategoryList?subCategoryList:categoryList}
        bordered
        pagination={{
          showSizeChanger:true,  // 显示大小转换器
          pageSizeOptions:['3','6','9','12'],   // 页面大小选项
          defaultPageSize:3,  // 默认页面大小
          showQuickJumper:true  // 显示快速跳转
        }}
        rowKey="_id"
        loading={loading}
      />
        <Modal
          title="添加品类"
          visible={isShowAddCategory}
          onOk={this.addCategory}
          onCancel={this.toggleDisplay('isShowAddCategory',false)}
          okText="确认"
          cancelText="取消"
        >
          <AddCategoryFrom categoryList={categoryList} wrappedComponentRef={(form) => this.addCategoryForm = form} />
        </Modal>
        <Modal
          title="修改分类名称"
          visible={isShowUpdateCategoryName}
          onOk={this.updateCategoryName}
          onCancel={this.hideUpdateCategoryName}
          okText="确认"
          cancelText="取消"
          width={300}
        >
          <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef={(form) => this.updateCategoryNameForm = form} />
        </Modal>
      </Card>
    );
  }
}