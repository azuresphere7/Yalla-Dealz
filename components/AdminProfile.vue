<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Admin Information</v-card-title>
          <v-divider></v-divider>
          <v-row justify="center" class=''>
            <v-col cols='12' md='7' v-if="user">
              <h6 class="my-4">
                <v-icon left>mdi-account-details</v-icon>
                Admin User Name : {{user.name}}
              </h6>
              <h6 class="my-4">
                <v-icon left>mdi-email</v-icon>
                Admin E-Mail : {{user.email}}
              </h6>
              <h6 class="my-4">
                <v-icon left>mdi-form-textbox</v-icon>
                Admin Name : {{user.username}}
              </h6>
              <h6 class="my-4">
                <v-icon left>mdi-cellphone</v-icon>
                Admin Phone : {{user.phone}}
              </h6>
              <h6 class="my-4">
                <v-icon left>mdi-card-account-details</v-icon>
                Admin Role : {{user.role}}
              </h6>
            </v-col>
          </v-row>
          
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <admin-reset-pass></admin-reset-pass>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import AdminResetPass from '~/components/en/Forms/AdminResetPass.vue';

export default {
  components: {
    AdminResetPass
  },
  data() {
    return{
      user: {},
    }
  },
  computed: {},
  methods: {
  },
  async mounted() {
    try {
      this.user = (await this.$axios.$get('systemUsers/' + this.$store.getters['settings/userAdminId'], this.configApi)).user;
    } catch (err) {
      this.displayError(err);
    }
  },
}
</script>