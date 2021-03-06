// 选中公众号
import React from 'react'
import axios from '../../../utils/axios'

import PropTypes from 'prop-types'

export default class ChoosePublic extends React.Component {
  static propTypes = {
    changeStep: PropTypes.func.isRequired,
    saveTempWxSeetingId: PropTypes.func.isRequired
  }
  state = {
    publicList: []
  }

  getPublics = () => {
    //  获取公众号列表，带上用户标识参数
    const platFormId = localStorage.getItem('platFormId')
    axios
      .get('/api/Active_LuckDraw/WxSignListAsync', {
        params: {
          'param.plantFrom': platFormId
        }
      })
      .then(publicList => {
        if (publicList) this.setState({ publicList })
      })
  }
  clickPublic = wxSeetingId => {
    // 切换 step 视图，暂存 id 给下一步使用
    this.props.changeStep(1)
    if (wxSeetingId) this.props.saveTempWxSeetingId(wxSeetingId)
  }

  componentDidMount() {
    this.getPublics()
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
