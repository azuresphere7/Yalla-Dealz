<template>
  <v-container elevation="10">
    <v-card>
      <v-card-title>Add Deal :</v-card-title>
      <v-card-text>
        <hr>
        <v-form ref="form" v-model="valid">
          <DealInfo
            :deal-data="dealData"
            :merchants="merchants"
            :categories="categories"
            :images="images"
            :msg-err-img="msgErrImg"
            :msg-err="msgErr"
          />
          <DealType
            :deal-data="dealData"
            :deal-types="dealTypes"
          />
          <v-card outlined class="mt-3">
            <v-app-bar flat color="rgba(0, 0, 0, 0)" class="px-0">
              <v-card-title class="pa-0"> Price Info </v-card-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dealData.prices.push({...dealPrice})">
                add
              </v-btn>
            </v-app-bar>
            <v-card-text v-for="(tier, i) in dealData.prices" :key="i">
              <DealPrice
                :tier="tier"
                :index="i"
                @remove="dealData.prices.splice(i, 1)"
                :error="msgErr.prices[i]"
              />
            </v-card-text>
          </v-card>
          <DealVoucher
            :deal-data="dealData"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="primary"
          @click="publish"
        >
          Publish deal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  PRICE_MODEL,
  DEAL_MODEL,
} from '@/store/constant'
import { ImageUploadService } from '@/services/image-upload.service'
import DealInfo from './dealInfo';
import DealType from './dealType';
import DealPrice from './dealPrice';
import DealVoucher from './dealVoucher';

