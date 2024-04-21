<template>
  <div>

    <v-container>
      <v-data-table
        :options.sync='options'
        :headers="headers" 
        :items="allOrders" 
        :search="search" 
        :single-expand="singleExpand" 
        :items-per-page="ordersPerPage" 
        :expanded.sync="expanded" 
        item-key="_id"
        :dense="dense" 
        show-expand 
        class="elevation-1"
      >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> {{title}} </v-toolbar-title>
          <v-spacer></v-spacer>
          <vue-excel-xlsx
            v-if="$route.name === 'en-dashboard-orders'"
            :data="allOrders"
            :columns="headers.map(el => ({
              label: el.text,
              field: el.value,
            }))"
            :filename="'export orders - ' + (new Date()).toLocaleString()">
            <v-btn
              color="green"
              class="ma-2 white--text">
              Export
              <v-icon right>
                mdi-file-excel
              </v-icon>
            </v-btn>
          </vue-excel-xlsx>
          <v-menu offset-y z-index='0' min-width="250" :close-on-content-click='false'>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                dark
                outlined
                v-bind="attrs"
                v-on="on"
              >
                Filters
                <v-icon right small>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-card outlined>
              <v-card-title> Filter By </v-card-title>
              <v-row justify="center">
                <v-col cols='10' class='pa-4'>
                  <v-subheader> Payment </v-subheader>
                  <v-divider></v-divider>
                  <v-radio-group v-model="payFilter">
                    <v-radio
                      v-for="btn in radioButtons"
                      :key="btn.text"
                      :label="`${btn.text}`"
                      :value="btn.value"
                      @change="choseFilter('pay')"
                    ></v-radio>
                  </v-radio-group>
                  <v-subheader> Order Time </v-subheader>
                  <v-divider></v-divider>
                  <!-- Date Pickers -->
                  <v-menu
                    offset-y
                    ref="menu"
                    v-model="dateMenu1"
                    :close-on-content-click="false"
                    :return-value.sync="startDate"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label='start Date'
                        outlined
                        prepend-inner-icon="mdi-calendar-start"
                        dense
                        v-model="startDate"                                                
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="startDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(startDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-menu
                    offset-y
                    ref="menu2"
                    v-model="dateMenu2"
                    :close-on-content-click="false"
                    :return-value.sync="endDate"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endDate"    
                        label='End Date'                                            
                        readonly
                        outlined
                        prepend-inner-icon="mdi-calendar-end"
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="endDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu2.save(endDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-btn block class='my-2' color='primary' small @click="choseFilter('time')">Filter</v-btn>
                  <v-btn block class='my-2' color='error' outlined small @click="timeFilter=false">clear</v-btn>
                </v-col>
              </v-row>
             
            </v-card>
          </v-menu>
          <v-text-field 
            v-model="search" 
            class="mx-5" 
            append-icon="mdi-magnify" 
            label="Search" 
            single-line 
            hide-details 
            :dense="dense"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-container>
            <v-row justify="center">
              <v-col cols='10'>
                <v-card elevation="4">
                    <v-toolbar dense flat color="white">
                    <v-toolbar-title>Deals</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                  <v-data-table 
                    dense 
                    :headers='expandedHeaders' 
                    :items='item.deals'  
                    :items-per-page="20" 
                    elevation='8'>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </td>  
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        <div>
          {{formatDate(item.createdAt)}}
        </div>
      </template>


    </v-data-table>

    </v-container>
  </div>
</template>

<script>
import Moment from "moment";

export default {
  props: {
    title: {
      type: String,
      default: 'Orders List',
    },
  },
  data() {
    return {
      orders: [],
      options: {},
      search: '',
      dateMenu1: false,
      dateMenu2: false,
      timeFilter: false,
      payFilter: false,
      payType: '',
      startDate: '',
      endDate: '',
      dense: true,
      expanded: [],
      singleExpand: true,
      headers: [
        { text: 'Fist Name', value: 'userFirstName', align: 'start'},
        { text: 'Last Name', value: 'userLastName', align: 'start'},
        { text: 'Phone', value: 'userPhone', align: 'start'},
        { text: 'Payment', value: 'status'},
        { text: 'Payment Method', value: 'paymentMethod'},
        { text: 'Order From', value: 'createdAt'},
        { text: 'Total Price', value: 'totalPrice'},
        { text: 'More', value: 'data-table-expand', sortable: false},
      ],
      expandedHeaders: [
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'price' },
        { text: 'Deal', value: 'name' },
        { text: 'Merchant', value: 'merchant.name' },
      ],
      radioButtons: [
        { text: 'None', value: false },
        { text: 'Paid', value: 'paid' },
        { text: 'Pending', value: 'pending' },
      ]
    };
  },

  mounted() {
    this.getOrders();
  },

  watch: {
    options: {
      handler() {
        this.getorders()
      },
      deep: true
    }
  },

  computed: {
    ordersPerPage() {
      if(this.$router.currentRoute.name == 'en-dashboard-orders') {
        return 50;
      }else return 10;
    },
    allOrders() {
      if(this.timeFilter){
        return this.orders.filter(order => {
          let orderCreated = order.createdAt.split('t')[0];
          let orderCreatedDate = new Date(orderCreated).getTime();
          let Start = new Date(this.startDate).getTime();
          let End = new Date(this.endDate).getTime();
          if(orderCreatedDate <= End && orderCreatedDate >= Start) {
            if(this.payFilter != false) {
              if(order.status == this.payFilter){
                return order;
              }
            }else return order;
          }
        }).map(this.mapDataOrder);
      }else if(this.payFilter != false) {
        return this.orders.filter(order => {
          if(order.status == this.payFilter){
              return order;
            }
         }).map(this.mapDataOrder)
      }else return this.orders.map(this.mapDataOrder)
    }
  },

  methods: {
    dateFromNow(d) { return Moment(d).fromNow() },
    mapDataOrder(order) {
      return {
        ...order,
        userFirstName: order.user ? order.user.firstName : '',
        userLastName: order.user ? order.user.lastName : '',
        userPhone: order.user ? order.user.phone : '',
      }
    },
    getOrders() {
      const config = { headers: { authorization: this.$store.getters.token} };

      this.$axios
        .get("orders/", config)
        .then(res => { this.orders.push(...res.data.orders) })
        .catch(err => this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red'}));
    },

    async getorders() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      const nextSlice = this.orders.slice((page - 1) * itemsPerPage, itemsPerPage * page);
      if (page) {
        if (( nextSlice.length < itemsPerPage || this.orders.length === 0) ) {
          this.loading = true;
          const config = {authorization: this.$store.getters.token}
          
          try {
            const res = await this.$axios.$get(`/orders?limit=${page === 1 ? 51 : 50}&skip=${this.orders.length}`,{headers: config})
            this.orders =  [...this.orders, ...res.orders]
              this.users = this.orders.slice(((page - 1) * itemsPerPage), itemsPerPage * page);
          } catch(err) {
            this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red'})
          }
          this.loading = false;
      } else {
        this.users = nextSlice;
      }
      }
    },

    choseFilter(item) {
      if(item == 'time') {
        this.timeFilter = true;
      }else this.timeFilter = false
    },
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
  }
}
</script>

<style>
</style>