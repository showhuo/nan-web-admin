// 数据默认走 node 层，token 在 node 层处理

import axios from 'axios'
import { query } from './qs'
import { baseURL } from '../config'
const { appid = '' } = query()
if (appid) localStorage.setItem('appid', appid)

const ins = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

ins.interceptors.response.use(
  ({ data }) => {
    const { code } = data
    // 从用户体验来说，尽量别弹框报错，而是引导至错误页
    if (code !== 0) rejectHttpError(data)
    return data
  },
  error => {
    if (error.response) {
      // 有返回但不是2xx
      const { data } = error.response
      rejectHttpError(data)
      return data
      /* eslint-disable no-console */
    } else if (error.request) {
      console.log('The request was made but no response was received')
    } else {
      console.log(
        'Something happened in setting up the request that triggered an Error'
      )
    }
  }
)

export default ins

// 请求默认走 node，以 /api 开头的会自动转发 java

function rejectHttpError(obj) {
  window.Bluebird.reject(obj)
}
