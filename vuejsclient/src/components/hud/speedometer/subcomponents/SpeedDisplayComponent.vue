<template>
    <span class="speed-container">
        <span v-if="speed <= 0"><span class="inactive">000</span></span>
        <span v-if="speed > 0 & speed < 10"><span class="inactive">00</span>{{ speed }}</span>
        <span v-if="speed >= 10 & speed < 100"><span class="inactive">0</span> {{ speed }}</span>
        <span v-if="speed >= 100"> <span class="inactive"></span>{{ speed }}</span>
    </span>
    
</template>

<script>
export default {
    name: "SpeedDisplayComponent",
    components: {},
    methods: {
        
    },
    mounted() {
    },
    props: {
        speed: Number
    },
    data() {
        return {
        }
    }
}

</script>

<style scoped>
.inactive {
    opacity: 0.3;
}

.speed-container> * {
    display:flex;
}
</style>