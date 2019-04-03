import React from 'react'
import { Layout } from 'antd'
import axios from '../../utils/axios'
import history from '../../utils/history'
import './style.less'
import publicIcon from '../../img/public-icon.png'

const { Content } = Layout

export default class SiderDemo extends React.Component {
  state = {
    publicList: [
      { WxPublicName: 'A', ActiveState: 'activated', WxImg: publicIcon },
      { WxPublicName: 'B', ActiveState: 'activated1', WxImg: publicIcon },
      { WxPublicName: 'C', ActiveState: 'activated', WxImg: publicIcon },
      { WxPublicName: 'D', ActiveState: 'activated1', WxImg: publicIcon }
    ]
  }

  getPublics = uid => {
    //  TODO 获取公众号列表，应该需要带上用户标识参数
    axios.get('/api/Active_SignIn/WxSignListAsync').then(publicList => {
      if (publicList) this.setState({ publicList })
    })
  }
  clickPublic = WxSeetingId => {
    // 点击跳转url，并带上参数 id
    history.push(`/check-in-config?WxSeetingId=${WxSeetingId}`)
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid')
    this.getPublics(uid)
  }

  render() {
    const publicList = this.state.publicList.map((ele, i) => {
      // 根据 publicList 数据格式构造
      const { ActiveState, WxPublicName, WxImg, WxSeetingId } = ele
      const isActivated = !!ActiveState
      return (
        <div
          className="public"
          key={i}
          onClick={() => {
            this.clickPublic(WxSeetingId)
          }}
        >
          <img src={WxImg} alt="img" className="logo" />
          <p>{WxPublicName}</p>
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
