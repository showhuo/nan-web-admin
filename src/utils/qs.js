// 获取 url query 参数
import qs from 'qs'
export const query = () => {
  return qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  })
}
