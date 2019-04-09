// 创建活动
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
  Button
} from 'antd'
import assembleParams from '../../../utils/assemble-params'
import getUrlParam from '../../../utils/qs'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class Step1 extends React.Component {
  static propTypes = {
    details: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired
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
    const { ActiveName, Comment, FreeType, CostIntegral } = details
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
            ---------------------- 活动概要 ----------------------
          </p>
          <Form.Item label="活动名称">
            {getFieldDecorator('activeName', {
              initialValue: ActiveName
            })(<Input required />)}
          </Form.Item>
          <Form.Item label="活动时间">
            {getFieldDecorator('range-time-picker', rangeConfig)(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
          <Form.Item label="活动说明">
            {getFieldDecorator('comment', {
              initialValue: Comment
            })(<Input.TextArea />)}
          </Form.Item>
          <p
            className="the-tips"
            style={{ display: 'inline-block', margin: '-4rem 3rem 3rem 15rem' }}
          >
            用户通过微信分享给朋友时，会自动显示页面描述
          </p>
          <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>
            ------------------- 用户参与设置 -------------------
          </p>
          <Form.Item label="免费参与次数">
            {getFieldDecorator('freeType', {
              initialValue: FreeType
            })(
              <Radio.Group>
                <Radio value={1}>一人一次</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="允许使用积分">
            {getFieldDecorator('checkedCostIntegral', {
              initialValue: !!CostIntegral || CostIntegral === 0
            })(<Checkbox />)}
          </Form.Item>
          <Form.Item label="消耗积分">
            {getFieldDecorator('costIntegral', {
              initialValue: CostIntegral
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="温馨提示" className="the-tips">
            <span>未勾选，那么用户将无法使用积分购买抽奖机会；</span>
            <span>
              已勾选，那么用户将消耗输入框内数量的积分购买一次新的抽奖机会；
            </span>
            <span>填写为零则代表客户将可以无限抽奖（请慎重）</span>
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

export default Form.create()(Step1)
