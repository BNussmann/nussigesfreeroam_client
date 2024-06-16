<template>
  <v-card width="100%">
    <v-dialog v-model="inviteDialog" contained>
      <v-card style="padding:0 20px 0 20px;">
        <v-card-title>Mitarbeiter einstellen</v-card-title>
        <v-text-field label="Name" v-model="memberInviteName"></v-text-field>
        <v-card-actions>
          <v-btn
              color="success"
              @click="inviteMember()"
              width="50%"
              style="margin-bottom: 10px;"
          >
            Einstellen
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <v-dialog v-model="infoDialog" contained>
      <v-card style="padding:0 20px 0 20px;">
        <v-card-title>{{ this.infoDialogSuccess ? "Mitarbeiter erfolgreich eingestellt!" : this.infoDialogMsg}}</v-card-title>

      </v-card>
    </v-dialog>
    <v-dialog v-model="leaveCompanyErrorDialog" contained>
      <v-card style="padding:0 20px 0 20px;">
        <v-card-title>{{ this.leaveCompanyErrorDialogMsg }}</v-card-title>

      </v-card>
    </v-dialog>
    <v-tabs
        v-model="tab"
        centered
        stacked
        class="company-admin-header" fill
    >
      <v-tab class="company-app-tab" value="overview">
        <font-awesome-icon icon="fa-solid fa-circle-info" />
        Übersicht
      </v-tab>
      <v-tab class="company-app-tab" value="members">
        <font-awesome-icon icon="fa-solid fa-user-group" />
        Mitarbeiter
      </v-tab>
      <!--v-tab class="company-app-tab" value="administration">
        <font-awesome-icon icon="fa-solid fa-gear" />
        Verwalten
      </v-tab-->
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="overview">
          <v-row>
            <v-col>
              <v-card width="50%" style="background-color: #333333;">
                <v-card-title>Allgemein</v-card-title>
                <v-card-text>
                  <strong>{{ this.generalCompanyInfo !== null ? this.generalCompanyInfo.companyName : ""  }}</strong>
                  <br>
                  Eigentümer: {{ this.generalCompanyInfo !== null ? this.generalCompanyInfo.companyOwner : ""}}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card width="50%" style="background-color: #333333;">
                <v-card-title>Finanzen</v-card-title>
                <v-card-text>
                  <strong>Aktuell: {{ this.generalCompanyInfo !== null ? $n(this.generalCompanyInfo.companyMoney, 'currency') : 0  }}</strong>
                </v-card-text>
              </v-card>
            </v-col>

          </v-row>

          <v-table fixed-header height="475px">
            <thead>
            <tr>
              <th class="text-left transaction-header">Datum</th>
              <th class="text-left transaction-header">Typ</th>
              <th class="text-left transaction-header">Transaktion</th>
              <th class="text-left transaction-header">Sender/Empfänger</th>
              <th class="text-left transaction-header">Betrag</th>
            </tr>
            </thead>
            <tbody>
            <tr class="table-body-placeholder" v-if="transactions.length === 0">
              <td class="table-placeholder-text" :colspan="5">
                Bisher keine Transaktionen.
              </td>
            </tr>
            <tr v-for="item in transactions"
                :key="item.id" :class="{negative: item.amount < 0, positive: item.amount >= 0}">
              <td>{{ item.date }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.toOrFrom }}</td>
              <td>{{ item.amount > 0 ? "+" : ""}}{{ $n(item.amount, 'currency') }}</td>
            </tr>
            </tbody>
          </v-table>
        </v-window-item>
        <v-window-item value="members">
          <v-table fixed-header>
            <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Rang</th>
              <th class="text-left">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr class="table-body-placeholder" v-if="members.length === 0">
              <td class="table-placeholder-text" :colspan="3">
                Bisher keine Mitarbeiter.
              </td>
            </tr>
            <tr v-for="item in members"
                :key="item.id" :class="{active: active_member === item.id, inactive: active_member !== item.id}"
                @click="setActiveMember(item.id)">
              <td>{{ item.id }}</td>
              <td>{{ item.rank }}</td>
              <td>{{ item.name }}</td>
            </tr>
            </tbody>
          </v-table>
          <div class="flex-row--reverse" style="display: flex;">
            <v-btn v-if="isOwner()"
                   class="company-members-btn" variant="outlined" @click="requestMemberKick()">Mitarbeiter kündigen</v-btn>
            <v-btn v-else class="company-members-btn" variant="outlined" @click="requestLeave()">Kündigen</v-btn>
            <!--v-btn class="company-members-btn" style="margin-right: 10px;" variant="outlined"
                   @click="requestMemberRankChange()">Rang ändern
            </v-btn-->
            <v-btn v-if="isOwner()"
                @click="inviteDialog = true"
                class="company-members-btn" style="margin-right: 10px;" variant="outlined"
            >
              Mitarbeiter einstellen
            </v-btn>

          </div>

          <select-confirm-popup ref="selectMemberRankChangeDialogue"
                                text="Ändern Sie den Rang für den von Ihnen ausgewählten Mitarbeiter."></select-confirm-popup>
          <confirm-popup ref="confirmKickDialogue"
                         text="Wollen Sie den ausgewählten Mitarbeiter wirklich feuern?"></confirm-popup>
          <confirm-popup ref="confirmLeaveDialogue"
                         text="Wollen Sie wirklich das Unternehmen verlassen?"></confirm-popup>

        </v-window-item>
        <!--v-window-item value="administration">
          <div class="d-flex flex-row">
            <v-tabs direction="vertical" v-model="other_tab">
              <v-tab value="property">Eigentum</v-tab>
              <v-tab value="shoplist">Shopliste</v-tab>
              <v-tab value="config">Konfiguration</v-tab>
            </v-tabs>
            <v-divider class="company-admin-vertical-divider" vertical></v-divider>
            <v-window v-model="other_tab" class="company-admin-config-tab">
              <v-window-item :transition="false"  value="property">
                <v-list lines="one">
                  <v-list-item
                      v-for="item in ownedShops"
                      :key="item.id"
                      :title="item.name"
                      :prepend-icon="item.prependIcon"
                      class="company-admin-shop-item">
                  </v-list-item>
                </v-list>
              </v-window-item>
              <v-window-item :transition="false" value="shoplist">
                    <v-list lines="one">
                      <v-list-item
                          v-for="shop in shops"
                          :key="shop.id"
                          :title="shop.name"
                          :prepend-icon="shop.prependIcon"
                          class="company-admin-shop-item">
                        <v-btn :icon="mdi-basket" @click="buyShop(shop.id, shop.type)"></v-btn>
                      </v-list-item>
                    </v-list>
              </v-window-item>
              <v-window-item :transition="false" class="company-admin-config-tab" value="config">
                <v-card-flat>
                  <v-card-text>
                  </v-card-text>
                </v-card-flat>
              </v-window-item>
            </v-window>
          </div>
        </v-window-item-->
      </v-window>
    </v-card-text>
  </v-card>
  <!--v-chart class="chart" :option="option"/-->

