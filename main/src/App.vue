<template>
  <div id="app">
    <h1>MailCraft</h1>
    <component :is="Editor" v-if="Editor" />
    <component :is="HelloWorld" v-if="HelloWorld" msg="burcu" />
  </div>
</template>

<script>
import loadComponent from "./utils/loadComponents";

export default {
  data() {
    return {
      Editor: null,
      HelloWorld: null,
    };
  },
  async mounted() {
    this.Editor = await loadComponent("Editor");
    this.HelloWorld = await loadComponent("HelloWorld");
  },
};
</script>
