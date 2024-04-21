<template>
  <nav>
    <!-- desctop nav bar -->
    <v-toolbar v-if='desktop_menu' dense>
      <v-toolbar-title>
        <img width="170px" class="h-100" src="~/assets/images/logo.png">
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-for="(items, i) in navItems" :key="i" color="red" class="mr-lg-5 mr-1">
        <!-- if there are sub menu -->
        <v-menu v-if="items.subMenu" :close-on-content-click="false" open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-btn x-small color="red" dark v-on="on">
              <v-icon left v-text="items.icon"></v-icon>
              <span>{{ items.title }}</span>
            </v-btn>
          </template>
          <!-- sub menu -->
          <v-list v-for="(subItem, i) in items.subMenu" :key="i" dense>
            <v-list-group v-if="subItem.subsubMenu" sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.subTitle"></v-list-item-title>
                </v-list-item-content>
              </template>
              <!-- sub sub menu -->
              <v-list-item v-for="(subsubItem, i) in subItem.subsubMenu" :key="i" :to="subsubItem.subsubLink" router exact class="text-decoration-none">
                <v-icon v-if="subsubItem.subsubIcon">{{ subsubItem.subsubIcon }}</v-icon>
                <v-list-item-title v-text="subsubItem.subsubTitle"></v-list-item-title>
              </v-list-item>
            </v-list-group>

            <!-- else without sub menu -->
            <v-list-item v-else :to="subItem.subLink" router excat class="text-decoration-none">
              <v-icon v-if="subItem.subIcon" left>{{ subItem.subIcon }}</v-icon>
              <v-list-item-title v-text="subItem.subTitle"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- else -->
        <v-btn x-small v-else color="red">
          <nuxt-link :to="items.link" class="text-decoration-none white--text">
            <v-icon left v-text="items.icon"></v-icon>
            <span v-text="items.title"></span>
          </nuxt-link>
        </v-btn>
      </v-toolbar-items>

      <!-- log out btn -->
      <v-toolbar-items class="mr-3">
        <v-btn x-small color="red" dark @click="logout()">
          <v-icon left small>mdi-logout</v-icon>
          <span>log out</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <!-- --------------------------------------------------------------- -->


    <!-- mobile nav bar header -->
    <v-app-bar class="" app>
      <!-- side nav btn && img -->
      <v-app-bar-nav-icon @click="mini=!mini"/> 
      <img v-show="mini" width="170px" src="~/assets/images/logo.png">
      <v-spacer></v-spacer>
      <v-btn text class="mx-7" @click="$router.push('/en/dashboard/adminprofile')">
        <v-icon>mdi-account</v-icon>
        {{username}}
        <v-icon class="px-3" small>mdi-arrow-right</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- mobile nav content -->
    <v-navigation-drawer v-model="drawer" permanent :mini-variant.sync="mini" app>
      <!-- close btn -->
      <template v-slot:prepend>
        <v-list-item v-show='!mini'>
          <img width='100%' class="mx-auto" src="~/assets/images/logo2.png">
        </v-list-item>
      </template>
      <v-list-item v-show='!mini'>
        <v-list-item-content>
          <v-list-item-title>
            <h2 class="h2 text-center">Yalla Dealz Egypt</h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- if nav contains sub menu -->
      <v-list v-for="(item, i) in navItems" :key="i" nav class="py-1" dense>
        <!-- sub menu -->
        <v-list-group v-if="item.subMenu" :prepend-icon="item.icon" v-model="activeGroup[i]">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(subItem, i) in item.subMenu" :key="i" link exact>
            <v-list-group v-if="subItem.subsubMenu" :prepend-icon="subItem.subIcon" sub-group>
              <!-- sub sub menu -->
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.subTitle"></v-list-item-title>
                </v-list-item-content>
              </template>
              <!-- sub sub menu list -->
              <v-list-item v-for="(subsubItem, i) in subItem.subsubMenu" :key="i" :to="subsubItem.subsubLink" router exact class="text-decoration-none">
                <v-icon v-if="subsubItem.subsubIcon" left>{{ subsubItem.subsubIcon }}</v-icon>
                <v-list-item-title v-text="subsubItem.subsubTitle"></v-list-item-title>
              </v-list-item>
            </v-list-group>
            <!-- else sub menu only -->
            <v-list-item v-else :to="subItem.subLink" router exact class="text-decoration-none">
              <v-icon v-if="subItem.subIcon" left>{{ subItem.subIcon }}</v-icon>
              <v-list-item-title v-text="subItem.subTitle"></v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>
        <!-- else nav item only -->
        <v-list-item v-else :to="item.link" router exact class="text-decoration-none">
          <v-icon v-if="item.icon" left>{{ item.icon }}</v-icon>
          <v-list-item-title v-text="item.title" class="ml-5"></v-list-item-title>
        </v-list-item>
      </v-list>
      <!-- log out btn -->
      <v-list nav dense>
        <v-list-item to="/" class="text-decoration-none red" dark @click="logout()" router exact>
          <v-list-item-icon>
            <v-icon left>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-5">Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Dashnav",

  data () {
    return {
      desktop_menu:false,
      drawer: false,
      mini: false,
      clipped: true,
      navItems: [
        {
          icon: 'mdi-home-outline',
          title: 'Home',
          link: '/en/dashboard'
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Users',
          link: '/en/dashboard/users',
          subMenu: [
            // {subTitle: 'Add New User', subLink: '/en/dashboard/users'},
            {subTitle: 'User List', subLink: '/en/dashboard/users'},
            // {subTitle: 'Deleted User', subLink: '/en/dashboard/users'}
          ]
        },
        {
          icon: 'mdi-card-text-outline',
          title: 'Category',
          link: '/en/dashboard/categories',
          subMenu: [
            {subTitle: 'Add Category', subLink: '/en/dashboard/categories/add'},
            {subTitle: 'Category List', subLink: '/en/dashboard/categories'},
            // {subTitle: 'Sub Categories', subLink: '/en/dashboard/categories'}
          ]
        },
        {
          icon: 'mdi-store-outline',
          title: 'Merchant',
          link: '/en/dashboard/merchants',
          subMenu: [
            {subTitle: 'Add Merchants', subLink: '/en/dashboard/merchants/create'},
            {subTitle: 'Merchant List', subLink: '/en/dashboard/merchants'},
            {subTitle: 'Merchant Archives', subLink: '/en/dashboard/merchants/archive'},
            {subTitle: 'Add Branch', subLink: '/en/dashboard/branches/create'},
            {subTitle: 'Branch List', subLink: '/en/dashboard/branches'}
          ]
        },
        {
          icon: 'mdi-handshake-outline',
          title: 'Deals',
          link: '/en/dashboard/deals',
          subMenu: [
            {subTitle: 'Add Deal', subLink: '/en/dashboard/deals/create'},
            {subTitle: 'Deal List', subLink: '/en/dashboard/deals/'},
            {subTitle: 'Upcoming Deals', subLink: '/en/dashboard/deals/upcomming'},
            {subTitle: 'Deactive / Expired Deals', subLink: '/en/dashboard/deals/expired'},
            {subTitle: 'Deleted Deals', subLink: '/en/dashboard/deals/archive'}
          ]
        },
        {
          icon: 'mdi-bell-outline',
          title: 'Push',
          link: '/en/dashboard/push'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'COD Orders',
          link: '/en/dashboard/codOrders'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Oder Lists',
          link: '/en/dashboard/orders'
        },
        {
          icon: 'mdi-cursor-pointer',
          title: 'Subscriptions',
          link: '/en/dashboard/subscriptions'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Setting',
          link: '/setting',
          subMenu: [
            // {subTitle: 'System Users', subLink: '/setting',
              // subsubMenu: [
                // {subTitle: 'Create Admin', subLink: '/en/dashboard/admins'},
                {subTitle: 'System Admin List', subLink: '/en/dashboard/websettings/adminlist'},
                {subTitle: 'Promo Code List', subLink: '/en/dashboard/promotions/promolist'},
                {subTitle: 'Create Promotion code', subLink: '/en/dashboard/promotions'},
                // {subTitle: 'Promo Codes Expired', subLink: '/setting'}
              // ]
            // }
          ]
        }
      ],
      thisUserName: "",
      activeGroup: [],
    }
  },
  watch: {
    mini(val) {
      if (val) {
        for (let i = 0; i < this.activeGroup.length; i++) {
          this.activeGroup[i] = false;
        }
      }
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name == 'sm' || this.$vuetify.breakpoint.name == 'xs';
    },
    username() {
      return this.$store.getters.username
    }
  },
  methods: {
    logout () {
      this.$store.dispatch("logout")
      this.$router.push("/")
    },
    closeDrawer () {
      if(this.isMobile) {
        this.drawer = false;
      }else this.mini = true;
    }
  },
  mounted() {
    this.navItems.filter(item => item.subMenu).forEach(item => {
      this.activeGroup.push(false)
    });
  }
}
</script>

<style scoped></style>
