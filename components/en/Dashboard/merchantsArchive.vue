<template>
    <div class="en-dashCategories">
  <v-container>

    <v-row  class="mt-2">
     <v-col>
        <v-data-table
          v-model="selected"
          item-key="_id"
          show-select
          :headers="headers"
          :items="items"
          :loading="loading"
          sort-by="name"
          class="elevation-1 w-100"
          :options.sync="options"
          :server-items-length="total"
          :items-per-page="perPage"
          :footer-props="{
            itemsPerPageOptions: rowsPerPage
          }">
        <!-- top -->
        <template v-slot:top>
          <v-toolbar class="mb-5" flat color="white">
            <v-toolbar-title>Merchants Archived</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="m-2"
              v-if="selected.length > 0"
              @click="deleteItem()"
            >
              Delete
            </v-btn>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="searchByName"
              class="mr-5"
              append-icon="mdi-magnify"
              label="Search"
              single-line hide-details
              @keyup.native="actionkeyUp"
              @keydown.native="actionkeyDown">
            </v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:[`item.image`]="{ item }">
          <img :src="item.image" :alt="item.icon" width="40px">
        </template>

        <!-- actions column -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="red" @click="deleteItem([item._id])">mdi-delete</v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
     </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
export default {
  name: "MerchantsArchive",
  data() {
    return {
      headers: [
        { text: 'Logo', value: 'image', align: 'center', sortable: false},
        { text: 'Name', value: 'name', align: 'start'},
        { text: 'Arabic Name', value: 'arName', align: 'start'},
        { text: 'Phone', value: 'phone'},
        { text: 'Email', value: 'email', align: 'center'},
        { text: 'Actions', value: 'actions', align: 'center', sortable: false}
      ],
      items: [],
      selected: [],
      searchByName: '',
      doneTypingInterval: 2000,
      typingTimer: null,
      loading: false,
      options: {},
      perPage: 20,
      rowsPerPage: [20, 30, 40, 50],
      total: 0,
    }
  },
  watch: {
    options: {
      async handler(val) {
        this.perPage = val.itemsPerPage;
        await this.initialize()
      },
      deep: true
    }
  },
  methods: {
    async initialize () {
      this.loading = true;
      const res = (await this.$axios.get('/merchants/archived/', {
        ...this.$store.getters.config,
        params: {
          name: this.searchByName,
          limit: this.perPage,
          skip: this.options.page - 1,
        }
      })).data;
      this.items = res.merchants;
      this.total = res.all;
      this.loading = false;
    },
    actionkeyUp() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.initialize, this.doneTypingInterval);
    },
    actionkeyDown() {
      clearTimeout(this.typingTimer);
    },
    async deleteItem(ids = this.selected.map(el => el._id)) {
      if (confirm('DO you realy want to delete this?')) {
        if (!ids.length) return;
        this.loading = true;
        try {
          await this.$axios.post("/merchants/delete/hard", { merchants: ids }, this.$store.getters.config);
          this.selected = [];
          await this.initialize();
          this.loading = false;
        } catch (err) {
          this.loading = false;
          let mess = err.message;
          if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
          this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
        }
      }
    },
  },
  async created () {
    await this.initialize();
  },
}
</script>

<style lang="scss" scoped>
  .en-dashCategories {
    width: 100%;

    &-content {
      margin-top: 15px;
      width: 100%;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.281);
      padding: 20px;
      border-radius: 20px;

      &-table {
        width: 100%;
        text-align: center;

        &-th {
          color: #dc1f29;
        }

        &-tr {
          height: 50px;

          &-options {
            color: #dc1f29;
            cursor: pointer;

            &-edit {
              color: rgb(32, 182, 32);
              margin-left: 20px;
            }
          }

          &:hover {
            background-color: #e6e3e3;
          }
        }
      }
    }
  }
</style>
