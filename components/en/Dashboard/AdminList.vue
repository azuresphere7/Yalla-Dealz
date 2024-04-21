<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation='4'>
          <v-toolbar flat>
            <v-toolbar-title> Admins </v-toolbar-title>
            <v-divider vertical inset class='ma-2 mx-4'></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="m-2"
              :to="{ path: '/en/dashboard/admins' }"
            >
              Create
            </v-btn>
            <v-divider vertical inset class='ma-2 mx-4'></v-divider>
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
            :headers="headers"
            :items="admins"
            :search="search"
          >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              icon
              color="green"
              :to="{ path: '/en/dashboard/admins/', query: { id: item._id } }"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              color="red"
              @click="deleteDeal(item._id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
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
  data() {
    return {
      search: '',
      headers: [
        { text: 'Name', value: 'username', class: 'text-h7'},
        { text: 'E-mail', value: 'email', class: 'text-h7'},
        { text: 'Phone', value: 'phone', class: 'text-h7' },
        { text: 'Role', value: 'role', class: 'text-h7' },
        { text: 'Archived', value: 'isArchived', class: 'text-h7' },
        {
          text: 'Actions',
          value: 'actions',
          class: 'text-h7',
          sortable: false,
          align: 'end',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      admins: 'settings/admins',
    })
  },
  methods: {
    ...mapActions({
      getAdmins: 'settings/getAdmins'
    }),
    async init() {
      try {
        await this.getAdmins()
      } catch (err) {
        let mess = err.message;
        if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
        this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
      }
    },
    async deleteDeal(id) {
      if (confirm('DO you realy want to delete this?')) {
        this.loading = true;
        try {
          await this.$axios.delete("/systemUsers/" + id, this.configApi);
          await this.init();
          this.loading = false;
        } catch (err) {
          this.loading = false;
          let mess = err.message;
          if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
          this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
        }
      }
    }
  },
  async mounted() {
    await this.init()
  },
}
</script>