<template>
    <div class="rpm-container">
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 3}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 6}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 9}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 12}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 15}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 18}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 21}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 24}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 27}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 30}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 33}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 36}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 39}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 42}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 45}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 48}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 51}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 54}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 57}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 60}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 63}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 66}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 69}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 72}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 75}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 78}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 81}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 84}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar" :class="{active: rpm * currentScale >= 87}" alt="" src="../../../../assets/bar.svg" />
        <img class="rpm-bar high-rpm" :class="{active: rpm * currentScale >= 90}" alt="" src="../../../../assets/high-rpm-bar.svg" />
        <img class="rpm-bar high-rpm" :class="{active: rpm * currentScale >= 93}" alt="" src="../../../../assets/high-rpm-bar.svg" />
        <img class="rpm-bar high-rpm" :class="{active: rpm * currentScale >= 96}" alt="" src="../../../../assets/high-rpm-bar.svg" />
        <img class="rpm-bar high-rpm" :class="{active: rpm * currentScale >= 100}" alt="" src="../../../../assets/high-rpm-bar.svg" />
    </div>
</template>

<script>
export default {
    name: "RPMComponent",
    components: {},
    methods: {
        
    },
    mounted() {
    },
    updated() {
    },
    props: {
        rpm: Number
    },
    data() {
        return {
            highestRPM: 0,
            currentScale: 1.0
        }
    }
}
</script>

<style scoped>
.rpm-bar {
    height: 30px;
    padding-right:1px;
    fill: white;
    opacity: 0.3;
}

.active {
    opacity: 1.0;
}

.high-rpm {
    height: 50px;
    width: 13px;
    margin-left: -2px;
    margin-top: -5px;
}

.rpm-container {
    align-items: flex-start;
    display: flex;
    margin-top: 5px;
}
</style>