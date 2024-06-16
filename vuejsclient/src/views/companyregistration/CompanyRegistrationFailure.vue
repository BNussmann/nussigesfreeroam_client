<template>
  <v-container>
    Dein Unternehmen "{{ $controller.params["CompanyRegistration"].company }}" konnte nicht registriert werden.<br/>
    <b>{{ $controller.params["CompanyRegistration"].msg }}</b>
  </v-container>
</template>

<script>
import {useConfigStore} from "@/stores/config";

export default {
  name: "CompanyRegistrationFailure",
  setup() {
    const store = useConfigStore()
    store.setConfigValue("windowTitle", "Fehler")
  }
}
</script>

<style scoped>

</style>