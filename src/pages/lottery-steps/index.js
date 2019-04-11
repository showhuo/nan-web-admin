import React from 'react'
import { Layout, Steps } from 'antd'
import axios from '../../utils/axios'
// import history from '../../utils/history'
import getUrlParams from '../../utils/qs'
import qs from 'qs'
import Step0 from './steps/Step0'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import './style.less'
import Step4 from './steps/Step4'

const { Content } = Layout
const { Step } = Steps

// 该组件较复杂，step 所需参数一般依赖上一步
// 编辑或查看，由 url 携带初始参数进入 step1
// 其余的由该组件 state 管理
// Step0 具有一定的独立性
// Step1 区分编辑和创建接口，Step2 之后不区分
// TODO 所有的上一步按钮，重新请求 detail 接口数据，成功再跳 step
export default class Lottery extends React.Component {
  state = {
    step: 0,
    // 创建 step1 需要使用
    wxSeetingId: 1,
    // step2 之后需要使用，编辑由 url 带入初始化，新建则由 step1 之后设置
    luckDrawId: 1,
    details: {}
  }

  componentDidMount() {
    // 前后 step 跳转通过 state 管理，history 只是为了初步判断编辑或创建
    const urlParamObj = getUrlParams()
    const { step, luckDrawId, accountId } = urlParamObj
    // url step 为 1 说明来自编辑或查看按钮，此时 Step1 的按钮走的是更新接口
    if (step === '1') {
      this.setState({ step: 1, luckDrawId })
      // 尝试获取活动信息
      const urlParam = qs.stringify({
        'param.luckDrawId': luckDrawId,
        'param.accountId': accountId
      })
      axios
        .get(`/api/Active_LuckDraw/GetDrawDetailAsync?${urlParam}`)
        .then(res => {
          if (res) {
            this.setState({ details: res })
          }
        })
    } else {
      // TODO 调试用，正式需要设为 0
      this.setState({ step: 4 })
    }
  }
  changeStep = step => {
    this.setState({ step })
  }
  // step0 暂存 wxid
  saveTempWxSeetingId = wxSeetingId => {
    this.setState({ wxSeetingId })
  }
  // 暂存活动 id 给 step2 之后使用
  saveLuckDrawId = luckDrawId => {
    this.setState({ luckDrawId })
  }
  // TODO 计算未中奖概率
  // changeNoPercent = obj => {}
  // TODO 奖品设置存储
  // changePrize = obj => {}
  getComponentMap = step => {
    const { details, wxSeetingId, luckDrawId } = this.state
    const map = {
      '0': (
        <Step0
          changeStep={this.changeStep}
          saveTempWxSeetingId={this.saveTempWxSeetingId}
        />
      ),
      '1': (
        <Step1
          wxSeetingId={wxSeetingId}
          details={details}
          changeStep={this.changeStep}
          saveLuckDrawId={this.saveLuckDrawId}
        />
      ),
      '2': (
        <Step2
          luckDrawId={luckDrawId}
          details={details}
          changeStep={this.changeStep}
        />
      ),
      '3': (
        <Step3
          luckDrawId={luckDrawId}
          details={details}
          changeStep={this.changeStep}
        />
      ),
      '4': (
        <Step4
          luckDrawId={luckDrawId}
          details={details}
          changeStep={this.changeStep}
        />
      )
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
