<template>
  <DualInputForm first-label="Spielername" second-label="Fahrgestellnummer" :close-on-input="false" :field-rules="nameRules" first-placeholder="Spielername" second-placeholder="Fahrgestellnummer" :event="event" info-component="infos/CarDealerInfo" title="Auto umschreiben" confirm-text="Bestätigen"></DualInputForm>
</template>

<script>
import DualInputForm from "@/components/forms/DualInputForm.vue";
import { useConfigStore } from '@/stores/config.js'


export default {
  name: "CarDealerMenu",
  components: {
    DualInputForm,
  },
  setup() {
    const store = useConfigStore()
    store.setConfigValue("windowTitle", "Auto umschreiben")

  },
  mounted() {
    this.$event.on("Vue:CarDealer:Confirmation", (success, playerName, vehicleId, msg) => {
      if(success === true) {
        this.$controller.changePage("CarDealerMenu", "success", { playerName: playerName, vehicleId: vehicleId })
      }else {
        this.$controller.changePage("CarDealerMenu", "failure", {playerName: playerName, vehicleId: vehicleId, msg: msg})
      }
    })
  },
  data() {
    return {
      valid: true,
      companyName: '',
      nameRules: [],
      event: "Server:CarDealer:ChangeVehicleOwner",
    }
  }
}
</script>