/**
 * Created by JTPeng on 2019-06-27 09:07.
 * Description：
 */
import React,{ Component } from 'react';
import { Card, Icon, Form, Input, Button, Cascader, InputNumber  } from 'antd';
import {reqAddProduct, reqCategory,reqUpdateProduct} from '../../../api';
import RichTextEditor from './rich-text-editor';
import draftToHtml from 'draftjs-to-html';
import {convertToRaw} from "draft-js";
import PictureWall from './picture-wall';
import './index.less';
const { Item } = Form;
class SaveUpdate extends Component{
  state = {
    options:[]
  };
  richTextDetailRef = React.createRef();

  getCategories = async (parentId) => {
    const result = await reqCategory(parentId);
    if (result){
      // 区分一二级分类
      if (parentId === '0'){
        this.setState({
          options:result.map((item) => {
            return {
              value:item._id,
              label:item.name,
              isLeaf: false,
            }
          })
        })
      } else{
        this.setState({
          options:this.state.options.map((item) => {
            if (item.value === parentId) {
              item.children = result.map((item) => {
                return {
                  value: item._id,
                  label: item.name
                }
              })
            }
            return item;
          })
        })
      }

    }
  };

  componentDidMount() {
    this.getCategories('0');
    const product = this.props.location.state;
    let categoriesId = [];
    if (product){
      if (product.pCategoryId !== '0'){
        categoriesId.push(product.pCategoryId);
        // 请求二级分类数据
        this.getCategories(product.pCategoryId);
      }
      categoriesId.push(product.categoryId);
    }
    this.categoriesId = categoriesId;
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
    const { form } = this.props;
    form.validateFields(async (err,values) => {
      if (!err){
        const {editorState} = this.richTextDetailRef.current.state;
        const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const {name, desc, price, categoriesId} =values;
        //
        let pCategoryId = '0';
        let categoryId = '';
        if (categoriesId.length === 1){
          categoryId = categoriesId[0];
        }else{
          pCategoryId = categoriesId[0];
          categoryId = categoriesId[1];
        }
        let promise = null;
        const product = this.props.location.state;
        const options = {name, desc, price,categoryId,pCategoryId,detail};
        if (this.props.location.state){
          options._id = product._id;
          // 修改
          promise = await reqUpdateProduct(options);
        } else{
          // 添加
          promise = await reqAddProduct(options);
        }
        const result = await promise;
        if (result){
          this.props.history.push('/product/index');
        }
      }
    })
  };
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { options } = this.state;
    const { getFieldDecorator } = this.props.form;
    const product = this.props.location.state;

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
      <Card title={<div className="product-title">
        <Icon type="arrow-left" className='arrow-icon' onClick={this.goBack}/>
        <span>添加商品</span>
      </div>}>
        <Form {...formItemLayout} onSubmit={this.addProduct}>
          <Item label="商品名称">
            {
              getFieldDecorator(
                'name',
                {
                  rules:[
                    {required:true,message:'请输入商品名称'}
                  ],
                  initialValue: product ? product.name : ''
                }
              )(
                <Input placeholder="请输入商品名称"/>
              )
            }

          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator(
                'desc',
                {
                  rules:[
                    {required:true,message:'请输入商品描述'}
                  ],
                  initialValue: product ? product.desc : ''
                }
              )(<Input placeholder="请输入商品描述"/>)
            }
          </Item>
          <Item label="选择分类" wrapperCol={{span: 5}}>
            {
              getFieldDecorator(
                'categoriesId',
                {
                  rules:[
                    {required:true,message:'请选择分类'}
                  ],
                  initialValue:this.categoriesId,
                }
              )(
                <Cascader
                  options={options}
                  loadData={this.loadData}
                  changeOnSelect
                  placeholder={'请选择分类'}
                />
              )
            }

          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator(
                'price',
                {
                  rules:[
                    {required:true,message:'请输入商品价格'}
                  ],
                  initialValue: product ? product.price : ''
                }
              )(
                <InputNumber
                  // 格式化，对输入的数据进行格式化
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                  className="input-number"
                />
              )
            }

          </Item>
          <Item label="商品图片" wrapperCol={{span: 20}}>
            <PictureWall imgs={product ? product.imgs : []} id={product ? product._id : ''}/>
          </Item>
          <Item label="商品详情" wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.richTextDetailRef} detail={product ? product.detail : ''}/>
          </Item>
          <Item>
            <Button type="primary" className="add-product-btn" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(SaveUpdate);