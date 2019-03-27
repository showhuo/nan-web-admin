import React from 'react'
import { Layout } from 'antd'
import './style.less'
import publicIcon from '../../img/public-icon.png'

const { Content } = Layout

export default class SiderDemo extends React.Component {
  state = {
    publics: [
      { name: 'A', status: 'activated', url: publicIcon },
      { name: 'B', status: 'activated1', url: publicIcon },
      { name: 'C', status: 'activated', url: publicIcon },
      { name: 'D', status: 'activated1', url: publicIcon }
    ]
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
        <div className="public" key={i}>
          <img src={url} alt="img" className="logo" />
          <p>{name}</p>
          {isActivated && <span className="activated-icon" />}
        </div>
      )
    })
    return (
      <Content
        className="check-in"
        style={{ margin: '2rem', background: '#fff', padding: 0 }}
      >
        <div className="tips">请选择要设置签到日历的公众号</div>
        <div className="publicList">{publicList}</div>
      </Content>
    )
  }
}
