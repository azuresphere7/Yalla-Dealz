<template>
  <v-container>
    <v-row>
      <v-col>
        <PromoCode></PromoCode>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PromoCode from  '~/components/en/Dashboard/PromoCode.vue';

export default {
  middleware: ["check-auth", "auth"],
  layout: "adminlayout",
  components: {
    PromoCode,
  }
}
</script>