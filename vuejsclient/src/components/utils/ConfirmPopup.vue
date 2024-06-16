<template>
  <popup-modal ref="popup">
    <div class="confirmDialogText">{{ text }}</div>
    <v-btn style="margin-right: 5px;" variant="outlined" @click="_cancel">
      Abbrechen
    </v-btn>
    <v-btn variant="outlined" @click="_confirm">
      Bestätigen
    </v-btn>
  </popup-modal>


</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
  name: "SelectConfirmMessage",
  components: { PopupModal },
  props: {
    text: String
  },
  methods: {
    show() {
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open()
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel() {
      this.$refs.popup.close()
      this.resolvePromise(false)
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },
  },
  data() {
    return {
    }

  }
}
</script>

<style scoped>
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ok-btn {
  color: red;
  text-decoration: underline;
  line-height: 2.5rem;
  cursor: pointer;
}

.cancel-btn {
  padding: 0.5em 1em;
  background-color: #d5eae7;
  color: #35907f;
  border: 2px solid #0ec5a4;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}

.confirmDialogText {
  padding: 10px;
  margin-bottom: 15px;
}
</style>