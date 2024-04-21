<template>
<v-container >
  <v-alert
    v-if="showAlert"
    prominent
    rounded=""
    :type="alertType"
    dismissible
  >
    <v-row align="center">
      <v-col class="grow">{{alertContent}}</v-col>
    </v-row>
  </v-alert>
  <v-data-table 
    dense
    v-model="selected"
    :headers="headers" 
    :items="users"
    item-key="_id"
    :items-per-page="perPage"  
    :options.sync="options"
    :server-items-length="allusers" 
    :loading="loading" 
    class="elevation-5" 
    :footer-props="{
      itemsPerPageOptions: rowsPerPage
    }"
    show-select>
    <!-- top -->
    <template v-slot:top>
      
      <v-toolbar class="mb-5" flat color="white">
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- <v-menu offset-y z-index='0' min-width="450" :close-on-content-click='false'>
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
            <v-row>
              <v-col cols='5' class='pl-8'>
                <v-subheader> User Has </v-subheader>
                <v-divider></v-divider>
                <v-list class='px-4'>
                  <v-list-item
                    v-for="(item, index) in filterItems"
                    :key="index"
                    @click='choseFilter(item)'
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols='7' class='pr-8'>
                <v-subheader> User Creation Time </v-subheader>
                <v-divider></v-divider>
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
        </v-menu> -->
        <v-btn
          color="primary"
          dark
          class="m-2"
          v-if="selected.length > 0"
          @click="deleteItem()"
        >
          Delete
        </v-btn>
        <v-divider
          class="mx-4"
          inset
          vertical
          v-if="selected.length > 0">
        </v-divider>
        <v-text-field
          v-model="searchByName"
          class="mr-5"
          append-icon="mdi-magnify"
          label="Search by name"
          single-line
          hide-details
          @keyup.native="actionkeyUp"
          @keydown.native="actionkeyDown"
        >
        </v-text-field>
        <v-text-field
          v-model="searchByPhone"
          class="mr-5"
          append-icon="mdi-magnify"
          label="Search by phone"
          single-line
          hide-details
          @keyup.native="actionkeyUp"
          @keydown.native="actionkeyDown"
        >
        </v-text-field>
        <v-dialog v-model="dialog" max-width="700px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastName" label="Last name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" :rules="emailRules" label="Email" required autocomplete="off"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.birthDate" label="Birth Date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.gender" label="Gender"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addToWalletDialog" max-width="300px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ atwFormTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="chargeAmount" label="Amount"></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeWalletDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveWallet">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- looged by column -->
    <template v-slot:[`item.loggedIcon`]="{ item }">
      <v-icon v-if="item.googleId" color="#dd4b39">mdi-google</v-icon>
      <v-icon v-if="item.facebookId" color="#3b5998">mdi-facebook</v-icon>
      <v-icon v-if="item.appleId" color="#000">mdi-apple</v-icon>
    </template>

    <!-- actions column -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon color="green" class="mr-2" @click="addToWallet(item)">mdi-wallet-plus</v-icon>
      <v-icon color="red" @click="deleteItem([item._id])">mdi-delete</v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="getData">Reset</v-btn>
    </template>
  </v-data-table>
</v-container>
  
</template>

