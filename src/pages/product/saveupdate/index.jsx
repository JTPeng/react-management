/**
 * Created by JTPeng on 2019-06-27 09:07.
 * Description：
 */
import React,{ Component } from 'react';
import { Card, Icon, Form, Input, Button, Cascader, InputNumber  } from 'antd';
import { reqCategory} from '../../../api';
import RichTextEditor from './rich-text-editor';
import './index.less';
const { Item } = Form;
export default class SaveUpdate extends Component{
  state = {
    options:[]
  };
  async componentDidMount() {
    const result = await reqCategory('0');
    if (result){
      this.setState({
        options:result.map((item) => {
          return {
            value:item._id,
            label:item.name,
            isLeaf: false,
          }
        })
      })
    }
  }

  loadData = async selectedOptions => {
    // selectedOptions 存储的是选中的一级分类数据
    // console.log(selectedOptions);
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const result = await reqCategory(targetOption.value);
    if (result){
      targetOption.loading = false;

      targetOption.children = result.map(item => {
        return {
          label: item.name,
          value: item._id
        }
      });
      this.setState({
        options:[...this.state.options],
      })
    }
  };

  addProduct = e => {
    e.preventDefault();
  };
  render() {
    const { options } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    return(
      <Card title={<div className="product-title"><Icon type="arrow-left" className='arrow-icon'/><span>添加商品</span></div>}>
        <Form {...formItemLayout} onSubmit={this.addProduct}>
          <Item label="商品名称">
            <Input placeholder="请输入商品名称"/>
          </Item>
          <Item label="商品描述">
            <Input placeholder="请输入商品描述"/>
          </Item>
          <Item label="选择分类" wrapperCol={{span: 5}}>
            <Cascader
              options={options}
              loadData={this.loadData}
              changeOnSelect
            />
          </Item>
          <Item label="商品价格">
            <InputNumber
              // 格式化，对输入的数据进行格式化
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/￥\s?|(,*)/g, '')}
              className="input-number"
            />
          </Item>
          <Item label="商品详情" wrapperCol={{span: 20}}>
            <RichTextEditor />
          </Item>
          <Item>
            <Button type="primary" className="add-product-btn" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}