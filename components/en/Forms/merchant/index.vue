<template>
  <v-container elevation="10">
    <v-card>
      <v-card-title>
        Merchant Data
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="valid">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-form-textbox"
                v-model="merchantData.name"
                :rules="[
                  (v) => !!v || 'Merchant Name is required',
                ]"
                label="Merchant Name"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-translate"
                v-model="merchantData.arName"
                :rules="[
                  (v) => !!v || 'Arabic Merchant Name is required',
                ]"
                label="Arabic Merchant Name"
                required
              />                    
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-cellphone"
                v-model="merchantData.phone"
                :rules="[
                  (v) => !!v || 'Phone Number is required',
                  (v) => (v && /^[0-9]+$/.test(v)) || 'Phone Number must be digits only',
                ]"
                label="Phone Number"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-email"
                v-model="merchantData.email"
                label="Email"
                :rules="[
                  (v) => !!v || 'E-mail is required',
                  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ]"
                required
              />                    
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-map-marker"
                v-model="merchantData.address"
                label="Address"
                :rules="[(v) => !!v || 'Address is required']"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-translate"
                v-model="merchantData.arAddress"
                label="Address in Arabic"
                :rules="[(v) => !!v || 'arAddress is required']"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                outlined dense
                prepend-icon="mdi-format-list-bulleted-type"
                v-model="merchantData.category"
                label="Category"
                :rules="[(v) => !!v || 'Category is required']"
                required
                :items="flatCategories"
                item-value="_id"
                item-text="name"
              />
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-direction-column">
              <header class="text-h6 ml-md-8">Account Type:</header>
              <v-radio-group
                v-model="merchantData.accountType"
                row class="ml-4 mt-0"
                :rules="[(v) => !!v || 'Account Type is required']">
                <v-radio
                  v-for="accType in accTypes"
                  :key="accType.val"
                  :label="accType.name"
                  :value="accType.val"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                outlined dense
                prepend-icon="mdi-web"
                v-model="merchantData.website"
                label="Website"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                outlined dense
                prepend-icon="mdi-facebook"
                v-model="merchantData.socialMediaLinks.facebook"
                label="Facebook"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                outlined dense
                prepend-icon="mdi-youtube"
                v-model="merchantData.socialMediaLinks.youtube"
                label="Youtube"
              />

            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                outlined dense
                prepend-icon="mdi-instagram"
                v-model="merchantData.socialMediaLinks.instagram"
                label="Instagram"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-account"
                v-model="merchantData.username"
                :rules="[(v) => !!v || 'Username is required']"
                label="Username"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-lock"
                v-model="merchantData.password"
                :rules="[(v) => !!v || 'Password is required']"
                label="Password"
                required
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              /> 
            </v-col>
            <v-col cols="12">
              <map-search-place
                :location="merchantData.location"
                @onSelectedNewPlace="handleSelectedNewPlace"
                :msgError="msgErrorLocation"/>
            </v-col>
            <v-col cols="12">
              <InputFileImage
                v-model="image"
                :error="errorImage"
                label="Pick a logo"
                icon="mdi-camera"/>
            </v-col>
          </v-row>
          <div v-if="paymentMerchData.length">
            <hr>
            <v-card-title>
              <v-btn color="primary" small @click="addPayment()">Add Payment</v-btn>
            </v-card-title>
            <v-card-text v-if="paymentMerchData.length">
              <v-card outlined v-for="(payment, index) in paymentMerchData" :key="index">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field
                        outlined dense
                        prepend-icon="mdi-cash" 
                        v-model="payment.amount"
                        :rules="[
                          (v) => !!v || 'Amount is required',
                          (v) => (v && /^[0-9]+$/.test(v)) || 'Amount must be digits only',
                        ]"
                        label="Amount"/>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        outlined dense
                        prepend-icon="mdi-calender" 
                        v-model="payment.dateGet"  
                        label="Date"
                        :rules="[(v) => !!v || 'Date is required']"
                        type="datetime-local"/>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined dense
                        prepend-icon="mdi-account-convert" 
                        v-model="payment.description"
                        :rules="[(v) => !!v || 'By who is required']"
                        label="By who"/>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-btn
                      color="error"
                      small
                      @click="paymentMerchData.splice(index, 1)">remove</v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-card-text>
          </div>
          <hr>
          <v-card-title>
            Merchant's Contact
          </v-card-title>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-form-textbox"
                v-model="merchantData.contactPerson.name"
                :counter="20"
                :rules="[
                  (v) => !!v || 'Person Name is required',
                  (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ]"
                label="Person Name"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-cellphone"  
                v-model="merchantData.contactPerson.phone"
                :rules="[
                  (v) => !!v || 'Phone Number is required',
                  (v) => (v && /^[0-9]+$/.test(v)) || 'Phone Number must be digits only',
                ]"
                label="Phone Number"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-email"
                v-model="merchantData.contactPerson.email"
                label="Email"
                :rules="[
                  (v) => !!v || 'E-mail is required',
                  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ]"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined dense
                prepend-icon="mdi-account-box"
                v-model="merchantData.contactPerson.jobTitle"
                label="Job Title"
                :rules="[(v) => !!v || 'Job Title is required']"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-select
                outlined dense
                prepend-icon="mdi-credit-card-outline"                  
                v-model="merchantData.contactPerson.payOutBy"
                label="Payout By"
                :rules="[(v) => !!v || 'Payout by is required']"
                required
                :items="payOut"
                item-value="val"
                item-text="name"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class='d-flex justify-center'>
        <v-btn
          min-width="180"
          class='my-4'
          to="/en/dashboard/merchants">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          min-width="180"
          dark
          class='my-4'
          @click="submit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import MapSearchPlace from '@/components/map-search-place.vue';
