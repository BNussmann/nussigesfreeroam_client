import * as alt from 'alt';
import * as game from 'natives';

let hudBrowser;

let curSpeed = 0;

alt.everyTick(() => {
    if (hudBrowser == null) return;
    if (alt.Player.local.vehicle == null) return;
    GetVehicleSpeed();
    hudBrowser.emit("CEF:HUD:SetPlayerHUDVehicleSpeed", curSpeed);
  });

//speedo

alt.onServer("Client:ShowSpeedo", () => {
    if (hudBrowser == null) {
        hudBrowser = new alt.WebView("http://resource/client/cef/hud/speedo/index.html");
      }
});

alt.onServer("Client:DestroySpeedo", () => {
    if (hudBrowser != null) {
        hudBrowser.destroy();
        hudBrowser = null;
      }
});

function GetVehicleSpeed() {
    let vehicle = alt.Player.local.vehicle;
    let speed = game.getEntitySpeed(vehicle.scriptID);
    curSpeed = speed * 3.6;
  }

//time
alt.onServer("Client:SetTime:Day", () => {
    let time = game.getClockHours();
    if(time >= 6 && time <= 18)
    {
        game.setClockTime(0,0,0);
    }
    else
    {
        game.setClockTime(12,0,0);
    }

});
