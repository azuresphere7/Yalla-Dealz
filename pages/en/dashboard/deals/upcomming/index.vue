<template>
  <v-container class="mt-10 mt-md-1">
    <v-row>
      <deals upcomming/>
      <!-- <v-btn v-if="deals.length >= dealsLimit" color="red" class="mx-auto mt-3" @click="seeMore()" dark outlined>See More</v-btn> -->
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
      return {}
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