</template>

<script>
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {LineChart} from 'echarts/charts';
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from 'echarts/components';
import VChart, {THEME_KEY} from 'vue-echarts';
import ConfirmPopup from "@/components/utils/ConfirmPopup.vue";
import SelectConfirmPopup from "@/components/utils/SelectConfirmPopup.vue";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);


export default {

  name: "CompanyAdministrationMenu",

  components: {
    SelectConfirmPopup,
    VChart, ConfirmPopup
  },
  provide: {
    [THEME_KEY]: 'dark',
  },
  mounted() {
    this.$event.on("Vue:CompanyAdministration:DeliverData", (company_data) => {
      this.changeTransactions(company_data.transactions, company_data.currentMoney, company_data.moneyStartPoint);
      this.updateShopList(company_data.shops);
      this.updateOwnedShopList(company_data.ownedShops);
      this.updateMemberList(company_data.members);
      this.updateGeneralInfo(company_data.general);
    });

    this.$event.on("Vue:CompanyAdministration:ConfirmUser", (success, name, msg) => {
      this.infoDialogSuccess = success;
      this.infoDialogMsg = msg;
      this.infoDialog = true;
    });

    this.$event.on("Vue:CompanyAdministration:LeaveCompanyConfirm", (success, msg) => {
      if(success === false) {
        this.leaveCompanyErrorDialogMsg = msg;
        this.leaveCompanyErrorDialog = true;
      }else {
        this.close();
      }

    })

    this.$event.callGame({type: "server", name: "Server:CompanyAdministration:LoadData"});
    this.moneyFormatter = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  },
  methods: {
    setActiveMember(memberId) {
      this.active_member = memberId;
    },
    isOwner() {
      return this.generalCompanyInfo != null && this.generalCompanyInfo.companyOwnerId != null && this.generalCompanyInfo.requesterCharId != null && this.generalCompanyInfo.companyOwnerId === this.generalCompanyInfo.requesterCharId;
    },
    async requestMemberKick() {
      if (this.active_member != null) {
        const ok = await this.$refs.confirmKickDialogue.show();

        if (ok) {
          this.$event.callGame({type: "server", name: "Server:CompanyAdministration:KickPlayer"}, this.generalCompanyInfo.companyId, this.active_member);
        }
      }
    },
    async requestLeave() {
      const ok = await this.$refs.confirmLeaveDialogue.show();

      if (ok) {
        this.$event.callGame({type: "server", name: "Server:CompanyAdministration:LeaveCompany"});
      }
    },
    async requestMemberRankChange(memberId, rank) {
      if (this.active_member != null) {
        const rank = await this.$refs.selectMemberRankChangeDialogue.show();
        if (rank) {
          console.log(rank);
          this.$event.callGame({
            type: "server",
            name: "Server:CompanyAdministration:SetCompanyMemberRank"
          }, this.active_member, rank);
        }

      }

    },
    async inviteMember() {
      if(this.memberInviteName !== "" && this.generalCompanyInfo !== null && this.generalCompanyInfo.companyId) {
        this.$event.callGame({
          type: "server",
          name: "Server:CompanyAdministration:InviteMember"
        }, this.generalCompanyInfo.companyId, this.memberInviteName);
        this.inviteDialog = false;
      }
    },

    changeTransactions(transactions, currentMoney, moneyStartPoint) {
      this.transactions = transactions;
      let dates = [...new Set(transactions.map(x => x.date))];
      let absolute_positive_values = [];
      let absolute_negative_values = [];
      let sum_by_date = {};
      let formatted_sum_by_date = {};
      let transactions_by_date = {};
      let transaction_values_by_date = {};

      for (let date of dates) {
        transactions_by_date[date] = [];
        transaction_values_by_date[date] = 0;
        sum_by_date[date] = 0;
        formatted_sum_by_date[date] = 0;
      }

      for (let transaction of transactions) {
        transactions_by_date[transaction.date].push(transaction);
        transaction_values_by_date[transaction.date] += transaction.amount;
      }

      let current = moneyStartPoint;
      let previousDate = null;
      for (let [date, absolute] of Object.entries(transaction_values_by_date)) {
        current += absolute;
        if (absolute >= 0) {
          absolute_positive_values[date] = absolute;
          absolute_negative_values[date] = 0;
        } else {
          absolute_positive_values[date] = 0;
          absolute_negative_values[date] = -absolute;
        }
        if (previousDate != null && absolute < 0) {
          formatted_sum_by_date[previousDate] += absolute;
        }
        sum_by_date[date] = current;
        formatted_sum_by_date[date] = current;
        previousDate = date;
      }

      //this.option.xAxis.data = dates;
      let total_data = [moneyStartPoint];
      let transaction_values = dates.map(date => formatted_sum_by_date[date]);
      transaction_values.splice(transaction_values.length - 1, 1);
      //console.log(total_data.concat(transaction_values));
      //this.option.series.splice(0, this.option.series.length);
      // this.option.series.push(
      //     {
      //       name: 'test',
      //       type: "bar",
      //       stack: "Total",
      //       itemStyle: {
      //         borderColor: 'transparent',
      //         color: 'transparent'
      //       },
      //
      //       tooltip: {
      //         show: false
      //       },
      //       data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
      //     },
      //     {
      //       name: 'Income',
      //       type: 'bar',
      //       stack: 'Total',
      //       label: {
      //         show: true,
      //         position: 'top'
      //       },
      //       data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
      //     },
      //     {
      //       name: 'Expenses',
      //       type: 'bar',
      //       stack: 'Total',
      //       label: {
      //         show: true,
      //         position: 'bottom'
      //       },
      //       data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]


      console.log(this.option);
      /**
       *
       *
       *           {
       *             name: 'Ausgaben',
       *             data: dates.map(date => absolute_negative_values[date]),
       *             type: 'bar',
       *             stack: 'Total',
       *             label: {
       *               show: true,
       *               position: 'bottom'
       *             },
       *             tooltip: {
       *               valueFormatter: value => value + ' 💲'
       *             },
       *           },
       *           {
       *             name: 'Kontostand',
       *             type: 'line',
       *             label: {
       *               show: true,
       *               position: 'top'
       *             },
       *             data: dates.map(date => sum_by_date[date]),
       *             tooltip: {
       *               valueFormatter: value => value + ' 💲'
       *             }
       *           }
       */
    },
    updateShopList(shops) {
      let parsedShops = [];
      for (let shop of shops) {
        parsedShops.push({
          id: shop.temp_uniqueid,
          foreign_id: shop.foreign_id,
          name: shop.name,
          prependIcon: shop.type === 'fuel_station' ? 'mdi-barrel' : shop.type === 'shop' ? 'mdi-cart' : 'mdi-water',

        })
      }
      this.shops = parsedShops;
    },
    updateOwnedShopList(shops) {
      let parsedOwnedShops = [];
      for (let shop of shops) {
        parsedOwnedShops.push({
          id: shop.temp_uniqueid,
          foreign_id: shop.foreign_id,
          name: shop.name,
          prependIcon: shop.type === 'fuel_station' ? 'mdi-barrel' : shop.type === 'shop' ? 'mdi-cart' : 'mdi-water',

        })
      }

      this.ownedShops = parsedOwnedShops;
    },
    buyShop(shop_id, type) {
      this.$event.callServer("Server:CompanyAdministration:BuyShop", shop_id, type);
    },
    updateMemberList(members) {
      console.log(members);
      this.members = members;
    },
    updateGeneralInfo(info) {
      this.generalCompanyInfo = info;
    }
  },
  data() {
    return {
      tab: null,
      active_member: null,
      other_tab: null,
      ownedShops: null,
      transactions: [],
      shops: [],
      members: [],
      inviteDialog: false,
      infoDialog: false,
      infoDialogSuccess: false,
      infoDialogMsg: "",
      leaveCompanyErrorDialog: false,
      leaveCompanyErrorDialogMsg: "",
      memberInviteName: "",
      cost: 123321,
      generalCompanyInfo: null,
      moneyFormatter: null,
      option: {
        title: {
          text: 'Finanzen'
        },
        legend: {
          data: ['Ausgaben', 'Einnahmen']
        },
        tooltip: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {type: "value"},
        series: []
      }
    }
  }
}
</script>

