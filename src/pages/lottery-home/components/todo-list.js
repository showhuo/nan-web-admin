import React from 'react'
import PropTypes from 'prop-types'
import { Table, message } from 'antd'
import history from '../../../utils/history'
import axios from '../../../utils/axios'
import qs from 'qs'
import copyTextToClipboard from '../../../utils/copy-to-clipboard'

const accountId = localStorage.getItem('accountId')

export default class TodoList extends React.Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { list, loading } = this.props
    const listWithIdx = list.map((e, i) => {
      e.idx = i
      return e
    })

    return (
      <>
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <h2 style={{ marginBottom: 0 }}>待处理列表</h2>
        </div>
        <Table
          rowKey="luckDrawId"
          loading={loading}
          columns={this.columns}
          dataSource={listWithIdx}
        />
      </>
    )
  }

  get columns() {
    const columns = [
      {
        dataIndex: 'idx',
        title: '序号'
      },
      {
        dataIndex: 'qrcode',
        title: '二维码/链接',
        render: (text, record) => {
          // TODO 链接、二维码、复制按钮
          const { LinkUrl, QrcodeUrl } = record
          return (
            <div>
              {LinkUrl}
              <img src={QrcodeUrl} alt="qrcode" />
              <span
                onClick={copyTextToClipboard(LinkUrl)}
                style={{ color: 'rgba(66, 136, 255, 1)' }}
              >
                复制链接
              </span>
            </div>
          )
        }
      },
      { dataIndex: 'Id', title: '活动编号' },
      {
        dataIndex: 'ActiveName',
        title: '名称'
      },
      {
        dataIndex: 'ActiveState',
        title: '活动状态'
      },
      {
        dataIndex: 'BeginTime',
        title: '开始时间'
      },
      {
        dataIndex: 'EndTime',
        title: '结束时间'
      },
      {
        title: '操作',
        render: (text, record) => {
          // TODO 多种按钮
        }
      }
    ]

    return columns
  }
  release = luckDrawId => {
    const urlParam = qs.stringify({
      'param.luckDrawId': luckDrawId,
      'param.accountId': accountId
    })
    axios
      .post(`/api/Active_LuckDraw/ReleaseDrawAsync?${urlParam}`)
      .then(res => {
        if (res) {
          message.success('发布成功')
        }
      })
  }
  offline = luckDrawId => {
    const urlParam = qs.stringify({
      'param.luckDrawId': luckDrawId,
      'param.accountId': accountId
    })
    axios
      .post(`/api/Active_LuckDraw/OfflineDrawInfoAsync?${urlParam}`)
      .then(res => {
        if (res) {
          message.success('下线成功')
        }
      })
  }
  delete = luckDrawId => {
    const urlParam = qs.stringify({
      'param.luckDrawId': luckDrawId,
      'param.accountId': accountId
    })
    axios
      .post(`/api/Active_LuckDraw/DeleteDrawInfoAsync?${urlParam}`)
      .then(res => {
        if (res) {
          message.success('删除成功')
        }
      })
  }
  // 查看活动
  checkLuckDraw = luckDrawId => {
    const urlParam = qs.stringify({
      'param.luckDrawId': luckDrawId,
      'param.accountId': accountId,
      readonly: true
    })
    history.push(`/lottery-detail?${urlParam}`)
  }
  edit = luckDrawId => {
    const urlParam = qs.stringify({
      'param.luckDrawId': luckDrawId,
      'param.accountId': accountId
    })
    history.push(`/lottery-detail?${urlParam}`)
  }
  // 查看中奖名单
  checkResult = luckDrawId => {
    const urlParam = qs.stringify({
      'param.luckDrawId': luckDrawId,
      'param.accountId': accountId
    })
    history.push(`/lottery-result?${urlParam}`)
  }
}
