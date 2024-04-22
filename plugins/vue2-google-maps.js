import Vue from "vue"
import Vuelidate from "vuelidate"
import VuetifyGoogleAutocomplete from "~/node_modules/vuetify-google-autocomplete/lib"
import * as VueGoogleMaps from "~/node_modules/vue2-google-maps/dist/main.js"

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API,
    libraries: "places",
  },
  installComponents: true,
})

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: process.env.GOOGLE_API,
})
