<template>
  <v-card outlined class="mt-3">
    <v-card-title class="">Type :</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <h6 class="text-subtitle-1">Deal Type</h6>
          <v-radio-group
            v-model="dealData.dealType"
            :rules="[(v) => !!v || 'Date is required']"
            row
            class="mt-0"
          >
            <v-radio
              v-for="(type, i) in dealTypes"
              :key="i"
              :label="type.name"
              :value="type.val"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.dealStartDate"
            :rules="[(v) => !!v || 'Date is required']"
            label="Start Date"
            required
            type="datetime-local"
            outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.dealEndDate"
            :rules="[(v) => !!v || 'Date is required']"
            label="End Date"
            required
            type="datetime-local"
            outlined dense />
        </v-col>
        <!-- <v-col cols="12" md="6">
          <v-datetime-picker
            v-model="dealData.dealStartDate"
            label="Start Date"
            :text-field-props="{
              outlined: true,
              dense: true,
              rules: [(v) => !!v || 'Date is required']
            }">
            <template slot="dateIcon">
              <v-icon>mdi-calendar</v-icon>
            </template>
            <template slot="timeIcon">
              <v-icon>mdi-clock-time-four</v-icon>
            </template>
          </v-datetime-picker>
        </v-col>
        <v-col cols="12" md="6">
          <v-datetime-picker
            v-model="dealData.dealEndDate"
            label="End Date"
            :text-field-props="{
              outlined: true,
              dense: true,
              rules: [(v) => !!v || 'Date is required']
            }">
            <template slot="dateIcon">
              <v-icon>mdi-calendar</v-icon>
            </template>
            <template slot="timeIcon">
              <v-icon>mdi-clock-time-four</v-icon>
            </template>
          </v-datetime-picker>
        </v-col> -->
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    dealData: {
      type: Object,
      default: () => ({
        dealType: '',
        dealStartDate: '',
        dealEndDate: '',
      }),
    },
    dealTypes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      datetime: new Date()
    };
  },
  computed: {},
  methods: {}
}
</script>

<style>

</style>