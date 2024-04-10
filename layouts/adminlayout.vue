<template>
  <v-app class="app">
    <!-- Navbar -->
    <dashnav />
    <!-- Pages -->
    <v-main class="my-md-3 p-0">
      <v-container class="container">
        <nuxt />
        <v-snackbar 
          timeout="3000"
          :color='snackbar.color'
          outlined
          :value='snackbar.active'
          @input="actionActiveMsg({ active: false })"
        >
          {{snackbar.text}}
        </v-snackbar>
        <v-overlay :value="loading">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import dashnav from "~/components/en/Navigation/dashnav.vue"
  import { mapGetters, mapActions } from 'vuex';
  import global from '~/mixins.js/global';

  Vue.mixin(global);

  export default {
    name: 'adminlayout',
    components: { dashnav },
    head() {
      return {
        title: 'Yalla Dealz Inc, Dashboard Portal',
      }
    },
    computed: {
      ...mapGetters({
        snackbar: 'settings/snackbar',
        loading: 'settings/loading',
      })
    },
    methods: {
      ...mapActions({
        actionActiveMsg: 'settings/activeMsg'
      }),
    },
  }
</script>

<style scoped>
.app {
  background: #f5f5f5;
}

.container {
  max-width: 100%;
}
</style>
