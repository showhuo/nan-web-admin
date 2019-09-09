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
              localStorage.setItem('platFormId', res.PlatFormId)
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
            rules: [{ required: true, message: '请输入账号' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default class Login extends React.Component {
  state = {
    tab: 'normal'
  }
  render() {
    const { tab } = this.state
    const isNormalTab = tab === 'normal'
    return (
      <div className="login">
        <div className="header">
          <span className="title">商家运营平台</span>
          <span className="sub-title">管理平台</span>
        </div>
        <div className="body">
          <div className="ads" />
          <div className="content">
            <div className="the-tab-container">
              <div
                className={`the-tab normal ${isNormalTab ? '' : 'un-select'}`}
                onClick={() => {
                  this.setState({ tab: 'normal' })
                }}
              >
                账号登录
              </div>
              <div
                className={`the-tab moqi ${isNormalTab ? 'un-select' : ''}`}
                onClick={() => {
                  this.setState({ tab: 'moqi' })
                }}
              >
                魔启登录
              </div>
            </div>
            {isNormalTab && <WrappedNormalLoginForm />}
            {!isNormalTab && (
              <div className="the-moqi-content">
                <div className="the-img" />
                <div
                  className="the-btn"
                  onClick={() => {
                    window.location.href = 'http://120.77.254.223:10003/'
                  }}
                >
                  前往魔启登录
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
