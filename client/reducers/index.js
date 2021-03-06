import {handleActions} from 'redux-actions'

import * as commuter from './commuter'
import * as multiSite from './multi-site'
import * as polygon from './polygon'
import * as site from './site'
import * as user from './user'

export default {
  commuter: handleActions(commuter.reducers, commuter.initialState),
  multiSite: handleActions(multiSite.reducers, multiSite.initialState),
  polygon: handleActions(polygon.reducers, polygon.initialState),
  site: handleActions(site.reducers, site.initialState),
  user: handleActions(user.reducers, user.initialState)
}
