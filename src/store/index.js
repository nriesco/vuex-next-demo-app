import { createStore } from 'vuex'
import feathers, { BaseModel, makeServicePlugin } from './feathers-client'
import auth from './store.auth'

/* eslint-disable no-useless-constructor */
class Demo extends BaseModel {
  constructor (data, options) { super(data, options) }
  static modelName = 'demo'
}
class Users extends BaseModel {
  constructor (data, options) { super(data, options) }
  static modelName = 'users'
}

export default createStore({
  state: {
    code: ''
  },
  mutations: {
    setCode (state, newValue) {
      state.code = newValue
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getCode: (state) => {
      return state.code
    }
  },
  plugins: [
    makeServicePlugin({
      idField: '_id',
      Model: Demo,
      service: feathers.service(Demo.modelName),
      servicePath: Demo.modelName
    }),
    makeServicePlugin({
      Model: Users,
      service: feathers.service(Users.modelName),
      servicePath: Users.modelName
    }),
    auth
  ]
})
