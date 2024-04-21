<template>
  <v-container class="mt-10 mt-md-1">
    <subscriptions/>
  </v-container>
</template>

<script>
import subscriptions from '~/components/en/Dashboard/subscriptions'

export default {
  head() {
    return {
      titleTemplate: "%s - Subscription"
    };
  },
  layout: "adminlayout",
  components : {
    subscriptions
  },
};
</script>

<style scoped></style>
