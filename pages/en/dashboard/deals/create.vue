<template>
  <v-container class="mt-10 mt-md-1">
    <FormDeal/>
  </v-container>
</template>

<script>
  import FormDeal from "~/components/en/Forms/deals"
  export default {
    middleware: ["check-auth", "auth"],
    layout: "adminlayout",
    head() {
      return {
        titleTemplate: '%s - Deals',
      }
    },
    components: {
      FormDeal
    },
  }
</script>

<style lang="scss" scoped>
  .en-deals {
    display: flex;
    justify-content: center;
    &-content {
      margin-top: 10%;
      width: 90%;
    }
  }
</style>
