<template>
  <div class="en-AdminForm">
    <div v-if="success != ''" class="en-AdminForm-errors-error">
      <notification notfi-color="greenNotfi">
        {{ success }}
      </notification>
    </div>

    <div class="en-AdminForm-errors">
      <div
        v-for="error in errors"
        :key="error.msg"
        class="en-AdminForm-errors-error"
      >
        <notification notfi-color="redNotfi">
          {{ error.msg }}
        </notification>
      </div>
    </div>

    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-card elevation="10" class="pa-5 mb-6">
      <h4 v-if="id">Update User Admin</h4>
      <h4 v-else>Create User Admin</h4>
      <hr>
      <v-form ref="form" @submit.prevent="editAdmin" v-model="valid">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="AdminName"
              :counter="12"
              outlined dense
              :rules="[
                (v) => !!v || 'Name is required',
                (v) => (v && /^[0-9a-zA-Z]+$/.test(v)) || 'Name must only contain alpha-numeric characters',
              ]"
              label="Admin Name"
              required
              @input="setAdminName"
          />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="username"
              :counter="12"
              outlined dense
              :rules="[
                (v) => !!v || 'Username is required',
                (v) => (v && v.length <= 12) || 'Name must be less than 12 characters',
              ]"
              label="User Name"
              required
          />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="Phone"
              outlined dense
              :rules="[
                (v) => !!v || 'Phone Number is required',
                (v) => (v && /^01[0125]\d{8,8}$/.test(v)) || 'Phone Number is incorrect',
              ]"
              label="Phone Number"
              required
              @input="setPhone"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="Email"
              label="Email"
              outlined dense
              :rules="[
                (v) => !!v || 'E-mail is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
              ]"
              required
              @input="setEmail"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="Role"
              label="Role"
              outlined dense
              :rules="[(v) => !!v || 'Role is required']"
              required
              :items="roles"
              item-value="val"
              item-text="name"
              @changedSelect="setRole"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              outlined dense
              :rules="[(v) => !!v || 'Password is required']"
              label="Password"
              required
              type="password"
              @input="setPassword"
            />
          </v-col>
        </v-row>
        <v-btn
          large
          min-width='200'
          color="primary"
          type="submit">
          <span v-if="id">Update Admin</span>
          <span v-else>Add Admin</span>
        </v-btn>
      </v-form>
      <!-- <form
        v-if="!loading"
        class="en-AdminForm-content"
        @submit.prevent="addAdmin"
      >
        <div class="en-AdminForm-content-row">
          <v-text-field
            v-model="AdminName"
            :counter="12"
            outlined dense
            :rules="[
              (v) => !!v || 'Name is required',
              (v) =>
                (v && v.length <= 12) || 'Name must be less than 12 characters',
            ]"
            label="Admin Name"
            required
            @input="setAdminName"
          />
        </div>

        <div class="en-AdminForm-content-row">
          <v-text-field
            v-model="Phone"
            outlined dense
            :rules="[
              (v) => !!v || 'Phone Number is required',
              (v) =>
                (v && /^[0-9]+$/.test(v)) || 'Phone Number must be digits only',
            ]"
            label="Phone Number"
            required
            @input="setPhone"
          />
        </div>

        <div class="en-AdminForm-content-row">
          <v-text-field
            v-model="Email"
            label="Email"
            outlined dense
            :rules="[
              (v) => !!v || 'E-mail is required',
              (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]"
            required
            @input="setEmail"
          />
        </div>

        <div class="en-AdminForm-content-row">
          <v-select
            v-model="Role"
            label="Role"
            outlined dense
            :rules="[(v) => !!v || 'Role is required']"
            required
            :items="roles"
            value="val"
            item-text="name"
            @changedSelect="setRole"
          />
        </div>

        <div class="en-AdminForm-content-row">
          <v-text-field
            v-model="password"
            outlined dense
            :rules="[(v) => !!v || 'Password is required']"
            label="Password"
            required
            type="password"
            @input="setPassword"
          />
        </div>
        <v-btn large min-width='200' color="primary" type="submit">Add Admin</v-btn>
      </form> -->
    </v-card>
  </div>
</template>

