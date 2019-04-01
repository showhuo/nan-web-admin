import React from 'react'
import {
  Layout,
  Switch,
  Tabs,
  Checkbox,
  InputNumber,
  Button,
  Divider,
  Table,
  Modal,
  Form
} from 'antd'
import _ from 'lodash'
import './style.less'
import Ads from './ad'
import qs from '../../utils/qs'
import axios from '../../utils/axios'
import uuid from 'uuid/v4'

const { Content } = Layout
const { TabPane } = Tabs
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 14
  }
}

export default class CheckInConfig extends React.Component {
  state = {
    ActiveState: false,
    RewardValue: null,
    IsLoopModel: false,
    CycleDay: 7,
    nowCycle: '无',
    nextCycle: '无',
    ContinuousRewardList: [
      {
        Day: 3,
        Reward: 5,
        Id: 23
      }
    ],
    IsVipPagePopUp: true,
    // 弹框相关临时变量
    modalType: 'setDayReward',
    modalDayReward: null,
    Id: null,
    modalContiDays: null,
    modalContiReward: null
  }

  componentDidMount() {
    // 获取之前的设置数据
    const WxSeetingId = qs().WxSeetingId || ''
    axios
      .get('/api/Active_SignIn/InitAsync', {
        params: { 'param.wxSeetingId': WxSeetingId }
      })
      .then(result => {
        this.setState(result)
      })
  }

  ActiveState = () => {
    this.setState({
      ActiveState: !this.state.ActiveState
    })
  }

  clickLoopCheckBox = () => {
    this.setState({ IsLoopModel: !this.state.IsLoopModel })
  }

  setLoopCycle = CycleDay => {
    this.setState({ CycleDay })
  }

