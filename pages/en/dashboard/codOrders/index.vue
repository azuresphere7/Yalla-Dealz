<template>
	<v-container class="mt-10 mt-md-1">
		<codOrders />
	</v-container>
</template>

<script>
  import codOrders from '~/components/en/Dashboard/codOrders.vue'
  export default {
    middleware: ["check-auth", "auth"],
    layout: "adminlayout",
    components: {
      codOrders
    }
  }
</script>