<template>
  <div id="app">
    <Header
      @create-template="toggleEditor"
      @go-back="toggleHome"
      :showEditor="showEditor"
    />
    <component :is="Editor" v-if="Editor && showEditor" />
  </div>
</template>

<script>
import loadComponent from "./utils/loadComponents";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      Editor: null,
      showEditor: false,
    };
  },
  async mounted() {
    this.Editor = await loadComponent("Editor");
  },
  methods: {
    toggleEditor() {
      this.showEditor = true;
    },
    toggleHome() {
      this.showEditor = false;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
