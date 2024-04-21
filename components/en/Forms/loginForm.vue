<template>
  <div class="en-loginForm">
    <div class="en-loginForm-errors">
      <div
        v-for="error in errors"
        :key="error.message"
        class="en-loginForm-errors-error"
      >
        <notification notfi-color="redNotfi">
          {{ 'Authentication Failed !!' }}
        </notification>
      </div>
    </div>
    <form class="en-loginForm-content" @submit.prevent="loginCheck">
      <div class="en-loginForm-content-row">
        <v-text-field
          v-model="username"
          outlined
          class='rounded-xl'
          color="success"
          prepend-inner-icon="mdi-shield-account"
          label="Your name"
          :counter="12"
          :rules="[
            (v) => !!v || 'Name is required',
            (v) =>
              (v && v.length <= 12) || 'Name must be less than 12 characters',
          ]"
          required
          @input="setUsername"
        />
      </div>
      <div class="en-loginForm-content-row">
        <v-text-field
          v-model="password"
          outlined
          class='rounded-xl'
          color="success"
          prepend-inner-icon="mdi-lock"
          label="Your Password"
          :type="show1 ? 'text' : 'password'"
          :rules="[(v) => !!v || 'Password is required']"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          required
          @input="setPassword"
          @click:append="show1 = !show1"
        />
      </div>
      <v-btn dark color='#C62828' class='rounded-xl' block type='submit'>Login</v-btn>
    </form>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar 
      timeout="3000"
      :color='snackbar.color'
      outlined
      :value='snackbar.active'
      @input="actionActiveMsg({ active: false })"
    >
      {{snackbar.text}}
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from "vuelidate/lib/validators"
// import inputWithIcon from "~/components/en/General/inputWithIcon.vue"
import buttonWithColors from "~/components/en/General/buttonWithColors.vue"
import notification from "~/components/en/General/notification.vue"

export default {
  name: "LoginForm",
  components: {
    // inputWithIcon,
    buttonWithColors,
    notification,
  },
  data () {
    return {
      username: "",
      loginField: "",
      password: "",
      show1: false,
      loading: false,
      errors: [],
    }
  },
  computed: {
    ...mapGetters({
      snackbar: 'settings/snackbar'
    })
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions({
      actionActiveMsg: 'settings/activeMsg'
    }),
    setUsername (value) {
      this.username = value
      this.$v.username.$touch()
    },
    setPassword (value) {
      this.password = value
      this.$v.password.$touch()
    },
    async loginCheck () {
      const userData = {
        loginField: this.username,
        password: this.password,
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR"
      } else {
        this.loading = true;
        try {
          const result = await this.$axios.post("/systemUsers/login", userData);
          this.$store.commit("setToken", result.data.token);
          this.$store.commit("settings/setUserAdminId", result.data.id, { root: true });
          // localStorage.setItem("token", result.data.token);
          const config = {
            headers: {
              authorization: result.data.token,
            }
          }
          const user = (await this.$axios.$get('systemUsers/' + result.data.id, config)).user;
          this.$store.commit("setUsername", user.name);
          this.$store.commit("setTokenExpiration", new Date().getTime() + 3600 * 1000);
          // localStorage.setItem("id", result.data.id);
          // localStorage.setItem("username", user.name);
          // localStorage.setItem("tokenExpiration", new Date().getTime() + 3600 * 1000);
          this.$router.push("/en/dashboard");
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
}
</script>

<style lang="scss" scoped>
.en-loginForm {
  &-errors {
    width: 80%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-error {
      width: auto;
      text-align: center;
    }
  }
}
.en-loginForm-content {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 190px;
  &-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &-element {
      width: 400px;
    }
  }
  &-button {
    width: 300px;
    &-TheButton {
      width: 100px;
      float: right;
    }
  }
}
@media (max-width: 992px) {
  .en-loginForm-content {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height: 190px;
    &-row {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-element {
        width: 400px;
      }
    }
    &-button {
      width: 80%;
      display: flex;
      justify-content: flex-end;
      &-TheButton {
        width: 100px;
      }
    }
  }
}
</style>
