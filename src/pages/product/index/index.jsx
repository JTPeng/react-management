/**
 * Created by JTPeng on 2019-06-27 09:07.
 * Description：
 */
import React,{ Component } from 'react';
import {Card,Select,Input,Icon,Button,Table} from "antd";
import MyButton from '../../../components/my-button';
import { reqProducts } from '../../../api';
import './index.less';

const { Option } = Select;

export default class Index extends Component{
  state = {
    products:[],
  };
  async componentDidMount() {
    const result = await reqProducts(1,3);
    if (result){
      this.setState({
        products:result.list
      })
    }
  }
  showAddProduct = () => {
    this.props.history.push('/product/saveupdate');
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
            <MyButton>修改</MyButton>
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
    const {products} = this.state;
    return(
      <Card
        title={
          <div>
            <Select defaultValue={0}>
              <Option key={0} value={0}>根据商品名称</Option>
              <Option key={1} value={1}>根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" className="search-input"/>
            <Button type="primary">搜索</Button>
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
            defaultPageSize: 3
          }}
        />
      </Card>
    )
  }
}