<script>
import { required, integer, email } from "vuelidate/lib/validators"
import { mapGetters } from 'vuex';
// import inputWithIcon2 from "~/components/en/General/inputWithIcon2.vue"
// import arinputWithIcon2 from "~/components/ar/General/arinputWithIcon2.vue"
// import selectInput from "~/components/en/General/selectInput.vue"
import buttonWithColors from "~/components/en/General/buttonWithColors.vue"
import notification from "~/components/en/General/notification.vue"

export default {
  name: "AdminForm",
  components: {
    // inputWithIcon2,
    // arinputWithIcon2,
    buttonWithColors,
    notification,
    // selectInput,
  },
  data () {
    return {
      AdminName: "",
      Phone: "",
      Email: "",
      Role: "",
      password: "",
      username: "",
      roles: [
        { name: "Data Entry", val: "dataEntry", },
        { name: "Admin", val: "admin", },
        { name: "Super Admin", val: "superAdmin", },
        { name: "Only view user", val: "onlyViewUser", },
        { name: "Sales", val: "sales", },
      ],
      errors: [],
      file: "",
      success: "",
      loading: false,
      valid: true,
      id: '',
    }
  },
  computed: {
    ...mapGetters({
      admins: 'settings/admins',
    })
  },
  validations: {
    AdminName: {
      required,
    },
    Phone: {
      required,
      integer,
    },
    Email: {
      required,
      email,
    },
    Role: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    setAdminName (value) {
      this.AdminName = value
      this.$v.AdminName.$touch()
    },
    setPhone (value) {
      this.Phone = value
      this.$v.Phone.$touch()
    },
    setEmail (value) {
      this.Email = value
      this.$v.Email.$touch()
    },
    setRole (value) {
      this.Role = value
      this.$v.Role.$touch()
    },
    setPassword (value) {
      this.password = value
      this.$v.password.$touch()
    },
    addAdmin () {
      this.loading = true
      const adminData = {
        name: this.AdminName,
        phone: this.Phone,
        email: this.Email,
        role: this.Role,
        password: this.Password,
      }

      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR"
        this.loading = false
      } else {
        const config = {
          headers: {
            authorization: this.$store.state.token,
          },
        }
        this.errors = []
        const submitAdmin = async () => {
          const config = {
            headers: {
              authorization: this.$store.getters.token,
            },
          }
          await this.$axios
            .post("/systemUsers", adminData, config)
            .then((result) => {
              this.success = "Added to Admins"
              this.$emit("updated")
              this.loading = false
            })
            .catch((error) => {
              this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red'})
              this.loading = false
            })
        }
        submitAdmin()
      }
    },
    async editAdmin() {
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      try {
        const adminData = {
          name: this.AdminName,
          phone: this.Phone,
          email: this.Email,
          role: this.Role,
          password: this.password,
          username: this.username
        }
        if (this.id) await this.$axios.put("/systemUsers/" + this.id, adminData, this.configApi);
        else await this.$axios.post("/systemUsers", adminData, this.configApi);
        this.success = "Added to Admins"
        this.$emit("updated")
        this.loading = false;
        this.$router.push('/en/dashboard/websettings/adminlist');
      } catch (err) {
        this.loading = false;
        let mess = err.message;
        if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error;
        this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'})
      }
    }
  },
  async mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      try {
        const res = this.admins.find(el => el._id === this.id);
        this.AdminName = res.name;
        this.Phone = res.phone;
        this.Email = res.email;
        this.Role = res.role;
        this.username = res.username;
      } catch (err) {
        let mess = err.message;
        if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error;
        this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'})
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.en-AdminForm {
  &-errors {
    width: 80%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-error {
      width: auto;
      text-align: center;
    }
  }
}
.en-AdminForm-content {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: auto;
  &-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    &-element {
      width: 100%;
      &-img {
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
      }
    }
  }
  &-button {
    width: 100%;
    &-TheButton {
      width: 350px;
    }
  }
}

@media (max-width: 992px) {
  .en-AdminForm-content {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height: 190px;
    &-row {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-element {
        width: auto;
      }
    }
  }
}

// loading :

.sk-folding-cube {
  margin: 200px 100px;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
.sk-folding-cube .sk-cube:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
  transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
  transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
  transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
