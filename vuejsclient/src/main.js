//<reference types="@altv/types-client" />
import AppControllerClass from './AppController'
import EventManagerClass from './EventManager'
import BackupAlt from './Alt_Mock'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'

const EventManager = new EventManagerClass()


let isFake = false;
if (!('alt' in window)) {
    window["alt"] = new BackupAlt();
    isFake = true;
    console.log("Couldn't find alt in namespace");
    EventManager.debug = true;
}


const Controller = new AppControllerClass()


document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
}, false)

/* eslint-disable */
alt.on('Vue:LoadApp', (appName, ...params) => {
    Controller.loadApp(appName, ...params)
})

alt.on('Vue:LoadPrompt', (type, title, info, yesMessage, noMessage, returnEvent, params = {}) => {
    Controller.loadPrompt(type, title, info, yesMessage, noMessage, returnEvent, params)
})

/* eslint-disable */
alt.on('Vue:DestroyApp', (appName, resetControls) => {
    Controller.destroyApp(appName, resetControls)
})

/* eslint-disable */
alt.on('Vue:ChangePage', (appName, pageName, params) => {
    Controller.changePage(appName, pageName, params)
})

/* eslint-disable */
alt.on('Vue:CallEvent', (eventName, ...args) => {
    EventManager.emit(eventName, ...args)
})

alt.on('Vue:DebugServer:CallEvent', (eventName, ...args) => {
    if(isFake) {
        EventManager.emit(eventName, ...args);
    }
})

if (isFake) {
    //alt.emit("Vue:LoadApp", "SupportApp", {tabletMode: true, omitHeader: true, tabletViewPortW: "1920px", tabletViewPortH: "1080px"});
    //alt.emit("Vue:LoadApp", "CarDealerMenu");
    alt.emit("Vue:LoadApp", "Garage", {tabletMode: false, omitHeader: false, draggable: false, hudMode: true, garageName: "Testo Garago Extremo", 
    garageParkInArray:[
        {name: "jugular", license: "1000"},
        {name: "panto", license: "100"},
        {name: "Rhino", license: "2500"},
        {name: "Dominator", license: "500"},
        {name: "jugular", license: "1000"},
        {name: "jugular", license: "1000"},
    ]
    });
    //alt.emit("Vue:LoadApp", "Notification", {tabletMode: false, omitHeader: true, draggable: false, hudMode: true, msg: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr", type: "info", duration: 10000});
    //alt.emit("Vue:LoadApp", "Speedometer", {hudMode: true, omitHeader: true, initialPosition: [70,70]});
    // setTimeout(() => {
    //     console.log("Sending fake transactions...");
    //     EventManager.emit("Vue:SupportApp:DeliverData", {
    //         requests: [
    //             {id: 1, date: "123", charId: 1, charName: "test", posX: 1.617237565126753, posY: 1.126738162, posZ: 1.712631823, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 2, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 3, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 4, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 5, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 6, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 7, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 8, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 9, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 10, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 11, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 12, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 13, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 14, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 15, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 16, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 17, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 18, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 19, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 20, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 21, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 22, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 23, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 24, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 25, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //             {id: 26, date: "123", charId: 1, charName: "test", posX: 1, posY: 1, posZ: 1, subject: "joaaaa", msg: "neeeeeee", wip: false},
    //         ]
    //     })
    // }, 200)
}

export {
    EventManager,
    Controller
}
