<template>
  <v-container>
    Das Auto mit der Fahrgestellnummer "{{ $controller.params["CarDealerMenu"].vehicleId }}" wurde erfolgreich auf "{{ $controller.params["CarDealerMenu"].playerName }}" umgeschrieben.
  </v-container>

</template>

<script>
import {useConfigStore} from "@/stores/config";

export default {
  name: "CarDealerMenuSuccess",
  setup() {
    const store = useConfigStore()
    store.setConfigValue("windowTitle", "Erfolg")
  }
}
</script>

<style scoped>

</style>