<template>
    <div class="speedometer">
        <div class="speedometer-left">
            <StreetNameInfoComponent class="street-info" :street="currentStreet"/>
            <div class="top-speedometer">
                <KMDisplayComponent class="km-info" :km="currentKM"/>
                <SpeedDisplayComponent class="speed-display" :speed="currentSpeed" />
                <div class="speed-sidebar">
                    <UnitDisplayComponent class="speed-unit" />
                    <CarInfoComponent :engine-active="engineActive" :lock-active="lockActive" :light-active="lightActive" :high-beam-active="highBeamActive"  class="car-info"/>
                </div>
            </div>
            <div class="bottom-speedometer">
                <GearDisplayComponent class="gear-info" :is-reverse="isReverse" :gear="currentGear"/>
                <RPMComponent :rpm="currentRPM" />
            </div>
        </div>
        <div class="speedometer-right">
            <FuelDisplayComponent class="fuel-info" :fuel="currentFuel" :max-fuel="currentMaxFuel" />
        </div>
    </div>
    
</template>

<script>
import CarInfoComponent from './subcomponents/CarInfoComponent.vue';
import GearDisplayComponent from './subcomponents/GearDisplayComponent.vue';
import RPMComponent from './subcomponents/RPMComponent.vue';
import SpeedDisplayComponent from './subcomponents/SpeedDisplayComponent.vue';
import UnitDisplayComponent from './subcomponents/UnitDisplayComponent.vue';
import StreetNameInfoComponent from './subcomponents/StreetNameInfoComponent.vue';
import FuelDisplayComponent from './subcomponents/FuelDisplayComponent.vue';
import KMDisplayComponent from './subcomponents/KMDisplayComponent.vue';


export default {
    name: "SpeedometerComponent",
    components: { SpeedDisplayComponent, UnitDisplayComponent, CarInfoComponent, RPMComponent, GearDisplayComponent, StreetNameInfoComponent, FuelDisplayComponent, KMDisplayComponent },
    methods: {
        
    },
    mounted() {
        this.$event.on("Vue:Speedometer:SetValues", (gear, speed, street, engineOn, rpm, lightOn, highBeamOn) => {
            this.currentGear = gear;
            this.isReverse = gear === 0 && speed > 0;
            this.currentSpeed = Math.round(speed);
            this.currentStreet = street;
            this.engineActive = engineOn;
            this.currentRPM = engineOn ? rpm*100 : 0;
            this.lightActive = lightOn;
            this.highBeamActive = highBeamOn;
        })

        this.$event.on("Vue:Speedometer:SetServerValues", (fuel, maxFuel, km, lockOn) => {
            this.currentFuel = Number.parseFloat(fuel);
            this.currentMaxFuel = Number.parseFloat(maxFuel);
            this.currentKM = Number.parseFloat(km).toFixed(1);
            this.lockActive = lockOn;
        })

        this.$event.callServer("Server:Speedometer:RequestData");

        
    },
    props: {
    },
    data() {
        return {
            currentSpeed: 100,
            currentGear: 0,
            currentRPM: 0,
            currentFuel: 1.5,
            currentStreet: "",
            engineActive: false,
            lockActive: false,
            highBeamActive: false,
            lightActive: false,
            currentMaxFuel: 15,
            currentKM: 0,
            isReverse: false
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@1,500&display=swap');
    .speedometer  {
        color: white;
        font-family: 'Chivo Mono', monospace;
        font-size: 20px;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        --speed-font-size: 150px;
        text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    }

    .speedometer-left {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .speedometer-right {
        align-self: flex-start;
        margin-top: 5%;
        
        margin-left: 10px;
    }

    .top-speedometer {
        display: flex;
        flex-direction: row;
        align-self: flex-end;
        position:relative;
    }

    .bottom-speedometer {
        display: flex;
        flex-direction: row;
    }

    .speed-display {
        font-size: var(--speed-font-size) !important;
        line-height: calc(var(--speed-font-size) * 0.8);
    }

    .speed-unit {
        align-self: flex-start;
        
    }

    .speed-sidebar {
        margin-left: 5px;
        flex-direction: column;
        padding: 0;
        align-items: flex-start;
        display: flex;
        align-self:stretch;
        /*margin-bottom: calc(var(--speed-font-size) / 2);*/
    }
    
    .sidebar-component {
        line-height: 17px;
    }

    .car-info {
        margin-top: auto !important;
    }

    .gear-info {
        margin-right: 10px;
    }

    .street-info {
        margin-left: auto;
        font-size: 18px;
        border-bottom:1px solid white;
        opacity: 0.9;
    }

    .fuel-info {
        align-self:flex-start;
    
    }

    .km-info {
        align-self:flex-start;
        position: absolute;
        
        bottom: 5px;
        opacity: 0.8;
        right: 102%;
        width: 100%;
    }
</style>