import React from 'react'
// import PropTypes from 'prop-types'
import axios from '../../utils/axios'
import './style.less'
import { Form, Icon, Input, Button } from 'antd'
import qs from 'qs'
import history from '../../utils/history'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const { account, password } = values
        const urlParam = qs.stringify({
          'param.loginType': 0,
          'param.account': account,
          'param.password': password
        })
        axios
          .post(`/api/Sys_PlatForm_Account/LoginAsync?${urlParam}`)
          .then(res => {
            if (res) {
              // 将用户 accountId 存储供后续使用
              localStorage.setItem('accountId', res.PlatFormAccountId)
              history.push('/check-in-home')
            }
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="账号">
          {getFieldDecorator('account', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="header">
          <div className="logo" />
          <span className="title">金钻客商家运营平台</span>
          <span className="sub-title">管理平台</span>
        </div>
        <div className="body">
          <div className="ads" />
          <div className="content">
            <div className="scan">账号登录</div>
            <WrappedNormalLoginForm />
          </div>
        </div>
      </div>
    )
  }
}
