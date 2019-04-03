import { message } from 'antd'

window.addEventListener('unhandledrejection', e => {
  if (e.detail) {
    e.preventDefault()
    const { reason } = e.detail
    message.error(reason)
  }
})
