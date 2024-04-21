<template>
  <div class="en-user">
    <div class="en-user-content">
      <h2>Create User</h2>
      <UserForm />
    </div>
  </div>
</template>

<script>
import UserForm from "~/components/en/Forms/userForm.vue"
export default {
  middleware: ["check-auth", "auth"],
  layout: "adminlayout",
  components: {
    UserForm,
  },
}
</script>

<style lang="scss" scoped>
.en-user {
  display: flex;
  justify-content: center;
  &-content {
    margin-top: 10%;
    width: 90%;
  }
}
</style>
