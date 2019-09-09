import React, { Component } from 'react'
import './main.less'

class MoqiLogin extends Component {
  state = {}
  render() {
    return (
      <div className="the-moqi">
        <div className="the-img" />
        <div
          className="the-btn"
          onClick={() => {
            window.location.href = 'http://120.77.254.223:10003/'
          }}
        >
          前往魔启登录
        </div>
      </div>
    )
  }
}

export default MoqiLogin
