/**
 * Created by JTPeng on 2019-06-26 09:27.
 * Description：
 */
import React,{ Component } from 'react';
import {Form, Input, Select} from "antd";
import PropTypes from 'prop-types';
const { Item } = Form;
const { Option } = Select;
class AddCategoryFrom extends Component{
  static propTypes = {
    categoryList:PropTypes.array.isRequired,
  };
  validator = (rule,value,callback) => {
    if (!value) return callback('请输入分类名称');
    const result = this.props.categoryList.find((category) => category.name === value);
    if (result){
      callback('输入的分类名称已存在,请重新输入')
    }else{
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryList } = this.props;
    return(
      <Form>
        <Item label="所属分类">
          {
            getFieldDecorator(
              'parentId',{
                initialValue:'0'
              }
            )(
              <Select style={{ width: '100%' }}>
                <Option value="0">一级分类</Option>
                {
                  categoryList.map((category) => {
                    return <Option value={category._id} key={category._id} >{category.name}</Option>
                  })
                }
              </Select>
            )
          }

        </Item>
        <Item label="分类名称">
          {
            getFieldDecorator(
              'categoryName',
              {
                rules:[
                  {validator:this.validator}
                ]
              }
            )(
              <Input placeholder="请输出分类名称 "/>
            )
          }

        </Item>
      </Form>
    )
  }
}
export default Form.create()(AddCategoryFrom);