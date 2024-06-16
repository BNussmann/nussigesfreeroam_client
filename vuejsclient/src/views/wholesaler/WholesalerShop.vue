<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="shop_item in shop_items"
        :key="shop_item.id"
        :cols="3">
        <v-card>
          <v-card-title class="text-white" v-text="shop_item.name"></v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-basket" @click="this.buyItem(shop_item.id)">Kaufen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  /**
   * WIRD NICHT GENUTZT, TODO Aufbau neues Shopsystem auf Basis von VUE
   **/
  name: "WholesalerShop",
  mounted() {

    this.$event.on("Vue:Wholesaler:DeliverData", (shop_data) => {
      if(shop_data != null) {
        this.updateShopData(shop_data);
      }
    })

    this.$event.callServer("Server:Wholesaler:LoadShopData");

  },
  data() {
    return {
      shop_items: null
    }
  },
  methods: {
      buyItem(shop_item_id) {
        console.log(`Buying Item: ${shop_item_id}`);

        this.$event.callServer("Server:Wholesaler:BuyItem", shop_item_id);
      },
      updateShopData(shop_data) {
          this.shop_items = shop_data.items;
      }
  }
}
</script>

<style scoped>

</style>