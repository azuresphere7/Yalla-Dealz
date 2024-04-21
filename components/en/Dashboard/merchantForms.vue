<template>
  <v-container>
    <v-row>
      <v-col class='pa-8'>
        <div class="w-full">
          <snackbar ref="snackbar"></snackbar>
          <v-card flat>
            <v-card-title> Merchant Data </v-card-title>
            <v-card-text>
              <div class="en-merchantForms-content-firstSection">
                <merchantForm
                  ref="mForm"
                  :validateMerchant="validateMerchant"
                  @merchantValidated="merchantFormValidated"
                  :show-map="showMap"
                />
              </div>
            </v-card-text>
          </v-card>
          <v-card flat>
            <v-card-text>
              <contactPerson
                ref="pForm"
                :validateContactPerson="validatePerson"
                @contactPersonValidated="contactPersonFormValidated"
                :show-map="showMap"
              />
            </v-card-text>
          </v-card>
          <v-card-actions class='d-flex justify-center'>
            <v-btn
              v-if="!branches.exist"
              :loading="loading"
              color="primary"
              min-width="180"
              dark
              class='my-4'
              @click="validateMechantForm(); validatePersonForm()">
              Submit
            </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import merchantForm from "~/components/en/Forms/merchantForm";
import contactPerson from "~/components/en/Forms/contactPerson";
import merchantBranches from "~/components/en/Forms/merchantBranches";
import buttonWithColors from "~/components/en/General/buttonWithColors.vue";
import snackbar from "~/components/snackbar.vue";
import MapSearchPlace from "@/components/map-search-place.vue"
import InputMapSearchPlace from "@/components/input-map-search-place.vue"
export default {
  components: {
    merchantForm,
    contactPerson,
    merchantBranches,
    buttonWithColors,
    snackbar,
    MapSearchPlace,
    InputMapSearchPlace
  },
  data() {
    return {
      step: 1,
      branches: {
        exist: false,
        number: 0,
      },
      loading: false,
      validateMerchant: false,
      validatePerson: false,
      mapData: {
        place: null,
        placeLocation: "",
      },
      mapElement: null,
      markers: [],
    };
  },
  computed: {
    showMap() {
      return true;
    },
  },
  methods: {
    toggleBranches() {
      this.branches.exist = !this.branches.exist;
    },
    validateMechantForm() {
      this.validateMerchant = !this.validateMerchant;
    },
    async merchantFormValidated(status) {
      status = true;
      const data = this.$refs.mForm;
      if (!data.location.lat || !data.location.long) {
        this.$store.dispatch('settings/activeMsg', {text: ' Sorry, Please fill the location field', color: 'error'});
      }
      const formDataa = new FormData();
      formDataa.append("image", data.image);
      let config = {
        headers: {
          authorization: this.$store.getters.token,
          "Content-Type": `application/json'; boundary=${formDataa._boundary}`,
        },
      };
      try {
        const response = await this.$axios.post("/upload/image", formDataa, config)
        const mData = {
          name: data.Name,
          arName: data.arName,
          phone: data.Phone,
          email: data.Email,
          address: data.Address,
          arAddress: data.arAddress,
          location: data.location,
          category: data.Category,
          username: data.username,
          password: data.password,
          website: data.website,
          facebook: data.socialMediaLinks.facebook,
          youtube: data.socialMediaLinks.youtube,
          instagram: data.socialMediaLinks.instagram,
          accountType: data.AccountType,
          image: response.data.dataimages[0].imageUrl,
        };
        const paymentData = { payments: data.payments };
        if (status) {
          this.$store.commit("merchnatForm", mData);
          this.$store.commit("paymentMerchantForm", paymentData);
          this.$store.commit("updateFirstOne", true);
          this.step = 2;
        } else {
          this.$store.dispatch('settings/activeMsg', { text: 'Please check for required fields', color: 'error'});
        }
      } catch (err) {
        this.loading = false;
        let mess = err.message;
        if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
        this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
      }
    },
    validatePersonForm() {
      this.validatePerson = !this.validatePerson;
    },
    async contactPersonFormValidated(status) {
      if (status == true) {
        const data = this.$refs.pForm._data;
        const cData = {
          name: data.contactPerson.name,
          phone: data.contactPerson.phone,
          email: data.contactPerson.email,
          location: data.contactPerson.location,
          jobTitle: data.contactPerson.jobTitle,
          payOutBy: data.contactPerson.payOutBy,
        };
        this.$store.commit("contactPerson", cData);
        this.$store.commit("updateSecondOne", true);
        await this.sendDataWithoutBranches();
      }
    },
    contactPFormValidated(status) {
      if (status == true) {
        const data = this.$refs.pForm._data;
        const cData = {
          name: data.contactPerson.name,
          phone: data.contactPerson.phone,
          email: data.contactPerson.email,
          location: data.contactPerson.location,
          jobTitle: data.contactPerson.jobTitle,
          payOutBy: data.contactPerson.payOutBy,
        };
        this.$store.commit("contactPerson", cData);
        this.$store.commit("updateSecondOne", true);
      }
    },
    async submitMerchant() {
      this.loading = true;
      let merchantData = this.$store.state.merchantData;
      let config = {
        headers: {
          authorization: this.$store.getters.token,
          "Content-Type": "application/json",
        },
      };
      this.contactPFormValidated(true);
      try {
        await this.$axios.post("/merchants", merchantData, config)
        this.success = "Added Successfully!";
        this.loading = false;
        this.$refs.snackbar.open("Added Successfully!", 4500, "info");
        this.$router.push("/en/dashboard/merchants");
      } catch (err) {
        this.loading = false;
        let mess = err.message;
        if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
        this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
      }
    },
    async sendDataWithoutBranches() {
      this.loading = true;
      if (
        this.$store.state.merchantForms.firstOne &&
        this.$store.state.merchantForms.secondOne &&
        !this.branches.exist
      ) {
        let merchantData = this.$store.state.merchantData;
        delete merchantData.branches;
        let config = {
          headers: {
            authorization: this.$store.getters.token,
            "Content-Type": "application/json",
          },
        };
        try {
          const result = await this.$axios.post("/merchants", merchantData, config)
          await this.$axios.post("/payments", {
            merchant: result.data.data._id,
            payment: this.$store.state.paymentMerchData,
          }, config);
          this.success = "Added Successfully!";
          this.loading = false;
          this.$refs.snackbar.open("Added Successfully!", 4500, "info");
          this.$router.push("/en/dashboard/merchants");
        } catch (err) {
          this.loading = false;
          let mess = err.message;
          if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
          this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
        }
      } else {
        this.loading = false;
        this.error = "Some Data is missing, please re-confirm the forms";
        this.$refs.snackbar.open("Some Data is missing, please re-confirm the forms", 4500, "error");
      }
    },
  },
};
</script>

<style scoped>
.w-full {
  width: 100%;
}
</style>
