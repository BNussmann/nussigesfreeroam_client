<template>
  <SingleInputForm label="Gewerbename" :close-on-input="false" :field-rules="nameRules" placeholder="Name" :event="event" info-component="infos/CompanyRegistrationInfo" title="Gewerbe registrieren" confirm-text="💲 50.000"></SingleInputForm>
</template>

<script>

import SingleInputForm from "@/components/forms/SingleInputForm.vue";
import { useConfigStore } from '@/stores/config.js'


export default {
  name: "CompanyRegistrationForm",
  components: {
    SingleInputForm,
  },
  setup() {
    const store = useConfigStore()
    store.setConfigValue("windowTitle", "Gewerbe registrieren")

  },
  mounted() {
    this.$event.on("Vue:CompanyRegistration:Confirmation", (success, companyName, msg) => {
      console.log("Got the confirmation: " + success + "; " + companyName + "; " + msg)
      if(success === true) {
        this.$controller.changePage("CompanyRegistration", "success", { company: companyName })
      }else {
        this.$controller.changePage("CompanyRegistration", "failure", {company: companyName, msg: msg})
      }
    })
  },
  data() {
    return {
      valid: true,
      companyName: '',
      nameRules: [
        v => !!v || 'Du musst einen Namen angeben',
        v => (v && v.length <= 40) || 'Der Name darf höchstens 40 Zeichen lang sein',
        v => /^[A-Za-z .-]*$/.test(v) || 'Unerlaubte Zeichen erkannt. Erlaubt sind a-Z, "." und "-".'
      ],
      event: "Server:Company:Register",
    }
  }
}
</script>
