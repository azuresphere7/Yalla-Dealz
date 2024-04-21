<template>
  <v-container>
    <v-card elevation="10">
      <v-card-title>Subscription</v-card-title>
      <v-alert
        v-model="alert"
        v-if="msgError.length"
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
        <hr class="mb-3">
        <v-form ref="form" v-model="valid">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dataSub.name"
                label="Name"
                :rules="[
                  v => !!v || 'Name is required'
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dataSub.arName"
                label="الصياغة"
                :rules="[
                  v => !!v || 'مطلوب اسم'
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dataSub.proidString"
                label="Package Period"
                :rules="[
                  v => !!v || 'Package Period is required'
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dataSub.arProidString"
                label="فترة الحزمة"
                :rules="[
                  v => !!v || 'فترة الحزمة مطلوبة'
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="dataSub.totalPrice"
                label="Total price"
                :rules="[
                  v => v !== '' || 'Total price is required',
                  v => /[0-9]+/gm.test(v) || 'Must be a number',
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="dataSub.netPrice"
                label="Net price"
                :rules="[
                  v => v !== '' || 'Net price is required',
                  v => /[0-9]+/gm.test(v) || 'Must be a number',
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="dataSub.oneDealAllowedCount"
                label="Number of authorized transactions"
                :rules="[
                  v => v !== '' || 'Number of authorized transactions is required',
                  v => /[0-9]+/gm.test(v) || 'Must be a number',
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="dataSub.numberCoupon"
                label="Number coupon"
                :rules="[
                  v => v !== '' || 'Number coupon is required',
                  v => /[0-9]+/gm.test(v) || 'Must be a number',
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="dataSub.numberProid"
                label="Number proid"
                :rules="[
                  v => v !== '' || 'Number proid is required',
                  v => /[0-9]+/gm.test(v) || 'Must be a number',
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="dataSub.discount"
                label="Discount"
                :rules="[
                  v => v !== '' || 'Discount is required',
                  v => /[0-9]+/gm.test(v) || 'Must be a number',
                ]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12">
              <v-row dense>
                <v-col cols="12" md="3">
                  <InputFileImage v-model="image"/>
                </v-col>
                <v-col cols="12" md="9">
                  <v-row dense align="center">
                    <v-col cols="12">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="dataSub.expire"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dataSub.expire"
                            label="Expire"
                            :rules="[
                              v => !!v || 'Expire is required'
                            ]"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dataSub.expire"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(dataSub.expire)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model.number="dataSub.points"
                        label="Points"
                        :rules="[
                          v => v !== '' || 'Points is required',
                          v => /[0-9]+/gm.test(v) || 'Must be a number',
                        ]"
                        outlined
                        dense
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="dataSub.description"
                placeholder="Description"
                :rules="[
                  v => !!v || 'Description is required'
                ]"
                outlined
                dense
              >
              </v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="dataSub.arDescription"
                placeholder="وصف"
                :rules="[
                  v => !!v || 'الوصف مطلوب'
                ]"
                outlined
                dense
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-btn
            class="mr-4"
            @click="$router.go(-1)"
          >
            Go back
          </v-btn>
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
  </v-container>
</template>

<script>
import InputFileImage from "~/components/en/General/InputFileImage"
import { ImageUploadService } from '@/services/image-upload.service'

export default {
  components: {
    InputFileImage,
  },
  data() {
    return {
      valid: false,
      dataSub: {
        name: "",
        arName: "",
        proidString: "",
        arProidString: "",
        totalPrice: 0,
        netPrice: 0,
        oneDealAllowedCount: 0,
        numberCoupon: 0,
        numberProid: 0,
        discount: 0,
        image: "",
        expire: "",
        description: "",
        arDescription: "",
        tags: [],
        points: 0,
      },
      items: ["3month", "col"],
      image: {},
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
      id: '',
    };
  },
  watch: {},
  computed: {},
  methods: {
    async subscribe () {
      this.msgError = []
      this.alert = false
      if (!this.$refs.form.validate()) return;
      if (!this.image.base64) {
        this.showError('Image is required');
        return;
      }
      this.loading = true;
      try {
        if (!this.image.base64.includes('http')) {
          this.dataSub.image = await ImageUploadService.uploadImage(this.image.file);
        }
        let res = {};
        if (this.id) {
          delete this.dataSub._id;
          delete this.dataSub.isArchived;
          delete this.dataSub.createdAt;
          delete this.dataSub.updatedAt;
          delete this.dataSub.__v;
          res = await this.$axios.put("/subscriptionSetting/" + this.id, this.dataSub, this.configApi);
        }
        else res = await this.$axios.post("/subscriptionSetting", this.dataSub, this.configApi); 
        this.snackbar = {
          active: true,
          color: 'success',
          text: res.data.message
        };
        this.$refs.form.reset();
        this.$router.push({ path: '/en/dashboard/subscriptions' })
        this.msgSuccess = res.data.message;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        let mess = err.message;
        if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
        this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
      }
    },
    showError(msg) {
      this.msgError.push(msg);
      this.alert = true;
    }
  },
  async created() {
    this.id = this.$route.params.id === 'edit' ? '' : this.$route.params.id;
    if (this.id) {
      this.dataSub = (await this.$axios.$get('/subscriptionSetting/' + this.id, this.configApi)).data;
      this.image = {
        base64: this.dataSub.image
      };
      this.dataSub.expire = new Date(this.dataSub.expire).toLocaleString()
    }
  },
}
</script>

<style>
</style>