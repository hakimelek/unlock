import { SET_PROVIDER } from '../actions/provider'
import configure from '../config'

const isServer = typeof window === 'undefined'
const config = !isServer ? configure(global) : null

let initialState = null 

if (config) {
  // By default, we start with the first provider.
  initialState = Object.keys(config.providers)[0]
}

const providerReducer = (state = initialState, action) => {
  if (action.type === SET_PROVIDER) {
    return action.provider
  }

  return state
}

export default providerReducer