import { ImageUploadService } from '@/services/image-upload.service';
import InputFileImage from "~/components/en/General/InputFileImage";

export default {
  components: {
    MapSearchPlace,
    InputFileImage,
  },
  data() {
    return {
      valid: true,
      loading: false,
      merchantData: {
        name: "",
        arName:"",
        phone: "",
        email: "",
        address: "",
        arAddress:"",
        location: {},
        category: "",
        username: "",
        password: "",
        accountType: "",
        image: "",
        website: "",
        socialMediaLinks: {
          facebook: "",
          youtube: "",
          instagram: "",
        },
        contactPerson: {
          name: "",
          jobTitle: "",
          phone: "",
          email: "",
          location: {},
          payOutBy: "",
        },
      },
      flatCategories: [],
      paymentMerchData: [{
        dateGet: '',
        amount: '',
        description: '',
      }],
      accTypes: [
        { name: "Premium", val: "Premium", },
        { name: "Free", val: "Free", }
      ],
      payOut: [
        { name: "Cheque", val: "cheque", },
        { name: "Cash", val: "cash", }
      ],
      image: {
        base64: '',
        file: null,
      },
      errorImage: false,
      msgErrorLocation: '',
      showPassword: false,
    }
  },
  computed: {},
  methods: {
    addPayment() {
      this.paymentMerchData.push({
        dateGet: '',
        amount: '',
        description: '',
      })
    },
    flattenCategoriesRecursively (items) {
      this.flatCategories = items.reduce((acc, currVal) => {
        acc.push(currVal);
        if (currVal.root.length) acc.push(...currVal.root);
        return acc;
      }, []);
    },
    handleSelectedNewPlace(data) {
      this.merchantData.location = data.location;
    },
    externValidation() {
      let valid = true;
      this.msgErrorLocation = '';
      this.errorImage = false;
      if (!this.merchantData.location.lat || !this.merchantData.location.long) {
        valid = false;
        this.msgErrorLocation = 'Location is require';
      }
      if (!this.image.base64) {
        valid = false;
        this.errorImage = true;
      }
      return valid;
    },
    async submit() {
      const valid = this.externValidation();
      if (!this.$refs.form.validate() || !valid) {
        this.$store.dispatch('settings/activeMsg', { text: 'Form Not Valid', color: 'red'})
        return;
      }
      this.loading = true;
      try {
        if (this.image.base64.includes('data:image')) {
          this.merchantData.image = await ImageUploadService.uploadImage(this.image.file);
        }
        if (this.$route.params.idEdit) {
          await this.$axios.put("/merchants/" + this.$route.params.idEdit, this.merchantData, this.configApi);
        } else {
          const result = await this.$axios.post("/merchants", this.merchantData, this.configApi)
          try {
            await this.$axios.post("/payments", {
              merchant: result.data.data._id,
              payment: this.paymentMerchData,
            }, this.configApi);
          } catch (error) {
            this.displayError(err);
          }
        }
        this.loading = false;
        this.$router.push("/en/dashboard/merchants");
      } catch (err) {
        this.loading = false;
        this.displayError(err);
      }
    }
  },
  async mounted() {
    const result = await this.$axios.$get("/categories", this.configApi);
    this.flattenCategoriesRecursively(result.data);
    if (this.$route.params.idEdit) {
      const data = (await this.$axios.get("/merchants/" + this.$route.params.idEdit , this.configApi)).data;
      this.paymentMerchData = [];
      this.merchantData = {
        name: data.merchant.name,
        arName:data.merchant.arName,
        phone: data.merchant.phone,
        email: data.merchant.email,
        address: data.merchant.address,
        arAddress: data.merchant.arAddress,
        location: data.merchant.location,
        category: data.merchant.category,
        username: data.merchant.username,
        password: data.merchant.password,
        accountType: data.merchant.accountType,
        image: data.merchant.image,
        website: data.merchant.website,
        socialMediaLinks: data.merchant.socialMediaLinks,
        contactPerson: data.merchant.contactPerson,
      };
      this.image.base64 = data.merchant.image;
    }
  }
}
</script>

<style>

</style>