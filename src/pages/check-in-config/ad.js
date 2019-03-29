// 签到页图片设置
import React from 'react'
import { Input, Button, Form, Upload, message, Icon } from 'antd'
import headImgExample from '../../img/checkin-head-example.png'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 14
  }
}
export default class Ads extends React.Component {
  state = {
    name: '名称',
    desc: '描述',
    imageUrl: headImgExample
  }
  componentDidMount() {
    // TODO 获取初始信息
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      )
    }
  }
  render() {
    const { name, desc, imageUrl } = this.state
    return (
      <div className="ads">
        <div className="left" />
        <div className="right">
          <div className="header">
            <Form {...formItemLayout}>
              <Form.Item label="页面名称">
                <Input
                  defaultValue={name}
                  onChange={name => {
                    this.setState({ name })
                  }}
                />
              </Form.Item>
              <Form.Item label="页面描述">
                <Input.TextArea
                  defaultValue={desc}
                  onChange={desc => {
                    this.setState({ desc })
                  }}
                />
              </Form.Item>
            </Form>
          </div>
          <div className="head-img">
            <Form {...formItemLayout}>
              <Form.Item label="页面头部">
                <img src={imageUrl} alt="preview" className="preview" />
                <br />
                <Button onClick={this.reset} type="primary">
                  重置
                </Button>
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  <Button type="primary" style={{ margin: '0 1rem' }}>
                    <Icon type="upload" /> 替换
                  </Button>
                </Upload>
                <span className="tip1">建议尺寸：660*275</span>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Button onClick={this.submitBasic} className="save" type="primary">
          保存
        </Button>
      </div>
    )
  }
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('只能上传 JPG 文件')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('文件大小不要超过 2MB')
  }
  return isJPG && isLt2M
}

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
