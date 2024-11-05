<template>
  <div class="template-list">
    <div class="template-list__header">
      <h2 class="template-list__title">Start with a custom template</h2>
    </div>
    <div class="template-list__content">
      <div class="template-list__custom-items">
        <CustomTemplateCard
          v-for="template in templates"
          :key="template.name"
          :template="template"
          @customEdit="$emit('edit', template)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CUSTOM_TEMPLATES } from "../constants";
import CustomTemplateCard from "./CustomTemplateCard.vue";

export default {
  name: "TemplateList",
  components: {
    CustomTemplateCard,
  },
  data() {
    return {
      templates: CUSTOM_TEMPLATES,
    };
  },
};
</script>
<style lang="scss">
.template-list {
  &__custom-items {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }
}
</style>