<script>
export default {
  name: "Users",

  data () {
    return {
      users: [],
      totalUsers : [],
      menuFilteredUsers: [],
      menuFilter: false,
      headerFilter: false,
      timeFilter: false,
      headerSortBy: [],
      menuItem: '',
      dateMenu1: false,
      dateMenu2: false,
      startDate: '',
      endDate: '',
      options: {},
      headers: [
        { text: 'First Name', value: 'firstName', align: 'start', class: 'text-h7'},
        { text: 'Last name', value: 'lastName', class: 'text-h7'},
        { text: 'Logged By', value: 'loggedIcon', align: 'center', class: 'text-h7', sortable: false},
        { text: 'Phone', value: 'phone', class: 'text-h7', sortable: false},
        { text: 'Email', value: 'email', class: 'text-h7', sortable: false},
        { text: 'Birth Date', value: 'birthDate', class: 'text-h7', sortable: false},
        { text: 'Gender', value: 'gender', align: 'center', class: 'text-h7', sortable: false},
        { text: 'Actions', value: 'actions', align: 'center', class: 'text-h7', sortable: false}
      ],
      filterItems: [
        'None',
        'Email',
        'Phone',
        'Google ID',
        'Facebook ID',
        'Apple ID'
      ],
      search: '',
      loading: false,
      dialog: false,
      addToWalletDialog: false,
      dense: false,
      editedIndex: -1,
      editedItem: {
        firstName: '',
        lastName: '',
        password: '',
        phone: 0,
        email: '',
        birthDate: 0,
        gender: '',
      },
      defaultItem: {
        firstName: '',
        lastName: '',
        password: '',
        phone: 0,
        email: '',
        birthDate: 0,
        gender: '',
      },
      selectedUser: undefined,
      chargeAmount: 0,
      showAlert: false,
      alertType: 'success',
      alertContent: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      selected: [],
      searchByName: '',
      searchByPhone: '',
      typingTimer: null,
      doneTypingInterval: 2000,
      perPage: 20,
      rowsPerPage: [20, 30, 40, 50],
      allusers: 0,
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    addToWalletDialog(val) {
      val || this.close();
    },
    options: {
      async handler(val) {
        this.perPage = val.itemsPerPage;
        await this.getData()
      },
      deep: true
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add New User' : 'Edit User'
    },
    atwFormTitle () {
      return 'Add To Wallet'
    },
    /* filteredUsers() {
      if(this.menuFilter) {
         switch (this.menuItem) {
          case 'Email':  
            return this.totalUsers.filter(user => {
              if(user.email) return user;
            });
            break;
          case 'Phone': { 
            return this.totalUsers.filter(user => {
              if(user.phone) return user;
            });
            break;
          }
          case 'Google ID': { 
            return this.totalUsers.filter(user => {
              if(user.googleId) return user;
            });
            break;
          }
          case 'Facebook ID': { 
            return this.totalUsers.filter(user => {
              if(user.facebookId) return user;
            });
            break;
          }
          case 'Apple ID': { 
            return this.totalUsers.filter(user => {
              if(user.appleId) return user;
            });
            break;
          }
          case 'None': {
            this.menuFilter = false;
            break;
          }
        }
      }else if(this.headerFilter) {
        if(this.headerFilter == 1){
          return this.users.sort((a, b) => {
            var nameA = a[`${this.headerSortBy[0]}`].toUpperCase(); // ignore upper and lowercase
            var nameB = b[`${this.headerSortBy[0]}`].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });

        }else if(this.headerFilter == 2) {
          return this.users.sort((a, b) => {
            var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
            var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            return 0;
          });
        }else return users;

      }else if(this.timeFilter) {
        return this.totalUsers.filter(user => {
          let userCreated = user.createdAt.split('t')[0];
          let userCreatedDate = new Date(userCreated).getTime();
          let Start = new Date(this.startDate).getTime();
          let End = new Date(this.endDate).getTime();
          if(userCreatedDate <= End && userCreatedDate >= Start) {
            return user;
          }
        })
      }else {
        const pattern = this.search.toLowerCase();
        if (!this.search) return this.users;
        return this.totalUsers.filter(user => {
          return this.headers.some(header => user[header.value] && user[header.value].includes(pattern))
        });

      }
    } */
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const result = await this.$axios.$get(`/user/getUsers`, {
          ...this.configApi,
          params: {
            name: this.searchByName,
            phone: this.searchByPhone,
            limit: this.perPage,
            skip: this.options.page - 1,
          }
        })
        this.allusers = result.allusers;
        this.users = result.users;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        let mess = err.message;
        if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
        this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
      }
    },
    actionkeyUp() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.getData, this.doneTypingInterval);
    },
    actionkeyDown() {
      clearTimeout(this.typingTimer);
    },
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    addToWallet(item) {
      this.selectedUser = Object.assign({}, item)
      this.addToWalletDialog = true;
    },
    async deleteItem(ids = this.selected.map(el => el._id)) {
      if (confirm('DO you realy want to delete this?')) {
        if (!ids.length) return;
        this.loading = true;
        try {
          await this.$axios.delete("/user/delete/hard", { data: { users: ids }, ...this.configApi });
          this.selected = [];
          await this.getData();
          this.loading = false;
        } catch (err) {
          this.loading = false;
          let mess = err.message;
          if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
          this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
        }
      }
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeWalletDialog() {
      this.addToWalletDialog = false;
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
    async saveWallet() {
      const amount = this.chargeAmount;
      if (amount > 0) {
        this.loading = true;
        const config = {authorization: this.$store.getters.token}
        try {
          const res = await this.$axios.$put(`/webSetting/user/wallet/${this.selectedUser._id}`,{amount},{headers: config});
          this.closeWalletDialog();
          this.alertContent = 'User wallet charged successfully';
        } catch(err) {
          this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red'})
        }
        this.showAlert = true;
        this.loading = false;
      }
    },
    choseFilter(item){
      if(item == 'None') {
        this.menuFilter = false;
      }else if(item == 'time'){
        this.timeFilter = true;
        this.menuFilter = false;
      }else{
        this.menuFilter = true;
        this.menuItem = item;
      }
    },
  },
  async created () {
    await this.getData();
  },
}
</script>

<style scoped></style>
