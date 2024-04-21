<template>
  <merchants-archive/>
</template>

<script>
import merchantsArchive from "~/components/en/Dashboard/merchantsArchive.vue"

export default {
  middleware: ["check-auth", "auth"],
  layout: "adminlayout",

  components: { merchantsArchive },

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
