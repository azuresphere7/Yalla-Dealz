<template>
  <div class="img-content" :class="{ 'is-error': error }">
    <v-row justify="center" align="center">
      <div v-if="value.base64" style="height: 100%;" class="d-flex align-center">
        <v-img
          contain
          :lazy-src="value.base64"
          max-height="100%"
          max-width="100%"
          :src="value.base64"
        ></v-img>
        <v-btn
          color="red"
          fab
          x-small
          absolute
          right
          :elevation="0"
          @click="actionClose"
          v-if="!close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          color="primary"
          class="ma-2 white--text"
          @click="$refs.imageUpload.$refs.input.click()"
        >
          {{label}} <v-icon right dark> {{icon}} </v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-file-input
      accept="image/*"
      v-show="false"
      ref="imageUpload"
      v-model="file"
      @change="onFileChange"
    ></v-file-input>
    <div class="red--text" v-if="error">
      Image is required
    </div>
  </div>
</template>

<script>
import { ImageUploadService } from '@/services/image-upload.service'

export default {
  props: {
    width: String,
    value: {
      type: Object,
      default: () => ({})
    },
    close: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Upload'
    },
    icon: {
      type: String,
      default: 'mdi-cloud-upload'
    },
  },
  data() {
    return {
      file: null,
    }
  },
  methods: {
    async onFileChange() {
      if (!this.file) return;
      const img = await ImageUploadService.readImage(this.file);
      this.$emit('input', { file: this.file, base64: img.src });
    },
    actionClose() {
      this.$emit('input', {});
      this.file = null
    }
  }
}
</script>

<style lang="scss" scoped>
.img-content {
  width: 100%;
  height: 100%;
  position: relative;
  border: dashed 2px;
  &.is-error {
    border-color: red;
  }
  .row {
    height: 140px;
    button {
      top: 10px;
    }
  }
}
</style>
