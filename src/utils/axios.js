import axios from 'axios'
import { baseURL } from '../config'
import { message } from 'antd'

const ins = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

ins.interceptors.response.use(
  ({ data }) => {
    const { Code, Result, Tips } = data
    if (Code !== '1') {
      message.error(Tips)
      return
    }
    return Result
  },
  error => {
    if (error.response) {
      // HTTP Code error
      const { data } = error.response
      message.error(data)
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
