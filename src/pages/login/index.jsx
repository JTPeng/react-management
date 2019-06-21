/**
 * Created by JTPeng on 2019-06-21 16:10.
 * Description：
 */
import React,{ Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import logo from './logo.png';
import './index.less';
const Item = Form.Item;

class Login extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
  };
  validator = (rule,values,callback) =>{
    // console.log(rule, values, callback);
    const name = rule.FullName === 'username' ? '密码':'用户名';
    if (!values){
      // 没有输入
      callback(`必须输入${name}`);
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
  render() {
    // console.log(this.props); 拥有form属性
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="login">
        <header className="login-header">
          <img src={logo} alt=""/>
          <h1>React项目:后台管理系统</h1>
        </header>
        <section className="login-content" >
          <h2>用户登录</h2>
          <Form className="login-form" onSubmit={ this.handleSubmit }>
            <Item>
              {
                getFieldDecorator('username',{
                  // 校验规则
                  rules:[
                    /*{required:true,message:'用户名不能为空'},
                    {max:15,message:'用户名不能大于15位'},
                    {min:4,message:'用户名不能小于4位'},
                    {pattern:/^[a-zA-Z_0-9]+$/,message:'用户名必须由数字,英文字母,下划线组成'}*/
                    // 使用函数方式做验证
                      {
                        validator:this.validator,
                      }
                    ]
                })(<Input className="login-input" prefix={<Icon type="user"/>} placeholder="用户名"/>)
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password',{
                  rules:[
                    /*{required:true,message:'密码不能为空'},
                    {max:15,message:'密码不能大于15位'},
                    {min:4,message:'密码不能小于4位'},
                    {pattern:/^[a-zA-Z_0-9]+$/,message:'密码必须由数字,英文字母,下划线组成'}*/
                    {
                      validator:this.validator,
                    }
                  ]
                })(<Input className="login-input" type="password" prefix={<Icon type="lock"/>} placeholder="密码"/>)
              }
            </Item>
            <Item>
              <Button className="login-btn" type="primary" htmlType="submit">登录</Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Form.create()(Login)