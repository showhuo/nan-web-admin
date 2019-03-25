// redux 接入演示
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { query, save, remove } from './demo'
import './style.less'

function User({ demo, actions }) {
  return <div>Hello, world</div>
}

User.propTypes = {
  demo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default connect(
  state => ({ demo: state.demo }),
  dispatch => ({
    actions: bindActionCreators({ query, save, remove }, dispatch)
  })
)(User)
