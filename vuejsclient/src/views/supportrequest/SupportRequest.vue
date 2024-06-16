<template>
  <SubjectMessageForm label-subject="Betreff" label-message="Nachricht" :subject-rules="subjectRules" :message-rules="messageRules" placeholder-subject="Betreff" placeholder-message="Support Anfrage" :event="event" info-component="infos/SupportRequestInfo" title="Support Anfrage" confirm-text="Absenden"></SubjectMessageForm>
</template>

<script>
import SubjectMessageForm from "@/components/forms/SubjectMessageForm.vue";
export default {
  name: "SupportRequest",
  components: {
    SubjectMessageForm
  },
  data() {
    return {
      valid: true,
      subjectRules: [
        v => !!v || 'Du musst einen Betreff angeben',
        v => (v && v.length <= 40) || 'Der Betreff darf höchstens 40 Zeichen lang sein',
        v => /^[A-Za-z0-9 .,$-äÄöÖüÜß!?]*$/.test(v) || 'Unerlaubte Zeichen erkannt.'
      ],
      messageRules: [
        v => !!v || 'Du musst eine Nachricht angeben',
        v => (v && v.length <= 256) || 'Die Nachricht darf höchstens 255 Zeichen lang sein',
        v => /^[A-Za-z0-9 .,$-äÄöÖüÜß!?]*$/.test(v) || 'Unerlaubte Zeichen erkannt.'
      ],
      event: "Server:SupportRequest:Send",
    }
  }
}
</script>

<style scoped>
  html {
    color: #fff;
  }
</style>