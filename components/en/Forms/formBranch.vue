<template>
  <div class="en-singleBranch">
    <v-card class="pa-5 mb-5">
      <v-row dense>
        <v-col cols="12" md="6">
          <v-select
            prepend-icon="mdi-shopping"
            outlined
            dense
            v-model="branchData.merchant"
            label="Merchant"
            :rules="[(v) => !!v || 'Merchant is required']"
            required
            :items="merchants"
            item-value="_id"
            item-text="name"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            prepend-icon="mdi-form-textbox"
            outlined
            dense
            v-model="branchData.name"
            :success="!!branchData.name"
            :rules="[(v) => !!v || 'Branch Name is required']"
            label="Branch Name"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            prepend-icon="mdi-translate"
            outlined
            dense
            v-model="branchData.arName"
            :success="!!branchData.arName"
            :rules="[(v) => !!v || 'Arabic Name is required']"
            label="Arabic Branch Name"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            prepend-icon="mdi-cellphone"
            outlined
            dense
            v-model="branchData.phone"
            :success="!!branchData.phone"
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
            prepend-icon="mdi-email"
            outlined
            dense
            v-model="branchData.email"
            :success="!!branchData.email"
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
            prepend-icon="mdi-lock"
            outlined
            dense
            v-model="branchData.password"
            :success="!!branchData.password"
            :rules="[(v) => !!v || 'Password is required']"
            label="Password"
            required
            type="password"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            prepend-icon="mdi-office-building-marker"
            outlined
            dense
            v-model="branchData.address"
            :success="!!branchData.address"
            :rules="[(v) => !!v || 'Address is required']"
            label="Address"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            prepend-icon="mdi-translate"
            outlined
            dense
            v-model="branchData.arAddress"
            :success="!!branchData.arAddress"
            :rules="[(v) => !!v || 'Arabic Address is required']"
            label="Arabic Address"
            required
          />
        </v-col>
        <v-col cols="12">
          <map-search-place
            ::location="branchData.location"
            :msgError="branchData.msgErrorLocation"
            @onSelectedNewPlace="handleSelectedNewPlace"/>
        </v-col>
        <v-col cols="12">
          <v-file-input
            dense
            outlined
            ref="file"
            v-model="branchData.file"
            :rules="[(v) => !!v || 'Logo is required']"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Logo Upload"
            prepend-icon="mdi-camera"
            label="Logo Upload"/>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import GoogleMapsNative from "~/components/en/General/GoogleMapsNative.vue";
import buttonWithColors from "~/components/en/General/buttonWithColors.vue";
import notification from "~/components/en/General/notification.vue";
import MapSearchPlace from "@/components/map-search-place.vue";

export default {
  name: "FromBranch",
  components: {
    GoogleMapsNative,
    buttonWithColors,
    notification,
    MapSearchPlace,
  },
  props: {
    showMap: {
      type: Boolean,
      default: false,
    },
    branchesNumber: {
      type: Number,
      default: 0,
    },
    merchants: {
      type: Array,
      default: () => ([]),
    },
    branchData: {
      type: Object,
      default: () => ({
        name: "",
        arName:"",
        merchant: "",
        phone: "",
        email: "",
        address: "",
        arAddress:"",
        password: "",
        location: {},
      }),
    },
  },
  data() {
    return {
      place: "",
    };
  },
  created() {},
  watch: {},
  methods: {
    handleSelectedNewPlace(data) {
      this.branchData.msgErrorLocation = null;
      this.branchData.location = data.location;
      this.place = data.address;
    },
  },
};
</script>

<style lang="scss" scoped>
.en-singleBranch {
  width: 100%;
  &-title {
    font-size: 24px;
  }
  &-main {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    &-left {
      // background-color: red;
      width: 45%;
      &-form {
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        &-row {
          margin-bottom: 10px;
        }
      }
    }
    &-right {
      width: 45%;
    }
  }
  .field-error {
    font-size: 15px;
  }
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  padding: 4px 12px;
  width: 100%;
  text-align: center;
  background-color: #dc1f29;
  color: white;
  border-radius: 2px;
  cursor: pointer;
}
.custom-file-upload:hover {
  background-color: #e03d45;
  transition: 0.7s;
}
.optional-title {
  color: #ccc;
  font-size: 15px;
}
.cover-img {
  width: 200px;
  width: 200px;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.en-singleBranch-main-right {
  width: 100%;
}
.en-singleBranch-main-left {
  width: 100% !important;
}
</style>
