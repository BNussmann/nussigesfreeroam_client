<template>
  <div class="body">
    <v-card class="druglabcontent">
      <div class="d-flex flex-row">
        <v-tabs direction="vertical" v-model="tab">
          <v-tab value="laboverview"> Laborübersicht </v-tab>
          <v-tab value="loading"> Ein-/Auslieferungen </v-tab>
          <v-tab value="summary"> Zusammenfassung </v-tab>
          <v-tab value="expanse"> Labor Ausbauen </v-tab>
        </v-tabs>
        <v-window v-model="tab" class="flex-grow-1">
          <v-window-item value="laboverview">
            <v-card-flat>
              <v-card-text>
                <div class="overview_text">Laborübersicht:</div>
                <br /><br />
                <div class="window_text">
                  Laborfüllstand: {{ params.kgindone }} /
                  {{ params.kgmaxdone }} KG:
                </div>
                <v-progress-linear
                  v-model="fillstatedone"
                  color="light-green darken-4"
                  height="20"
                  striped
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
                <br />
                <div class="window_text">
                  Rohmaterialfüllstand: {{ params.kginundone }} /
                  {{ params.kgmaxundone }} KG:
                </div>
                <v-progress-linear
                  v-model="fillstateundone"
                  color="deep-orange"
                  height="20"
                  striped
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </v-card-text>
              <br /><br /><br /><br />
              <v-btn class="buttonstyle" @click="changeLabState">
                <span v-if="params.laborstate">Labor ausschalten!</span>
                <span v-else>Labor einschalten!</span></v-btn
              >
              <br><br>
              <v-btn class="buttonstyle" @click="resetSummary">Zusammenfassung zurücksetzen!</v-btn>
            </v-card-flat>
          </v-window-item>
          <v-window-item value="loading">
            <v-card-flat>
              <v-card-text>
                <div class="overview_text">Ein/Auslieferungen:</div>
                <br><br>
                <v-table height="42vh">
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">ItemName</th>
                      <th class="text-left">Amount</th>
                      <th class="text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in params.loadingarray" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.itemname }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.timestamp }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card-flat>
          </v-window-item>
          <v-window-item value="summary">
            <v-card-flat>
              <v-card-text>
                <div class="overview_text">Zusammenfassung:</div>
                <br><br>
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">ItemName</th>
                      <th class="text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in params.summaryarray" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.itemname }}</td>
                      <td>{{ item.amount }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card-flat>
          </v-window-item>
          <v-window-item value="expanse">
            <v-card-flat>
              <v-card-text> 
                <div class="overview_text">Labor ausbauen:</div>
                <br><br>
                <div class="window_text">
                  Aktuelle Kapazität Laborlager: {{ params.kgmaxdone }} KG.
                </div>
                <v-btn class="buttonstyle" @click="extendStorageDone">Laborlager ausbauen!({{params.priceupgradedone}}💲)</v-btn>
                <br><br>
                <div class="window_text">
                  Aktuelle Kapazität Rohmateriallager: {{ params.kgmaxundone }} KG.
                </div>
                <v-btn class="buttonstyle" v-if="params.kgmaxundone <= 1500" @click="extendStorageUnDone">Rohmateriallager ausbauen!({{params.priceupgradeundone}}💲)</v-btn>
              </v-card-text>
            </v-card-flat>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import { useConfigStore } from "@/stores/config";

export default {
  name: "DrugLabOverview",
  components: {},
  setup() {},
  data() {
    return {
      tab: "laboverview",
      fillstatedone: 0,
      fillstateundone: 0,
      eventlabstate: "Server:Laboratories:ChangeState",
      eventresetsummary: "Server:Laboratories:ResetSummary",
      eventextendstoragedone: "Server:Laboratories:ExtendStorageDone",
      eventextendstorageundone: "Server:Laboratories:ExtendStorageUnDone",
    };
  },
  methods: {

    changeLabState(){
      this.$event.callGame({
        type: "server",
        name: this.eventlabstate
      },)
    },
    resetSummary(){
      this.$event.callGame({
        type: "server",
        name: this.eventresetsummary
      },)
    },
    extendStorageDone(){
      this.$event.callGame({
        type: "server",
        name: this.eventextendstoragedone
      },)
    },
    extendStorageUnDone(){
      this.$event.callGame({
        type: "server",
        name: this.eventextendstorageundone
      },)
    }
    
  },
  mounted() {
    const store = useConfigStore();
    store.setConfigValue("windowTitle", "Labor " + this.params.factionname);
    this.fillstatedone = (this.params.kgindone / this.params.kgmaxdone) * 100;
    this.fillstateundone = (this.params.kginundone / this.params.kgmaxundone) * 100;
  },
};
</script>
  
  <style scoped>
.body {
  height: 52vh;
  width: 76vh;
  display: flex;
  overflow: auto;
}

.overview_text {
  position: relative;
  font-family: "pricedown", Verdana, Tahoma;
  font-size: 5vh;
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 1vh;
  text-decoration: underline;
}

.loadingarray {
  overflow: auto;
}

.window_text {
  text-decoration: underline;
}

.druglabcontent {
  flex-grow: 1;
}

.buttonstyle {
  background-color: purple;
  width: 95%;
  height: 2.5vh;
  margin-left: 1vh;
}
</style>