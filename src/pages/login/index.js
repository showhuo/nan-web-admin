import React from 'react'
// import PropTypes from 'prop-types'
// import axios from '../../utils/axios'

export default class Login extends React.Component {
  state = {
    status: 'init', //init-初始化显示二维码
    QRCodeUrl: ''
  }
  componentDidMount() {
    // TODO 获取二维码
    // TODO 开 websocket 监听登录状态
  }
  render() {
    // const { status, QRCodeUrl } = this.state
    return (
      <div className="login">
        <div className="header" />
        <div className="body">
          <div className="content">
            <div className="text">
              <p>扫码登录</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
