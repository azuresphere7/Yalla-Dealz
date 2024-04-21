<template>
  <div>
    <push/>
    <message/>
  </div>
</template>

<script>
import push from '~/components/en/Dashboard/push'
import message from '~/components/en/Dashboard/push/message'
export default {
  middleware: ["check-auth", "auth"],
  head() {
    return { titleTemplate: "%s - Users" };
  },
  layout: "adminlayout",
  components : {
    push,
    message,
  },
}
</script>

<style scoped></style>
