<template>
    <span id="fuel-display">
        <span id="fuel-container">
            <span id="fuel-level" :style="{height: (120 / 100 * fuel/(maxFuel / 100)) + 'px', backgroundColor: fuel/(maxFuel / 100) > 10 ? 'white' : 'red'}"></span>
        </span>
        <img v-if="fuel/(maxFuel / 100) > 10" class="gas-icon" src="../../../../assets/gas-pump-icon.svg" />
        <img v-else class="gas-warning-icon blink" src="../../../../assets/gas-pump-icon-warning.svg" />
    </span>
    
    
</template>

<script>
    export default {
    name: "FuelDisplayComponent",
    components: {},
    methods: {
        
    },
    mounted() {
    },
    props: {
        fuel: Number,
        maxFuel: Number
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
#fuel-level {
    display: block;
    margin-top:auto;
    background-color: white;
    position: absolute;
    bottom: 0;
    width: 10px;
}

#fuel-container {
    position:relative;
    --fuel-container-height: 120px;
    height: var(--fuel-container-height);
    border: 1px solid white;
    width: 12px;
    opacity: 0.9;
    display:block;
}

.gas-icon {
    width: 15px;
}

.gas-warning-icon {
    width: 15px;
}

.blink {
    -moz-transition:all 0.5s ease-in-out;
    -webkit-transition:all 0.5s ease-in-out;
    -o-transition:all 0.5s ease-in-out;
    -ms-transition:all 0.5s ease-in-out;
    transition:all 0.5s ease-in-out;
    -moz-animation:blink normal 1.5s infinite ease-in-out;
    /* Firefox */
    -webkit-animation:blink normal 1.5s infinite ease-in-out;
    /* Webkit */
    -ms-animation:blink normal 1.5s infinite ease-in-out;
    /* IE */
    animation:blink normal 1.5s infinite ease-in-out;
}
@keyframes blink {
    0% {
            opacity: 1.0;
    }
    50% {
            opacity: 0.5;
    }
    100% {
            opacity: 1.0
    }
}
@-webkit-keyframes blink {
    0% {
            opacity: 1.0;
    }
    50% {
            opacity: 0.5;
    }
    100% {
            opacity: 1.0
    }
}
</style>