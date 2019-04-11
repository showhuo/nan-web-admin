// 设置规则
import React from 'react'
import PropTypes from 'prop-types'
import axios from '../../../utils/axios'
import imgurl from '../../../img/lottery-example.png'
import { Form, Input, Button, message } from 'antd'
import assembleParams from '../../../utils/assemble-params'
import copyTextToClipboard from '../../../utils/copy-to-clipboard'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 15
  }
}

class Step4 extends React.Component {
  static propTypes = {
    luckDrawId: PropTypes.number.isRequired,
    details: PropTypes.object.isRequired,
    changeStep: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  // 发布
  onSubmit = e => {
    const newObj = {}
    const accountId = localStorage.getItem('accountId')
    newObj.accountId = accountId
    newObj.luckDrawId = this.props.luckDrawId
    const urlParam = assembleParams(newObj)
    axios
      .post(`/api/Active_LuckDraw/ReleaseDrawAsync?${urlParam}`)
      .then(res => {
        if (res) {
          message.success('发布成功')
        }
      })
  }
  // TODO 保存
  save = () => {}

  render() {
    const { details = {}, form } = this.props
    // const { getFieldDecorator } = form
    const { LinkUrl, QrcodeUrl } = details
    return (
      <div className="step4">
        <p className="lottery-img-title">示意图</p>
        <img src={imgurl} alt="lottery" className="lottery-img" />
        <Form {...formItemLayout} className="the-form">
          <Form.Item label="链接地址" style={{ marginTop: '2rem' }}>
            <Input value={LinkUrl} style={{ width: '80%' }} />
            <Button
              type="primary"
              onClick={() => {
                copyTextToClipboard(LinkUrl)
              }}
            >
              复制
            </Button>
          </Form.Item>
          <span
            className="the-tips"
            style={{ position: 'absolute', left: '15rem', top: '6rem' }}
          >
            直接复制该链接给您的粉丝
          </span>
          <Form.Item label="二维码">
            <img
              src={QrcodeUrl}
              style={{ width: '16rem', height: '16rem' }}
              alt="qrcode"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <span
              className="the-tips"
              style={{ display: 'inline-block', width: '23rem' }}
            >
              您也可以微信扫一扫打开链接，然后 分享给您的粉丝目前仅通过点击被人
              分享的链接进入，请尽快分享出
            </span>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <a href={QrcodeUrl}>下载</a>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button onClick={this.onSubmit} type="primary">
              发布
            </Button>
            <Button onClick={this.save} style={{ marginLeft: '2rem' }}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Step4)
