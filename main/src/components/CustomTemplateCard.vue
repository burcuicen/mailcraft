<template>
  <div class="custom-template-card" @click="$emit('customEdit', template)">
    <img
      class="custom-template-card__preview"
      :src="template.thumbnail"
      alt="Template Image"
    />
    <h3 class="custom-template-card__title">{{ template.name }}</h3>
    <p class="custom-template-card__category">{{ template.category }}</p>
  </div>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    template: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.custom-template-card {
  cursor: pointer;

  background-color: #ffffff;
  padding: 32px;

  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  &__preview {
    width: 100%;
    height: 200px;

    object-fit: cover;
    border-radius: 4px;

    margin-bottom: 16px;
  }
  &__category {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 60px;

    background-color: #f97316;

    padding: 4px;
    border-radius: 8px;

    color: white;

    font-size: 12px;
  }
}
</style>
