/**
 * Created by JTPeng on 2019-06-27 09:07.
 * Description：
 */
import React,{ Component } from 'react';
import {Card,Select,Input,Icon,Button,Table,message} from "antd";
import MyButton from '../../../components/my-button';
import { reqProducts,reqSearchProduct } from '../../../api';
import './index.less';

const { Option } = Select;

export default class Index extends Component{
  state = {
    products:[],
    total:0,
    loading:true,
    searchType: 'productName',
    searchContent: '',
    pageSize: 3,
    pageNum: 1
  };

  componentDidMount() {
    this.getProducts(1,3);
  }

  getProducts = async (pageNum,pageSize) => {
    this.setState({
      loading:true,
    });
    const {searchContent,searchType} = this.state;
    let promise = null;
    if (this.isSearch && searchContent){
      promise = reqSearchProduct({
        searchType, searchContent, pageSize, pageNum
      });
    }else{
      promise = reqProducts(pageNum,pageSize);
    }
    const result = await promise;
    if (result){
      this.setState({
        total:result.total,
        products:result.list,
        loading:false,
        pageNum,
        pageSize
      })
    }
  };

  showAddProduct = () => {
    this.props.history.push('/product/saveupdate');
  };

  showUpdateProduct = (product) => {
    return () => {
      // push 第二个参数为传递的数据
      this.props.history.push('/product/saveupdate',product);
    };
  };

  // 商品受控组件
  handleChange = targetName => {
    return e => {
      let value = '';
      if (targetName === 'searchType'){
        value = e;
      }else{
        value = e.target.value;
        if (!value) this.isSearch = false;
      }
      this.setState({
        [targetName]:value,
      });
    }
  };

  // 搜索商品
  search = () => {
    // 搜集数据
    const {searchContent,pageNum,pageSize} = this.state;
    // 发送请求(搜索框有内容才发送请求)
    if(searchContent){
      this.isSearch = true;
      this.getProducts(pageNum,pageSize);
    }else{
      message.warn('请输入搜索内容！')
    }
  };
  render() {
    const columns = [
      {
        title:'商品名称',
        dataIndex:'name',
      },
      {
        title:'商品描述',
        dataIndex:'desc',
      },
      {
        title:'价格',
        dataIndex:'price',
      },
      {
        className:'product-status',
        title:'状态',
        dataIndex:'status',
        render:(status) => {
          return status === 1
            ? <div><Button type="primary">下架</Button>&nbsp;&nbsp;&nbsp;&nbsp;在售</div>
            : <div><Button type="primary">上架</Button>&nbsp;&nbsp;&nbsp;&nbsp;已下架</div>
        }
      },
      {
        className: 'product-status',
        title: '操作',
        render: (product) => {
          return <div>
            <MyButton>详情</MyButton>
            <MyButton onClick={this.showUpdateProduct(product)}>修改</MyButton>
          </div>
        }
      },
    ];
    /*const products = [
      {
        name:'iphone',
        desc:'apple',
        price:'1000',
        status:1,
      },
      {
        name:'iphone',
        desc:'apple',
        price:'1000',
        status:1,
      }
    ];*/
    const {products,total,loading} = this.state;
    return(
      <Card
        title={
          <div>
            <Select defaultValue='productName' onChange={this.handleChange('searchType')}>
              <Option key={0} value='productName'>根据商品名称</Option>
              <Option key={1} value='productDesc'>根据商品描述</Option>
            </Select>
            <Input
              placeholder="关键字"
              className="search-input"
              onChange={this.handleChange('searchContent')}/>
            <Button type="primary" onClick={this.search}>搜索</Button>
          </div>
        }
        extra={<Button type="primary" onClick={this.showAddProduct} ><Icon type="plus"/>添加商品</Button>}
      >
        <Table
          columns={columns}
          dataSource={products}
          bordered
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3,
            total,
            onChange:this.getProducts,
            onShowSizeChange:this.getProducts,
          }}
          rowKey="_id"
          loading={loading}
        />
      </Card>
    )
  }
}