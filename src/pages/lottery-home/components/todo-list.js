import React from 'react'
import PropTypes from 'prop-types'
import { Table, message, Button, Modal, Popover } from 'antd'
import history from '../../../utils/history'
import axios from '../../../utils/axios'
import qs from 'qs'
import copyTextToClipboard from '../../../utils/copy-to-clipboard'

const accountId = localStorage.getItem('accountId')

export default class TodoList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    query: PropTypes.func.isRequired
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
          const hoverImg = (
            <img
              src={QrcodeUrl}
              alt="qrcode"
              style={{
                display: 'inline-block',
                width: '.8rem',
                height: '.8rem'
              }}
            />
          )
          return (
            <div>
              <div
                style={{
                  width: '1.4rem',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }}
              >
                <div
                  style={{
                    width: '1.4rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {LinkUrl ? LinkUrl : '活动创建未完成'}
                </div>
                {LinkUrl && (
                  <span
                    onClick={() => {
                      copyTextToClipboard(LinkUrl)
                    }}
                    style={{
                      color: 'rgba(66, 136, 255, 1)',
                      cursor: 'pointer'
                    }}
                  >
                    复制链接
                  </span>
                )}
              </div>
              {QrcodeUrl && (
                <Popover content={hoverImg}>
                  <img
                    src={QrcodeUrl}
                    alt="qrcode"
                    style={{
                      display: 'inline-block',
                      width: '.4rem',
                      height: '.4rem'
                    }}
                  />
                </Popover>
              )}
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
        width: '20%',
        render: (text, record) => {
          // 多种按钮
          const { LuckDrawId, ActiveStateText } = record
          const moreBtn = (
            <>
              <Button
                size="small"
                type="danger"
                onClick={() => {
                  Modal.confirm({
                    title: '确定要删除吗？',
                    onOk: () => {
                      this.delete(LuckDrawId)
                    }
                  })
                }}
                style={{ marginRight: '0.1rem' }}
              >
                删除
              </Button>
              <Button
                size="small"
                onClick={() => {
                  this.checkResult(LuckDrawId)
                }}
              >
                获奖名单
              </Button>
            </>
          )
          return (
            <div className="config-btns">
              {ActiveStateText === '未发布' && (
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: '确定要发布吗？',
                      onOk: () => {
                        this.release(LuckDrawId)
                      }
                    })
                  }}
                >
                  发布
                </Button>
              )}
              {ActiveStateText === '未发布' && (
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    this.edit(LuckDrawId)
                  }}
                >
                  编辑
                </Button>
              )}
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  this.checkLuckDraw(LuckDrawId)
                }}
              >
                查看
              </Button>

              {(ActiveStateText === '未开始' ||
                ActiveStateText === '进行中') && (
                <Button
                  size="small"
                  type="danger"
                  onClick={() => {
                    Modal.confirm({
                      title: '确定要下线吗？',
                      onOk: () => {
                        this.offline(LuckDrawId)
                      }
                    })
                  }}
                >
                  下线
                </Button>
              )}
              <Popover content={moreBtn} trigger="click">
                <Button size="small" type="primary">
                  更多
                </Button>
              </Popover>
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
          this.props.query()
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
          this.props.query()
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
          this.props.query()
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
