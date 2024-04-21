<template>
  <v-container>
    <v-row justify="center">
      <v-col cols='10'>
        <v-card elevation='4'>
          <v-toolbar flat>
            <v-toolbar-title> Promotion Codes </v-toolbar-title>
            <v-divider vertical inset class='ma-2 mx-4'></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
          <v-divider></v-divider>
          <v-data-table 
            :headers='headers' 
            :items='items'  
            :search="search" 
            :items-per-page="50"
          >
          <template v-slot:item.expirationDate="{ item }">
              {{item.expirationDate.split("T")[0]}}
          </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  mounted() {
    this.getItems()
      .then(res => console.log(this.items))
      .catch(err => this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red'}));  
  },

  data() {
    return {
      search: '',
      headers: [
        { text: 'Description', value: 'description', class: 'text-h6'},
        { text: 'Code', value: 'code', class: 'text-h6'},
        { text: 'Status', value: 'status', class: 'text-h6' },
        { text: 'Type', value: 'type', class: 'text-h6' },
        { text: 'Value', value: 'value', class: 'text-h6' },
        { text: 'Expiration Date', value: 'expirationDate', class: 'text-h6' },
        
      ]
    }
  },

  computed: {
    ...mapGetters({
      items: 'promoCode/codes',
    })
  },

  methods: {
    ...mapActions({
      getItems: 'promoCode/getCodes'
    })
  },
}
</script>