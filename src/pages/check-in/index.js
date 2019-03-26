import React from 'react'
import { Layout } from 'antd'
import './style.less'

const { Content } = Layout

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    publics: []
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  getPublics = uid => {
    //  TODO 获取公众号列表
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid')
    this.getPublics(uid)
  }

  render() {
    const publicList = this.state.publics.map((ele, i) => {
      // TODO 根据 publics 数据格式构造
      const { status, name, url } = ele
      const isActivated = status === 'activated'
      return (
        <div className="public">
          <img src={url} alt="img" className="logo" />
          <p>{name}</p>
          {isActivated && <span className="activated-icon" />}
        </div>
      )
    })
    return (
      <Content style={{ margin: '16px' }}>
        <div className="tips">请选择要设置签到日历的公众号</div>
        <div className="publicList">{publicList}</div>
      </Content>
    )
  }
}
