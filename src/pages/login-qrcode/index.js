import React from 'react'
// import PropTypes from 'prop-types'
// import axios from '../../utils/axios'
import './style.less'
import { Icon } from 'antd'

export default class Login extends React.Component {
  state = {
    status: 'fail', //init-初始化显示二维码
    QRCodeUrl: ''
  }
  componentDidMount() {
    // TODO 获取二维码
    // TODO 开 websocket 监听登录状态
  }
  successOrFail = status => (
    <div className="success-or-fail">
      <span className={status} />
      <p className="text">
        {status === 'success' ? '登录中…' : '二维码已失效'}
      </p>
    </div>
  )

  refreshQR = () => {
    // TODO 重新获取二维码
  }
  render() {
    const { status, QRCodeUrl } = this.state
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
            <div className="scan">扫码登录</div>
            <p className="tips">使用金钻客APP扫码登录</p>
            {status === 'init' ? (
              <img src={QRCodeUrl} className="qr-code" alt="qrcode" />
            ) : (
              this.successOrFail(status)
            )}
            <div className="refresh" onClick={this.refreshQR}>
              <Icon type="reload" />
              <span className="text">刷新</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