  // 基本设置页内容
  basicConfig = () => {
    const {
      RewardValue,
      nowCycle,
      nextCycle,
      ContinuousRewardList,
      modalType,
      modalVisible,
      Id,
      modalContiDays,
      modalContiReward,
      modalDayReward
    } = this.state
    const isDayRewardModal = modalType === 'setDayReward'

    return (
      <div className="basic-config">
        <div className="title">
          签到模式：日历签到
          用户根据日期进行打卡，你可以设置日签奖励和连签奖励对用户的签到行为进行激励
        </div>
        <div className="unit">
          <span className="sub-title">日签奖励：</span>
          <div className="unit-right">
            <span>{RewardValue || '无'}</span>
            <span
              className="clickable"
              onClick={() => {
                this.openModal('setDayReward', { RewardValue })
              }}
            >
              {' 设置'}
            </span>
            <p className="tip1">用户每日签到可以获得的奖励</p>
          </div>
        </div>
        <div className="unit">
          <span className="sub-title">循环模式：</span>
          <div className="unit-right">
            <div className="loop-header">
              <Checkbox onChange={this.clickLoopCheckBox}>开启</Checkbox>
              <span>固定周期</span>
              <InputNumber onChange={this.setLoopCycle} size="small" />
              <span style={{ margin: '0 1rem' }}>天</span>
              <span className="tip1">
                单个周期内，每个累计/连续签到奖励只可被领取一次
              </span>
            </div>
            <p style={{ marginTop: '1.6rem' }}>
              当前周期：{nowCycle}， 下一周期：{nextCycle}
            </p>
            <p className="tip1">
              *温馨提示：开启、关闭活更改固定周期，该设置将在次日0:00生效*
            </p>
          </div>
        </div>
        <div className="unit">
          <span className="sub-title">连续奖励：</span>
          <div className="unit-right">
            <span className="tip1">
              循环模式下，超过固定周期天数的连签奖励将不向用户展示和发放,并且同一个周期内每份奖励只能领取一次
            </span>
            <Table
              size="small"
              rowKey="Id"
              columns={this.getColumns()}
              dataSource={ContinuousRewardList}
              pagination={false}
              style={{ margin: '1rem 0' }}
            />
            <p
              className="clickable"
              onClick={() => this.openModal('newContinue')}
            >
              +新增连续奖励
            </p>
          </div>
        </div>
        <div className="unit">
          <span className="sub-title">规则说明：</span>
          <div className="unit-right">
            <div className="rules">
              1.每日签到可以获得日签奖励，在单个周期内连续签到可以获得连签奖励，
              同1个周期内最多可领取1次；
              <br />
              2.每日最多可签到1次，断签则会重新计算连签天数；
              <br />
              3.活动以及奖励最终解释权归商家所有。
            </div>
          </div>
        </div>
        <div className="unit">
          <span className="sub-title">入口设置：</span>
          <div className="unit-right">
            <Checkbox onChange={this.toggleIsVipPagePopUp}>
              未签到用户每日第1次访问会员中心时自动弹出签到弹窗
            </Checkbox>
            <p className="tip1">
              取消勾选，店铺内将缺少签到入口。你也可以将签到页路径与微页面组件、公众号菜单等进行关联，让用户快捷地发现签到入口
            </p>
          </div>
        </div>
        <Button onClick={this.submitBasic} className="save" type="primary">
          保存
        </Button>
        <Modal
          title={isDayRewardModal ? '日签奖励' : '连签奖励'}
          visible={modalVisible}
          onOk={() => {
            this.handleOk(isDayRewardModal)
          }}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout}>
            {isDayRewardModal ? (
              <FormItem label="积分">
                <InputNumber
                  value={modalDayReward}
                  onChange={modalDayReward => {
                    this.setState({ modalDayReward })
                  }}
                />{' '}
                个
              </FormItem>
            ) : (
              <div>
                <FormItem label="连续签到">
                  <InputNumber
                    value={modalContiDays}
                    onChange={modalContiDays => {
                      this.setState({ modalContiDays })
                    }}
                  />{' '}
                  天
                </FormItem>
                <FormItem label="积分">
                  <InputNumber
                    value={modalContiReward}
                    onChange={modalContiReward => {
                      this.setState({ modalContiReward })
                    }}
                  />{' '}
                  个
                </FormItem>
              </div>
            )}
          </Form>
        </Modal>
      </div>
    )
  }

  getColumns = () => {
    return [
      {
        title: '连签天数',
        dataIndex: 'Day',
        key: 'Day'
      },
      {
        title: '连签奖励',
        dataIndex: 'Reward',
        key: 'Reward'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              size="small"
              onClick={() => {
                this.openModal('continuous', record)
              }}
            >
              更改
            </Button>
            <Divider type="vertical" />
            <Button
              size="small"
              onClick={() => {
                this.deleteContinuRow(record.Id)
              }}
            >
              移除
            </Button>
          </span>
        )
      }
    ]
  }

  // 弹框函数，日签设置、连签修改、连签新增，三合一
  openModal = (modalType, obj = {}) => {
    const { Id = 0, Day = 0, Reward = 0, RewardValue } = obj
    this.setState({
      modalType,
      modalVisible: true,
      Id,
      modalContiDays: Day,
      modalContiReward: Reward,
      modalDayReward: RewardValue
    })
  }
  handleOk = isDayRewardModal => {
    // 将 modal 临时数值存储，修改 ContinuousRewardList 数组
    const {
      modalType,
      Id,
      modalContiDays,
      modalContiReward,
      modalDayReward,
      ContinuousRewardList
    } = this.state
    if (isDayRewardModal) {
      this.setState({ RewardValue: modalDayReward })
    } else {
      // 是否为新增
      const isNewRow = modalType === 'newContinue'
      if (isNewRow) {
        const newTableData = ContinuousRewardList.concat()
        newTableData.push({
          Id: uuid(),
          Day: modalContiDays,
          Reward: modalContiReward
        })
        this.setState({ ContinuousRewardList: newTableData })
      } else {
        // 修改当前 row
        const index = _.findIndex(ContinuousRewardList, { Id })
        if (index !== -1) {
          const newTableData = ContinuousRewardList.concat()
          newTableData.splice(index, 1, {
            Id,
            Day: modalContiDays,
            Reward: modalContiReward
          })
          this.setState({ ContinuousRewardList: newTableData })
        }
      }
    }
    this.setState({ modalVisible: false })
    this.resetModalData()
  }
  handleCancel = () => {
    this.setState({ modalVisible: false })
  }
  // 删除连签奖励行
  deleteContinuRow = Id => {
    Modal.confirm({
      title: '提示',
      content: '确定删除该条数据？',
      onOk: () => {
        const { ContinuousRewardList } = this.state
        const index = _.findIndex(ContinuousRewardList, { Id })
        if (index !== -1) {
          const newTableData = ContinuousRewardList.concat()
          newTableData.splice(index, 1)
          this.setState({ ContinuousRewardList: newTableData })
        }
      }
    })
  }
  // 勾选入口设置
  toggleIsVipPagePopUp = () => {
    this.setState({ IsVipPagePopUp: !this.state.IsVipPagePopUp })
  }
  // TODO 保存提交基本设置
  submitBasic = () => {}

  // 重置弹框数据
  resetModalData = () => {
    this.setState({
      modalDayReward: null,
      Id: null,
      modalContiDays: null,
      modalContiReward: null
    })
  }

  render() {
    const { ActiveState } = this.state
    return (
      <Content
        className="check-in-config"
        style={{ margin: '2rem', background: '#fff', padding: 0 }}
      >
        <div className="header">
          <span className="title">日历签到</span>
          <span className="text">{ActiveState ? '已开启' : '已关闭'}</span>
          <Switch onChange={this.ActiveState} className="title-switch" />
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="签到设置" key="1">
            {this.basicConfig()}
          </TabPane>
          <TabPane tab="签到页配置" key="2">
            <Ads />
          </TabPane>
        </Tabs>
      </Content>
    )
  }
}
