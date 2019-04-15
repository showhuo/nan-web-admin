// 设置规则
import React from 'react'
import PropTypes from 'prop-types'
import axios from '../../../utils/axios'
import imgurl from '../../../img/lottery-example.png'
import { Form, Input, Button } from 'antd'
import assembleParams from '../../../utils/assemble-params'
import getUrlParam from '../../../utils/qs'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 15
  }
}
const defaultComment = `1、每人每天开局有1次免费的抽奖机会
2、转盘分为10份，分别对应
1、一等奖，奖品：积分500
2、二等奖，奖品：积分300
3、三等奖，奖品：积分200
3、用户可以花积分购买抽奖机会，200积分一次，次数无
限
4、抽奖结果以当次抽奖结束后显示的窗口内容为准
温馨提示：如果页面为及时显示您的免费机会，请尝试退
出活动页面在重新进来哦。
本活动解释权归浙江金涛珠宝首饰有限公司所有
`

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
    // 查看只跳转，不请求
    const readonly = !!getUrlParam().readonly
    if (readonly) {
      this.props.changeStep(4)
      return
    }
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
          <Form.Item label="活动规则说明" style={{ marginTop: '0.2rem' }}>
            {getFieldDecorator('roleComment', {
              initialValue: RoleComment || defaultComment
            })(
              <Input.TextArea style={{ width: '4.2rem', height: '2.8rem' }} />
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button onClick={this.goBack} style={{ marginRight: '0.2rem' }}>
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
