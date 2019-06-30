import React, { Component } from 'react';
import { Card, Button, Table, Modal,message } from 'antd';
import dayjs from "dayjs";
import {reqGetUsers,reqAddUser,reqDelUser,reqUpdateUser} from '../../api';

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import MyButton from '../../components/my-button';

export default class User extends Component {
  state = {
    users: [
      /*{
        __v: 0,
        _id: "5c7dafe855fb843490b93a49",
        create_time: 1551740904866,
        email: "aaa@aaa.com",
        phone: "123456789",
        role_id: "5c7d222c12d5e51908cc0380",
        username: "aaa"
      }*/
    ], //用户数组
    roles:[] , // 权限数组
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  //创建用户的回调函数
  addUser = () => {
    const { form } = this.addUserForm.props;
    form.validateFields(async (err,values) => {
      if (!err){
        const result = await reqAddUser(values);
        if (result){
          message.success('添加用户成功！');
          form.resetFields();
          this.setState({
            isShowAddUserModal:false,
            users:[...this.state.users,result],
          })
        }
      }
    })
  };

  updateUser = (user) => {
    const { form } = this.updateUserForm.props;
    form.validateFields(async (err,values) => {
      // 搜集表单数据
      if (!err){
        // 发送请求
        const result = await reqUpdateUser(values);
        if (result){
          message.success('用户信息修改成功',2);
          form.resetFields();
          this.setState({

          })
        }
      }
    });
    this.user = user;
    this.setState({
      isShowUpdateUserModal:true,
    })
  };

  async componentDidMount() {
    const result = await reqGetUsers();
    // console.log(result);
    if (result){
      this.setState({
        users:result.users,
        roles:result.roles
      })
    }
  }

  toggleDisplay = (stateName, stateValue) => {
    return () => this.setState({[stateName]: stateValue})
  };
  delUser =  (user) => {
    // console.log(e.target.id);
    Modal.confirm({
      title: `你确定要删除${user.username}用户吗?`,
      okText:'确认',
      cancelText:'取消',
      onOk: async () => {
        const result = await reqDelUser(user._id);
        if (result.status === '0'){
          message.success('删除成功');
          // 删除成功后重新发请求、获取用户列表
          const result = await reqGetUsers();
          // console.log(result);
          if (result){
            this.setState({
              users:result.users,
            })
          }
        }
      },
    });
  };
  render () {
    const {users, isShowAddUserModal, isShowUpdateUserModal, roles} = this.state;
    const user = this.user;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => {
          const role = roles.find((role) => role._id === role_id);
          return role && role.name;
        }
      },
      {
        title: '操作',
        render: user => {
          return <div>
            <MyButton onClick={() => this.updateUser(user)}>修改</MyButton>
            <MyButton onClick={() => this.delUser(user)}>删除</MyButton>
          </div>
        }
      }
    ];

    return (
      <Card
        title={
          <Button type='primary' onClick={this.toggleDisplay('isShowAddUserModal', true)}>创建用户</Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true,
          }}
        />

        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.toggleDisplay('isShowAddUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm
            wrappedComponentRef={(form) => this.addUserForm = form}
            roles={roles}
          />
        </Modal>

        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.toggleDisplay('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm wrappedComponentRef={(form) => this.updateUserForm = form} user={user} roles={roles}/>
        </Modal>

      </Card>
    )
  }
}
