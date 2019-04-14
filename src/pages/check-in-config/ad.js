// 签到页图片设置
import React from 'react'
import { Input, Button, Form, Upload, message, Icon } from 'antd'
// import headImgExample from '../../img/checkin-head-example.png'
import axios from '../../utils/axios'
import PropTypes from 'prop-types'
import qs from 'qs'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 14
  }
}
const headImgExample =
  'http://jzkeyp.oss-cn-beijing.aliyuncs.com/WeiLiao/Active/SignIn/20190325/SignInBanner20190325145734576.jpg'
export default class Ads extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  state = {
    Id: '1',
    ActiveName: '名称',
    Describe: '描述',
    ActiveImg: headImgExample
  }
  componentDidMount() {
    const {
      Id,
      ActiveName,
      Describe,
      ActiveImg = headImgExample,
      ActiveImgDefault
    } = this.props.data || {}
    this.setState({ Id, ActiveName, Describe, ActiveImg, ActiveImgDefault })
  }

  beforeUpload = file => {
    // const isJPG = file.type === 'image/jpeg'
    // if (!isJPG) {
    //   message.error('只能上传 JPG 文件')
    //   return false
    // }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('文件大小不要超过 2MB')
      return false
    }
    getBase64(file, ActiveImg =>
      this.setState({
        ActiveImg
      })
    )
    return false
  }

  submitAd = () => {
    const { Id, ActiveName, Describe, ActiveImg } = this.state
    const urlParam = qs.stringify({
      'param.id': Id,
      'param.activeName': ActiveName,
      'param.describe': Describe,
      // 'param.activeImg': ActiveImg,
      'param.accountId': localStorage.getItem('accountId')
    })
    axios
      .post(`/api/Active_SignIn/UpdatePageInfoAsync?${urlParam}`, {
        ActiveImg
      })
      .then(res => {
        if (res) message.success('保存成功')
      })
  }
  // 重置图片
  reset = () => {
    this.setState({ ActiveImg: this.state.ActiveImgDefault })
  }
  render() {
    const { ActiveName, Describe, ActiveImg } = this.state
    return (
      <div className="ads">
        <div className="left" />
        <div className="right">
          <div className="header">
            <Form {...formItemLayout}>
              <Form.Item label="页面名称">
                <Input
                  value={ActiveName}
                  onChange={e => {
                    this.setState({ ActiveName: e.target.value })
                  }}
                />
              </Form.Item>
              <Form.Item label="页面描述">
                <Input.TextArea
                  value={Describe}
                  onChange={e => {
                    this.setState({ Describe: e.target.value })
                  }}
                />
              </Form.Item>
            </Form>
          </div>
          <div className="head-img">
            <Form {...formItemLayout}>
              <Form.Item label="页面头部">
                <img src={ActiveImg} alt="preview" className="preview" />
                <br />
                <Button onClick={this.reset} type="primary">
                  重置
                </Button>
                <Upload showUploadList={false} beforeUpload={this.beforeUpload}>
                  <Button type="primary" style={{ margin: '0 1rem' }}>
                    <Icon type="upload" /> 替换
                  </Button>
                </Upload>
                <span className="tip1">建议尺寸：660*275</span>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Button onClick={this.submitAd} className="save" type="primary">
          保存
        </Button>
      </div>
    )
  }
}

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
