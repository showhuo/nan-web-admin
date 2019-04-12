import React from 'react'
import PropTypes from 'prop-types'
import { Table, message, Button } from 'antd'
import history from '../../../utils/history'
import axios from '../../../utils/axios'
import qs from 'qs'
import copyTextToClipboard from '../../../utils/copy-to-clipboard'

const accountId = localStorage.getItem('accountId')

export default class TodoList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
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
          <h2 style={{ marginBottom: 0 }}>活动列表</h2>
        </div>
        <Table
          rowKey="Index"
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
        dataIndex: 'Index',
        title: '序号'
      },
      {
        dataIndex: 'qrcode',
        title: '二维码/链接',
        render: (text, record) => {
          const { LinkUrl, QrcodeUrl } = record
          return (
            <div>
              <div
                style={{
                  width: '14rem',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }}
              >
                <div
                  style={{
                    width: '14rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {LinkUrl}
                </div>
                <span
                  onClick={() => {
                    copyTextToClipboard(LinkUrl)
                  }}
                  style={{ color: 'rgba(66, 136, 255, 1)', cursor: 'pointer' }}
                >
                  复制链接
                </span>
              </div>
              <img
                src={QrcodeUrl}
                alt="qrcode"
                style={{
                  display: 'inline-block',
                  width: '4rem',
                  height: '4rem'
                }}
              />
            </div>
          )
        }
      },
      { dataIndex: 'WxSeetingName', title: '公众号' },
      {
        dataIndex: 'ActiveName',
        title: '活动名称'
      },
      {
        dataIndex: 'ActiveStateText',
        title: '活动状态'
      },
      {
        dataIndex: 'StartTime',
        title: '开始时间'
      },
      {
        dataIndex: 'EndTime',
        title: '结束时间'
      },
      {
        dataIndex: 'LuckDrawIdText',
        title: '活动编号'
      },
      {
        title: '操作',
        render: (text, record) => {
          // TODO 多种按钮
          const { LuckDrawId } = record
          return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  this.release(LuckDrawId)
                }}
              >
                发布
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  this.edit(LuckDrawId)
                }}
              >
                编辑
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  this.checkLuckDraw(LuckDrawId)
                }}
              >
                查看
              </Button>
              <Button
                size="small"
                type="danger"
                onClick={() => {
                  this.delete(LuckDrawId)
                }}
              >
                删除
              </Button>
              <Button
                size="small"
                type="danger"
                onClick={() => {
                  this.offline(LuckDrawId)
                }}
              >
                下线
              </Button>
              <Button
                size="small"
                onClick={() => {
                  this.checkResult(LuckDrawId)
                }}
              >
                获奖名单
              </Button>
            </div>
          )
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
      // 跳到详情 step 1
      step: 1,
      luckDrawId,
      accountId,
      readonly: true
    })
    history.push(`/lottery-steps?${urlParam}`)
  }
  edit = luckDrawId => {
    const urlParam = qs.stringify({
      // 跳到详情 step 1
      step: 1,
      luckDrawId,
      accountId
    })
    history.push(`/lottery-steps?${urlParam}`)
  }
  // 查看中奖名单
  checkResult = luckDrawId => {
    const urlParam = qs.stringify({
      luckDrawId,
      accountId
    })
    history.push(`/lottery-result?${urlParam}`)
  }
}
