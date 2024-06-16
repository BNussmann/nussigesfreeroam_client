<template>
  <div class="body">
    <v-card class="druglabcontent">
        <table>
        <tr>
            <th>Vehicle</th>
            <th>Price</th>
        </tr>
        <tr v-for="item in params.garageParkInArray" :key="item.name">
          <v-btn class="buttonstyle" @click="sendBuyVehicle(item)">{{item.name}}</v-btn>
            <td>{{item.license}}💲</td>
          </tr>
        </table>
    </v-card>
  </div>
</template>
    
    <script>
import { ref } from "vue";
import { useConfigStore } from "@/stores/config";

export default {
  name: "Garage",
  components: {},
  setup() {},
  data() {
    return {
      buyVehicle: "Server:Buy:Vehicle"
    };
  },
  methods: {
    sendBuyVehicle(item) {
      this.$event.callGame(
        {
          type: "server",
          name: this.buyVehicle,
          data: {
            name: item.name,
            price: item.price
          },
        },this.close())},

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
    store.setConfigValue("windowTitle", "Garage " + this.params.garageName);
  },
};
</script>
    
<style scoped>
.body {

}

.parkInString {
    position: relative;
    justify-content: center;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td {
  border: 1px dotted #413d3d;
  text-align: left;
  padding: 8px;
}

th {
  border: 1px solid #413d3d;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #312f2f;
}
</style>