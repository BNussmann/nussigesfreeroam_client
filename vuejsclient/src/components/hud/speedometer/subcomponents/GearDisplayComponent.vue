<template>
    <div class="gear-info">
        {{ isReverse ? 'R' : gear === 0 ? 'N' : gear }}
    </div>
</template>

<script>
export default {
    name: "GearDisplayComponent",
    components: {},
    methods: {
        
    },
    mounted() {
    },
    props: {
        gear: Number,
        isReverse: Boolean
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .gear-info {
        height: 40px;
        width: 40px;
        line-height: 20px;
        display:flex;
        justify-content: center;
        align-items: center;
        -moz-border-radius: 20px; /* or 50% */
        border-radius: 20px; /* or 50% */
        
        border: 2px solid white;
        
        color: white;
        text-align: center;
        font-size: 1.5em;
    }
</style>