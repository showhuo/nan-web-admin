import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

export default class List extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { list, loading } = this.props
    const newList = list.map((e, idx) => {
      e.idx = idx
      return e
    })

    return (
      <div style={{ margin: '2/10rem' }}>
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <h2 style={{ marginBottom: 0 }}>中奖名单</h2>
        </div>
        <Table
          rowKey="idx"
          loading={loading}
          columns={this.columns}
          dataSource={newList}
        />
      </div>
    )
  }

  get columns() {
    const columns = [
      {
        dataIndex: 'AccountName',
        title: '中奖玩家'
      },
      {
        dataIndex: 'LevelName',
        title: '获奖等级'
      },
      { dataIndex: 'Prize', title: '奖品' },
      {
        dataIndex: 'CreateTime',
        title: '中奖时间'
      },
      {
        dataIndex: 'AccountRealName',
        title: '姓名'
      },
      {
        dataIndex: 'AccounMobile',
        title: '联系电话'
      }
    ]

    return columns
  }
}
