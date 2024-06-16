import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
    state: () => ({ stateData: {}}),
    getters: {
        getStateValue: (state) => {
            return (configName) => state.stateData[configName] ? state.stateData[configName] : null
        }
    },
    actions: {
        setStateValue(stateName, value) {
            this.stateData[stateName] = value;
        }
    },
})