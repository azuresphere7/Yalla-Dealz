<template>
  <v-card outlined class="">
    <v-app-bar flat color="rgba(0, 0, 0, 0)" class="px-0">
      <v-card-title class="pa-0"> Price ({{index + 1}}) </v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="red" @click="$emit('remove')">
        Remove
      </v-btn>
    </v-app-bar>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="tier.originalPrice"
            label="Original Price"
            placeholder="Original Price"
            :rules="[
              (v) => v !== '' || 'Original Price is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
             outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="tier.finalPrice"
            label="Final Price"
            placeholder="Final Price"
            :rules="[
              (v) => v !== '' || 'Final Price is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
             outlined dense />
        </v-col>
        <v-col cols="12" md="6">
          <h6 class="text-subtitle-1">
            Description
            <span
              v-if="error && error.description"
              class="red--text text-subtitle-2"> ({{error.description}})
            </span>
          </h6>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="tier.description"
            class="mb-6"
            :config="{
              placeholder: 'Description',
              language: {
                ui: 'en',
                content: 'en'
              }
            }">
          </ckeditor>
        </v-col>
        <v-col cols="12" md="6">
          <h6 class="text-subtitle-1" dir="rtl">
            الوصف
            <span
              v-if="error && error.arDescription"
              class="red--text text-subtitle-2"> ({{error.arDescription}})
            </span>
          </h6>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="tier.arDescription"
            class="mb-6"
            :config="{
              placeholder: 'الوصف',
              language: {
                ui: 'er',
                content: 'er'
              }
            }">
          </ckeditor>
        </v-col>
        <v-col cols="10" md="4">
          <v-text-field
            v-model.number="tier.payoutNet"
            label="Payout Net"
            placeholder="Payout Net"
            :rules="[
              (v) => v !== '' || 'Payout Net is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
            outlined dense/>
        </v-col>
        <v-col cols="10" md="4">
          <v-text-field
            v-model.number="tier.yallaDealzCommission"
            label="Yalla Dealz Commission"
            placeholder="Yalla Dealz Commission"
            :rules="[
              (v) => v !== '' || 'Yalla Dealz Commission is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
            outlined dense/>
        </v-col>
        <v-col cols="10" md="4">
          <v-text-field
            v-model.number="tier.percentage"
            label="Percentage"
            placeholder="Percentage"
            :rules="[
              (v) => v !== '' || 'Percentage is required',
              (v) => /[0-9]+/gm.test(v) || 'Must be a number',
            ]"
            outlined dense
            @input="calcPercentage"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    tier: {
      type: Object,
      default: () => ({
        originalPrice: '',
        finalPrice: '',
        pricesDate: {
          dateDayFrom: '',
          dateDayTo: '',
        },
        arDescription: '',
        description: '',
      }),
    },
    index: Number,
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {},
  methods: {
    calcPercentage() {
      this.tier.yallaDealzCommission = (this.tier.percentage*this.tier.finalPrice)/100;
      this.tier.payoutNet = this.tier.finalPrice - ((this.tier.percentage*this.tier.finalPrice)/100);
    }
  }
}
</script>

<style>

</style>