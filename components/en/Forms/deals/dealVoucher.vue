<template>
  <v-card outlined class="mt-3">
    <v-card-title class="">Voucher Info :</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.voucher.validUntil"
            label="Valid Untill"
            :rules="[(v) => !!v || 'Valid Untill is required']"
            type="datetime-local"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="dealData.voucher.minimumQuantityAllowed"
            label="Minimum Quantity Allowed"
            :rules="[
              (v) => v !== '' || 'Minimum Quantity Allowed is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="dealData.voucher.maximumQuantityAllowed"
            label="Maximum Quantity Allowed"
            :rules="[
              (v) => v !== '' || 'Maximum Quantity Allowed is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.voucher.userAllowedFrom"
            label="User Allowed From"
            :rules="[
              (v) => v !== '' || 'User Allowed From is required',
            ]"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.voucher.userAllowedUpto"
            label="User Allowed Upto"
            :rules="[
              (v) => v !== '' || 'User Allowed Upto is required',
            ]"
            outlined dense />
        </v-col>
      </v-row>
      <hr>
    </v-card-text>
    <v-card-title class="">Voucher Validation :</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="6">
          <span class="text-subtitle-1 font-weight-medium">Valid For</span>
          <div class="d-flex">
            <v-checkbox
              v-model="dealData.voucher.validFor"
              :rules="[
                (v) => !!v.length || 'Valid For is required',
              ]"
              color="red"
              class="mr-4 mt-0"
              v-for="(vf, index) in validFor"
              :label="vf.name"
              :key="'vf' + index"
              :value="vf.val"/>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <span class="text-subtitle-1 font-weight-medium">Valid On</span>
          <div class="d-flex">
            <v-checkbox
              v-model="dealData.voucher.validOn"
              color="red"
              class="mr-4 mt-0"
              v-for="(vo, index) in vValid"
              :label="vo.name"
              :key="'vo' + index"
              :value="vo.value"/>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.voucher.minimumAge"
            label="Minimum Age"
            hint="Minimum Age"
            :rules="[(v) => !!v || 'Minimum Age is required']"
            type="number"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.priorBooking.contactNumber"
            label="Contact Number"
            :rules="[
              (v) => !!v || 'Contact Number is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
            type="number"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.priorBooking.email"
            label="Email"
            :rules="[
              (v) => !!v || 'Email is require',
              v => /.+@.+/.test(v) || 'E-mail must be valid',
            ]"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.priorBooking.deliveryArea"
            :rules="[
              (v) => !!v || 'Delivery Area is require',
            ]"
            label="Delivery Area"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-switch
            v-model="dealData.priorBooking.delivery"
            label="Delivery"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <v-switch
            v-model="dealData.priorBooking.status"
            label="Prior Booking Status"
          ></v-switch>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  vValid,
  validFor
} from '@/store/constant';
export default {
  components: {},
  props: {
    dealData: {
      type: Object,
      default: () => ({
      }),
    }
  },
  data() {
    return {
      vValid,
      validFor
    }
  },
  computed: {},
  methods: {}
}
</script>

<style>

</style>