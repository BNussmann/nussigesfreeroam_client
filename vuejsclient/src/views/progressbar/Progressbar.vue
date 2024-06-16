<template>
  <div>
    <div class="progressbar">
      <v-progress-linear
        v-model="progressValue"
        height="10"
        striped
        color="deep-orange"
      ></v-progress-linear>
    </div>
  </div>
</template>
  
  <script>
import { useConfigStore } from "@/stores/config";
import { Console } from "console";

export default {
  name: "Progressbar",
  setup() {},
  data() {
    return {
      progressValue: 100,
    };
  },
  mounted() {
    const store = useConfigStore();
    store.setConfigValue("windowTitle", this.params.progressTitle);
    this.setProgressBarTimer(this.params.time, this.close);
  },
  methods: {
    setProgressBarTimer(maxTime, callback = null, currentTime = 0) {
      let stepTimer = 100 / maxTime;
      if (currentTime < maxTime) {
        setTimeout(() => {
          this.progressValue -= stepTimer;
          this.setProgressBarTimer(maxTime, callback, currentTime + 1);
        }, 1000);
      } else {
        if (callback != null) callback();
        this.progressValue = 0;
        return;
      }
    },
    close() {
      this.$controller.destroyApp(this.appName)
    },
  },
};
</script>
  
  <style scoped>
  body {
      align-items: flex-start !important;
  }
  .progressbar {
      width: 50vw;
  }

  #Progressbar {
    top: 2vh;
    width: 50vw;
    left: 25vw;
    position: absolute;
  }
</style>