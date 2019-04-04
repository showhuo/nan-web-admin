import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, DatePicker, Select, Input } from 'antd'

const { RangePicker } = DatePicker
const drawActiveStateArr = [
  { label: '未发布', value: 0 },
  { label: '未开始', value: 1 },
  { label: '进行中', value: 2 },
  { label: '已结束', value: 3 }
]

class UserSearch extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    query: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    publicArr: PropTypes.array.isRequired
  }

  render() {
    const { form, loading, publicArr = [] } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }

    return (
      <Form onSubmit={this.onSubmit}>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="起止时间" {...formItemLayout}>
              {getFieldDecorator('time')(<RangePicker />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态" {...formItemLayout}>
              {getFieldDecorator('param.drawActiveState', { initialValue: '' })(
                <Select>
                  {drawActiveStateArr.map((item, index) => (
                    <Select.Option key={index} value={item.value.toString()}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="public" {...formItemLayout}>
              {getFieldDecorator('param.wxSeetingId', { initialValue: '' })(
                <Select>
                  {publicArr.map((item, index) => (
                    <Select.Option key={index} value={item.value.toString()}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8} className="actions">
          <Col span={8}>
            <Form.Item label="关键词" {...formItemLayout}>
              {getFieldDecorator('param.keyWord')(<Input />)}
            </Form.Item>
          </Col>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button
              type="primary"
              icon="search"
              loading={loading}
              htmlType="submit"
            >
              查询
            </Button>

            <Button
              type="default"
              icon="reload"
              onClick={() => form.resetFields()}
            >
              重置
            </Button>
          </Form.Item>
        </Row>
      </Form>
    )
  }

  // 提交查询
  onSubmit = e => {
    e.preventDefault()
    const { form, query } = this.props

    form.validateFields((errors, params) => {
      if (!errors) {
        // 对日期区间进行格式化，适配接口要求
        const timeArr = params['time']
        if (timeArr) {
          params['param.beginTime'] = timeArr[0]
          params['param.endTime'] = timeArr[1]
          delete params['time']
        }

        query(params)
      }
    })
  }
}

export default Form.create()(UserSearch)
