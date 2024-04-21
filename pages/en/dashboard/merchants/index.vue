<template>
  <merchants/>
</template>

<script>
import merchants from "~/components/en/Dashboard/merchants.vue"

export default {
  middleware: ["check-auth", "auth"],
  layout: "adminlayout",

  components: { merchants },

  props: { mainSide: { type: String, default: null } },

  head() { return { titleTemplate: '%s - Merchants'} },

  data () {
    return {}
  },
  methods: {},
  mounted() {},
}
</script>

<style scoped></style>
