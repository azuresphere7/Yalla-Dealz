export const state = () => ({
  token: null,
  tokenExpiration: null,
  username: null,
  merchantForms: {
    firstOne: false,
    secondOne: false,
    branches: [],
  },
  paymentMerchData: [],
  merchantData: {
    name: "",
    arName:"",
    phone: "",
    email: "",
    address: "",
    arAddress:"",
    location: "",
    category: "",
    username: "",
    password: "",
    accountType: "",
    image: "",
    website: "",
    socialMediaLinks: {
      facebook: "",
      youtube: "",
      instagram: "",
    },
    contactPerson: {
      name: "",
      jobTitle: "",
      phone: "",
      email: "",
      location: "",
      payOutBy: "",
    },
  },
  branchesDataValidated: false,
  branchesData: [{
    name: "",
    arName:"",
    branchId: "1",
    merchant: "",
    phone: "",
    email: "",
    address: "",
    arAddress: "",
    password: "",
    location: {},
  }],
})

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  },
  config: (state) => ({
    headers: { authorization: state.token },
    'Content-Type': 'application/json',
  }),
  token: state => state.token,
  tokenExpiration: state => state.tokenExpiration,
  username: state => state.username
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setTokenExpiration(state, tokenExpiration) {
    state.tokenExpiration = tokenExpiration
  },
  setUsername(state, username) {
    state.username = username
  },
  clearToken(state) {
    state.token = null
  },
  setImages(state, data) {
    if (data.forWhat === "main") {
      state.merchantData[data.propName] = data.link
    } else if (data.forWhat === "branch") {
      state.branchesData[data.branch][data.propName] = data.link
    }
  },
  // updateCover (state, data) {
  //   state.merchantData.cover = data
  // },
  DeleteMerchData() {
    state.merchantData = {};
  },
  updateFirstOne(state, data) {
    state.merchantForms.firstOne = data
  },
  updateSecondOne(state, data) {
    state.merchantForms.secondOne = data
  },
  merchnatForm(state, data) {
    state.merchantData.name = data.name
    state.merchantData.arName = data.arName
    state.merchantData.phone = data.phone
    state.merchantData.email = data.email
    state.merchantData.address = data.address
    state.merchantData.arAddress = data.arAddress
    state.merchantData.location = data.location
    state.merchantData.image = data.image
    state.merchantData.category = data.category
    state.merchantData.username = data.username
    state.merchantData.password = data.password
    state.merchantData.accountType = data.accountType
    state.merchantData.website = data.website
    state.merchantData.socialMediaLinks.facebook = data.facebook
    state.merchantData.socialMediaLinks.youtube = data.youtube
    state.merchantData.socialMediaLinks.instagram = data.instagram
  },
  paymentMerchantForm(state, data) {
    state.paymentMerchData = data.payments
  },
  contactPerson(state, data) {
    state.merchantData.contactPerson.name = data.name
    state.merchantData.contactPerson.phone = data.phone
    state.merchantData.contactPerson.email = data.email
    state.merchantData.contactPerson.location = data.location
    state.merchantData.contactPerson.jobTitle = data.jobTitle
    state.merchantData.contactPerson.payOutBy = data.payOutBy
  },
  updateBranches(state, branch) {
    state.branchesData[branch.index].image = branch.data
  },
  updateMerchantForms(state, branch) {
    state.branchesData[branch.index][branch.data.key] = branch.data.value

  },
  addBranch(state, data) {
    state.branchesData.push(data)
  },
  validateBranch(state) {
    state.branchesDataValidated = true
  },
  removeBranch(state, data) {
    if(state.merchantData.branches) {
      state.branchesData.splice(state.merchantData.branches.length - 1, 1)
    }
  },
  addMerchantFormBranch(state, data) {
    state.merchantForms.branches.push(data)
  },
  removeMerchantFormBranch(state, data) {
    state.merchantForms.branches.splice(state.merchantForms.branches.length - 1, 1)
  },
}

export const actions = {
  initAuth(vuexContext, req) {
    let token;
    let id;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="))
      if (!jwtCookie) {
        return
      } else {
        token = jwtCookie.split("=")[1]
        expirationDate = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("expirationDate="))
          .split("=")[1]
      }
    } else {
      // this when we are on the client, so we will fetch from the localstorge
      token = vuexContext.getters.token
      id = vuexContext.rootGetters['settings/userAdminId']
      expirationDate = vuexContext.getters.tokenExpiration
    }
    if (new Date().getTime() > +expirationDate || !token) {
      vuexContext.dispatch("logout")
      return
    }
    vuexContext.commit("setToken", token)
    vuexContext.commit("settings/setUserAdminId", id, { root: true })
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken")
    if (process.client) {
      // localStorage.removeItem("token");
      // localStorage.removeItem("tokenExpiration");
      // localStorage.removeItem("id");
      // localStorage.removeItem("username");
      vuexContext.commit("setTokenExpiration", null)
      vuexContext.commit("setUsername", null)
      vuexContext.commit("settings/setUserAdminId", null, { root: true })
    }
  },
}
