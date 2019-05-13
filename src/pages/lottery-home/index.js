import React from 'react'
import { Layout } from 'antd'
import axios from '../../utils/axios'
import './style.less'
import Search from './components/todo-search'
import List from './components/todo-list'
import qs from 'qs'

const { Content } = Layout

class TodoPage extends React.Component {
  state = {
    // 表格数据
    list: [],
    publicArr: [],
    loading: false
  }
  componentDidMount() {
    // 获取初始数据
    this.query()
  }

  query = (obj = {}) => {
    this.setState({ loading: true })
    const accountId = localStorage.getItem('accountId')
    const platFormId = localStorage.getItem('platFormId')
    const newObj = Object.assign({}, obj, {
      'param.accountId': accountId,
      'param.platFormId': accountId
    })
    const urlParam = qs.stringify(newObj)
    // 表格数据
    axios.post(`/api/Active_LuckDraw/ListAsync?${urlParam}`).then(res => {
      if (res) {
        this.setState({ list: res.data, loading: false })
      }
    })
    // 公众号
    axios
      .get('/api/Active_LuckDraw/WxSignListAsync', {
        params: {
          'param.plantFrom': platFormId
        }
      })
      .then(publicArr => {
        if (publicArr) this.setState({ publicArr })
      })
  }

  render() {
    const { query } = this
    const { list, publicArr, loading } = this.state
    return (
      <Content style={{ margin: '.2rem' }} className="lottery-home">
        {/* 查询条件 */}
        <Search loading={loading} query={query} publicArr={publicArr} />

        {/* 列表 */}
        <List list={list} loading={loading} query={query} />
      </Content>
    )
  }
}

export default TodoPage
