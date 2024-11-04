<!-- HomeView.vue -->
<template>
  <div class="home">
    <main class="home__content">
      <div class="home__stats">
        <DashboardCard title="Total Templates" :value="templates.length" />
      </div>
      <div class="home__custom">
        <CustomTemplates />
      </div>

      <div class="home__templates">
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
import CustomTemplates from "../components/CustomTemplates.vue";

export default {
  name: "HomeView",
  components: {
    DashboardCard,
    TemplateList,
    CustomTemplates,
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
      //TODO: CREATE A ARE YOU SURE MODAL

      const templates = JSON.parse(localStorage.getItem("templates") || "[]");
      const updatedTemplates = templates.filter((t) => t.id !== template.id);
      localStorage.setItem("templates", JSON.stringify(updatedTemplates));
      this.loadTemplates();
    },
  },
};
</script>
<style lang="scss">
.home {
  &__content {
    padding-right: 64px;
    padding-left: 64px;

    margin-top: 32px;

    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  &__stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 32px;
  }
}
</style>
