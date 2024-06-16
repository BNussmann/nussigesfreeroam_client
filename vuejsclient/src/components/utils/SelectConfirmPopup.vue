<template>
  <popup-modal ref="popup">
    {{ text }}
    <v-select
        v-model="selectedItem"
        label="Select"
        :items="items"
    ></v-select>
    <v-btn variant="outlined" @click="_cancel">
      Abbrechen
    </v-btn>
    <v-btn variant="outlined" @click="_confirm">
      Absenden
    </v-btn>
  </popup-modal>


</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
  name: "SelectConfirmPopup",
  components: { PopupModal },
  props: {
    items: Array,
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
      this.resolvePromise(this.selectedItem)
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
      selectedItem: null
    }

  }
}
</script>

<style scoped>
</style>