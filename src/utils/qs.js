// 获取 url query 参数
import qs from 'qs'
export default function query() {
  return qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  })
}
