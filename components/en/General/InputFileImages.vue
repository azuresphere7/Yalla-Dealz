<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="3" v-for="(img, i) in value" :key="i" style="position: relative">
        <v-btn
          color="red"
          fab
          x-small
          absolute
          right
          :elevation="0"
          @click="value.splice(i, 1)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <InputFileImage v-model="img.data" close/>
      </v-col>
      <v-col cols="12" md="3" class="d-flex justify-center flex-column">
        <v-btn
          color="primary"
          @click="value.push({ data: {} })"
        >
          Add image
        </v-btn>
        <span
          v-if="msgErrImg"
          class="red--text"> {{msgErrImg}} </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import InputFileImage from "~/components/en/General/InputFileImage"

export default {
  components: {
    InputFileImage,
  },
  props: {
    msgErrImg: String,
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
