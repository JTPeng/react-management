import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { PropTypes } from 'prop-types';
const Item = Form.Item;
const Option = Select.Option;

class UpdateUserForm extends Component {
  static propTypes = {
    user:PropTypes.object.isRequired,
    roles:PropTypes.array.isRequired,
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    const {user} = this.props;
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',
              {initialValue: user.username}
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',
              {initialValue: user.phone}
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email',
              {initialValue: user.email}
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role',
              {
                initialValue:user.role_id
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

export default Form.create()(UpdateUserForm);