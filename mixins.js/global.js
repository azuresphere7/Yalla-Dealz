
import BalloonBlockEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      editorBalloonBlockEditor: BalloonBlockEditor,
    }
  },
  computed: {
    configApi() {
      return {
        headers: {
          authorization: this.$store.getters.token,
        }
      }
    },
    /* username() {
      return this.$store.getters.username
    } */
  },
  methods: {
    displayError(err) {
      let mess = err.message;
      if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
      this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red'});
    }
  },
}