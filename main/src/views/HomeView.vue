<!-- HomeView.vue -->
<template>
  <div class="home">
    <main class="main-content">
      <div class="stats-section">
        <DashboardCard title="Total Templates" :value="templates.length" />
      </div>

      <div class="templates-section">
        <TemplateList
          :templates="templates"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </main>
  </div>
</template>

<script>
import DashboardCard from "../components/DashboardCard.vue";
import TemplateList from "../components/TemplateList.vue";

export default {
  name: "HomeView",

  components: {
    DashboardCard,
    TemplateList,
  },

  data() {
    return {
      templates: [],
    };
  },

  created() {
    this.loadTemplates();
  },

  methods: {
    loadTemplates() {
      const savedTemplates = localStorage.getItem("templates");
      this.templates = savedTemplates ? JSON.parse(savedTemplates) : [];
    },

    handleEdit(template) {
      this.$emit("edit-template", template);
    },

    handleDelete(template) {
      if (confirm("Are you sure you want to delete this template?")) {
        const templates = JSON.parse(localStorage.getItem("templates") || "[]");
        const updatedTemplates = templates.filter((t) => t.id !== template.id);
        localStorage.setItem("templates", JSON.stringify(updatedTemplates));
        this.loadTemplates();
      }
    },
  },
};
</script>
