<template>
    <div class="km-display">
        {{ km }} KM
    </div>
    
</template>

<script>
export default {
    name: "KMDisplayComponent",
    components: {},
    methods: {
        
    },
    mounted() {
    },
    props: {
        km: Number
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .km-display {
        font-size: 15px;
        text-align:right;
    }
</style>