<style scoped>
.chart {
  height: 450px;
  width: 60%;
}

.positive {
  background-color: #236627;
}

.negative {
  background-color: rgba(210, 35, 35, 0.29);
}

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

.active {
  background-color: #656565;
}

.table-body-placeholder {
  height: 150px;
}

.table-placeholder-text {
  text-align: center;
}

.company-app-tab {
  font-family: "pricedown", Verdana, Tahoma;
  font-size: 2vh;
  user-select: none;
  /* text-shadow: rgba(0, 0, 0, 0.5) -1px 0, rgba(0, 0, 0, 0.3) 0 -1px, rgba(255, 255, 255, 0.5) 0 1px, rgba(0, 0, 0, 0.3) -1px -2px; */
}

.company-members-btn {
  margin-top: 50px;
}

.flex-row--reverse {
  flex-direction: row-reverse;
}

.company-admin-header {
  background-color: #0f9917;
}

.shine:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 50px;
  background: -moz-linear-gradient(top, rgba(255, 255, 255, .15), rgba(0, 0, 0, .25))

}

.company-admin-config-tab {
  margin-left: 20px;
}

.company-admin-shop-item:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.company-admin-vertical-divider {
  margin-left: 20px;
}

.company-admin-shop-item {
  padding: 20px;
  transition: all 0.2s ease;
  user-select: none;
}

.v-overlay__scrim {
  opacity: 0 !important;
}

.transaction-header {
  background-color: #222 !important;
}

</style>