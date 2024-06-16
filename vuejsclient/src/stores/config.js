import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => ({ configData: {}}),
    getters: {
        getConfigValue: (state) => {
            return (configName) => state.configData[configName] ? state.configData[configName] : null
        }
    },
    actions: {
        setConfigValue(configName, value) {
            this.configData[configName] = value;
        }
    },
})