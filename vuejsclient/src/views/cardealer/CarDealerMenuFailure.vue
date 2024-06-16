<template>
  <v-container>
    Leider konnte das Fahrzeug mit der Fahrgestellnummer "{{ $controller.params["CarDealerMenu"].vehicleId }}" nicht auf "{{ $controller.params["CarDealerMenu"].playerName }}" umgeschrieben werden.
    <br/>{{ $controller.params["CarDealerMenu"].msg }}
  </v-container>

</template>

<script>
import {useConfigStore} from "@/stores/config";

export default {
  name: "CarDealerMenuFailure",
  setup() {
    const store = useConfigStore()
    store.setConfigValue("windowTitle", "Fehler")
  }
}
</script>

<style scoped>

</style>