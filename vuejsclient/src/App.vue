<template>
  <Transition name="container-fade" :duration="delay">
    <div v-if="initialDisplay" :style="[initialPosition != null && !draggable && initialPosition.length === 2 && Number.isInteger(initialPosition[0]) && Number.isInteger(initialPosition[1]) ? {'position': 'absolute', 'left': initialPosition[0] + 'vw', 'top': initialPosition[1] + 'vh'} : {}]">
      <div class="headerless-altv-window" v-if="noHeader">
        <div id="fake-tablet" v-if="tabletMode" :style="cssProps">
          <div class="tablet-background-template"></div>
          <div id="fake-tablet-container">
            <div id="fake-tablet-content">
              <div id="Taskbar">
                <span id="time">{{ time }} Uhr</span>
                <font-awesome-icon icon="fa-solid fa-wifi" />
                <font-awesome-icon icon="fa-solid fa-signal-2" />
                <span id="power">86%</span>
                <font-awesome-icon id="battery-icon" icon="fa-solid fa-battery-three-quarters" />
              </div>
              <div id="fake-tablet-page">
                <component :is="stateStore.stateData.component"/>
              </div>
            </div>
            <button @click="sendTabletHome" class="btn btn-home btn-circle btn-circle-xsm">
              <font-awesome-icon icon="fa fa-fingerprint"/>
            </button>
          </div>
        </div>
        <div v-else>
          <component :is="stateStore.stateData.component"/>
        </div>
      </div>
      <div v-else>
        <div class="altv-window-container rounded" v-if="draggable" ref="draggableContainer" id="draggable-container">
          <div class="altv-window-header" id="draggable-header" @mousedown="dragMouseDown">
            <div>
              <v-toolbar class="altv-window-toolbar rounded-t" dark>
                <v-toolbar-title class="text-no-wrap" :class="[centerTitle ? 'flex text-center':'']">
                  {{ configStore.configData.windowTitle }}
                </v-toolbar-title>

                <v-btn v-if="!omitCloseBtn" @click="close">
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-toolbar>
            </div>
          </div>
          <component :is="stateStore.stateData.component"/>
        </div>
        <div class="altv-window-container text-no-wrap rounded" v-else>
          <div class="altv-window-header">
            <div>
              <v-toolbar class="altv-window-toolbar rounded-t" dark height="35">
                <v-toolbar-title :class="[centerTitle ? 'flex text-center':'']">{{
                    configStore.configData.windowTitle
                  }}
                </v-toolbar-title>

                <v-btn v-if="!omitCloseBtn" @click="close">
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-toolbar>
            </div>
          </div>
          <component :is="stateStore.stateData.component"/>
        </div>
      </div>
    </div>
  </Transition>

</template>

<script>
import {useConfigStore} from './stores/config'
import {useStateStore} from './stores/state'

export default {
  setup() {
    const configStore = useConfigStore()
    const stateStore = useStateStore();
    return {
      configStore, stateStore
    }
  },
  mounted() {
    if(this.tabletMode) {
      this.updateTabletTime();
    }

    if(this.initialShow) {
      this.initialDisplay = true;
    }else {
      setTimeout( () => {
        this.initialDisplay = true;
      }, this.delay)
    }
    this.$event.on("Vue:SetPosition", (position) => {
      this.setPosition(position.x, position.y);
    })
  },
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      time: "",
      initialDisplay: false
    }
  },
  name: "BaseComponent",
  methods: {
    close() {
      this.$controller.destroyApp(this.appName)
    },
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px';
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px';
    },
    setPosition: function(clientX, clientY) {
      this.positions.movementX = this.positions.clientX - clientX;
      this.positions.movementY = this.positions.clientY - clientY;
      this.positions.clientX = clientX;
      this.positions.clientY = clientY;

      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px';
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px';
    },
    closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    },
    sendTabletHome() {
      this.$controller.returnToTablet(this.appName);
    },
    updateTabletTime() {
      let datetime = new Date();
      let hours = datetime.getHours(),
          minutes = datetime.getMinutes();
      this.time = `${hours > 9 ? hours : `0` + hours}:${minutes > 9 ? minutes : `0` + minutes}`;

      setTimeout(this.updateTabletTime, 10000);
    }
  },
  computed: {
    cssProps() {
      return {
        '--viewport-size-w': this.tabletViewPortW,
        '--viewport-size-h': this.tabletViewPortH
      }
    }
  },
  props: ['content']
}
</script>

<style>
@font-face {
  font-family: "pricedown";
  src: local("pricedown"),
  url("./assets/fonts/pricedown_bl.ttf") format("truetype");
}

@font-face {
  font-family: "PT";
  src: local("PT"),
  url("./assets/fonts/Poppins-Thin.ttf") format('truetype');
}

#draggable-container {
  position: absolute;
  z-index: 9;
}

#draggable-header {
  z-index: 10;
}

#CompanyRegistration {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

#SupportApp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.altv-window-header {
  display: flex;
}

.altv-window-header div {
  flex-grow: 1;
}

.altv-window-container {
  background-color: dimgrey;
  min-width: 500px;
}

.altv-window-toolbar {
  user-select: none;
}

html {
  height: 100%;
  overflow: hidden;

}

#fake-tablet-container {
  position: absolute;
  background-size: var(--viewport-size-w) var(--viewport-size-h);
  height: var(--viewport-size-h);
  width: var(--viewport-size-w);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#fake-tablet {
  display: flex;
  justify-content: center;
  align-items: center;
}

#fake-tablet-content {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: none;
}

#fake-tablet-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.headerless-altv-window {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}


#fake-tablet-container > button.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
}

#fake-tablet-container > button.btn-circle  {
  position: relative;
}

#fake-tablet-container > button.btn-circle-sm {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 0.9rem;
}

