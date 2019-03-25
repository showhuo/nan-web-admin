// [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)
import { fromJS } from 'immutable'
import typeToReducer from 'type-to-reducer'
import axios from '../../utils/axios'

// Actions
const QUERY = '/user/QUERY'
const REMOVE = '/user/REMOVE'
const SAVE = '/user/SAVE'

// Action Creators

// 查询
export const query = params => ({
  type: QUERY,
  payload: axios.get('/api/user/query', { params })
})

// 保存
export function save(data) {
  return {
    type: SAVE,
    payload: axios.post('/api/user/save', data)
  }
}

// 删除
export function remove(id) {
  return {
    type: REMOVE,
    payload: axios.post(`/api/user/remove/${id}`)
  }
}

// 该组件的 state，属于全局的 subState
const initialState = {
  list: {
    loading: false,
    result: []
  }
}

// Reducer
export default typeToReducer(
  {
    [QUERY]: {
      PENDING: state => state.setIn(['list', 'loading'], true),
      REJECTED: state => state.setIn(['list', 'loading'], false),
      FULFILLED: (state, action) =>
        state.mergeIn(['list'], {
          result: fromJS(action.payload.data.lists),
          loading: false
        })
    },
    [REMOVE]: {
      PENDING: state => state.setIn(['list', 'loading'], true),
      REJECTED: state => state.setIn(['list', 'loading'], false),
      FULFILLED: (state, action) =>
        state.mergeIn(['list'], {
          info: action.payload.data.info,
          loading: false
        })
    },
    [SAVE]: {
      PENDING: state => state.setIn(['list', 'loading'], true),
      REJECTED: state => state.setIn(['list', 'loading'], false),
      FULFILLED: (state, action) =>
        state.mergeIn(['list'], {
          info: action.payload.data.info,
          loading: false
        })
    }
  },
  fromJS(initialState)
)
