import axios from 'axios'
import { baseURL } from '../config'

const ins = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

ins.interceptors.response.use(
  ({ data }) => {
    const { code } = data
    if (code !== 1) rejectHttpError(data)
    return data
  },
  error => {
    if (error.response) {
      // HTTP code error
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

function rejectHttpError(obj) {
  window.Bluebird.reject(obj)
}
