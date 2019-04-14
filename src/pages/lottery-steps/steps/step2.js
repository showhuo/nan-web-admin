// 设置奖品
import React from 'react'
import PropTypes from 'prop-types'
import axios from '../../../utils/axios'
import imgurl from '../../../img/lottery-example.png'
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Row,
  Col,
  Tabs
} from 'antd'
import assembleParams from '../../../utils/assemble-params'
import _ from 'lodash'
import getUrlParam from '../../../utils/qs'

const { TabPane } = Tabs

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 15
  }
}

class Step2 extends React.Component {
  static propTypes = {
    luckDrawId: PropTypes.number.isRequired,
    details: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    changeStep: PropTypes.func.isRequired,
    refetchDetails: PropTypes.func.isRequired
  }
  state = {
    // 未中奖概率由 state 接管
    noPercent: 40
  }

  componentDidMount() {
    const { details = {} } = this.props
    const { Prize = [] } = details
    const fourthObj = _.find(Prize, { LevelName: '未中奖' }) || {}
    const noPercent = fourthObj.Percent
    if (noPercent) this.setState({ noPercent })
  }

  // 动态计算百分比
  calculateNoPercent = () => {
    this.props.form.validateFields(
      ['firstPercent', 'secondPercent', 'thirdPercent'],
      (errors, values) => {
        if (!errors) {
          console.log(values)
          const noPercent =
            100 -
            values.firstPercent -
            values.secondPercent -
            values.thirdPercent
          this.setState({ noPercent })
        }
      }
    )
  }

  // 奖品设置，赋予不同的 key，不需要存储
  setPrize = (obj, k) => {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <Form.Item label="奖品类型">
          {getFieldDecorator('checkedCostIntegral' + k)(
            <Checkbox checked>积分奖品</Checkbox>
          )}
        </Form.Item>
        <Form.Item label="积分数量">
          {getFieldDecorator('prizeValue' + k, {
            initialValue: obj.PrizeValue
          })(<InputNumber min={0} />)}
        </Form.Item>
        <Form.Item label="奖品总数">
          {getFieldDecorator('prizeNumber' + k, {
            initialValue: obj.Number
          })(<InputNumber min={0} />)}
        </Form.Item>
      </>
    )
  }

  // 上一步
  goBack = () => {
    this.props.refetchDetails().then(() => {
      this.props.changeStep(1)
    })
  }
  // 下一步
  onSubmit = e => {
    e.preventDefault()
    // 查看只跳转，不请求
    const readonly = !!getUrlParam().readonly
    if (readonly) {
      this.props.changeStep(3)
      return
    }
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const newObj = {}
        const accountId = localStorage.getItem('accountId')
        newObj['accountId'] = accountId
        newObj['luckDrawId'] = this.props.luckDrawId
        // 从 values 取出必要数据构造 prizeList
        const {
          firstPercent,
          secondPercent,
          thirdPercent,
          prizeValue1,
          prizeValue2,
          prizeValue3,
          prizeNumber1,
          prizeNumber2,
          prizeNumber3,
          comment
        } = values
        const firstObj = {
          Level: 1,
          LevelName: '一等奖',
          Percent: firstPercent,
          Type: 1,
          PrizeValue: prizeValue1,
          Number: prizeNumber1
        }
        const secondObj = {
          Level: 2,
          LevelName: '二等奖',
          Percent: secondPercent,
          Type: 1,
          PrizeValue: prizeValue2,
          Number: prizeNumber2
        }
        const thirdObj = {
          Level: 3,
          LevelName: '三等奖',
          Percent: thirdPercent,
          Type: 1,
          PrizeValue: prizeValue3,
          Number: prizeNumber3
        }
        newObj.prizeList = JSON.stringify([firstObj, secondObj, thirdObj])
        newObj.comment = comment
        console.log(newObj)

        const urlParam = assembleParams(newObj)

        axios
          .post(`/api/Active_LuckDraw/SetDrawPrizeAsync?${urlParam}`)
          .then(res => {
            if (res) {
              this.props.changeStep(3)
            }
          })
      }
    })
  }

  render() {
    const { details = {}, form } = this.props
    const { getFieldDecorator } = form
    const { Prize = [] } = details
    const firstObj = _.find(Prize, { LevelName: '一等奖' }) || {}
    const secondObj = _.find(Prize, { LevelName: '二等奖' }) || {}
    const thirdObj = _.find(Prize, { LevelName: '三等奖' }) || {}
    const fourthObj = _.find(Prize, { LevelName: '未中奖' }) || {}
    return (
      <div className="step2">
        <p className="lottery-img-title">示意图</p>
        <img src={imgurl} alt="lottery" className="lottery-img" />
        <Form {...formItemLayout} onSubmit={this.onSubmit} className="the-form">
          <TheLine text="中奖概率" />
          <Row>
            <Col span={12}>
              <Form.Item label="一等奖" style={{ marginLeft: '0.5rem' }}>
                {getFieldDecorator('firstPercent', {
                  initialValue: firstObj.Percent || 10
                })(
                  <InputNumber
                    required
                    min={0}
                    max={100}
                    onBlur={this.calculateNoPercent}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="二等奖">
                {getFieldDecorator('secondPercent', {
                  initialValue: secondObj.Percent || 20
                })(
                  <InputNumber
                    required
                    min={0}
                    max={100}
                    onBlur={this.calculateNoPercent}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="三等奖" style={{ marginLeft: '0.5rem' }}>
                {getFieldDecorator('thirdPercent', {
                  initialValue: thirdObj.Percent || 30
                })(
                  <InputNumber
                    required
                    min={0}
                    max={100}
                    onBlur={this.calculateNoPercent}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="未中奖">{this.state.noPercent}%</Form.Item>
            </Col>
          </Row>

          <TheLine text="设置奖品" />

          <Tabs defaultActiveKey="1" style={{ marginLeft: '0.2rem' }}>
            <TabPane tab="一等奖" key="1">
              {this.setPrize(firstObj, 1)}
            </TabPane>
            <TabPane tab="二等奖" key="2">
              {this.setPrize(secondObj, 2)}
            </TabPane>
            <TabPane tab="三等奖" key="3">
              {this.setPrize(thirdObj, 3)}
            </TabPane>
          </Tabs>

          <TheLine text="其他" />

          <Form.Item label="未中奖鼓励">
            {getFieldDecorator('comment', {
              initialValue: fourthObj.Comment || ''
            })(<Input.TextArea style={{ width: '4rem', height: '0.7rem' }} />)}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5 }}>
            <Button htmlType="submit" type="primary">
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Step2)

// 带横线的标题
function TheLine({ text }) {
  return (
    <div
      style={{ textAlign: 'center', margin: '0.3rem auto', lineHeight: '1' }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '2rem',
          height: '0.01rem',
          background: 'rgba(153,153,153,1)',
          verticalAlign: 'super'
        }}
      />
      <span style={{ margin: '0.3rem' }}>{text}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2rem',
          height: '0.01rem',
          background: 'rgba(153,153,153,1)',
          verticalAlign: 'super'
        }}
      />
    </div>
  )
}
