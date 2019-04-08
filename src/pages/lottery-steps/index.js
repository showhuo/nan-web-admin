import React from 'react'
import { Layout, Steps } from 'antd'
import axios from '../../utils/axios'
// import history from '../../utils/history'
import getUrlParams from '../../utils/qs'
import qs from 'qs'
import Step0 from './steps/step0'
import Step1 from './steps/step1'
import './style.less'

const { Content } = Layout
const { Step } = Steps

export default class Lottery extends React.Component {
  state = {
    step: 0
  }

  componentDidMount() {
    // 检查 history.push 是否触发此函数
    console.log(window.location.search)
    const urlParamObj = getUrlParams()
    const { step = 0 } = urlParamObj
    this.setState({ step })
    // 获取活动信息
    const urlParam = qs.stringify({
      'param.luckDrawId': urlParamObj['param.luckDrawId'],
      'param.accountId': urlParamObj['param.accountId']
    })
    axios
      .get(`/api/Active_LuckDraw/GetDrawDetailAsync?${urlParam}`)
      .then(res => {
        if (res) {
          this.setState({ details: res })
        }
      })
  }

  getComponentMap = step => {
    const { details } = this.state
    const map = {
      '0': <Step0 />,
      '1': <Step1 details={details} />
    }
    return map[step]
  }

  render() {
    const { step } = this.state

    return (
      <Content
        className="lottery"
        style={{ margin: '2rem', padding: '2rem', background: '#fff' }}
      >
        <Steps size="small" current={Number(step)}>
          <Step title="选择公众号" />
          <Step title="创建活动" />
          <Step title="中奖设置" />
          <Step title="规则描述" />
          <Step title="完成" />
        </Steps>
        {this.getComponentMap(step)}
      </Content>
    )
  }
}
