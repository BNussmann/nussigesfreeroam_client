import {
    WebView,
    showCursor,
    toggleGameControls,
    on,
    onServer,
    emit,
    emitServer
} from 'alt-client'


const isDebug = false

class View extends WebView {
    cursor = false
    controls = true

    constructor (url) {
        super(url, true)

        on("Vue:LoadApp", this.loadApp.bind(this))
        on("Vue:LoadPrompt", this.loadPrompt.bind(this))
        on("Vue:DestroyApp", this.destroyApp.bind(this))
        on("Vue:CallEvent", this.callEvent.bind(this))
        on("Vue:ChangePage", this.changePage.bind(this))
        onServer("Vue:LoadApp", this.loadApp.bind(this))
        onServer("Vue:LoadPrompt", this.loadPrompt.bind(this))
        onServer("Vue:DestroyApp", this.destroyApp.bind(this))
        onServer("Vue:CallEvent", this.callEvent.bind(this))
        onServer("Vue:ChangePage", this.changePage.bind(this))

        this.on("load", () => {
            emit("Vue:Loaded")
            emitServer("Vue:Loaded")

            this.on("Vue:CallGame", (event, ...args) => {
                if (event.type === "server") {
                    emitServer(event.name, ...args);
                }
                else if (event.type === "client") emit(event.name, ...args)
            })
        })
    }

    setCursor (state) {
        showCursor(state)
    }

    setControls (state) {
        toggleGameControls(state)
    }

    loadApp (appName, params = {}) {
        
        if(params.hudMode === null || !params.hudMode) {
            emitServer("Server:Menu:setMenuOpened", true);
            this.setCursor(true);
            this.setControls(false);
            this.focus();
        }

        super.emit("Vue:LoadApp", appName, params)
    }

    loadPrompt(type, title, info, yesMessage, noMessage, returnEvent, params = {}) {
        switch(type) {
            case "two-option":
                this.loadApp("TwoOptionPrompt", {omitHeader: false, draggable: true, promptTitle: title, promptInfo: info, promptYesMessage: yesMessage, promptNoMessage: noMessage, promptReturnEvent: returnEvent, promptParams: params})
        }
        this.loadApp("")
    }

    destroyApp (appName, resetControls = true) {
        console.log("Please reset controls: " + resetControls);

        if(resetControls) {
            this.setCursor(false);
            this.setControls(true);

        }
        emitServer("Server:Menu:setMenuOpened", false);
        this.unfocus();
        super.emit("Vue:DestroyApp", appName, resetControls)
    }

    changePage (appName, pageName, params = {}) {
        super.emit("Vue:ChangePage", appName, pageName, params)
    }

    callEvent (eventName, ...args) {
        super.emit("Vue:CallEvent", eventName, ...args)
    }
}


const UI = (isDebug) ? new View('http://127.0.0.1:5173') : new View('http://resource/client/vuejsclient/output/index.html')

export default UI