<template>
  <v-container>
    Dein Unternehmen "{{ $controller.params["CompanyRegistration"].company }}" wurde erfolgreich registriert.
  </v-container>

</template>

<script>
import {useConfigStore} from "@/stores/config";

export default {
  name: "CompanyRegistrationSuccess",
  setup() {
    const store = useConfigStore()
    store.setConfigValue("windowTitle", "Erfolg")
  }
}
</script>

<style scoped>

</style>