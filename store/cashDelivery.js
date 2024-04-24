export const state = () => ({
  orders: [],
});
export const mutations = {
  setOrders: (state, payload) => {
    state.orders = [...payload];
  },
};

export const getters = {
  orders: (state) => state.orders
};

export const actions = {
  fetchGetOrders({ commit, rootGetters }, payload) {
    const config = {
      headers: {
        authorization: rootGetters.token,
      },
    };
    const search = payload ? `/?${payload}` : ''
    return new Promise((resolve, reject) => {
      this.$axios.get('/cashDelivery' + search, config)
        .then(res => {
          commit('setOrders', res.data.data.cashInDelivery)
          resolve(res);
        }).catch(err => reject(err.toString()))
    });
  },
  fetchSendOrder({ rootGetters }, payload) {
    const config = {
      headers: {
        authorization: rootGetters.token,
      },
    };
    return new Promise((resolve, reject) => {
      this.$axios.post('/cashDelivery/send', { code: payload.code }, config)
        .then(res => {
          resolve(res);
        }).catch(err => reject(err))
    });
  }
};

