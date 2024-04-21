<template>
  <v-container>
    <v-card elevation="10">
      <v-card-title>
        List subscriptions
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="m-2"
          :to="{
            path: '/en/dashboard/subscriptions/edit'
          }"
        >
          Add
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="subscriptions"
      >
        <template v-slot:[`item.image`]="{ item }">
          <img :src="item.image ? item.image : null" width="70px">
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            icon
            color="green"
            :to="{ path: '/en/dashboard/subscriptions/' + item._id }"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <freeCoupons class="mt-10"/>
  </v-container>
</template>

<script>
import freeCoupons from '~/components/en/Dashboard/freeCoupons'
export default {
  middleware: ["check-auth", "auth"],
  layout: "adminlayout",
  components: {
    freeCoupons
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'Image', value: 'image', width: 100 },
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'actions', align: 'center', width: 100 },
      ],
      subscriptions: [],
    }
  },
  methods: {
    async init() {
      this.subscriptions = (await this.$axios.$get("/subscriptionSetting", this.configApi)).data;
    }
  },
  async mounted() {
    await this.init()
  }
}
</script>

<style>

</style>