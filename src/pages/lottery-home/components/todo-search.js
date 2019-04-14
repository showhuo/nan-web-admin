import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, DatePicker, Select, Input } from 'antd'
import history from '../../../utils/history'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { RangePicker } = DatePicker
const drawActiveStateArr = [
  { label: '全部', value: '' },
  { label: '已结束', value: 1 },
  { label: '未发布', value: 2 },
  { label: '未开始', value: 3 },
  { label: '进行中', value: 4 }
]

class UserSearch extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    query: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    publicArr: PropTypes.array.isRequired
  }

  render() {
    const { form, loading } = this.props
    let { publicArr = [] } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    }

    return (
      <Form onSubmit={this.onSubmit} {...formItemLayout}>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="起止时间">
              {getFieldDecorator('time')(<RangePicker />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              {getFieldDecorator('drawActiveState', { initialValue: '' })(
                <Select>
                  {drawActiveStateArr.map((item, index) => (
                    <Select.Option key={index} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="公众号">
              {getFieldDecorator('wxSeetingId', { initialValue: '' })(
                <Select>
                  {publicArr
                    .concat({ WxPublicName: '全部', WxSeetingId: '' })
                    .map((item, index) => (
                      <Select.Option key={index} value={item.WxSeetingId}>
                        {item.WxPublicName}
                      </Select.Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8} className="actions">
          <Col span={8}>
            <Form.Item label="关键词">
              {getFieldDecorator('keyWord')(<Input />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item wrapperCol={{ offset: 6 }}>
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
                style={{ marginLeft: '.2rem' }}
              >
                重置
              </Button>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button type="primary" onClick={this.createNewLottery}>
                创建新的幸运大抽奖
              </Button>
            </Form.Item>
          </Col>
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
          params['beginTime'] = timeArr[0].format('YYYY-MM-DD')
          params['endTime'] = timeArr[1].format('YYYY-MM-DD')
          delete params['time']
        }
        // 格式化 params
        const newObj = {}
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            newObj['param.' + key] = params[key]
          }
        }
        query(newObj)
      }
    })
  }
  createNewLottery = () => {
    history.push('/lottery-steps?step=0')
  }
}

export default Form.create()(UserSearch)
