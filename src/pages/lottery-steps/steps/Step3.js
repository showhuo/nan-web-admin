// 设置规则
import React from 'react'
import PropTypes from 'prop-types'
import axios from '../../../utils/axios'
import imgurl from '../../../img/lottery-example.png'
import { Form, Input, Button } from 'antd'
import assembleParams from '../../../utils/assemble-params'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 15
  }
}

class Step3 extends React.Component {
  static propTypes = {
    luckDrawId: PropTypes.number.isRequired,
    details: PropTypes.object.isRequired,
    changeStep: PropTypes.func.isRequired,
    updateDetailUrls: PropTypes.func.isRequired,
    refetchDetails: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  // 上一步
  goBack = () => {
    this.props.refetchDetails().then(() => {
      this.props.changeStep(2)
    })
  }
  // 下一步
  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        // 调整必要参数
        const newObj = {}
        const accountId = localStorage.getItem('accountId')
        newObj.accountId = accountId
        newObj.luckDrawId = this.props.luckDrawId
        newObj.roleComment = values.roleComment
        const urlParam = assembleParams(newObj)
        axios
          .post(`/api/Active_LuckDraw/SetDrawRoleAsync?${urlParam}`)
          .then(res => {
            if (res) {
              // 此接口会返回链接地址和二维码图片，下一步使用
              this.props.updateDetailUrls(res)
              this.props.changeStep(4)
            }
          })
      }
    })
  }

  render() {
    const { details = {}, form } = this.props
    const { getFieldDecorator } = form
    const { RoleComment } = details
    return (
      <div className="step3">
        <p className="lottery-img-title">示意图</p>
        <img src={imgurl} alt="lottery" className="lottery-img" />
        <Form {...formItemLayout} onSubmit={this.onSubmit} className="the-form">
          <Form.Item label="活动规则说明" style={{ marginTop: '2rem' }}>
            {getFieldDecorator('roleComment', {
              initialValue: RoleComment || ``
            })(<Input.TextArea style={{ width: '42rem', height: '28rem' }} />)}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button onClick={this.goBack} style={{ marginRight: '2rem' }}>
              上一步
            </Button>
            <Button htmlType="submit" type="primary">
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Step3)
