<template>
    <SingleInputForm label="Gewerbename" :field-rules="nameRules" placeholder="Name" :event="event" info-component="infos/CompanyRegistrationInfo" title="Gewerbe registrieren" confirm-text="💲 15.000"></SingleInputForm>
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
        if(success === "true") {
          this.$controller.changePage("CompanyRegistration", "success", { company: companyName })
        }else {
          this.$controller.changePage("CompanyRegistration", "failure", {company: companyName, msg: msg})
        }
      })
    },
    data() {
      return {
        methods: {
  
        },
        valid: true,
        companyName: '',
        nameRules: [
          v => !!v || 'Du musst einen Namen angeben',
          v => (v && v.length <= 40) || 'Der Name darf höchstens 40 Zeichen lang sein',
          v => /^[A-Za-z .-]*$/.test(v) || 'Unerlaubte Zeichen erkannt. Erlaubt sind a-Z, "." und "-".'
        ],
        event: "Server:RegisterCompany:ClientApplication",
      }
    }
  }
  </script>
  