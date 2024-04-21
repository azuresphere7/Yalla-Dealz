<template>
  <v-container>
      
    <div class="en-dashCategories">
    <!-- deals table -->
    <v-row  class="mr-5 ml-1">
     <v-col>
        <v-data-table
          :headers="headers"
          :items-per-page="perPage" 
          :items="items"
          :options.sync="options"
          :loading="loading"
          sort-by="name"
          class="elevation-1 w-100"
          :server-items-length="total" 
          :footer-props="{
            itemsPerPageOptions: rowsPerPage
          }">
        <!-- top -->
        <template v-slot:top>
          <v-toolbar class="mb-5" flat color="white">
            <v-toolbar-title>Deals</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchByName"
              class="mr-5"
              append-icon="mdi-magnify"
              label="Search by name"
              single-line hide-details
              @keyup.native="actionkeyUp"
              @keydown.native="actionkeyDown"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn color="primary" @click="$router.push('/en/dashboard/deals/create')" dark outlined>+ New Deal</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.image`]="{ item }">
          <img :src="item.images[0] ? item.images[0] : null" :alt="item.icon" width="70px">
        </template>

        <template v-slot:[`item.dealStartDate`]="{ item }">
          {{ formatDate(item.dealStartDate) }}
        </template>

        <template v-slot:[`item.dealEndDate`]="{ item }">
          {{ formatDate(item.dealEndDate) }}
        </template>

        <template v-slot:[`item.merchantImage`]="{ item }">
          <img :src="item.merchant.image ? item.merchant.image : null" :alt="item.icon" width="70px">
        </template>

        <!-- details column -->
        <template v-slot:[`item.details`]="{ item }">
          <v-btn color="red" class="mt-1" outlined dark block @click="showDetails(item)">Details</v-btn>
        </template>

        <!-- actions column -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="primary" class="mr-2" @click="$router.push('/en/dashboard/deals/'+item._id)">mdi-pencil</v-icon>
          <v-icon color="red" @click="deleteDeal(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
     </v-col>
    </v-row>

    <v-dialog v-model="detailsDialog">
      <v-card>
        <v-card-title>Prices</v-card-title>
        <div class="en-dashCategories">
          <div class="en-dashCategories-content">
            <table class="en-dashCategories-content-table">
              <tr class="en-dashCategories-content-table-tr">
                <th class="en-dashCategories-content-table-th">
                  Original Price
                </th>
                <th class="en-dashCategories-content-table-th">
                  Final Price
                </th>
                <th class="en-dashCategories-content-table-th">
                  description
                </th>
              </tr>
              <tr v-for="(price) in prices" :key="price.branchId"
                  class="en-dashCategories-content-table-tr">
                <td>{{ price.originalPrice }}</td>
                <td>{{ price.finalPrice }}</td>
                <td>{{ price.description }}</td>
              </tr>
            </table>
          </div>
        </div>
      </v-card>
      <v-card class="my-1">
        <v-card-title>Voucher</v-card-title>
        <div class="en-dashCategories">
          <div class="en-dashCategories-content">
            <table class="en-dashCategories-content-table">
              <tr class="en-dashCategories-content-table-tr">
                <th class="en-dashCategories-content-table-th">
                  Valid For
                </th>
                <th class="en-dashCategories-content-table-th">
                  Valid On
                </th>
                <th class="en-dashCategories-content-table-th">
                  Valid Until
                </th>
                <th class="en-dashCategories-content-table-th">
                  Allowed Quantity
                </th>
                <th class="en-dashCategories-content-table-th">
                  Maximum Quantity Allowed
                </th>
                <th class="en-dashCategories-content-table-th">
                  Minimum Quantity Allowed
                </th>
                <th class="en-dashCategories-content-table-th">
                  Minimum Age
                </th>
                <th class="en-dashCategories-content-table-th">
                  Minimum Quantity Allowed
                </th>
                <th class="en-dashCategories-content-table-th">
                  User Allowed Up to
                </th>
              </tr>
              <tr class="en-dashCategories-content-table-tr" v-if="voucher">
                <td>{{ voucher.validFor }}</td>
                <td>{{ voucher.validOn }}</td>
                <td>{{ voucher.validUntil }}</td>
                <td>{{ voucher.allowedQuantity }}</td>
                <td>{{ voucher.maximumQuantityAllowed }}</td>
                <td>{{ voucher.minimumQuantityAllowed }}</td>
                <td>{{ voucher.minimumAge }}</td>
                <td>{{ voucher.minimumQuantityAllowed }}</td>
                <td>{{ voucher.userAllowedUpto }}</td>
              </tr>
            </table>
          </div>
        </div>
      </v-card>
      <v-card>
        <v-card-title>Merchant</v-card-title>
        <div class="en-dashCategories">
          <div class="en-dashCategories-content">
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
                  Image
                </th>
                <th class="en-dashCategories-content-table-th">
                  Address
                </th>
              </tr>
              <tr v-if="merchant">
                <td>{{ merchant.name }}</td>
                <td>{{ merchant.phone }}</td>
                <td>{{ merchant.email }}</td>
                <td><img :src="merchant.image ? merchant.image : ''" width="50"></td>
                <td>{{ merchant.address }}</td>
              </tr>
            </table>
          </div>
        </div>
      </v-card>
      <v-card>
        <v-row>
          <v-col class="d-flex justify-content-center">
            <v-btn color="red" width="200" @click="detailsDialog = false" dark rounded>Close</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
  </v-container>
</template>

<script>
  import editForm from "../Forms/editCategoryForm"

  export default {
    name: "deals",
    props: {
      upcomming: {
        type: Boolean,
        default: false,
      },
      expire: {
        type: Boolean,
        default: false,
      }
    },
    components: {
      editForm,
    },
    data() {
      return {
        detailsDialog: false,
        merchant: {},
        branch: {},
        voucher: {},
        prices: {},
        searchByName: '',
        loading: false,
        headers: [
          { text: 'Logo', value: 'merchantImage', align: 'center', sortable: false},
          { text: 'Merchant Name', value: 'merchant.name', align: 'center'},
          { text: 'Name', value: 'name', align: 'start'},
          { text: 'Deal Start Date', value: 'dealStartDate'},
          { text: 'Deal End Date', value: 'dealEndDate', align: 'center'},
          { text: 'Deal Type', value: 'dealType', sortable: false},
          { text: 'Total Users Rated', align: 'center', value: 'totalUsersRated', sortable: false},
          { text: 'Image', value: 'image', align: 'center', sortable: false},
          { text: 'Actions', value: 'actions', align: 'center', sortable: false}
        ],
        items: [],
        options: {},
        typingTimer: null,
        doneTypingInterval: 2000,
        perPage: 20,
        rowsPerPage: [20, 30, 40, 50],
        total: 0
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
        const params = {
          key: this.searchByName,
          limit: this.perPage,
          skip: this.options.page - 1,
        };
        if (this.upcomming) params.expire = false;
        if (this.expire) params.expire = true;
        const res = (await this.$axios.get('/deals/', {
          ...this.$store.getters.config,
          params,
        })).data;
        this.items = res.deals;
        this.total = res.all;
        this.loading = false;
      },
      deleteDeal(deal) {
        const index = this.items.indexOf(deal);
        if (confirm('DO you realy want to delete this?')) {
          this.$axios.delete("/deals/" + deal._id, this.$store.getters.config).then(() => {
            this.$emit("deleted")
            this.items.splice(index, 1)
          }).catch(err => this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red'}))
        }
      },
      showDetails(deal){
        this.prices = deal.prices;
        this.voucher = deal.voucher;
        this.merchant = deal.merchant;
        this.detailsDialog = true;
      },
      formatDate: (date) => new Date(date).toLocaleString(),
      actionkeyUp() {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.initialize, this.doneTypingInterval);
      },
      actionkeyDown() {
        clearTimeout(this.typingTimer);
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
