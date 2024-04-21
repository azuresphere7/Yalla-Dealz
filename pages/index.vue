<template>
  <v-app class="mainContainer">
      <v-row>
        <v-col sm="12" md="5" class='left-side d-none d-sm-flex'>
          <v-row justify="center" class="mt-md-16">
            <v-col sm="8" md="12">
              <div class="px-6">
                <div cols="9">
                  <img width="100%" class='left-side-image' src="~/assets/images/admin-screen.jpeg">
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="12" md="7" class="right-side">
          <v-row justify="center" class="mt-md-16">
            <v-col xs="12" sm="8" md="8">
              <v-card flat outlined class="pa-10 pb-16 rounded-xl">
                <h5>Login</h5>
                <p class="mt-5">Welcome back, please login to your account.</p>
                <hr>
                <loginForm />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  </v-app>
</template>
 
<script>
  import loginForm from "~/components/en/Forms/loginForm"
  export default {
    middleware: ["check-auth", "prevent-login"],
    components: {
      loginForm,
    },
    head () {
      return {
        title: 'Yalla Dealz Inc, Dashboard Portal',
        titleTemplate: '%s - Login',
      }
    },
    computed: {},
  }
</script>

<style scoped>
.mainContainer {
  /* background: url('~assets/images/dashboardIntro.png') no-repeat top left; */
  background-size: cover;
}

.left-side-image{
  border-radius: 16px;
}

.loginCard {
  width: 80%;
  margin: auto;
  background:rgba(0, 0, 0, 0); 
}

.left-side{
  background: #e6be21; 
  padding: 2rem;
}

.right-side{
  background:#C62828; 
  padding: 2rem;
}
</style>