export default {
  components: {
    DealInfo,
    DealType,
    DealPrice,
    DealVoucher,
  },
  data() {
    return {
      valid: false,
      merchants: [],
      categories: [],
      images: [],
      dealData: {...DEAL_MODEL},
      dealPrice: PRICE_MODEL, 
      dealTypes: [
        {name: "Premium", val: "Premium"},
        {name: "Free", val: "Free"},
      ],
      msgErrImg: '',
      msgErr: {
        highlightes: '',
        description: '',
        arDescription: '',
        finePrint: '',
        arFinePrint: '',
        prices: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      getLoading: 'settings/loading',
    }),
    loading: {
      get() {
        return this.getLoading;
      },
      set(val) {
        this.actionSetLoading(val);
      }
    }
  },
  methods: {
    ...mapMutations({
      actionSetLoading: 'settings/setLoading'
    }),
    async init() {
      this.loading = true;
      try {
        this.merchants = (await this.$axios.$get('/merchants', this.configApi)).merchants;
        this.categories = (await this.$axios.$get('/categories', this.configApi)).data;
        if (this.$route.params.idEdit != undefined) {
          await this.getDeal();
        } else {
          this.dealData.dealStartDate = new Date();
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.displayError(err);
      }
    },
    async getDeal() {
      const data = await this.$axios.get("/deals/" + this.$route.params.idEdit, this.configApi);
      this.dealData = data.data.deal;
      this.dealData.merchant = this.dealData.merchant["_id"];
      this.dealData.images.forEach(image => {
        this.images.push({
          data: {
            base64: image
          }
        });
      });
      if (this.dealData.dealStartDate) {
        this.dealData.dealStartDate = new Date(this.dealData.dealStartDate);
      }
      if (this.dealData.dealEndDate) {
        this.dealData.dealEndDate = new Date(this.dealData.dealEndDate);
      }
      if (this.dealData.voucher.validUntil) {
        this.dealData.voucher.validUntil = this.dealData.voucher.validUntil.split(":")[0] + ':' + this.dealData.voucher.validUntil.split(":")[1];
      }
      /* for (let x = 0; x < this.dealData.prices.length; x++) {
        if (this.dealData.prices[x].pricesDate.dateDayFrom) {
          this.dealData.prices[x].pricesDate.dateDayFrom = this.dealData.prices[x].pricesDate.dateDayFrom.split(":")[0] + ':' + this.dealData.prices[x].pricesDate.dateDayFrom.split(":")[1];
        }
        if (this.dealData.prices[x].pricesDate.dateDayTo) {
          this.dealData.prices[x].pricesDate.dateDayTo = this.dealData.prices[x].pricesDate.dateDayTo.split(":")[0] + ':' + this.dealData.prices[x].pricesDate.dateDayTo.split(":")[1];
        }
      } */
      this.dealData.branches = this.dealData.branches.map(branch => branch._id);
    },
    cleanObjectDeal(deepData) {
      delete deepData.percentage
      delete deepData.payoutNet
      delete deepData.yallaDealzCommission
      delete deepData.voucher.finalPrice
      for (const item of deepData.prices) {
        delete item["_id"]
        delete item["dateDayFrom"]
        delete item["dateDayTo"]
      }
      if (deepData.branches.length === 0) {
        delete deepData.branches;
      }
      if (deepData.paymentMethod === 'Cash') {
        deepData.paymentMethod = ['Cash'];
      } else {
        delete deepData.paymentMethod
      }
    },
    cleanObjectDealEdit(deepData) {
      delete deepData.priorBooking.dineIn;
      delete deepData._id;
      delete deepData.totalviews;
      delete deepData.visible;
      delete deepData.reviewRate;
      delete deepData.rate;
      delete deepData.totalRates;
      delete deepData.totalUsersRated;
      delete deepData.totalBuy;
      delete deepData.isArchived;
      delete deepData.slug;
      delete deepData.rates;
      delete deepData.createdAt;
      delete deepData.updatedAt;
      delete deepData.__v;
      delete deepData.canReview;
      delete deepData.userReview;
      if (deepData.paymentMethod === 'Cash') {
        deepData.paymentMethod = ['Cash'];
      }
      for (let i = 0; i < deepData.prices.length; i++) {
        delete deepData.prices[i].createdAt;
        delete deepData.prices[i].updatedAt;
      }
    },
    validImages() {
      if (!this.images.length) this.msgErrImg = 'Image is require';
      else if (!this.images.every(img => img.data.base64))  this.msgErrImg = 'Image is require';
      else this.msgErrImg = '';
    },
    validEditor() {
      let valid = true;
      this.msgErr.highlightes = '';
      this.msgErr.description = '';
      this.msgErr.arDescription = '';
      this.msgErr.finePrint = '';
      this.msgErr.arFinePrint = '';
      if (!this.dealData.highlightes) {
        this.msgErr.highlightes = 'Is require';
        valid = false;
      }
      if (!this.dealData.description) {
        this.msgErr.description = 'Is require';
        valid = false;
      }
      if (!this.dealData.arDescription) {
        this.msgErr.arDescription = 'Is require';
        valid = false;
      }
      if (!this.dealData.finePrint) {
        this.msgErr.finePrint = 'Is require';
        valid = false;
      }
      if (!this.dealData.arFinePrint) {
        this.msgErr.arFinePrint = 'Is require';
        valid = false;
      }
      this.dealData.prices.forEach((price, i) => {
        this.msgErr.prices[i] = {
          description: '',
          arDescription: '',
        };
        if (!price.description) {
          this.msgErr.prices[i].description = 'Description is require';
          valid = false;
        }
        if (!price.arDescription) {
          this.msgErr.prices[i].arDescription = 'Is require';
          valid = false;
        }
      });
      return valid;
    },
    async manageImage() {
      this.dealData.images = [];
      const req = [];
      this.images.forEach(img => {
        if (img.data.file) {
          req.push(ImageUploadService.uploadImage(img.data.file));
        } else if(img.data.base64.includes('http')) {
          this.dealData.images.push(img.data.base64)
        }
      });
      const imgs = await Promise.all(req);
      this.dealData.images.push(...imgs);
    },
    async publish() {
      this.validImages();
      const validEditor = this.validEditor();
      if (!this.$refs.form.validate() || this.msgErrImg || !validEditor) {
        this.$store.dispatch('settings/activeMsg', { text: 'Form Not Valid', color: 'red'})
        return;
      }
      this.loading = true;
      try {
        await this.manageImage();
        const copieDealData = Object.assign({}, this.dealData);
        if (this.$route.params.idEdit != undefined) {
          this.cleanObjectDealEdit(copieDealData);
          await this.$axios.put("/deals/" + this.$route.params.idEdit, copieDealData, this.configApi);
        } else {
          this.cleanObjectDeal(copieDealData);
          await this.$axios.post("/deals", copieDealData, this.configApi);
        }
        this.loading = false;
        this.$router.push('/en/dashboard/deals');
      } catch (err) {
        this.loading = false;
        this.displayError(err);
      }
    }
  },
  async mounted() {
    await this.init();
  }
}
</script>

<style>

</style>