#fake-tablet-container > button.btn-circle-xsm {
  width: 25px;
  height: 25px;
  line-height: 35px;
  font-size: 0.9rem;
  justify-content: center;
}

.btn-home {
  background-color: #323332 !important;
  border-color: #000000b5 !important;
  color: #8e8b8b !important;
  position: absolute;
  z-index: 999;
  align-self: flex-end;
  display: flex !important;
  align-items: center;
  margin-bottom: 1%;
}

#fake-tablet-container > button.btn-circle-xsm {
  width: 25px;
  height: 25px;
  line-height: 35px;
  font-size: 0.9rem;
}

#fake-tablet-container {
  background-size: calc(2060px * 0.5) calc(1490px * 0.5);
  height: calc(1490px * 0.5);
  width: calc(2060px * 0.5);
}


@media (min-width: 2000px) and (max-width: 4000px) {
  div.tablet-background-template {
    background-size: calc(2060px * 0.6) calc(1490px * 0.6);
    height: calc(1490px * 0.6);
    width: calc(2060px * 0.6);
  }

  div.tablet-background-image {
    background-size: calc(2060px * 0.6) calc(1490px * 0.6);
    height: calc(1490px * 0.6);
    width: calc(2060px * 0.6);
  }

  #Taskbar {
    width: calc((2060px - 78px * 2) * 0.6);
    margin-top: 1.5%;
  }

  #fake-tablet-content > div.Taskbar > span#time {
    padding-left: 1.5%;
  }

  #battery-icon {
    padding-right: 2%;
  }

  #fake-tablet-content {
    padding: calc(78px * 0.5);
  }

  #fake-tablet-container {
    background-size: calc(2060px * 0.6) calc(1490px * 0.6);
    height: calc(1490px * 0.6);
    width: calc(2060px * 0.6);
  }

  #Taskbar {
    width: calc((2060px - 78px * 2) * 0.6);
    margin-top: 1.5%;
  }

}

.container-fade-enter-active,
.container-fade-leave-active {
  transition: opacity 0.5s ease;
}

.container-fade-enter-from,
.container-fade-leave-to {
  opacity: 0;
}


@media (max-width: 2560px) {

  #fake-tablet-content {
    padding: calc(78px * 0.4);
  }

  .btn-home {
    margin-bottom: 0.7% !important;
  }

  #fake-tablet-container > button.btn-circle-xsm {
    width: 22px;
    height: 22px;
    line-height: 22px;
    font-size: 0.7rem;
  }

  #Taskbar {
    width: calc((2060px - 78px * 2) * 0.5);
    margin-top: 1.5%;
  }

  #time {
    padding-left: 1.5%;
  }

  #battery-icon {
    padding-right: 0%;
  }

  #fake-tablet-content {
    padding: calc(78px * 0.5);
  }

  div.tablet-background-image {
    background-size: calc(2060px * 0.5) calc(1490px * 0.5);
    height: calc(1490px * 0.5);
    width: calc(2060px * 0.5);
  }
}


@media (max-width: 1600px) {

  #fake-tablet-container > button.btn-circle-xsm {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 0.7rem;
  }


  #fake-tablet-content > div.Taskbar > span#time {
    padding-left: 1.5%;
  }

  #battery-icon {
    padding-right: 2%;
  }

  #fake-tablet-content {
    padding: calc(78px * 0.5);
  }

  #Taskbar {
    width: calc((2060px - 78px * 2) * 0.5);
    margin-top: 2%;
  }

  div.tablet-background-template {
    background-size: calc(2060px * 0.5) calc(1490px * 0.5);
    height: calc(1490px * 0.5);
    width: calc(2060px * 0.5);
  }

  div.tablet-background-image {
    background-size: calc(2060px * 0.5) calc(1490px * 0.5);
    height: calc(1490px * 0.5);
    width: calc(2060px * 0.5);
  }
}

@media (max-width: 1280px) {

  #fake-tablet-container > button.btn-circle-xsm {
    width: 20px;
    height: 20px;
    line-height: 35px;
    font-size: 0.6rem;
  }


  #Taskbar {
    width: calc((2060px - 78px * 2) * 0.4);
  }

  .tablet-background-template {
    background-size: calc(2060px * 0.4) calc(1490px * 0.4);
  }

  #fake-tablet-container {
    height: calc(1490px * 0.4);
    width: calc(2060px * 0.4);
  }

  #fake-tablet-content {
    padding: calc(78px * 0.5);
  }

}

@media (max-width: 2000px) {
  #fake-tablet-content {
    padding: calc(78px * 0.4);
  }


  #fake-tablet-container {
    background-size: calc(2060px * 0.5) calc(1490px * 0.5);
    height: calc(1490px * 0.5);
    width: calc(2060px * 0.5);
  }
}

.tablet-background-template {
  background-image: url(assets/tabletbg_template.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: calc(2060px * 0.5) calc(1490px * 0.5);
  pointer-events: none;
  height: calc(1490px * 0.5);
  width: calc(2060px * 0.5);
  z-index: 120;
}

#power {
  color: #d2d2d2;
  font-family: PT;
  font-weight: bold;
  font-size: 0.8rem;
  padding-left: 10px;
}

#time {
  position: absolute;
  left: 1%;
  color: #d2d2d2;
  font-family: "PT";
  font-weight: bold;
  font-size: 0.8rem;
  padding-left: 10px;
}

#Taskbar .fa-wifi,
#Taskbar .fa-battery-three-quarters {
  color: #d2d2d2;
  font-size: 1rem;
  padding-left: 10px;
}

#Taskbar {
  z-index: 120;
  position: absolute;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
}

.btn-home:focus {
  box-shadow: 0 0 0 0.2rem rgba(62, 70, 67, 0.25);
}
</style>
