<template>
    
    <div class="street-info">
        <img class="gps-icon" src="../../../../assets/gps-icon.svg"/>
        <div class="street">{{ street.toUpperCase() }}</div> 
    </div>
</template>

<script>
export default {
    name: "StreetNameInfoComponent",
    components: {},
    methods: {
        
    },
    mounted() {
    },
    props: {
        street: String
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .gps-icon {
        height: 15px;
        margin-right: 5px;
    }

    .street-info {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
    }
</style>