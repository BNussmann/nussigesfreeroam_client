<template>
  <div>
    <vue-notification-list position="top-left"></vue-notification-list>
  </div>
</template>

<script>
import { useConfigStore } from "@/stores/config";
import { VueNotificationList } from "@dafcoe/vue-notification";
import "@dafcoe/vue-notification/dist/vue-notification.css";
import { useNotificationStore } from "@dafcoe/vue-notification";

export default {
  name: "Notification",

  setup() {
    const store = useConfigStore();
  },

  methods: {
    pushNotification() {
      const notification = {
        message: this.params.msg,
        type: this.params.type,
        showIcon: true,
        dismiss: {
          manually: true,
          automatically: true,
        },
        duration: this.params.duration,
        showDurationProgress: true,
        appearance: "dark",
      };
      const { setNotification } = useNotificationStore();
      setNotification(notification);
    },
  },
  mounted() {
    const store = useConfigStore();
    this.pushNotification();
  }
};
</script>