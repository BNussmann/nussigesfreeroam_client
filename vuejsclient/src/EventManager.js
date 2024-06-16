export default class EventManager {
    eventList = {}
    debug = false

    on (eventName, fn) {
        this.eventList[eventName] = fn
    }

    emit (eventName, ...args) {
        if(this.eventList[eventName] !== null) {
            this.eventList[eventName](...args);
        }
    }

    off (eventName) {
        delete this.eventList[eventName]
    }

    callGame (event, ...args) {
        /* eslint-disable */
        alt.emit("Vue:CallGame", event, ...args)
        if(event.type === "server" && this.debug) {
            this.emit(event.name, ...args);
        }
    }

    callServer(event, ...args) {
        alt.emit("Vue:CallGame", {type: "server", name: event}, ...args);
        if(this.debug) {
            this.emit(event.name, ...args);
        }
    }

    callServer(event, ...args) {
        alt.emit("Vue:CallGame", {type: "server", name: event}, ...args);
    }
}
