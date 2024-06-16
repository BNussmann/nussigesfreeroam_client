/* eslint-disable no-undef */
import { createApp, defineComponent } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import VueNotificationList from '@dafcoe/vue-notification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWifi, faSignal, faFingerprint, faArrowLeft, faBatteryThreeQuarters, faCircleInfo, faUserGroup, faGear} from "@fortawesome/free-solid-svg-icons";
import { useStateStore } from './stores/state';
import { Controller, EventManager } from './main'
import Router from './router/index'
import App from './App.vue'
import VDragged from 'v-dragged'

export default class AppController {
    app = {}
    params = {}
    alt = null

    async loadPrompt(type, title, info, yesMessage, noMessage, returnEvent, params = {}) {
        this.loadApp("TwoOptionPrompt", {omitHeader: false, draggable: true, promptTitle: title, promptInfo: info, promptYesMessage: yesMessage, promptNoMessage: noMessage, promptReturnEvent: returnEvent, promptParams: params});
    }

    async loadApp (appName, params = {draggable: false, omitHeader: false, tabletMode: false, initialPosition: [-1, -1], centerTitle: false, delay: 0, initialShow: true, hudMode: false}) {
        if (Router[appName] === undefined) return console.log(`[WEBVIEW] ${appName} does not exist in Router`)

        this.params[appName] = params

        const alreadyExist = document.querySelectorAll('div')

        alreadyExist.forEach(el => {
            if (el.id === appName) {
                this.app[appName].unmount('#' + appName)
                el.remove()
            }
        })
        library.add(faSignal, faFingerprint, faArrowLeft, faWifi, faBatteryThreeQuarters, faCircleInfo, faUserGroup, faGear);
        const element = document.createElement('div')
        element.id = appName
        document.body.appendChild(element)

        const i18n = createI18n({
            legacy: false,
            locale: "en-US",
            numberFormats: {
                "en-US": {
                    currency: {
                        style: "currency",
                        currency: "USD",
                    },
                },
            },
        })

        const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon)
        const vuetify = createVuetify({
            components,
            directives,
            theme: {
                defaultTheme: 'dark'
            },
        });

        app.config.globalProperties = {
            $controller: Controller,
            $event: EventManager,
            $windowTitle: "",
            draggable: params.draggable,
            noHeader: params.omitHeader,
            tabletMode: params.tabletMode,
            hudMode: params.hudMode,
            tabletViewPortW: params.tabletViewPortW,
            tabletViewPortH: params.tabletViewPortH,
            omitCloseBtn: params.omitCloseBtn,
            centerTitle: params.centerTitle,
            initialPosition: params.initialPosition,
            delay: params.delay,
            initialShow: params.initialShow,
            params: this.params[appName],
            appName
        }


        app.use(VueNotificationList);
        app.use(VDragged);
        app.use(createPinia());
        app.use(vuetify);
        app.use(i18n);

        this.app[appName] = app
        this.app[appName].vm = app.mount('#' + appName);


        let stateStore = useStateStore();
        stateStore.stateData.component = Router[appName]["home"];
        if(!params.hudMode) {
            EventManager.callGame({
                type: "client",
                name: "Client:HUD:setCefStatus"
            }, true);
        }
       


    }

    changePage (appName, pageName, params) {
        console.log("Trying to change page")
        if (Router[appName] === undefined) return console.log(`[WEBVIEW] ${appName} does not exist in Router`)
        if (Router[appName][pageName] === undefined) return console.log(`[WEBVIEW] ${pageName} does not exist for app: ${appName} in Router`)

        this.params[appName] = params

        console.log("New page: " + appName + ": " + pageName);
        let stateStore = useStateStore();
        stateStore.stateData.component = Router[appName][pageName];
        //this.app[appName].vm.$forceUpdate()
    }

    destroyApp (appName, resetControls = true) {
        if (Router[appName] === undefined) return console.log(`[WEBVIEW] ${appName} does not exist in Router`)

        const element = document.querySelectorAll('div')
        element.forEach(el => {
            if (el.id === appName) {
                this.app[appName].unmount('#' + appName)
                delete this.app[appName]
                el.remove()

                // if(this.alt != null) {
                //     this.alt.emit('webview:DestroyApp', appName)
                // } else if ('alt' in window) {
                //     alt.emit('webview:DestroyApp', appName)
                // }

                EventManager.callGame({
                    type: "client",
                    name: "Vue:DestroyApp"
                }, appName, resetControls)
                
                if(!this.params[appName].hudMode) {
                    EventManager.callGame({
                        type: "client",
                        name: "Client:HUD:setCefStatus"
                    }, false);
                }
                

                //UI.destroyApp(appName);
                //EventManager.emit("webview:DestroyApp", appName);
            }
        })
    }

    returnToTablet(appName) {
        EventManager.callGame({
            type: "client",
            name: "Vue:DestroyApp"
        }, appName, false);
        EventManager.callGame({
            type: "client",
            name: "Client:Tablet:Home"
        });
    }
}