export default class Alt {
    eventList = {}

    on(event, fn) {
        this.eventList[event] = fn;
    }

    emit(event, ...args) {
        if(this.eventList[event] != null) {
            this.eventList[event](...args);
        }
    }
}