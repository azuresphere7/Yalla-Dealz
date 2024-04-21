<template>
  <v-container class="mt-10 mt-md-1">
    <v-row>
      <deals expire/>
    </v-row>
  </v-container>
</template>

<script>
  import deals from "~/components/en/Dashboard/deals.vue"

  export default {
    middleware: ["check-auth", "auth"],
    components: {
      deals,
    },
    head() {
      return {
        titleTemplate: '%s - Deals',
      }
    },
    props: {
      mainSide: {
        type: String,
        default: null,
      },
    },
    data () {
      return {
        merchantsKey: 0,
        deals: [],
        dealsLimit: 50,
        flatMerchants: [],
      }
    },
    layout: "adminlayout",
    mounted() {},
    methods: {},
    watch: {}
  }
</script>

<style scoped>
  .control-btns {
    margin: 10px;
  }
</style>
