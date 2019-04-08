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
import qs from 'qs'
import assembleParams from '../../../utils/assemble-params'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: {
    span: 4
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
      // TODO 提交数据，成功后跳转下一步 step2
      if (!errors) {
        values['startTime'] = values['range-time-picker'][0].format(
          'YYYY-MM-DD HH:mm:ss'
        )
        values['endTime'] = values['range-time-picker'][1].format(
          'YYYY-MM-DD HH:mm:ss'
        )
        // 删除无用参数
        delete values['range-time-picker']
        // if(){}
        const urlParam = assembleParams(values)
        console.log(urlParam)
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
          <Form.Item label="免费参与次数">
            {getFieldDecorator('freeType', {
              initialValue: FreeType
            })(
              <Radio.Group>
                <Radio value={1}>一人一次</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="">
            {getFieldDecorator('checkedCostIntegral', {
              initialValue: !!CostIntegral || CostIntegral === 0
            })(<Checkbox />)}
          </Form.Item>
          <Form.Item label="消耗积分">
            {getFieldDecorator('costIntegral', {
              initialValue: CostIntegral
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item>
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
