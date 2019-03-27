import React from 'react'
import {
  Layout,
  Switch,
  Tabs,
  Checkbox,
  Input,
  InputNumber,
  Button,
  Divider,
  Table
} from 'antd'
import './style.less'
import publicIcon from '../../img/public-icon.png'

const { Content } = Layout
const { TabPane } = Tabs

export default class SiderDemo extends React.Component {
  state = {
    toggle: false,
    dayReward: null,
    loopCycle: 7,
    currentCycle: '无',
    nextCycle: '无',
    tableData: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      }
    ]
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  setLoopCycle = loopCycle => {
    this.setState({ loopCycle })
  }

  // 基本设置
  basicConfig = () => {
    const { dayReward, currentCycle, nextCycle, tableData } = this.state
    return (
      <div className="basic-config">
        <div className="title">
          签到模式：日历签到
          用户根据日期进行打卡，你可以设置日签奖励和连签奖励对用户的签到行为进行激励
        </div>
        <div className="unit">
          <span className="sub-title">日签奖励：</span>
          <div className="unit-right">
            <span>{dayReward || '无'}</span>
            <span
              className="clickable"
              onClick={() => {
                this.openModal('setDayReward')
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
            <Checkbox onChange={this.clickLoopCheckBox}>开启</Checkbox>
            <span>, 固定周期</span>
            <InputNumber onChange={this.setLoopCycle} />天
            <span className="tip1">
              单个周期内，每个累计/连续签到奖励只可被领取一次
            </span>
            <p style={{ marginTop: '1.6rem' }}>
              当前周期：{currentCycle}， 下一周期：{nextCycle}
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
              columns={this.getColumns()}
              dataSource={tableData}
              pagination={false}
            />
            <p className="clickable" onClick={this.addContinueRow}>
              +新增连续奖励
            </p>
          </div>
        </div>
        <div className="unit">
          <span className="sub-title">规则说明：</span>
          <div className="unit-right">
            <div className="rules">
              {`1.每日签到可以获得日签奖励，在单个周期内连续签到可以获得连签奖励，
              同1个周期内最多可领取1次；

              2.每日最多可签到1次，断签则会重新计算连签天数；
              
              3.活动以及奖励最终解释权归商家所有。`}
            </div>
          </div>
        </div>
        <div className="unit">
          <span className="sub-title">入口设置：</span>
          <div className="unit-right">{/* todo */}</div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // TODO 获取之前的设置数据
  }

  render() {
    const { toggle } = this.state
    return (
      <Content
        className="check-in-config"
        style={{ margin: '2rem', background: '#fff', padding: 0 }}
      >
        <div className="header">
          <p>日历签到</p>
          <p>{toggle ? '已开启' : '已关闭'}</p>
          <Switch onChange={this.toggle} />
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="签到设置" key="1">
            {this.basicConfig()}
          </TabPane>
          <TabPane tab="签到页配置" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Content>
    )
  }

  getColumns = () => {
    return [
      {
        title: '连签天数',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '连签奖励',
        dataIndex: 'address',
        key: 'address'
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
                this.deleteContinuRow(record)
              }}
            >
              移除
            </Button>
          </span>
        )
      }
    ]
  }

  // 弹框函数
  openModal = (type, record) => {
    // TODO 根据 type 展示不同弹框
  }
  // TODO 删除连签奖励行
  deleteContinuRow = obj => {}
  // TODO 新增连签奖励行
  addContinueRow = () => {}
}
