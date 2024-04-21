<template>
 <v-container class="card elevation-10">
   <v-row>
     <v-col>
      <snackbar ref="snackbar"></snackbar>
      <v-row class="m-2">
        <v-col cols="6" class="d-flex align-center">
          <h4>Branches:</h4>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <div>
            <v-btn
              large
              color='success'
              @click='addBranche'>
              <v-icon left>mdi-plus</v-icon>
              Add More
            </v-btn>
            <v-btn
              large
              outlined color='error'
              @click='removeBranche'>
              <v-icon left>mdi-minus</v-icon>
              Remove One
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <hr>
      <v-form ref="formBranch" @submit.prevent="saveBranches">
        <v-row>
          <v-col v-for="(branche, index) of branches" :key="index" cols="12">
            <formBranch
              ref="branchesForm"
              :show-map="showMap"
              :branches-number="index"
              :merchants="merchants"
              :branch-data="branche"/>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <div class="en-dealForm-main-left-form-row">
          <v-btn
            color="primary"
            v-show="branches.length > 0"
            type="submit"
            ref="btn">
            Confirm
          </v-btn>
        </div>
      </v-form>
     </v-col>
   </v-row>
 </v-container>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { v4 as uuidv4 } from 'uuid';
  import { ImageUploadService } from "@/services/image-upload.service"
  import formBranch from "~/components/en/Forms/formBranch"
  import buttonWithColors from "~/components/en/General/buttonWithColors.vue"
  import snackbar from '~/components/snackbar.vue'

  const modelBranche = {
    name: "",
    arName:"",
    merchant: "",
    phone: "",
    email: "",
    address: "",
    arAddress:"",
    password: "",
    location: {},
    file: null,
    msgErrorLocation: null,
  };

  export default {
    name: "MerchantBranches",
    components: {
      formBranch,
      buttonWithColors,
      snackbar
    },
    props: {
      showMap: Boolean,
    },
    data() {
      return {
        branches: [{...modelBranche}],
        configApi: {
          headers: {
            authorization: this.$store.getters.token,
            "Content-Type": "application/json",
          },
        },
        merchants: [],
        imgs: [],
      }
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
      addBranche() {
        this.branches.push({...modelBranche});
        this.$vuetify.goTo(this.$refs.btn, {
          duration: 1000,
          offset: 10,
          easing: 'easeInQuad'
        });
      },
      removeBranche(e, index = this.branches.length - 1) {
        if (index >= 1) {
          this.branches.splice(index, 1);
          this.$vuetify.goTo(this.$refs.btn, {
            duration: 1000,
            offset: 10,
            easing: 'easeInQuad'
          });
        }
      },
      async saveBranches() {
        let error = false;
        this.branches.forEach(branche => {
          if (branche.location.lat === undefined) {
            error = true
            branche.msgErrorLocation = 'Location is require'
          }
        });
        if (!this.$refs.formBranch.validate() || error) return;
        this.loading = true;
        try {
          let reqs = [];
          if (!this.imgs.length) {
            this.branches.forEach(branche => {
              reqs.push(ImageUploadService.uploadImage(branche.file));
            });
            this.imgs = await Promise.all(reqs);
          }
          const tabBranch = this.branches.reduce((acc, currval, i) => {
            const index = acc.findIndex(el => el.merchant === currval.merchant);
            const branch = {
              name: currval.name,
              arName: currval.arName,
              branchId: uuidv4(),
              address: currval.address,
              arAddress: currval.arAddress,
              phone: currval.phone,
              email: currval.email,
              password: currval.password,
              image: this.imgs[i],
              location: currval.location
            };
            if (index != -1) {
              acc[index].branches.push(branch);
            } else {
              acc.push({
                merchant: currval.merchant,
                branches: [branch]
              });
            }
            return acc;
          }, []);
          reqs = [];
          tabBranch.forEach(branche => {
            reqs.push(this.$axios.post("/merchants/branch", branche, this.configApi));
          });
          await Promise.all(reqs);
          this.branches = [{...modelBranche}];
          this.imgs = [];
          this.$refs.formBranch.reset();
          this.loading = false;
          this.$store.dispatch('settings/activeMsg', { text: 'the branch(s) has been created successfully', color: 'success'});
        } catch (err) {
          this.loading = false;
          this.displayError(err);
        }
      },
      async getMarchants() {
        this.loading = true;
        try {
          this.merchants = (await this.$axios.get("/merchants", this.configApi)).data.merchants;
          this.loading = false;
        } catch (err) {
          this.loading = false;
          this.displayError(err);
        }
      },
    },
    async mounted() {
      await this.getMarchants();
    }
  }
</script>

<style lang="scss" scoped>
  .en-merchantBranches {
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

    &-options {
      &-add {
        color: green;
        cursor: pointer;
      }

      &-remove {
        color: red;
        cursor: pointer;
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
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    width: 100%;
    text-align: center;
    border: 1px solid rgb(45, 105, 233);
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
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

  .en-merchantBranches-main {
    direction: ltr;
  }
</style>
