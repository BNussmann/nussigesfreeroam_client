<template>
  <v-container style="padding: 0px !important; background: rgb(33,33,33);">
    <v-table style="height: 96%; margin-top: 4%; padding: 1%;" fixed-header="true">
      <thead>
      <tr>
        <th class="text-left">Datum</th>
        <th class="text-left">Charakter Id</th>
        <th class="text-left">Charakter Name</th>
        <th class="text-left">Position</th>
        <th class="text-left">Betreff</th>
        <th class="text-left">Nachricht</th>
        <th class="text-left"></th>
        <th class="text-left"></th>
      </tr>
      </thead>
      <tbody>
        <tr class="table-body-placeholder" v-if="support_requests.length === 0">
          <td class="table-placeholder-text" :colspan="8">
            Bisher keine unbearbeiteten Support Anfragen.
          </td>
        </tr>
        <tr v-for="item in support_requests"
            :key="item.id">
          <td>{{ item.date }}</td>
          <td>{{ item.charId }}</td>
          <td>{{ item.charName }}</td>
          <td>(x: {{ item.posX.toFixed(2) }} | y: {{ item.posY.toFixed(2) }} | z: {{ item.posZ.toFixed(2) }})</td>
          <td>{{ item.subject }}</td>
          <td>{{ item.msg }}</td>
          <td>
            <v-icon v-if="item.wip" @click="toggleWip(item.id)">mdi-timer-sand-full</v-icon>
            <v-icon v-else @click="toggleWip(item.id)">mdi-timer-sand-empty</v-icon>
          </td>
          <td><v-btn @click="resolve(item.id)">Gelöst</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

</template>

<script>

export default {
  name: "SupportAppHome",
  components: {
  },
  mounted() {
    this.$event.on("Vue:SupportApp:DeliverData", (data) => {
      this.updateSupportRequests(data.requests);
    });
    this.$event.callGame({type: "server", name: "Server:SupportApp:LoadData"});
  },
  methods: {
      updateSupportRequests(requests) {
        this.support_requests = requests;
      },
      resolve(id) {
        this.$event.callGame({type: "server", name: "Server:SupportApp:ResolveRequest"}, id);
      },
      toggleWip(id) {
        this.$event.callGame({type: "server", name: "Server:SupportApp:ToggleWip"}, id)
      }
  },
  data() {
    return {
      support_requests: []
    }
  }
}
</script>

<style scoped>

</style>