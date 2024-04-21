<template>
  <no-ssr class="en-admins">
    <div class="en-admins-content">
      <AdminForm />
    </div>
  </no-ssr>
</template>

<script>
import AdminForm from "~/components/en/Forms/adminForm.vue"
export default {
  middleware: ["check-auth", "auth"],
  name: "admins",
  layout: "adminlayout",
  components: {
    AdminForm,
  },
}
</script>

<style lang="scss" scoped>
.en-admins {
  display: flex;
  justify-content: center;
  &-content {
    margin-top: 10%;
    width: 90%;
  }
}
</style>
