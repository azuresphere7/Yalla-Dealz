<template>
  <v-container class="mt-10 mt-md-1">
    <ListArchive/>
  </v-container>
</template>

<script>
import ListArchive from '~/components/en/Dashboard/deals/l_archive'
export default {
  middleware: ["check-auth", "auth"],
  head() {
    return {
      titleTemplate: "%s - Delete Deals"
    };
  },
  layout: "adminlayout",
  components : {
    ListArchive,
  },
};
</script>

<style scoped></style>
