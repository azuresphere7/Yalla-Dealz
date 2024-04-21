<template>
  <v-container>
    <v-row justify='center'>
      <v-col cols='12' md='10'>
        <AdminProfile />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminProfile from '~/components/AdminProfile.vue';

export default {
  middleware: ["check-auth", "auth"],
  layout: "adminlayout",
  components: {
    AdminProfile,
  }
}
</script>