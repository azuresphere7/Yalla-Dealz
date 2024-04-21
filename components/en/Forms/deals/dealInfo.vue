<template>
  <v-card outlined class="mt-3">
    <v-card-title class="">Deal Info:</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.name"
            counter='70'
            :rules="[
              (v) => !!v || 'Deal Name is required',
              (v) => v.length <= 70 || 'Max 70 characters',
            ]"
            label="Deal Name"
            required
            outlined
            dense/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.arName"
            counter='70'
            :rules="[
              (v) => !!v || 'اسم العرض مطلوب',
              (v) => v.length <= 70 || 'Max 70 characters',
            ]"
            label="اسم العرض"
            required
            outlined
            dense/>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="dealData.merchant"
            label="Merchant"
            :rules="[
              (v) => !!v || 'Merchant is required',
            ]"
            required
            :items="merchants"
            item-value="_id"
            item-text="name"
            outlined
            dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="dealData.branches"
            multiple
            label="Branch"
            :rules="[]"
            :items="branches"
            item-value="_id"
            item-text="name"
            outlined
            dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="dealData.video"
            label="Video Link"
            outlined
            dense />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="dealData.category"
            label="Category"
            :rules="[
              (v) => !!v || 'Category is required',
            ]"
            :items="categories"
            item-value="_id"
            item-text="name"
            outlined
            dense />
        </v-col>
        <v-col cols="12">
          <v-row dense>
            <v-col cols="12">
              <InputFileImages v-model="images" :msg-err-img="msgErrImg"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <h6 class="text-subtitle-1">
            Highlights
            <span
              v-if="msgErr && msgErr.highlightes"
              class="red--text text-subtitle-2"> ({{msgErr.highlightes}})
            </span>
          </h6>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="dealData.highlightes"
            :config="{
              placeholder: 'Highlights',
              language: {
                ui: 'en',
                content: 'en'
              }
            }">
          </ckeditor>
        </v-col>
        <v-col cols="12">
          <h6 class="text-subtitle-1">
            Description
            <span
              v-if="msgErr && msgErr.description"
              class="red--text text-subtitle-2"> ({{msgErr.description}})
            </span>
          </h6>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="dealData.description"
            :config="{
              placeholder: 'Description',
              language: {
                ui: 'en',
                content: 'en'
              }
            }">
          </ckeditor>
        </v-col>
        <v-col cols="12">
          <h6 class="text-subtitle-1">
            Rules or Fine Print
            <span
              v-if="msgErr && msgErr.finePrint"
              class="red--text text-subtitle-2"> ({{msgErr.finePrint}})
            </span>
          </h6>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="dealData.finePrint"
            :config="{
              placeholder: 'Fine Prin',
              language: {
                ui: 'en',
                content: 'en'
              }
            }">
          </ckeditor>
        </v-col>
        <v-col cols="12">
          <h5 class="text-subtitle-1" dir="rtl">
            ابرز المعلومات
            <span
              v-if="msgErr && msgErr.arDescription"
              class="red--text text-subtitle-2"> ({{msgErr.arDescription}})
            </span>
          </h5>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="dealData.arHighlightes"
            :config="{
              placeholder: 'ابرز المعلومات',
              language: {
                ui: 'ar',
                content: 'ar'
              }
            }">
          </ckeditor>
        </v-col>
        <v-col cols="12">
          <h5 class="text-subtitle-1" dir="rtl">
            الوصف
            <span
              v-if="msgErr && msgErr.arDescription"
              class="red--text text-subtitle-2"> ({{msgErr.arDescription}})
            </span>
          </h5>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="dealData.arDescription"
            :config="{
              placeholder: 'الوصف',
              language: {
                ui: 'ar',
                content: 'ar'
              }
            }">
          </ckeditor>
        </v-col>
        <v-col cols="12">
          <h5 class="text-subtitle-1" dir="rtl">
            الشروط
            <span
              v-if="msgErr && msgErr.arFinePrint"
              class="red--text text-subtitle-2"> ({{msgErr.arFinePrint}})
            </span>
          </h5>
          <ckeditor
            :editor="editorBalloonBlockEditor"
            v-model="dealData.arFinePrint"
            :config="{
              placeholder: 'الشروط',
              language: {
                ui: 'ar',
                content: 'ar'
              }
            }">
          </ckeditor>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import InputFileImages from "~/components/en/General/InputFileImages";

export default {
  components: {
    InputFileImages,
  },
  props: {
    msgErrImg: String,
    msgErr: Object,
    dealData: {
      type: Object,
      default: () => ({
        name: '',
        arName: '',
        merchant: '',
        category: '',
        branches: [],
        video: '',
        highlightes: '',
        description: '',
        finePrint: '',
        arHighlightes: '',
        arDescription: '',
        arFinePrint: '',
      }),
    },
    images: {
      type: Array,
      default: () => [],
    },
    merchants: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    branches() {
      if (this.dealData.merchant && this.merchants.length) {
        return this.merchants
          .find(mer => mer._id === this.dealData.merchant)
          .branches.map(el => el._id);
      }
      return [];
    },
  },
  methods: {}
}
</script>

<style>

</style>