// ~/plugins/persistedState.client.js

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'yalladeals',
    paths: [
      'token',
      'tokenExpiration',
      'username',
      'settings.setUserAdminId',
    ],
  })(store)
}