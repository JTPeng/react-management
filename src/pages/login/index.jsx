/**
 * Created by JTPeng on 2019-06-21 16:10.
 * Description：login登录模块
 */
import React from 'react';
import { Form, Icon, Input, Button,message } from 'antd';

import { setItem } from '../../utils/storage-tools';
import { reqLogin } from '../../api';

import logo from '../../asset/images/logo.png';
import './index.less';
const Item = Form.Item;

function Login(props){
  // console.log(props);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (error,values)=>{
      // console.log(error, values);
      const { username,password } = values;
      // 没有错误error则为null,可以收集表单数据
      // error为objects,代表表单数据有误,不收集表单数据
      if (!error){
        // console.log(`表单数据收集成功${username},${password}`);
        const result = await reqLogin(username,password);
        if (result){
          message.success('登录成功');
          // localStorage.setItem('USER_KEY',JSON.stringify(result));
          // 使用localStorage 设置登录信息和过期时间
          setItem(result);
          props.history.replace('/');
        } else{
          // message.error('登录失败,用户名或密码错误',2);
          props.form.resetFields(['password']);
        }
        /*const result = await ajax('/login',{username,password},'post');
        if (result){
          message.success('登录成功');
          this.props.history.replace('/');
        } else{
          message.error('登录失败,用户名或密码错误',2);
          this.props.form.resetFields(['password']);
        }*/
        /*axios.post('/login',{ username,password })
          .then((res) => {
            const { data } = res;
            if (data.status === 0){
              message.success(`欢迎${data.data.username}登录`);
              // 登录成功后 页面跳转到main主页
              //
              this.props.history.replace('/');
            } else{
              message.error(`${data.msg}`);
              this.props.form.resetFields(['password']);
            }
          })
          .catch((err) => {
            message.error(`网络丢失了,请刷新重试`,2);
            this.props.form.resetFields(['password']);
          })*/
      } else{
        console.log(`表单数据有误${error}`);
      }
    })
  };
  const validator = (rule,values,callback) =>{
    // console.log(rule, values, callback);
    const name = rule.fullField === 'username' ? '用户名':'密码';
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
    // console.log(this.props); 拥有form属性
  const { getFieldDecorator } = props.form;
  return(
    <div className="login">
      <header className="login-header">
        <img src={logo} alt=""/>
        <h1>React项目:后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form className="login-form" onSubmit={ handleSubmit }>
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
                      validator
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
                    validator
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
export default Form.create()(Login)