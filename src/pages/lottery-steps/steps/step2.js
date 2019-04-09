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
  Col
} from 'antd'
import assembleParams from '../../../utils/assemble-params'
import getUrlParam from '../../../utils/qs'
import _ from 'lodash'

const { RangePicker } = DatePicker

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
    details: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    changeNoPercent: PropTypes.func.isRequired
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        // 调整必要参数
        const wxSeetingId = getUrlParam()['wxSeetingId']
        const accountId = localStorage.getItem('accountId')
        values['startTime'] = values['range-time-picker'][0].format(
          'YYYY-MM-DD HH:mm:ss'
        )
        values['endTime'] = values['range-time-picker'][1].format(
          'YYYY-MM-DD HH:mm:ss'
        )
        values['wxSeetingId'] = wxSeetingId
        values['accountId'] = accountId
        values['freeType'] = 1
        // 删除无用参数
        delete values['range-time-picker']
        if (!values['checkedCostIntegral']) {
          delete values['costIntegral']
        }
        const urlParam = assembleParams(values)
        console.log(urlParam)
        // 提交数据，成功后会返回活动id，带上跳转下一步 step2
        axios
          .post(`/api/Active_LuckDraw/AddDrawInfoAsync?${urlParam}`)
          .then(res => {
            if (res) {
              history.push(`/lottery-steps?step=2&luckDrawId=${res.LuckDrawId}`)
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

    const rangeConfig = {
      initialValue: []
      // rules: [{ type: 'array', required: true, message: 'Please select time!' }]
    }
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
                  initialValue: firstObj.Percent
                })(<Input required />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="二等奖">
                {getFieldDecorator('secondPercent', {
                  initialValue: secondObj.Percent
                })(<Input required />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="三等奖">
                {getFieldDecorator('thirdPercent', {
                  initialValue: thirdObj.Percent
                })(<Input required />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="未中奖">{fourthObj.Percent}</Form.Item>
            </Col>
          </Row>

          <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>
            ------------------- 设置奖品 -------------------
          </p>

          <Form.Item label="">
            {getFieldDecorator('checkedCostIntegral', {
              initialValue: true
            })(<Checkbox>积分奖品</Checkbox>)}
          </Form.Item>
          <Form.Item label="积分数量">
            {getFieldDecorator('prizeValue', {
              initialValue: firstObj.PrizeValue
            })(<InputNumber />)}
          </Form.Item>

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
