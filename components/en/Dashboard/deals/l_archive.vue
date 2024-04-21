<template>
  <v-container class="mt-10 mt-md-1">
    <v-card elevation="10" class="p-3 ml-sm-2 mr-sm-6 mt-10 mt-md-3">
      <h4>Deleted Deals</h4>
      <hr>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="deals"
        item-key="name"
        show-select
        class="elevation-1"
      >
        <template v-slot:top>
          <v-btn
            color="primary"
            dark
            class="m-2"
            :disabled="selected.length === 0"
            @click="deleteDeal()"
          >
            Delete
          </v-btn>
        </template>
        <template v-slot:[`item.merchant.image`]="{ item }">
          <img :src="item.merchant && item.merchant.image ? item.merchant.image : null" :alt="item.icon" width="70px">
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <img :src="item.images[0] ? item.images[0] : null" :alt="item.icon" width="70px">
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="red" @click="deleteDeal([item._id])">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'Logo', value: 'merchant.image', align: 'center', class: 'text-h6', sortable: false},
        { text: 'Merchant Name', value: 'merchant.name', align: 'center', class: 'text-h6'},
        { text: 'Name', value: 'name', align: 'start', class: 'text-h6'},
        { text: 'Deal Type', value: 'dealType', class: 'text-h6', sortable: false},
        { text: 'Image', value: 'image', align: 'center', class: 'text-h6', sortable: false},
        { text: 'Actions', value: 'actions', align: 'center', class: 'text-h6', sortable: false}
      ],
      deals: [],
      loading: false,
    }
  },
  methods: {
    async init() {
      this.deals = (await this.$axios.get("/deals/archived", {}, this.configApi)).data.deals;
    },
    async deleteDeal(ids = this.selected.map(el => el._id)) {
      if (confirm('DO you realy want to delete this?')) {
        if (!ids.length) return;
        this.loading = true;
        try {
          await this.$axios.post("/deals/delete/hard", { deals: ids }, this.configApi);
          this.selected = [];
          await this.init();
          this.loading = false;
        } catch (err) {
          this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red'})
          this.loading = false;
        }
      }
    }
  },
  async mounted() {
    await this.init();
  }
}
</script>

<style>

</style>