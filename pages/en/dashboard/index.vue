<template>
  <div>
    <HomePage></HomePage>
  </div>
</template>

<script>
import HomePage from '~/components/en/Dashboard/statistics.vue';

export default {
  layout: "adminlayout",

  middleware: ["check-auth", "auth"],
  components: {
    HomePage
  },

  head() {
    return {
      titleTemplate: '%s - Home',
    }
  },

  data (){
    return {
      
    }
  }
}
</script>

<style scoped></style>
