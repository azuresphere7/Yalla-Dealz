<template>
  <div>
    <v-card elevation="10">
      <v-card-title>Free coupon</v-card-title>
      <hr>
      <v-alert
        v-model="alert"
        type="error"
        dismissible
        @input="(val) => {
          if (!val) {
            msgError = []
          }
        }"
      >
        <ul>
          <li v-for="(msg, i) in msgError" :key="i"> {{msg}} </li>
        </ul>
      </v-alert>
      <v-card-text>
        <v-form ref="form" v-model="valid" v-if="!isSubmit">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dataCoupon.freeCoupons"
                label="Free coupons"
                :rules="[
                  v => v !== '' || 'Free coupons is required',
                  v => /[0-9]+/gm.test(v) || 'Must be a number',
                ]"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="subscribe"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
      <v-alert
        v-model="isSubmit"
        dismissible
        type="success">
        {{msgSuccess}}
      </v-alert>
      <v-snackbar 
        timeout="3000"
        :color="snackbar.color"
        outlined
        v-model="snackbar.active"
      >
        {{snackbar.text}}
      </v-snackbar>
      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      dataCoupon: {
        id: "",
        freeCoupons: 0,
      },
      loading: false,
      msgError: [],
      alert: false,
      menu: false,
      snackbar: {
        active: false,
        color: '',
        text: ''
      },
      isSubmit: false,
      msgSuccess: '',
    };
  },
  watch: {},
  computed: {},
  methods: {
    async init() {
      try {
        const res = await this.$axios.get("/webSetting", this.configApi);
        this.dataCoupon.id = res.data.data._id;
      } catch (err) {
        if (err.response && err.response.data) {
          this.$store.dispatch('settings/activeMsg', { text: err.response.data.message, color: 'red'})
        }
      }
    },
    async subscribe () {
      this.msgError = []
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      try {
        const res = await this.$axios.post("/webSetting/freeCoupons", this.dataCoupon, this.configApi);
        this.snackbar = {
          active: true,
          color: 'success',
          text: res.data.message
        };
        this.isSubmit = true;
        this.resetDataSub();
        this.msgSuccess = res.data.message;
        this.loading = false;
      } catch (err) {
        if (err.response && err.response.data) {
          const msg = err.response.data.err || err.response.data.message
          this.showError(msg);
        }
        this.loading = false;
      }
    },
    showError(msg) {
      this.msgError.push(msg);
      this.alert = true;
    },
    resetDataSub() {
      this.dataCoupon.freeCoupons = ''
    }
  },
  async mounted() {
    await this.init();
  }
}
</script>

<style>
</style>