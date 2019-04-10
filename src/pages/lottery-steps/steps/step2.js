// 设置奖品
import React from 'react'
import PropTypes from 'prop-types'
import axios from '../../../utils/axios'
import history from '../../../utils/history'
import imgurl from '../../../img/lottery-example.png'
import {
  Form,
  Input,
  DatePicker,
  Radio,
  InputNumber,
  Checkbox,
  Button,
  Row,
  Col,
  Tabs
} from 'antd'
import assembleParams from '../../../utils/assemble-params'
import getUrlParam from '../../../utils/qs'
import _ from 'lodash'

const { TabPane } = Tabs

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class Step2 extends React.Component {
  static propTypes = {
    luckDrawId: PropTypes.number.isRequired,
    details: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    changeStep: PropTypes.func.isRequired,
    // 改变百分比
    changeNoPercent: PropTypes.func.isRequired,
    // 设置奖品
    changePrize: PropTypes.func.isRequired
  }

  // 动态计算百分比
  calculateNoPercent = () => {
    this.props.form.validateFields(
      ['firstPercent', 'secondPercent', 'thirdPercent'],
      (errors, values) => {
        if (!errors) {
          console.log(values)
          this.props.changeNoPercent(values)
        }
      }
    )
  }

  // 奖品设置
  // TODO TabPane切换时，需要保存当前 tab 的数据，存储到上一级
  setPrize = obj => {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <Form.Item label="">
          {getFieldDecorator('checkedCostIntegral', {
            initialValue: true
          })(<Checkbox>积分奖品</Checkbox>)}
        </Form.Item>
        <Form.Item label="积分数量">
          {getFieldDecorator('prizeValue', {
            initialValue: obj.PrizeValue
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item label="奖品总数">
          {getFieldDecorator('prizeNumber', {
            initialValue: obj.Number
          })(<InputNumber />)}
        </Form.Item>
      </>
    )
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        // 调整必要参数
        const accountId = localStorage.getItem('accountId')
        values['accountId'] = accountId
        values['luckDrawId'] = this.props.luckDrawId
        values['prizeList'] = []
        const urlParam = assembleParams(values)
        console.log(urlParam)

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
      <div className="step1">
        <p className="lottery-img-title">示意图</p>
        <img src={imgurl} alt="lottery" className="lottery-img" />
        <Form {...formItemLayout} onSubmit={this.onSubmit} className="the-form">
          <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>
            ---------------------- 中奖概率 ----------------------
          </p>
          <Row>
            <Col span={12}>
              <Form.Item label="一等奖">
                {getFieldDecorator('firstPercent', {
                  initialValue: firstObj.Percent || 10
                })(
                  <InputNumber
                    required
                    min={0}
                    onChange={this.calculateNoPercent}
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
                    onChange={this.calculateNoPercent}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="三等奖">
                {getFieldDecorator('thirdPercent', {
                  initialValue: thirdObj.Percent || 30
                })(
                  <InputNumber
                    required
                    min={0}
                    onChange={this.calculateNoPercent}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="未中奖">{fourthObj.Percent || 40}%</Form.Item>
            </Col>
          </Row>

          <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>
            ------------------- 设置奖品 -------------------
          </p>

          <Tabs defaultActiveKey="1">
            <TabPane tab="一等奖" key="1">
              {this.setPrize(firstObj)}
            </TabPane>
            <TabPane tab="二等奖" key="2">
              {this.setPrize(firstObj)}
            </TabPane>
            <TabPane tab="三等奖" key="3">
              {this.setPrize(firstObj)}
            </TabPane>
          </Tabs>

          <Form.Item wrapperCol={{ offset: 6 }}>
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
