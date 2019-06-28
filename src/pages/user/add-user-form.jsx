import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types'

const Item = Form.Item;
const Option = Select.Option;

class AddUserForm extends Component {
  static propTypes = {
    roles:PropTypes.array.isRequired,
  };
   validator = (rule,values,callback) =>{
    // console.log(rule, values, callback);
    const name = rule.fullField === 'username' ? '用户名':'密码';
    if (!values){
      // 没有输入
      callback();
    }else if (values.length < 4){
      callback(`${name}长度不能小于4位`);
    } else if (values.length > 15){
      callback(`${name}长度不能大于15位`);
    } else if(!/^[a-zA-Z_0-9]+$/.test(values)){
      callback(`${name}必须由数字,英文字母,下划线组成`);
    }else{
      // 不传参代表成功
      callback()
    }
  };
  render () {
    const {getFieldDecorator} = this.props.form;
    
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',{
                rules:[
                  {
                    required:true,message:'用户名不能为空',
                    validator:this.validator,
                  }
                ]
              }
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password',{
                rules:[
                  {
                    required:true,message:'密码不能为空',
                    validator:this.validator,
                  }
                ]
              }
            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',{
                rules:[
                  {
                    required:true,message:'手机号不能为空',
                  }
                ]
              }
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email',{
                rules:[
                  {
                    required:true,message:'邮箱不能为空',
                  }
                ]
              }
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色分类' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role',{
                rules:[
                  {
                    required:true,message:'角色分类不能为空',
                  }
                ]
              }
            )(
              <Select placeholder='请选择分类'>
                {
                  this.props.roles.map((role) => {
                      return <Option value={role._id} key={role._id}>{role.name}</Option>
                    }
                  )
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUserForm);