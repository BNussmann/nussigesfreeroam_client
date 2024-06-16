<template>
  <v-layout class="" style="">
    <v-container class="pa-3 pt-1">
    <v-main class="d-flex flex-column">
      <dynamic-component :component-name="infoComponent"/>
      <v-form
          ref="form"
          v-model="valid"
          style="margin-top:-10px;">
          <v-text-field class="pt-5"
              v-model="textField"
              :label="label"
              :rules="fieldRules"
              :placeholder="placeholder"
              variant="outlined"
          ></v-text-field>
          <v-row no-gutters style="margin-top:-10px;">
          <v-spacer></v-spacer>
          <v-btn
              dark
              x-large
              :disabled="!valid"
              color="success"
              class=""
              @click="sendform"
          >
            {{ confirmText }}
          </v-btn>
          </v-row>
      </v-form>
    </v-main>
    </v-container>
  </v-layout>
</template>

<script>
import DynamicComponent from "../utils/DynamicComponent.vue";
import {useConfigStore} from "@/stores/config";
export default {
  name: "SingleInputForm",
  components: {DynamicComponent},
  mounted() {
    const store = useConfigStore();
    store.setConfigValue("windowTitle", this.title);
  },
  methods: {
    sendform() {
      this.$event.callGame({
        type: "server",
        name: this.event
      }, this.textField);
      if(this.closeOnInput != null && this.closeOnInput) {
        this.close();
      }

    },
    close() {
      this.$controller.destroyApp(this.appName)
    }
  },
  props: {
      type: String,
      fieldRules: Array,
      label: String,
      confirmText: String,
      placeholder: String,
      event: String,
      title: String,
      infoComponent: String,
      closeOnInput: Boolean
  },
  data() {
    return {
      valid: true,
      textField: "",
    }
  }
}
</script>

<style lang="scss">
</style>
