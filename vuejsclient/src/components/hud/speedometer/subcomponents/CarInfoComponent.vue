<template>
    <div class="info-component">
        <span class="sidebar-component" id="engine" :class="{active: engineActive}">ENG</span>
        <span class="sidebar-component" id="lock" :class="{active: lockActive}">LCK</span>
        <span class="sidebar-component" id="light" :class="{active: lightActive}">LGT</span>
        <span class="sidebar-component" id="highBeam" :class="{active: highBeamActive}">HGB</span>
    </div>
</template>

<script>
export default {
    name: "CarInfoComponent",
    components: {},
    methods: {
        
    },
    mounted() {
    },
    props: {
        engineActive: Boolean,
        lightActive: Boolean,
        lockActive: Boolean,
        highBeamActive: Boolean
    },
    data() {
        return {
            infoClass: 'info-component'
        }
    }
}
</script>

<style scoped>
    span {
        opacity: 0.5;
    }
    .active {
        opacity: 1.0;
    }
    .info-component {
        display:flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
    }
</style>