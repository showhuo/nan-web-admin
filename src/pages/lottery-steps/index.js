import React from 'react'
import { Layout, Steps } from 'antd'
import axios from '../../utils/axios'
import history from '../../utils/history'

const { Content } = Layout
const { Step } = Steps

export default class SiderDemo extends React.Component {
  state = {
    currentStep: 0
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid')
    this.getPublics(uid)
  }

  render() {
    const { currentStep } = this.state
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
      <Content
        className="lottery-create"
        style={{ margin: '2rem', padding: '2rem', background: '#fff' }}
      >
        <Steps size="small" current={currentStep}>
          <Step title="选择公众号" />
          <Step title="创建活动" />
          <Step title="中奖设置" />
          <Step title="规则描述" />
          <Step title="完成" />
        </Steps>
        <div className="tips">请选择要创建幸运大抽奖的公众号</div>
        <div className="publicList">{publicList}</div>
      </Content>
    )
  }
}
