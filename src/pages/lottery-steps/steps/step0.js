// 选中公众号
import React from 'react'
import axios from '../../../utils/axios'
import history from '../../../utils/history'
import publicIcon from '../../../img/public-icon.png'

export default class ChoosePublic extends React.Component {
  state = {
    publicList: [
      { WxPublicName: 'A', ActiveState: 'activated', WxImg: publicIcon },
      { WxPublicName: 'B', ActiveState: 'activated1', WxImg: publicIcon },
      { WxPublicName: 'C', ActiveState: 'activated', WxImg: publicIcon },
      { WxPublicName: 'D', ActiveState: 'activated1', WxImg: publicIcon }
    ]
  }

  getPublics = uid => {
    //  获取公众号列表，带上用户标识参数
    const accountId = localStorage.getItem('accountId')
    axios
      .get('/api/Active_LuckDraw/WxSignListAsync', {
        params: {
          'param.plantFrom': accountId
        }
      })
      .then(publicList => {
        if (publicList) this.setState({ publicList })
      })
  }
  clickPublic = WxSeetingId => {
    // 点击跳转url，并带上参数 id
    history.push(`/lottery-steps?step=1&WxSeetingId=${WxSeetingId}`)
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid')
    this.getPublics(uid)
  }

  render() {
    const publicList = this.state.publicList.map((ele, i) => {
      const { WxPublicName, WxImg, WxSeetingId } = ele
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
        </div>
      )
    })
    return (
      <div className="step0">
        <div className="tips">请选择要创建幸运大抽奖的公众号</div>
        <div className="publicList">{publicList}</div>
      </div>
    )
  }
}
