<template>
  <v-layout class="" style="">
    <v-container class="pa-3 pt-1 subjectMessageFormContainer">
      <v-main class="d-flex flex-column">
        <dynamic-component :component-name="infoComponent"/>
        <v-form
            ref="form"
            v-model="valid"
            style="margin-top:-10px;">
          <v-text-field class="pt-3"
                        v-model="subject"
                        :label="labelSubject"
                        :rules="subjectRules"
                        :placeholder="placeholderSubject"
                        variant="outlined"
          ></v-text-field>
          <v-textarea class="pt-1"
                        v-model="textField"
                        :label="labelMessage"
                        :rules="messageRules"
                        :placeholder="placeholderMessage"
                        variant="outlined"
          ></v-textarea>
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
  name: "SubjectMessageForm",
  components: {DynamicComponent},
  methods: {
    sendform() {
      this.$event.callGame({
        type: "server",
        name: this.event
      }, this.subject, this.textField);

      this.close();
    },
    close() {
      this.$controller.destroyApp(this.appName)
    }
  },
  mounted() {
    const store = useConfigStore();
    store.setConfigValue("windowTitle", this.title);
    store.setConfigValue("titleLeft", true);
  },
  props: {
    type: String,
    subjectRules: Array,
    messageRules: Array,
    confirmText: String,
    placeholderSubject: String,
    placeholderMessage: String,
    labelMessage: String,
    labelSubject: String,
    event: String,
    title: String,
    infoComponent: String
  },
  data() {
    return {
      valid: true,
      textField: "",
      subject: "",
    }
  }
}
</script>

<style lang="scss">
.subjectMessageFormContainer {
  color: #000;
}
</style>
