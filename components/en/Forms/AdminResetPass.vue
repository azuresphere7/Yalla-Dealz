<template>
  <v-row justify="center">
    <v-col cols='5'>
      <v-card flat class='pa-4'>
        <h6> Reset Admins Password </h6>
        <v-form ref="form" @submit.prevent='resetPassword'>
          <v-text-field 
            outlined 
            dense 
            v-model="newPass"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            label="New Password"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-card-actions class='d-flex justify-center'>
            <v-btn type='submit' color='primary' width='150'>Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      show1: false,
      newPass: '',

      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      actionLogout: 'logout',
    }),
    async resetPassword() {
      if (!this.$refs.form.validate()) return;
      try {
        await this.$axios.put('systemUsers/' + this.$store.getters['settings/userAdminId'], { password: this.newPass }, this.configApi);
        this.actionLogout();
        this.$router.push("/");
      } catch (err) {
        this.displayError(err);
      }
    }
  },
}
</script>