<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12" md="8">
        <v-card elevation="5">
          <v-card-title>
            Message form users
          </v-card-title>
          <v-card-text>
            <hr>
            <v-form ref="form" v-model="valid">
              <v-switch
                v-model="sendToAll"
                label="Distribute to all"
              ></v-switch>
              <v-row dense>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="dataMsg.users"
                    :items="users"
                    label="Users"
                    item-text="firstName"
                    item-value="_id"
                    :rules="[
                      v => !!v.length || 'Users is required'
                    ]"
                    multiple
                    outlined
                    dense
                    chips
                    small-chips
                    v-if="!sendToAll"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        small
                        @click="data.select"
                        @click:close="remove(data.item._id)"
                      >
                        {{ `${data.item.firstName} ${data.item.lastName}` }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      {{ `${data.item.firstName}
                          ${data.item.lastName}
                          ${data.item.phone ? `(${data.item.phone})` : ''}` }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="dataMsg.message"
                    placeholder="Message"
                    :rules="[
                      v => !!v || 'Message is required'
                    ]"
                    outlined
                    dense
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="send"
              >
                Send Message
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  
  data() {
    return {
      valid: true,
      dataMsg: {
        message: "",
        users: [],
      },
      sendToAll: true,
      users: [],
    };
  },
  watch: {
    sendToAll(val) {
      if (val) this.dataMsg.users = this.users.map(el => el._id)
      else this.dataMsg.users = []
    }
  },
  methods: {
    async init() {
      try {
        const items = (await this.$axios.get("/user/getUsers", this.configApi)).data.users;
        this.users = items.filter(el => el.phone)
        if (this.sendToAll) this.dataMsg.users = this.users.map(el => el._id);
      } catch (err) {
        if (err.response && err.response.data) {
          this.$store.dispatch('settings/activeMsg', { text: err.response.data.message, color: 'red'})
        }
      }
    },
    async send() {
      if (!this.$refs.form.validate()) return;
      try {
        await this.$axios.post("/webSetting/send/phoneMessage", this.dataMsg, this.configApi);
        this.$refs.form.reset();
        this.$store.dispatch('settings/activeMsg', { text: 'Message sent successfully', color: 'success'})
      } catch (err) {
        if (err.response && err.response.data) {
          this.$store.dispatch('settings/activeMsg', { text: err.response.data.message, color: 'red'})
        }
      }
    },
    remove (id) {
      const index = this.dataMsg.users.indexOf(id)
      if (index >= 0) this.dataMsg.users.splice(index, 1)
    },
  },
  async mounted() {
    await this.init();
  }
}
</script>

<style>

</style>