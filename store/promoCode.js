

export const state = () => ({
  codes: [],
});
export const mutations = {
  setCodes: (state, payload) => {
    state.codes = [...payload];
  },
};

export const getters = {
  codes: (state) => state.codes
};

export const actions = {
  getCodes({commit, rootGetters}) {
    const config = {
      headers: {
        authorization: rootGetters.token,
      },
    };
    return new Promise((resolve, reject) => {
      this.$axios.get('/pormotions', config)
        .then(res => {
          commit('setCodes', res.data.pormotions)
          resolve(res);
        }).catch(err => reject(err.toString()))
    });
  }
};

