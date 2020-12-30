import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import rest from '@feathersjs/rest-client'
import { iff, discard } from 'feathers-hooks-common'
import feathersVuex from '@feathersjs/vuex'
const apiServer = 'http://localhost:3030'

const restClient = rest(apiServer)

const feathersClient = feathers()
  .configure(restClient.fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }))
  .hooks({
    before: {
      all: [
        iff(
          context => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp')
        )
      ]
    }
  })

export default feathersClient

const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
} = feathersVuex(feathersClient, {
  serverAlias: 'api', // or whatever that makes sense for your project
  idField: '_id' // `id` and `_id` are both supported, so this is only necessary if you're using something else.
  // whitelist: ['$regex', '$options']
})

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
}
