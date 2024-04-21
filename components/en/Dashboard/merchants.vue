<template>
    <div class="en-dashCategories">
  <v-container>

    <v-row  class="mt-2">
     <v-col>
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
          :search="search"
          sort-by="name"
          class="elevation-1 w-100">
        <!-- top -->
        <template v-slot:top>
          <v-toolbar class="mb-5" flat color="white">
            <v-toolbar-title>Merchants</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              class="mr-5"
              append-icon="mdi-magnify"
              label="Search"
              single-line hide-details>
            </v-text-field>
            <v-btn color="primary" @click="$router.push('/en/dashboard/merchants/create')" dark outlined>+ New Merchant</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.image`]="{ item }">
          <img :src="item.image" :alt="item.icon" width="40px">
        </template>
        <template v-slot:[`item.imageCode`]="{ item }">
          <img v-if="item.imageCode" :src="item.imageCode" :alt="item.name" width="40px" @click="downloadQr($event, item.name)" style="cursor:pointer">
        </template>

        <!-- contact by column -->
        <template v-slot:[`item.contact`]="{ item }">
          <v-btn color="info" @click="showContactPerson(item)">Show</v-btn>
        </template>

        <!-- actions column -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="primary" class="mr-2" @click="$router.push('/en/dashboard/merchants/'+item._id)">mdi-pencil</v-icon>
          <v-icon color="red" @click="deleteItem(item._id)">mdi-delete</v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
     </v-col>
    </v-row>

    <v-dialog v-model="editDialog">
      <editForm :cat="activeMerchant"/>
    </v-dialog>

    <!-- person contact -->
    <v-dialog v-model="contactPersonDialog" width="600px">
      <v-card>
        <div class="en-dashCategories">
          <div class="en-dashCategories-content text-center">
            <table class="en-dashCategories-content-table">
              <tr class="en-dashCategories-content-table-tr">
                <th class="en-dashCategories-content-table-th">
                  Name
                </th>
                <th class="en-dashCategories-content-table-th">
                  Phone
                </th>
                <th class="en-dashCategories-content-table-th">
                  Email
                </th>
                <th class="en-dashCategories-content-table-th">
                  Job Title
                </th>
                <th class="en-dashCategories-content-table-th">
                  PayOutBy
                </th>
              </tr>
              <tr>
                <td>{{ contactPerson.name }}</td>
                <td>{{ contactPerson.phone }}</td>
                <td>{{ contactPerson.email }}</td>
                <td>{{ contactPerson.jobTitle }}</td>
                <td>{{ contactPerson.payOutBy }}</td>
              </tr>
            </table>
            <v-btn color="red" class="mt-5" dark rounded @click="contactPersonDialog = false">Close</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
  </div>
</template>

<script>
export default {
  name: "Merchants",
  data() {
    return {
      editDialog: false,
      contactPerson: {},
      branches: {},
      contactPersonDialog: false,
      activeMerchant: {},
      headers: [
        { text: 'Logo', value: 'image', align: 'center', sortable: false},
        { text: 'Name', value: 'name', align: 'start'},
        { text: 'Arabic Name', value: 'arName', align: 'start'},
        { text: 'Phone', value: 'phone'},
        { text: 'Email', value: 'email', align: 'center'},
        { text: 'QR', value: 'imageCode', align: 'center'},
        { text: 'Account Type', value: 'accountType', align: 'center'},
        { text: 'Person Contact', value: 'contact', align: 'center', sortable: false},
        { text: 'Actions', value: 'actions', align: 'center', sortable: false}
      ],
      items: [],
      search: '',
      loading: false,
    }
  },
  watch: {},
  methods: {
    async initialize () {
      this.loading = true;
      const res = (await this.$axios.get('/merchants/', {
        ...this.$store.getters.config,
        params: {}
      })).data;
      this.items = res.merchants;
      this.total = res.all;
      this.loading = false;
    },
    async deleteItem(id) {
      if (confirm('DO you realy want to delete this?')) {
        this.loading = true;
        try {
          await this.$axios.delete("/merchants/" + id, { ...this.$store.getters.config });
          this.initialize();
          this.loading = false;
        } catch (err) {
          this.loading = false;
          let mess = err.message;
          if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
          this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
        }
      }
    },
    downloadQr(e, name = 'download') {
      const qr = e.target.src;
      const downloadLink = document.createElement("a");
      const fileName = `${name}.png`;
      downloadLink.href = qr;
      downloadLink.download = fileName;
      downloadLink.click();
    },
    showContactPerson(merchant) {
      this.contactPerson = merchant.contactPerson;
      this.contactPersonDialog = true;
    },
    showBranches(merchant) {
      this.branches = merchant.branches;
      this.branchesDialog = true;
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
