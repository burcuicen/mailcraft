<template>
  <div id="app">
    <h1>MailCraft</h1>
    <component :is="Editor" v-if="Editor" />
  </div>
</template>

<script>
import loadComponent from "./utils/loadComponents";

export default {
  data() {
    return {
      Editor: null,
    };
  },
  async mounted() {
    this.Editor = await loadComponent("Editor");
  },
};
</script>
