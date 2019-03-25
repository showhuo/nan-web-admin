import history from '../utils/history'
// bluebird
window.addEventListener('unhandledrejection', e => {
  if (e.detail) {
    e.preventDefault()
    const { reason } = e.detail
    const { error, detail } = reason
    // 只报基本错误，同时控制台打印详细错误
    const formatErrorMsg = encodeURIComponent(error)
    history.replace(`/error?msg=${formatErrorMsg}`)
    // eslint-disable-next-line
    console.log(detail)
  }
})
