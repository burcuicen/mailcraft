<!-- App.vue -->
<template>
  <div id="app">
    <Header
      @create-template="toggleEditor"
      @go-back="toggleHome"
      :showEditor="showEditor"
    />
    <component
      :is="Editor"
      v-if="Editor && showEditor"
      :editingTemplate="editingTemplate"
      @saved="toggleHome"
    />
    <HomeView v-else @edit-template="handleEditTemplate" />
  </div>
</template>

<script>
import loadComponent from "./utils/loadComponents";
import Header from "./components/Header.vue";
import HomeView from "./views/HomeView.vue";

export default {
  name: "App",
  components: {
    Header,
    HomeView,
  },
  data() {
    return {
      Editor: null,
      showEditor: false,
      editingTemplate: null,
    };
  },
  async mounted() {
    this.Editor = await loadComponent("Editor");
  },
  methods: {
    toggleEditor() {
      this.editingTemplate = null;
      this.showEditor = true;
    },
    toggleHome() {
      this.showEditor = false;
      this.editingTemplate = null;
    },
    handleEditTemplate(template) {
      this.editingTemplate = template;
      this.showEditor = true;
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
