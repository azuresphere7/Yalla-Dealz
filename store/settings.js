

export const state = () => ({
  admins: [],
  loggedUser: {},
  snackbar: { 
    color: 'success',
    active: false,
    text: '',
  },
  loading: false,
  userAdminId: '',
});
export const mutations = {
  setAdmins: (state, payload) => {
    state.admins = [...payload];
  },
  setSnackbar: (state, paylaod) => {
    state.snackbar.active = paylaod.active !== undefined ? paylaod.active : true;
    state.snackbar.color = paylaod.color;
    state.snackbar.text = paylaod.text;
  },
  setLoggedUser: (state, paylaod) => {
    state.loggedUser = {...payload};
  },
  setLoading: (state, val) => {
    state.loading = val;
  },
  setUserAdminId: (state, val) => {
    state.userAdminId = val;
  },
};

export const getters = {
  admins: (state) => state.admins,
  snackbar: (state) => state.snackbar,
  loggedUser: (state) => state.loggedUser,
  loading: (state) => state.loading,
  userAdminId: (state) => state.userAdminId,
};

export const actions = {
  activeMsg({commit}, payload) {
    commit('setSnackbar', payload)
  },

  getAdmins({commit, rootGetters}) {
    const config = {
      headers: {
        authorization: rootGetters.token,
      },
    };
    return new Promise((resolve, reject) => {
      this.$axios.get('/systemUsers', config)
        .then(res => {
          commit('setAdmins', res.data.users)
          resolve(res);
        }).catch(err => reject(err))
    });
  },

  AdminResetPass({commit, rootGetters}, payload) {
    const config = {
      headers: {
        authorization: rootGetters.token,
      },
    };
    return new Promise((resolve, reject) => {
      this.$axios.put(`/systemUsers/${payload.id}`, {paylaod}, config)
        .then(res => {
          commit('setLoggedUser', res.data.user)
          resolve(res);
        }).catch(err => reject(err.toString()))
    });
  },

  getLoggedUser({commit, rootGetters}, payload) {
    const config = {
      headers: {
        authorization: rootGetters.token,
      },
    };
    return new Promise((resolve, reject) => {
      this.$axios.get(`/systemUsers/${payload}`, config)
        .then(res => {
          commit('setLoggedUser', res.data.user)
          resolve(res);
        }).catch(err => reject(err.toString()))
    });
  }
};

