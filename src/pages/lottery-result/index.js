import React from 'react'
import { Layout } from 'antd'
import axios from '../../utils/axios'
import './style.less'
import List from './components/list'
import qs from 'qs'
import getUrlParam from '../../utils/qs'

const { Content } = Layout

class Result extends React.Component {
  state = {
    // 表格数据
    list: [],
    loading: false
  }
  componentDidMount() {
    // 获取初始数据
    this.query()
  }

  query = () => {
    this.setState({ loading: true })
    const { accountId, luckDrawId } = getUrlParam()
    const obj = {
      'param.accountId': accountId,
      'param.luckDrawId': luckDrawId
    }
    const urlParam = qs.stringify(obj)
    axios
      .get(`/api/Active_LuckDraw/GetDrawWinnerListAsync?${urlParam}`)
      .then(res => {
        if (res) {
          this.setState({ list: res.data, loading: false })
        }
      })
  }

  render() {
    const { list, loading } = this.state
    return (
      <Content>
        <List list={list} loading={loading} />
      </Content>
    )
  }
}

export default Result
