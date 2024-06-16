<template>
  <div class="container prompt-container">
    <div class="prompt-info-text"> {{infoText}}</div>
    <div class="prompt-btns">
      <v-btn class="prompt-btn" color="success" @click="sendYes"> {{ yesMessage }} </v-btn>
      <v-btn class="prompt-btn" color="error" @click="sendNo"> {{ noMessage }} </v-btn>
    </div>
  </div>
</template>
<script>
import DynamicComponent from "../utils/DynamicComponent.vue";
import {useConfigStore} from "@/stores/config";
export default {
  name: "YesNoWindow",
  components: { DynamicComponent },
  methods: {
    sendYes() {
      this.$event.callGame(
        {
          type: "server",
          name: this.event,
        },"yes", this.promptParams);
        this.close();
    },
    sendNo() {
      this.$event.callGame(
        {
          type: "server",
          name: this.event,
        },"no", this.promptParams);
        this.close();
    },
    close() {
      this.$controller.destroyApp(this.appName)
      this.$event.callGame(
        {
          type: "server",
          name: "Server:HideMouse",
        },);
    }
  },
  mounted() {
      const store = useConfigStore();
      store.setConfigValue("windowTitle", this.title);
  },
  props: {
    yesMessage: String,
    noMessage: String,
    event: String,
    infoText: String,
    title: String,
    promptParams: Object
  }
};
</script>
<style scoped>
.prompt-btns {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
}
.prompt-container {
  max-height: 500px;
  max-width: 500px;
  display: flex;
  align-items: end;
  padding: 2vh;
  justify-content: space-between;
  position: relative;
  align-content: flex-end;
  flex-direction: column;
}

.prompt-info-text {
  align-self:start;
}
.prompt-btn {
  margin-left:1vh;
}
</style>