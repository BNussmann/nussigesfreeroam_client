<template>
 <YesNoWindow :info-text="$controller.params['TwoOptionPrompt'].promptInfo" :title="$controller.params['TwoOptionPrompt'].promptTitle" :yes-message="$controller.params['TwoOptionPrompt'].promptYesMessage" :no-message="$controller.params['TwoOptionPrompt'].promptNoMessage" :event="$controller.params['TwoOptionPrompt'].promptReturnEvent" :prompt-params="$controller.params['TwoOptionPrompt'].promptParams"></YesNoWindow>
</template>

<script>
import YesNoWindow from "@/components/forms/YesNoWindow.vue";
export default {
  name: "TwoOptionPrompt",
  components: {YesNoWindow}
}
</script>

<style scoped>
  #TwoOptionPrompt {
    width: 15%;
    height: 10%;
  }
</style>